import { StorageKeys } from 'constants/storageKeys';
import { useState } from 'react';
import { getNumberInStorage, setLocalStorage } from 'utils';

function usePagination() {
  const currentPage = getNumberInStorage(StorageKeys.PAGE);
  const itemPerPage = getNumberInStorage(StorageKeys.ROW_PER_PAGE);

  const [page, setPage] = useState<number>(currentPage ? currentPage : 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(itemPerPage ? itemPerPage : 5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLocalStorage(StorageKeys.PAGE, newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setLocalStorage(StorageKeys.ROW_PER_PAGE, parseInt(event.target.value, 10));
    setLocalStorage(StorageKeys.PAGE, 0);
  };

  return { page, setPage, rowsPerPage, setRowsPerPage, handleChangePage, handleChangeRowsPerPage };
}

export default usePagination;
