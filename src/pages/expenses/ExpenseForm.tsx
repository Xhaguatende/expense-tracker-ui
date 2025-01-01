import { useState, useEffect } from "react";
import { Expense } from "./../../types/Expense";

type Props = {
  onSave: (expense: Expense) => Promise<void>;
  expense?: Expense | null;
  editing: boolean;
};

const ExpenseForm = ({ onSave, expense, editing }: Props) => {
  const [form, setForm] = useState<Expense>({
    id: "",
    description: "",
    amount: { currency: "", value: 0 },
    category: "",
    date: "",
  });

  useEffect(() => {
    if (expense) setForm(expense);
  }, [expense]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "currency" || name === "value") {
      setForm({
        ...form,
        amount: {
          ...form.amount,
          [name]: name === "value" ? parseFloat(value) : value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="currency"
        value={form.amount.currency}
        onChange={handleChange}
        placeholder="Currency"
        required
      />
      <input
        name="value"
        type="number"
        value={form.amount.value}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <button type="submit">{editing ? "Update" : "Add"}</button>
    </form>
  );
};

export default ExpenseForm;
