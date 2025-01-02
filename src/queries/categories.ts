import { gql } from "@apollo/client";

export const GET_CATEGORIES_QUERY = gql`
  query Categories($sort: [CategorySortInput!]) {
    categories(order: $sort) {
      items {
        id
        name
      }
    }
  }
`;
