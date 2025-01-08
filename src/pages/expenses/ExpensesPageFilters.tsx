import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Category } from "../../types/Category";
import { Currency } from "../../types/Currency";

type FilterProps = {
  filters: {
    titleFilter: string;
    categoryFilter: string[];
    currencyFilter: string[];
    startDate: Date | null;
    endDate: Date | null;
  };
  categories: Category[];
  currencies: Currency[];
  onFilterChange: (
    filterName: string,
    value: string | string[] | Date | null
  ) => void;
  onClearFilters: () => void;
};

const ExpensesPageFilters: React.FC<FilterProps> = ({
  filters,
  categories,
  currencies,
  onFilterChange,
  onClearFilters,
}) => {
  const { titleFilter, categoryFilter, currencyFilter, startDate, endDate } =
    filters;

  return (
    <Box mb={2} display="flex" gap={2}>
      {/* Title Filter */}
      <TextField
        label="Filter by Title"
        variant="outlined"
        size="small"
        value={titleFilter}
        onChange={(e) => onFilterChange("titleFilter", e.target.value)}
      />

      {/* Category Filter */}
      <FormControl size="small" variant="outlined" sx={{ width: 300 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={categoryFilter}
          onChange={(e) =>
            onFilterChange("categoryFilter", e.target.value as string[])
          }
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) =>
            categories
              .filter((cat) => selected.includes(cat.id))
              .map((cat) => cat.name)
              .join(", ")
          }
        >
          {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.id}>
              <Checkbox checked={categoryFilter.includes(category.id)} />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Currency Filter */}
      <FormControl size="small" variant="outlined" sx={{ width: 300 }}>
        <InputLabel>Currencies</InputLabel>
        <Select
          multiple
          value={currencyFilter}
          onChange={(e) =>
            onFilterChange("currencyFilter", e.target.value as string[])
          }
          input={<OutlinedInput label="Currencies" />}
          renderValue={(selected) =>
            currencies
              .filter((cat) => selected.includes(cat.isoSymbol))
              .map((cat) => cat.isoSymbol)
              .join(", ")
          }
        >
          {currencies.map((currency: Currency) => (
            <MenuItem key={currency.isoSymbol} value={currency.isoSymbol}>
              <Checkbox checked={currencyFilter.includes(currency.isoSymbol)} />
              <ListItemText primary={currency.isoSymbol} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Date Filters */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={startDate}
          format="yyyy-MM-dd"
          onChange={(newValue) => onFilterChange("startDate", newValue)}
          slotProps={{ textField: { size: "small" } }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          format="yyyy-MM-dd"
          onChange={(newValue) => onFilterChange("endDate", newValue)}
          slotProps={{ textField: { size: "small" } }}
        />
      </LocalizationProvider>

      {/* Clear Filters */}
      <Button onClick={onClearFilters} variant="outlined" color="secondary">
        Clear
      </Button>
    </Box>
  );
};

export default ExpensesPageFilters;
