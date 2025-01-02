import { gql } from "@apollo/client";

export const UPSERT_EXPENSE_MUTATION = gql`
  mutation upsertExpense($input: UpsertExpenseInput!) {
    upsertExpense(input: $input) {
      expense {
        id
      }
      errors {
        __typename
        ... on DomainError {
          code
          message
          property
        }
        ... on CategoryNotFoundDomainError {
          code
          message
          property
          categoryId
        }
        ... on CurrencyNotFoundDomainError {
          code
          message
          property
          isoCurrencySymbol
        }
      }
    }
  }
`;
