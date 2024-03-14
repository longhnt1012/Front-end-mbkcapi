/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { getAllCategories, setAddCategory, setCategoryType } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import { CategoryTableRow, CategoryTableRowSkeleton } from 'sections/category';
//
import { CategoryTable, ListParams, OrderSort, OrderSortBy } from 'common/@types';
import { CategoryType } from 'common/models';
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

function ListCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { categoryHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { categories, numberItems, isLoading } = useAppSelector((state) => state.category);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof CategoryTable>(OrderSortBy.DISPLAY_ORDER);
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CategoryTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const isNotFound = !categories.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: CategoryType.NORMAL,
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order]);

  useEffect(() => {
    dispatch<any>(getAllCategories(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllCategories(params));
  };

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.normalCategory') })}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_BRAND_APP.category.newCategory);
              dispatch(setCategoryType(CategoryType.NORMAL));
              dispatch(setRoutesToBack(pathname));
              dispatch(setAddCategory());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.normalCategory') })}
          </Button>,
        ]}
      >
        <Card>
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
                    <CategoryTableRowSkeleton length={categories.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {categories.map((category, index) => {
                        return (
                          <CategoryTableRow
                            key={category.categoryId}
                            index={index}
                            category={category}
                            categoryType={CategoryType.NORMAL}
                            length={categories.length}
                            setPage={setPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={selected}
                            filterName={filterName}
                            sortBy={`${orderBy}_${order}`}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (categories.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={categoryHeadCells.length + 2}
                            model={translate('model.lowercase.category')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && <SearchNotFound colNumber={categoryHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={translate('table.rowsPerPage')}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Page>
    </>
  );
}

export default ListCategoryPage;
