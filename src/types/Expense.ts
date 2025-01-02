export type Currency = {
  isoSymbol: string;
  symbol: string;
};

export type Amount = {
  currency: Currency;
  value: number;
};

export type ExpenseQueryItem = {
  id?: string;
  title: string;
  amount: Amount;
  category: string;
  date: string;
};

export type ExpensesQueryData = {
  expenses: {
    totalCount: number;
    items: ExpenseQueryItem[];
  };
};
