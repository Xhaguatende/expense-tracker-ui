type Amount = {
  currency: string;
  value: number;
};

type Expense = {
  id: string;
  description: string;
  amount: Amount;
  category: string;
  date: string;
};

type Props = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
};

const ExpenseList = ({ expenses, onEdit }: Props) => {
  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.description} - {expense.amount.currency}{" "}
          {expense.amount.value} - {expense.category} - {expense.date}
          <button onClick={() => onEdit(expense)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
