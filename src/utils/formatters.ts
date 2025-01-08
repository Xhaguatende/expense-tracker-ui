/**
 * Format date to 'YYYY-MM-DD'
 * @param date - Date to format
 * @returns Formatted date
 */
export const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Format currency with symbol and 2 decimal places
 * @param value - Value to format
 * @param currency - The currency
 * @returns Formatted currency
 */
export const formatCurrency = (value: number, currency: string): string => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).format(value);
};

/**
 * Trim string to a maximum length
 * @param input - Input string
 * @param maxLength - Maximum length
 * @returns Trimmed string
 */
export const trimString = (input: string, maxLength: number): string => {
  return input.length > maxLength
    ? `${input.substring(0, maxLength)}...`
    : input;
};
