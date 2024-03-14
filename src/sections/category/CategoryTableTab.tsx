/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { getAllExtraCategoriesInCategory } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import { CategoryTableRow, CategoryTableRowSkeleton } from 'sections/category';
import AddExtraToCategory from './AddExtraToCategoryModal';
//
import { CategoryTable, ListParams, OrderSort, OrderSortBy } from 'common/@types';
import { CategoryType } from 'common/models';
import { CustomTableHead, CustomTableToolbar, EmptyTable, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination } from 'hooks';

interface CategoryTableTabProps {
  categoryId: number;
}

function CategoryTableTab({ categoryId }: CategoryTableTabProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { categoryHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { categoriesExtra, isLoading, numberItems } = useAppSelector((state) => state.category);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof CategoryTable>(OrderSortBy.NAME);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CategoryTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoriesExtra.length) : 0;

  const isNotFound = !categoriesExtra.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        idCategory: categoryId,
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, categoryId, orderBy, order]);

  useEffect(() => {
    dispatch<any>(getAllExtraCategoriesInCategory(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllExtraCategoriesInCategory(params));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CustomTableToolbar<CategoryTable>
          model={translate('model.lowercase.category')}
          selected={selected}
          setSelected={setSelected}
          headCells={categoryHeadCells}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleReloadData={handleReloadData}
          addAction
          onAction={handleOpen}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
            <CustomTableHead<CategoryTable>
              showAction
              headCells={categoryHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              selectedCol={selected}
            />
            {isLoading ? (
              <CategoryTableRowSkeleton length={categoriesExtra.length} selected={selected} />
            ) : (
              <TableBody>
                {categoriesExtra.map((category, index) => {
                  return (
                    <CategoryTableRow
                      key={category.categoryId}
                      index={index}
                      category={category}
                      categoryType={CategoryType.EXTRA}
                      selected={selected}
                      filterName={filterName}
                      sortBy={`${orderBy}_${order}`}
                    />
                  );
                })}
                {emptyRows > 0 ||
                  (categoriesExtra.length === 0 && !filterName && (
                    <EmptyTable colNumber={categoryHeadCells.length} model={translate('model.lowercase.category')} />
                  ))}
              </TableBody>
            )}
            {isNotFound && <SearchNotFound colNumber={categoryHeadCells.length} searchQuery={filterName} />}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={numberItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {isOpen && (
        <AddExtraToCategory
          isOpen={isOpen}
          handleOpen={handleOpen}
          filterName={filterName}
          sortBy={`${orderBy}_${order}`}
        />
      )}
    </Box>
  );
}

export default CategoryTableTab;
