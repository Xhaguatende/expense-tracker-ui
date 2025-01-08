import { useQuery, gql } from "@apollo/client";
import { CurrenciesQueryData } from "../types/Currency";

const GET_CURRENCIES_QUERY = gql`
  query Currencies($order: [CurrencySortInput!]) {
    currencies(order: $order) {
      totalCount
      items {
        symbol
        isoSymbol
      }
    }
  }
`;

export const useCurrenciesQuery = () => {
  return useQuery<CurrenciesQueryData>(GET_CURRENCIES_QUERY, {
    variables: { order: { isoSymbol: "ASC" } },
  });
};
