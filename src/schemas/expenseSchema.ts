import * as z from "zod";

export const ExpenseSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required").max(50, "Max 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Max 500 characters"),
  amount: z
    .number()
    .min(0.01, "Amount must be greater than 0")
    .refine((val) => !isNaN(val), "Valid amount required"),
  currency: z.string().min(1, "Currency is required"),
  date: z
    .date({ required_error: "Date is required" })
    .refine((val) => !isNaN(val.getTime()), "Invalid date"),
});

export type ExpenseFormValues = z.infer<typeof ExpenseSchema>;
