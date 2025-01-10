import { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import usePagination from "../../hooks/usePagination";
import useFilters, { Filters } from "./hooks/useFilters";
import useDebouncedFilters from "./hooks/useDebouncedFilters";
import {
  ExpenseInput,
  ExpenseSortInput,
  SortDirection,
} from "../../types/Expense";
import { showSnackbar } from "../../services/SnackbarService";
import {
  useExpensesQuery,
  useLazyExpenseByIdQuery,
  useUpsertExpense,
  useDeleteExpense,
} from "../../services/expenseService";
import { useCategoriesQuery } from "../../services/categoryService";
import ExpensesTable from "./ExpensesTable";
import ExpensesPageFilters from "./ExpensesPageFilters";
import DeleteExpenseDialog from "./DeleteExpenseDialog";
import ExpenseForm from "./ExpenseForm";
import { useCurrenciesQuery } from "../../services/currencyService";

function getDefaultExpense(): ExpenseInput {
  return {
    title: "",
    amount: {
      value: 0,
      currencyIsoSymbol: "",
    },
    categoryId: "",
    date: "",
  };
}
const ExpensesPage = () => {
  const { page, rowsPerPage, setPage, setRowsPerPage } = usePagination();

  const {
    titleFilter,
    categoryFilter,
    currencyFilter,
    startDate,
    endDate,
    handleFilterChange,
    handleClearFilters,
  } = useFilters();

  const debouncedFilters = useDebouncedFilters({
    titleFilter,
    categoryFilter,
    currencyFilter,
    startDate,
    endDate,
  });

  const [sortField, setSortField] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<SortDirection>(SortDirection.DESC);

  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseInput | null>(
    null
  );
  const [selectedExpenseId, setSelectedExpenseId] = useState<string>("");

  const { data: categoryData } = useCategoriesQuery();
  const { data: currencyData } = useCurrenciesQuery();

  const categories = useMemo(
    () => categoryData?.categories?.items || [],
    [categoryData]
  );

  const currencies = useMemo(
    () => currencyData?.currencies?.items || [],
    [currencyData]
  );

  const [getExpenseById, { data: expenseInfo }] = useLazyExpenseByIdQuery();

  const {
    data: dataExpenses,
    loading: loadingExpenses,
    error: errorExpenses,
    refetch: refetchExpenses,
  } = useExpensesQuery({
    skip: page * rowsPerPage,
    take: rowsPerPage,
    where: {
      title: { contains: debouncedFilters.titleFilter },
      categoryId:
        debouncedFilters.categoryFilter.length > 0
          ? { in: debouncedFilters.categoryFilter }
          : undefined,
      currencySymbol:
        debouncedFilters.currencyFilter.length > 0
          ? { in: debouncedFilters.currencyFilter }
          : undefined,
      date: {
        gte: debouncedFilters.startDate || undefined,
        lte: debouncedFilters.endDate || undefined,
      },
    },
    order: {
      [sortField]: sortOrder,
    } as ExpenseSortInput,
  });

  const [upsertExpense] = useUpsertExpense(() => {
    refetchExpenses();
  });

  const [deleteExpense] = useDeleteExpense(() => {
    refetchExpenses();
  });

  const handleOpen = () => {
    setSelectedExpense(null);
    setSelectedExpenseId("");
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedExpense(getDefaultExpense());
    setSelectedExpenseId("");
    setOpen(false);
  };

  const handleSubmit = async (expense: ExpenseInput) => {
    try {
      const { data } = await upsertExpense({ variables: { input: expense } });
      const errors = data?.upsertExpense?.errors || [];

      if (errors.length > 0) {
        showSnackbar({
          message: errors.map((e) => e.message).join(", "),
          severity: "error",
        });
      } else {
        showSnackbar({
          message: "Expense saved successfully!",
          severity: "success",
        });
        handleClose();
      }
    } catch (err) {
      console.error(err);
      showSnackbar({ message: "Failed to save expense.", severity: "error" });
    }
  };

  const handleEdit = (id: string) => {
    getExpenseById({
      variables: {
        id,
      },
    });
    setSelectedExpenseId(id);
  };

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
      );
    } else {
      setSortField(field);
      setSortOrder(SortDirection.ASC);
    }
  };

  const [deleteDialogExpense, setDeleteDialogExpense] = useState<{
    id: string;
    title: string;
    date: string;
  } | null>(null);

  const handleDeleteDialogOpen = (expense: {
    id: string;
    title: string;
    date: string;
  }) => {
    setDeleteDialogExpense(expense);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogExpense(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialogExpense) {
      try {
        const { data } = await deleteExpense({
          variables: { input: { id: deleteDialogExpense.id } },
        });
        const errors = data?.deleteExpense?.errors || [];

        if (errors.length > 0) {
          showSnackbar({
            message: errors.map((e) => e.message).join(", "),
            severity: "error",
          });
        } else {
          showSnackbar({
            message: "Expense deleted successfully!",
            severity: "success",
          });
        }
      } catch (err) {
        console.error(err);
        showSnackbar({ message: "Failed to save expense.", severity: "error" });
      }
    }
    handleDeleteDialogClose();
  };

  useEffect(() => {
    if (expenseInfo && selectedExpenseId) {
      setSelectedExpense(expenseInfo.expense);
      setOpen(true);
    }
  }, [selectedExpenseId, expenseInfo]);

  if (errorExpenses) {
    return <ErrorMessage message={errorExpenses.message} />;
  }

  const expenses = dataExpenses?.expensesView?.items || [];
  const totalCount = dataExpenses?.expensesView?.totalCount || 0;

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Expenses</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create New Expense
        </Button>
      </Box>
      <ExpensesPageFilters
        filters={{
          titleFilter,
          categoryFilter,
          currencyFilter,
          startDate,
          endDate,
        }}
        categories={categories}
        currencies={currencies}
        onFilterChange={(filterName, value) =>
          handleFilterChange(filterName as keyof Filters, value)
        }
        onClearFilters={handleClearFilters}
      />
      {loadingExpenses && (
        <Box display="flex" justifyContent="center" mt={2}>
          <LoadingIndicator />
        </Box>
      )}
      {expenses.length === 0 && !loadingExpenses && (
        <Typography variant="h6" align="center">
          No expenses found
        </Typography>
      )}
      {expenses.length > 0 && !loadingExpenses && (
        <ExpensesTable
          expenses={expenses}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onEdit={(expenseId) => handleEdit(expenseId)}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onDelete={handleDeleteDialogOpen}
        />
      )}

      <ExpenseForm
        key={selectedExpense ? selectedExpense.id : "new-expense"}
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        categories={categories}
        currencies={currencies}
        initialValues={selectedExpense || undefined}
      />

      <DeleteExpenseDialog
        expense={deleteDialogExpense}
        onClose={() => setDeleteDialogExpense(null)}
        onDelete={handleDeleteConfirm}
      />
    </Container>
  );
};

export default ExpensesPage;
