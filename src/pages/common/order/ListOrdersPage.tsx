/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllOrders } from 'redux/order/orderSlice';
// section
import { OrderTableRow, OrderTableRowSkeleton } from 'sections/order';
// interface
import { ListParams, OptionSelect, OrderSort, OrderTable } from 'common/@types';
import { Role } from 'common/enums';
import { PARTNER_ORDER_STATUS, SYSTEM_STATUS_OPTIONS } from 'common/models';
//
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { fDate } from 'utils';

function ListOrdersPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { orderHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { orders, isLoading, numberItems } = useAppSelector((state) => state.order);

  const [order, setOrder] = useState<OrderSort>('desc');
  const [orderBy, setOrderBy] = useState<keyof OrderTable>('orderPartnerId');
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [systemStatus, setSystemStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [partnerOrderStatus, setPartnerOrderStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !orders.length && !!filterName;

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
        systemStatus: systemStatus?.value,
        partnerOrderStatus: partnerOrderStatus?.value,
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
      },
      navigate,
    };
  }, [
    page,
    rowsPerPage,
    debounceValue,
    orderBy,
    order,
    systemStatus?.value,
    partnerOrderStatus?.value,
    searchDateFrom,
    searchDateTo,
  ]);

  const dateTo = moment(dayjs(searchDateTo).toDate()).format('yyyy-MM-DD');
  const dateForm = moment(dayjs(searchDateFrom).toDate()).format('yyyy-MM-DD');

  useEffect(() => {
    if (searchDateTo === null || searchDateFrom === null) {
      dispatch(getAllOrders(params));
    } else if (searchDateFrom !== null && searchDateTo !== null) {
      if (moment(dateForm).isSameOrBefore(dateTo)) {
        setShowWarning(false);
        setSearchDateTo(searchDateTo);
        dispatch(getAllOrders(params));
      } else {
        setShowWarning(true);
        setSearchDateTo(null);
      }
    }
  }, [params, searchDateTo, searchDateFrom]);

  const handleReloadData = () => {
    dispatch<any>(getAllOrders(params));
  };

  const handleChangeSystemStatus = (status: OptionSelect | null) => {
    setSystemStatus(status);
  };

  const handleChangePartnerOrderStatus = (status: OptionSelect | null) => {
    setPartnerOrderStatus(status);
  };

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setSearchDateFrom(date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setSearchDateTo(date);
  };

  return (
    <>
      <Page
        containerWidth="xl"
        title={translate('page.title.list', { model: translate('model.lowercase.orders') })}
        pathname={pathname}
        navigateDashboard={
          userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER ? PATH_KITCHEN_CENTER_APP.root : PATH_CASHIER_APP.root
        }
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<OrderTable>
                showWarning={showWarning}
                selected={selected}
                headCells={orderHeadCells}
                filterName={filterName}
                options={SYSTEM_STATUS_OPTIONS}
                secondOptions={PARTNER_ORDER_STATUS}
                searchDateFrom={searchDateFrom}
                searchDateTo={searchDateTo}
                model={translate('table.lowercase.partnerOrderId')}
                setSelected={setSelected}
                onFilterName={handleFilterByName}
                handleChangeSearchDateFrom={handleChangeSearchDateFrom}
                handleChangeSearchDateTo={handleChangeSearchDateTo}
                handleReloadData={handleReloadData}
                haveSelectSystemStatus
                haveSelectPartnerOrderStatus
                haveSelectSearchDateFrom
                haveSelectSearchDateTo
                handleChangeSystemStatus={handleChangeSystemStatus}
                handleChangePartnerOrderStatus={handleChangePartnerOrderStatus}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<OrderTable>
                    showAction
                    headCells={orderHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoading ? (
                    <OrderTableRowSkeleton length={orders.length} />
                  ) : (
                    <TableBody>
                      {orders?.map((order, index) => {
                        return <OrderTableRow key={order.id} index={index} order={order} selected={selected} />;
                      })}
                      {emptyRows > 0 ||
                        (orders.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={orderHeadCells.length + 2}
                            model={translate('model.lowercase.orders')}
                          />
                        ))}
                    </TableBody>
                  )}

                  {isNotFound && <SearchNotFound colNumber={orderHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                page={page}
                count={numberItems}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
              />
            </Paper>
          </Box>
        </Card>
      </Page>
    </>
  );
}

export default ListOrdersPage;
