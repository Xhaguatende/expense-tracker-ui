import { useState } from "react";

export type Filters = {
  titleFilter: string;
  categoryFilter: string[];
  currencyFilter: string[];
  startDate: Date | null;
  endDate: Date | null;
};

type FilterValue = string | string[] | Date | null;

const useFilters = () => {
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [currencyFilter, setcurrencyFilter] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleFilterChange = (
    filterName: keyof Filters,
    value: FilterValue
  ) => {
    switch (filterName) {
      case "titleFilter":
        setTitleFilter(value as string);
        break;
      case "categoryFilter":
        setCategoryFilter(value as string[]);
        break;
      case "currencyFilter":
        setcurrencyFilter(value as string[]);
        break;
      case "startDate":
        setStartDate(value as Date | null);
        break;
      case "endDate":
        setEndDate(value as Date | null);
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setTitleFilter("");
    setCategoryFilter([]);
    setcurrencyFilter([]);
    setStartDate(null);
    setEndDate(null);
  };

  return {
    titleFilter,
    categoryFilter,
    currencyFilter,
    startDate,
    endDate,
    handleFilterChange,
    handleClearFilters,
  };
};

export default useFilters;
