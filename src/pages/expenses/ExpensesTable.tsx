import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  SelectChangeEvent,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  formatDate,
  formatCurrency,
  trimString,
} from "./../../utils/formatters";

import { ExpenseQueryItem, SortDirection } from "./../../types/Expense";

type ExpensesTableProps = {
  expenses: ExpenseQueryItem[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onEdit: (expenseId: string) => void;
  sortField: string;
  sortOrder: SortDirection;
  onSortChange: (field: string) => void;
  onDelete: (expense: { id: string; title: string; date: string }) => void;
};

const ExpensesTable = ({
  expenses,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  sortField,
  sortOrder,
  onSortChange,
  onDelete,
}: ExpensesTableProps) => {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    onRowsPerPageChange(Number(event.target.value));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              onClick={() => onSortChange("category")}
              style={{ cursor: "pointer" }}
            >
              <TableSortLabel
                active={sortField === "category"}
                direction={sortOrder === SortDirection.ASC ? "asc" : "desc"}
              >
                Category
              </TableSortLabel>
            </TableCell>
            <TableCell
              onClick={() => onSortChange("title")}
              style={{ cursor: "pointer" }}
            >
              <TableSortLabel
                active={sortField === "title"}
                direction={sortOrder === SortDirection.ASC ? "asc" : "desc"}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="right"
              onClick={() => onSortChange("amount")}
              style={{ cursor: "pointer" }}
            >
              <TableSortLabel
                active={sortField === "amount"}
                direction={sortOrder === SortDirection.ASC ? "asc" : "desc"}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell
              align="right"
              onClick={() => onSortChange("date")}
              style={{ cursor: "pointer" }}
            >
              <TableSortLabel
                active={sortField === "date"}
                direction={sortOrder === SortDirection.ASC ? "asc" : "desc"}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell title={expense.category}>
                {trimString(expense.category, 25)}
              </TableCell>
              <TableCell title={expense.title}>
                {trimString(expense.title, 25)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  maxWidth: 50,
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                }}
              >
                ({expense.currencySymbol}) {""}
                {formatCurrency(expense.amount, expense.currencySymbol)}
              </TableCell>
              <TableCell align="right" sx={{ minWidth: 60, maxWidth: 70 }}>
                {formatDate(expense.date)}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(expense.id as string)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    onDelete({
                      id: expense.id as string,
                      title: expense.title,
                      date: expense.date,
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} align="right">
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={(e) =>
                  handleChangeRowsPerPage(e as SelectChangeEvent<number>)
                }
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ExpensesTable;
