import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";

import {
  ExpensesQueryData,
  ExpenseInput,
  ExpenseFilter,
  ExpenseSortInput,
  ExpenseQueryById,
  DeleteExpenseInput,
} from "../types/Expense";

const GET_EXPENSES_QUERY = gql`
  query ExpensesView(
    $skip: Int
    $take: Int
    $where: ExpenseViewFilterInput
    $order: [ExpenseViewSortInput!]
  ) {
    expensesView(skip: $skip, take: $take, where: $where, order: $order) {
      totalCount
      pageInfo {
        hasNextPage
      }
      items {
        id
        categoryId
        category
        title
        amount
        currencySymbol
        date
      }
    }
  }
`;

const GET_EXPENSE_QUERY_BY_ID = gql`
  query Expense($id: ID!) {
    expense(id: $id) {
      id
      categoryId
      title
      description
      amount {
        value
        currencyIsoSymbol
      }
      date
    }
  }
`;

const UPSERT_EXPENSE_MUTATION = gql`
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
        ... on ExpenseNotFoundDomainError {
          id
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
          isoSymbol
        }
      }
    }
  }
`;

const DELETE_EXPENSE_MUTATION = gql`
  mutation DeleteExpense($input: DeleteExpenseInput!) {
    deleteExpense(input: $input) {
      boolean
      errors {
        ... on ExpenseNotFoundDomainError {
          id
          code
          message
          property
        }
      }
    }
  }
`;

type ExpensesQueryVariables = {
  skip: number;
  take: number;
  where: ExpenseFilter;
  order?: ExpenseSortInput;
};

export const useExpensesQuery = (variables: ExpensesQueryVariables) => {
  return useQuery<ExpensesQueryData>(GET_EXPENSES_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });
};

export const useLazyExpenseByIdQuery = () => {
  return useLazyQuery<ExpenseQueryById>(GET_EXPENSE_QUERY_BY_ID, {
    fetchPolicy: "cache-and-network",
  });
};

export const useUpsertExpense = (onCompleted: () => void) => {
  return useMutation<
    { upsertExpense: { errors: { message: string }[] } },
    { input: ExpenseInput }
  >(UPSERT_EXPENSE_MUTATION, {
    onCompleted,
  });
};

export const useDeleteExpense = (onCompleted: () => void) => {
  return useMutation<
    { deleteExpense: { errors: { message: string }[] } },
    { input: DeleteExpenseInput }
  >(DELETE_EXPENSE_MUTATION, {
    onCompleted,
  });
};
