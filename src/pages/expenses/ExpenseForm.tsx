import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Button,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ExpenseSchema, ExpenseFormValues } from "../../schemas/expenseSchema";
import { Category } from "../../types/Category";
import { ExpenseInput } from "../../types/Expense";
import { Currency } from "../../types/Currency";

type ExpenseFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (expense: ExpenseInput) => void;
  categories: Category[];
  currencies: Currency[];
  initialValues?: ExpenseInput;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  open,
  onClose,
  onSubmit,
  categories,
  currencies,
  initialValues,
}) => {
  const memoizedInitialValues = useMemo<ExpenseFormValues>(() => {
    const date = initialValues?.date
      ? new Date(initialValues.date)
      : new Date();
    date.setHours(0, 0, 0, 0);

    return {
      id: initialValues?.id || undefined,
      category: initialValues?.categoryId || "",
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      amount: initialValues?.amount.value || 0,
      currency: initialValues?.amount.currencyIsoSymbol || "",
      date: date,
    };
  }, [initialValues]);

  const formik = useFormik<ExpenseFormValues>({
    enableReinitialize: true,
    initialValues: memoizedInitialValues,
    validationSchema: toFormikValidationSchema(ExpenseSchema),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        onSubmit({
          id: values.id,
          categoryId: values.category,
          title: values.title,
          description: values.description,
          amount: {
            value: values.amount,
            currencyIsoSymbol: values.currency,
          },
          date: values.date.toISOString(),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {initialValues ? "Edit Expense" : "Create New Expense"}
        </DialogTitle>
        <DialogContent>
          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              label="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.category && formik.errors.category}
            </FormHelperText>
          </FormControl>
          <TextField
            margin="normal"
            label="Title"
            fullWidth
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin="normal"
            label="Description"
            multiline
            rows={3}
            fullWidth
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
            <Grid sx={{ width: "30%" }}>
              <FormControl
                fullWidth
                error={
                  formik.touched.currency && Boolean(formik.errors.currency)
                }
              >
                <InputLabel>Currency</InputLabel>
                <Select
                  name="currency"
                  label="Currency"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {currencies.map((currency) => (
                    <MenuItem
                      key={currency.isoSymbol}
                      value={currency.isoSymbol}
                    >
                      {currency.isoSymbol} ({currency.symbol})
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.currency && formik.errors.currency}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <DatePicker
            label="Date"
            value={formik.values.date}
            format="yyyy-MM-dd"
            onChange={(newValue) => formik.setFieldValue("date", newValue)}
            slotProps={{
              textField: {
                margin: "normal",
                fullWidth: false,
                onBlur: () => formik.setFieldTouched("date", true),
                error: formik.touched.date && Boolean(formik.errors.date),
                helperText: formik.touched.date
                  ? (formik.errors.date as string)
                  : "",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={formik.submitForm}
            variant="contained"
            color="primary"
            disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ExpenseForm;
