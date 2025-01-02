import { useState, useEffect } from "react";

// Generic debounce hook that works with any data type
const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // Cleanup timeout
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;