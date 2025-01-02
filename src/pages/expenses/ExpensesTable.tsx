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
} from "@mui/material";
import {
  formatDate,
  formatCurrency,
  trimString,
} from "./../../utils/formatters";
import { ExpenseQueryItem } from "./../../types/Expense";

interface ExpensesTableProps {
  expenses: ExpenseQueryItem[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const ExpensesTable = ({
  expenses,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
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
            <TableCell>Category</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell title={expense.category}>
                {trimString(expense.category, 20)}
              </TableCell>
              <TableCell title={expense.title}>
                {trimString(expense.title, 20)}
              </TableCell>
              <TableCell>
                {formatCurrency(
                  expense.amount.value,
                  expense.amount.currency.isoSymbol
                )}
              </TableCell>
              <TableCell>{formatDate(expense.date)}</TableCell>
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
