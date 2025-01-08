import { useState } from "react";

const usePagination = (numRowsPerPage: number = 5) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(numRowsPerPage);

  return {
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
  };
};

export default usePagination;
