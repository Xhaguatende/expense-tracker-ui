export type Amount = {
  currency: string;
  value: number;
};

export type Expense = {
  id?: string;
  description: string;
  amount: Amount;
  category: string;
  date: string;
};
