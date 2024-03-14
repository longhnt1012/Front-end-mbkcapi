/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { getAllCashiers, setAddCashier } from 'redux/cashier/cashierSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { setStatus } from 'redux/auth/authSlice';
// section
import { CashierTableRow, CashierTableRowSkeleton } from 'sections/cashier';
//
import { CashierTable, ListParams, OrderSort, OrderSortBy } from 'common/@types';
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function ListCashierPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { cashierHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { cashiers, isLoading, numberItems } = useAppSelector((state) => state.cashier);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof CashierTable>(OrderSortBy.FULL_NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CashierTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !cashiers.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order]);

  useEffect(() => {
    dispatch(getAllCashiers(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllCashiers(params));
  };

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.cashiers') })}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_KITCHEN_CENTER_APP.cashier.newCashier);
              dispatch(setStatus());
              dispatch(setAddCashier());
              dispatch(setRoutesToBack(pathname));
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.cashier') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<CashierTable>
                model={translate('model.lowercase.cashier')}
                selected={selected}
                setSelected={setSelected}
                headCells={cashierHeadCells}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<CashierTable>
                    showAction
                    headCells={cashierHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <CashierTableRowSkeleton length={cashiers.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {cashiers.map((cashier, index) => {
                        return (
                          <CashierTableRow
                            key={cashier.accountId}
                            index={index}
                            cashier={cashier}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setPage={setPage}
                            selected={selected}
                            filterName={filterName}
                            sortBy={`${orderBy}_${order}`}
                            length={cashiers.length}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (cashiers.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={cashierHeadCells.length + 2}
                            model={translate('model.lowercase.cashier')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && <SearchNotFound colNumber={cashierHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
                page={page}
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

export default ListCashierPage;
