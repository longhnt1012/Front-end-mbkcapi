/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllShipperPayment } from 'redux/shipperPayment/shipperPaymentSlice';
// section
import { ShipperPaymentTableRow, ShipperPaymentTableRowSkeleton } from 'sections/shipperPayment';
// interface
import { ListParams, OptionSelect, OrderSort, ShipperPaymentTable } from 'common/@types';
import { FILTER_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from 'common/models';
//
import { CommonTableHead, CustomTableToolbar, EmptyTable, Page } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { fDate } from 'utils';

function ListShipperPaymentPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { shipperPaymentHeadCells } = useConfigHeadTable();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const [order, setOrder] = useState<OrderSort>('desc');
  const [orderBy, setOrderBy] = useState<keyof ShipperPaymentTable>('createDate');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [filterStatus, setFilterStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const { shipperPayments, isLoading, numberItems } = useAppSelector((state) => state.shipperPayment);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ShipperPaymentTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
        paymentMethod: paymentMethod === null ? '' : paymentMethod.value,
        status: filterStatus === null ? '' : filterStatus.value,
      },
      navigate,
    };
  }, [rowsPerPage, page, orderBy, order, searchDateFrom, searchDateTo, paymentMethod, filterStatus, navigate]);

  const dateTo = moment(dayjs(searchDateTo).toDate()).format('yyyy-MM-DD');
  const dateForm = moment(dayjs(searchDateFrom).toDate()).format('yyyy-MM-DD');

  useEffect(() => {
    if (searchDateTo === null || searchDateFrom === null) {
      dispatch<any>(getAllShipperPayment(params));
    } else if (searchDateFrom !== null && searchDateTo !== null) {
      if (moment(dateForm).isSameOrBefore(dateTo)) {
        setShowWarning(false);
        setSearchDateTo(searchDateTo);
        dispatch<any>(getAllShipperPayment(params));
      } else {
        setShowWarning(true);
        setSearchDateTo(null);
      }
    }
  }, [params, searchDateTo, searchDateFrom]);

  const handleReloadData = () => {
    dispatch<any>(getAllShipperPayment(params));
  };

  const handleChangePaymentMethod = (newPaymentMethod: OptionSelect | null) => {
    setPaymentMethod(newPaymentMethod);
  };

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setSearchDateFrom(date as Date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setSearchDateTo(date as Date);
  };

  const handleChangeFilterStatus = (newStatus: OptionSelect | null) => {
    setFilterStatus(newStatus);
  };

  return (
    <>
      <Page
        containerWidth="xl"
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        title={translate('page.title.list', { model: translate('model.lowercase.shipperPayments') })}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar
                showWarning={showWarning}
                showSetting={false}
                selected={selected}
                setSelected={setSelected}
                searchDateFrom={searchDateFrom}
                searchDateTo={searchDateTo}
                headCells={shipperPaymentHeadCells}
                handleReloadData={handleReloadData}
                haveSelectSearchDateFrom
                haveSelectSearchDateTo
                haveFilterName={false}
                options={PAYMENT_METHOD_OPTIONS}
                secondOptions={FILTER_STATUS_OPTIONS}
                haveSelectFilterStatus
                haveSelectExchangeType
                handleChangeFilterStatus={handleChangeFilterStatus}
                handleChangePaymentMethod={handleChangePaymentMethod}
                handleChangeSearchDateFrom={handleChangeSearchDateFrom}
                handleChangeSearchDateTo={handleChangeSearchDateTo}
                model={translate('model.lowercase.shipperPayments')}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<ShipperPaymentTable>
                    headCells={shipperPaymentHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  {isLoading ? (
                    <ShipperPaymentTableRowSkeleton />
                  ) : (
                    <TableBody>
                      {shipperPayments.map((shipperPayment, index) => {
                        return <ShipperPaymentTableRow key={index} index={index} shipperPayment={shipperPayment} />;
                      })}
                      {emptyRows > 0 ||
                        (shipperPayments.length === 0 && (
                          <EmptyTable
                            colNumber={shipperPaymentHeadCells.length + 2}
                            model={translate('model.lowercase.shipperPayments')}
                          />
                        ))}
                    </TableBody>
                  )}
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

export default ListShipperPaymentPage;
