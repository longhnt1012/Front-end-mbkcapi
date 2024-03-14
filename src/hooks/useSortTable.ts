import { OrderSort } from 'common/@types';
import { useState } from 'react';

function useSortTable<T>() {
  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>();

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return { order, setOrder, orderBy, setOrderBy, handleRequestSort };
}

export default useSortTable;
