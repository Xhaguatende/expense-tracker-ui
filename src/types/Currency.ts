export type Currency = {
  isoSymbol: string;
  symbol: string;
};

export type CurrenciesQueryData = {
  currencies: {
    items: Currency[];
  };
};
