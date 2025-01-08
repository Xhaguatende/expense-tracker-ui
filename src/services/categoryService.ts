import { useQuery, gql } from "@apollo/client";
import { CategoriesQueryData } from "../types/Category";

const GET_CATEGORIES_QUERY = gql`
  query Categories($order: [CategorySortInput!]) {
    categories(order: $order) {
      items {
        id
        name
      }
    }
  }
`;

export const useCategoriesQuery = () => {
  return useQuery<CategoriesQueryData>(GET_CATEGORIES_QUERY, {
    variables: { order: { name: "ASC" } },
  });
};
