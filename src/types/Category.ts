export type Category = {
  id: string;
  name: string;
  description: string;
};

export type CategoriesQueryData = {
  categories: {
    items: Category[];
  };
};
