/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//@mui Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllKitchenCenters, setAddKitchenCenter } from 'redux/kitchenCenter/kitchenCenterSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { setStatus } from 'redux/auth/authSlice';
// section
import { KitchenCenterTableRow, KitchenCenterTableRowSkeleton } from 'sections/kitchenCenter';
//
import { KitchenCenterTable, ListParams, OrderSort, OrderSortBy } from 'common/@types';
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

function ListKitchenCenterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { kitchenCenterHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { kitchenCenters, isLoading, numberItems } = useAppSelector((state) => state.kitchenCenter);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof KitchenCenterTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof KitchenCenterTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !kitchenCenters.length && !!filterName;

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
    dispatch(getAllKitchenCenters(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllKitchenCenters(params));
  };

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.kitchenCenters') })}
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_ADMIN_APP.kitchenCenter.newKitchenCenter);
              dispatch(setStatus());
              dispatch(setRoutesToBack(pathname));
              dispatch(setAddKitchenCenter());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.kitchenCenter') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<KitchenCenterTable>
                model={translate('model.lowercase.kitchenCenter')}
                selected={selected}
                setSelected={setSelected}
                headCells={kitchenCenterHeadCells}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<KitchenCenterTable>
                    showAction
                    order={order}
                    orderBy={orderBy}
                    headCells={kitchenCenterHeadCells}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <KitchenCenterTableRowSkeleton length={kitchenCenters.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {kitchenCenters.map((kitchenCenter, index) => {
                        return (
                          <KitchenCenterTableRow
                            key={kitchenCenter.kitchenCenterId}
                            index={index}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setPage={setPage}
                            kitchenCenter={kitchenCenter}
                            selected={selected}
                            filterName={filterName}
                            sortBy={`${orderBy}_${order}`}
                            length={kitchenCenters.length}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (kitchenCenters.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={kitchenCenterHeadCells.length + 2}
                            model={translate('model.lowercase.kitchenCenter')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && (
                    <SearchNotFound colNumber={kitchenCenterHeadCells.length + 2} searchQuery={filterName} />
                  )}
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

export default ListKitchenCenterPage;
