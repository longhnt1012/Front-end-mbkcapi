/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { getAllStores, setAddStore } from 'redux/store/storeSlice';
import { setStatus } from 'redux/auth/authSlice';
// section
import { StoreTableRow, StoreTableRowSkeleton } from 'sections/store';
// interface
import { ListParams, OptionSelect, OrderSort, OrderSortBy, StoreTable } from 'common/@types';
import { Role } from 'common/enums';
import { STATUS_OPTIONS } from 'common/models';
//
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';

function ListStorePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { storeHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { brandProfile, kitchenCenterProfile } = useAppSelector((state) => state.profile);
  const { stores, numberItems, isLoading } = useAppSelector((state) => state.store);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StoreTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [storeStatus, setStoreStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StoreTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const handleChangeStatus = (newValue: OptionSelect | null) => {
    setStoreStatus(newValue);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !stores.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const paramsAdminRole: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        status: storeStatus !== null ? storeStatus.value : '',
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, storeStatus, orderBy, order]);

  const paramsBrandRole: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        status: storeStatus !== null ? storeStatus.value : '',
        sortBy: `${orderBy}_${order}`,
        idBrand: brandProfile?.brandId,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, storeStatus, orderBy, order]);

  const paramsKitchenCenterRole: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        status: storeStatus !== null ? storeStatus.value : '',
        sortBy: `${orderBy}_${order}`,
        idKitchenCenter: kitchenCenterProfile?.kitchenCenterId,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, storeStatus, orderBy, order]);

  useEffect(() => {
    if (userAuth?.roleName === Role.MBKC_ADMIN) {
      dispatch<any>(getAllStores(paramsAdminRole));
    } else if (userAuth?.roleName === Role.BRAND_MANAGER) {
      dispatch<any>(getAllStores(paramsBrandRole));
    } else if (userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER) {
      dispatch<any>(getAllStores(paramsKitchenCenterRole));
    }
  }, [paramsAdminRole, paramsBrandRole]);

  const handleReloadData = () => {
    if (userAuth?.roleName === Role.MBKC_ADMIN) {
      dispatch<any>(getAllStores(paramsAdminRole));
    } else if (userAuth?.roleName === Role.BRAND_MANAGER) {
      dispatch<any>(getAllStores(paramsBrandRole));
    } else {
      dispatch<any>(getAllStores(paramsKitchenCenterRole));
    }
  };

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.stores') })}
        navigateDashboard={userAuth?.roleName === Role.BRAND_MANAGER ? PATH_BRAND_APP.root : PATH_ADMIN_APP.root}
        actions={() => {
          const listAction: ReactNode[] =
            userAuth?.roleName === Role.BRAND_MANAGER
              ? [
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(PATH_BRAND_APP.store.newStore);
                      dispatch(setRoutesToBack(pathname));
                      dispatch(setAddStore());
                      dispatch(setStatus());
                    }}
                    startIcon={<AddRoundedIcon />}
                  >
                    {translate('button.register', { model: translate('model.lowercase.store') })}
                  </Button>,
                ]
              : [];
          return listAction;
        }}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<StoreTable>
                model={translate('model.lowercase.store')}
                selected={selected}
                setSelected={setSelected}
                headCells={
                  userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                    ? storeHeadCells.filter((col) => col.id !== OrderSortBy.KITCHEN_CENTER)
                    : userAuth?.roleName === Role.BRAND_MANAGER
                    ? storeHeadCells.filter((col) => col.id !== OrderSortBy.BRAND)
                    : storeHeadCells
                }
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
                haveSelectStatus
                options={STATUS_OPTIONS}
                status={storeStatus}
                handleChangeStatus={handleChangeStatus}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<StoreTable>
                    showAction={userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER}
                    headCells={
                      userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                        ? storeHeadCells.filter((col) => col.id !== OrderSortBy.KITCHEN_CENTER)
                        : userAuth?.roleName === Role.BRAND_MANAGER
                        ? storeHeadCells.filter((col) => col.id !== OrderSortBy.BRAND)
                        : storeHeadCells
                    }
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <StoreTableRowSkeleton
                      showAction={userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER}
                      length={stores.length}
                      selected={selected}
                    />
                  ) : (
                    <TableBody>
                      {stores.map((store, index) => {
                        return (
                          <StoreTableRow
                            key={store.storeId}
                            index={index}
                            store={store}
                            status={storeStatus}
                            setPage={setPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            length={stores.length}
                            selected={selected}
                            showAction={
                              userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER
                            }
                            filterName={filterName}
                            sortBy={`${orderBy}_${order}`}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (stores.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={storeHeadCells.length + 2}
                            model={translate('model.lowercase.store')}
                          />
                        ))}
                    </TableBody>
                  )}

                  {isNotFound && <SearchNotFound colNumber={storeHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                page={page}
                rowsPerPage={rowsPerPage}
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

export default ListStorePage;
