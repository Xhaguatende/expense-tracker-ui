import { gql } from "@apollo/client";

export const GET_EXPENSES_QUERY = gql`
  query Expenses($skip: Int, $take: Int, $where: ExpenseFilterInput) {
    expenses(skip: $skip, take: $take, where: $where) {
      totalCount
      pageInfo {
        hasNextPage
      }
      items {
        id
        categoryId
        category
        description
        title
        amount {
          value
          currency {
            isoSymbol
            symbol
          }
        }
        date
      }
    }
  }
`;
