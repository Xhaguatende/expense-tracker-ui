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
  amount: number;
  currencySymbol: string;
  category: string;
  date: string;
};

export type ExpensesQueryData = {
  expensesView: {
    totalCount: number;
    items: ExpenseQueryItem[];
  };
};

export type ExpenseQueryById = {
  expense: ExpenseInput;
};

export type ExpenseFilter = {
  id?: {
    eq?: string;
  };
  title?: {
    contains?: string;
  };
  categoryId?: {
    in?: string[];
  };
  currencySymbol?: {
    in?: string[];
  };
  date?: {
    gte?: string | Date;
    lte?: string | Date;
  };
};

export type ExpenseSortInput = {
  date?: SortDirection | null;
  title?: SortDirection | null;
  amount?: { value?: SortDirection | null };
};

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ExpenseInput = {
  id?: string | null;
  categoryId: string;
  title: string;
  description?: string;
  amount: {
    value: number;
    currencyIsoSymbol: string;
  };
  date: string;
};
