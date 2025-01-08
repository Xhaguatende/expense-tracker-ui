import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CategoryIcon from "@mui/icons-material/Category";
import { Navigation } from "@toolpad/core/AppProvider";

export const NAVIGATION: Navigation = [
  {
    segment: "expenses",
    title: "Expenses",
    icon: React.createElement(ReceiptIcon),
  },
  {
    segment: "categories",
    title: "Categories",
    icon: React.createElement(CategoryIcon),
  },
];
