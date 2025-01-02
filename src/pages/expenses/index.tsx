import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import { ExpensesQueryData } from "../../types/Expense";
import { GET_EXPENSES_QUERY } from "../../queries/expenses";
import { GET_CATEGORIES_QUERY } from "../../queries/categories";
import { UPSERT_EXPENSE_MUTATION } from "../../mutations/expenses";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import ExpensesTable from "./ExpensesTable";
import useDebounce from "../../hooks/useDebounce";
import { Category } from "../../types/Category";
import ExpensesPageFilters from "./ExpensesPageFilters";
import ExpenseForm from "./ExpenseForm";

const ExpensesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [titleFilter, setTitleFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [open, setOpen] = useState(false);

  const debouncedTitle = useDebounce(titleFilter);
  const debouncedCategoryFilter = useDebounce(categoryFilter);
  const debouncedStartDate = useDebounce(startDate);
  const debouncedEndDate = useDebounce(endDate);

  const { data: categoryData } = useQuery(GET_CATEGORIES_QUERY, {
    variables: {
      sort: [{ name: "ASC" }],
    },
  });

  const { loading, error, data, refetch } = useQuery<ExpensesQueryData>(
    GET_EXPENSES_QUERY,
    {
      variables: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
        where: {
          title: { contains: debouncedTitle },
          categoryId:
            debouncedCategoryFilter.length > 0
              ? { in: debouncedCategoryFilter }
              : undefined,
          date: {
            gte: debouncedStartDate ? debouncedStartDate : undefined,
            lte: debouncedEndDate ? debouncedEndDate : undefined,
          },
        },
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const [upsertExpense] = useMutation(UPSERT_EXPENSE_MUTATION, {
    onCompleted: () => {
      refetch();
      handleClose();
    },
  });

  useEffect(() => {
    refetch({
      skip: page * rowsPerPage,
      take: rowsPerPage,
      where: {
        title: { contains: debouncedTitle },
        categoryId:
          debouncedCategoryFilter.length > 0
            ? { in: debouncedCategoryFilter }
            : undefined,
        date: {
          gte: debouncedStartDate ? debouncedStartDate : undefined,
          lte: debouncedEndDate ? debouncedEndDate : undefined,
        },
      },
    });
  }, [
    page,
    rowsPerPage,
    debouncedTitle,
    debouncedCategoryFilter,
    debouncedStartDate,
    debouncedEndDate,
    refetch,
  ]);

  const handleClearFilters = () => {
    setTitleFilter("");
    setCategoryFilter([]);
    setStartDate(null);
    setEndDate(null);
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (expense: {
    categoryId: string;
    title: string;
    description: string;
    amount: {
      currency: {
        isoSymbol: string;
      };
      value: number;
    };
    date: string;
  }) => {
    upsertExpense({
      variables: {
        input: expense,
      },
    });
  };

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const expenses = data?.expenses?.items || [];
  const totalCount = data?.expenses?.totalCount || 0;

  const categories: Category[] = categoryData?.categories?.items || [];

  return (
    <Box sx={{ marginLeft: 5, marginRight: 5, marginTop: 2 }}>
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
        titleFilter={titleFilter}
        categoryFilter={categoryFilter}
        startDate={startDate}
        endDate={endDate}
        categories={categories}
        onTitleFilterChange={(e) => setTitleFilter(e.target.value)}
        onCategoryFilterChange={(e) =>
          setCategoryFilter(e.target.value as string[])
        }
        onStartDateChange={(newValue) => setStartDate(newValue)}
        onEndDateChange={(newValue) => setEndDate(newValue)}
        onClearFilters={handleClearFilters}
      />

      {expenses.length === 0 ? (
        <div>
          <Typography variant="h6" align="center">
            No expenses found
          </Typography>
        </div>
      ) : (
        <ExpensesTable
          expenses={expenses}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      )}

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <LoadingIndicator />
        </Box>
      )}

      <ExpenseForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        categories={categories}
      />
    </Box>
  );
};

export default ExpensesPage;
