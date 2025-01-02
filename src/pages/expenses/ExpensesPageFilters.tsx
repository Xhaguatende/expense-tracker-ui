import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
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

interface ExpensesPageFiltersProps {
  titleFilter: string;
  categoryFilter: string[];
  startDate: Date | null;
  endDate: Date | null;
  categories: Category[];
  onTitleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryFilterChange: (event: SelectChangeEvent<string[]>) => void;
  onStartDateChange: (newValue: Date | null) => void;
  onEndDateChange: (newValue: Date | null) => void;
  onClearFilters: () => void;
}

const ExpensesPageFilters: React.FC<ExpensesPageFiltersProps> = ({
  titleFilter,
  categoryFilter,
  startDate,
  endDate,
  categories,
  onTitleFilterChange,
  onCategoryFilterChange,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
}) => {
  return (
    <Box mb={2} display="flex" gap={2}>
      <TextField
        label="Filter by Title"
        variant="outlined"
        size="small"
        value={titleFilter}
        onChange={onTitleFilterChange}
      />

      <FormControl size="small" variant="outlined" sx={{ width: 300 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={categoryFilter}
          onChange={onCategoryFilterChange}
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
              <Checkbox checked={categoryFilter.indexOf(category.id) > -1} />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={startDate}
          format="yyyy-MM-dd"
          onChange={onStartDateChange}
          slotProps={{ textField: { size: "small" } }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          format="yyyy-MM-dd"
          onChange={onEndDateChange}
          slotProps={{ textField: { size: "small" } }}
        />
      </LocalizationProvider>

      <Button onClick={onClearFilters} variant="outlined" color="secondary">
        Clear
      </Button>
    </Box>
  );
};

export default ExpensesPageFilters;
