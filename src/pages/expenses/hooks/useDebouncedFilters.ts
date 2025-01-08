import { useState, useEffect } from "react";

type Filters = {
  titleFilter: string;
  categoryFilter: string[];
  currencyFilter: string[];
  startDate: Date | null;
  endDate: Date | null;
};

type DebouncedFilters = Filters & {
  debounceDelay?: number;
};

const useDebouncedFilters = ({
  titleFilter,
  categoryFilter,
  currencyFilter,
  startDate,
  endDate,
  debounceDelay = 500,
}: DebouncedFilters) => {
  const [debouncedTitleFilter, setDebouncedTitleFilter] = useState(titleFilter);
  const [debouncedCategoryFilter, setDebouncedCategoryFilter] =
    useState(categoryFilter);
  const [debouncedCurrencyFilter, setDebouncedCurrencyFilter] =
    useState(currencyFilter);
  const [debouncedStartDate, setDebouncedStartDate] = useState(startDate);
  const [debouncedEndDate, setDebouncedEndDate] = useState(endDate);

  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedTitleFilter(titleFilter),
      debounceDelay
    );
    return () => clearTimeout(handler);
  }, [titleFilter, debounceDelay]);

  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedCategoryFilter(categoryFilter),
      debounceDelay
    );
    return () => clearTimeout(handler);
  }, [categoryFilter, debounceDelay]);

  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedCurrencyFilter(currencyFilter),
      debounceDelay
    );
    return () => clearTimeout(handler);
  }, [currencyFilter, debounceDelay]);

  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedStartDate(startDate),
      debounceDelay
    );
    return () => clearTimeout(handler);
  }, [startDate, debounceDelay]);

  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedEndDate(endDate),
      debounceDelay
    );
    return () => clearTimeout(handler);
  }, [endDate, debounceDelay]);

  return {
    titleFilter: debouncedTitleFilter,
    categoryFilter: debouncedCategoryFilter,
    currencyFilter: debouncedCurrencyFilter,
    startDate: debouncedStartDate,
    endDate: debouncedEndDate,
  };
};

export default useDebouncedFilters;
