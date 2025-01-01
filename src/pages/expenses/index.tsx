import { gql, useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { Expense } from "../../types/Expense";

const GET_EXPENSES = gql`
  query GetExpenses {
    expenses {
      items {
        id
        description
        amount {
          currency
          value
        }
        categoryId
        date
      }
    }
  }
`;

const ADD_EXPENSE = gql`
  mutation AddExpense($input: ExpenseInput!) {
    addExpense(input: $input) {
      id
      description
      amount {
        currency
        value
      }
      category
      date
    }
  }
`;

const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($id: ID!, $input: ExpenseInput!) {
    updateExpense(id: $id, input: $input) {
      id
      description
      amount {
        currency
        value
      }
      category
      date
    }
  }
`;

const ExpensesPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_EXPENSES);
  const [addExpense] = useMutation(ADD_EXPENSE);
  const [updateExpense] = useMutation(UPDATE_EXPENSE);

  const [editing, setEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSave = async (expense: Expense): Promise<void> => {
    if (editing && currentExpense) {
      await updateExpense({
        variables: { id: currentExpense.id, input: expense },
      });
    } else {
      await addExpense({ variables: { input: expense } });
    }
    setEditing(false);
    setCurrentExpense(null);
    refetch();
  };

  const handleEdit = (expense: Expense) => {
    setCurrentExpense(expense);
    setEditing(true);
  };

  return (
    <div>
      <h2>Expenses</h2>
      <ExpenseForm
        onSave={handleSave}
        expense={currentExpense}
        editing={editing}
      />
      <ExpenseList expenses={data.expenses.items} onEdit={handleEdit} />
    </div>
  );
};

export default ExpensesPage;
