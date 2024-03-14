/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import {
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// sections
import { AppWidgetSummaryOutline } from 'sections/dashboard';
import { MoneyExchangeTableRow, MoneyExchangeTableRowSkeleton } from 'sections/moneyExchanges';
import { OrderTableRow, OrderTableRowSkeleton } from 'sections/order';
import { ShipperPaymentTableRow, ShipperPaymentTableRowSkeleton } from 'sections/shipperPayment';
// interface
import { ListParams, MoneyExchangeTable, OrderTable, ShipperPaymentTable } from 'common/@types';
import { Color, Language } from 'common/enums';
//
import { CommonTableHead, CustomTableHead, CustomTableToolbar, EmptyTable, Helmet } from 'components';
import { useConfigHeadTable, useLocales } from 'hooks';
import { getDashboardCashier } from 'redux/dashboard/dashboardSlice';
import { PATH_CASHIER_APP } from 'routes/paths';
import { fDate } from 'utils';

function CashierDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();
  const { orderHeadCells, shipperPaymentHeadCells, MoneyExchangeHeadCells } = useConfigHeadTable();

  const [selected, setSelected] = useState<readonly string[]>([]);
  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const { cashierDashboard, isLoading: isLoadingDashboard } = useAppSelector((state) => state.dashboard);

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setSearchDateFrom(date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setSearchDateTo(date);
  };

  const paramDashboard: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
      },
      navigate,
    };
  }, [searchDateFrom, searchDateTo]);

  const dateTo = moment(dayjs(searchDateTo).toDate()).format('yyyy-MM-DD');
  const dateForm = moment(dayjs(searchDateFrom).toDate()).format('yyyy-MM-DD');

  useEffect(() => {
    if (searchDateTo === null || searchDateFrom === null) {
      dispatch<any>(getDashboardCashier(paramDashboard));
    } else if (searchDateFrom !== null && searchDateTo !== null) {
      if (moment(dateForm).isSameOrBefore(dateTo)) {
        setShowWarning(false);
        setSearchDateTo(searchDateTo);
        dispatch<any>(getDashboardCashier(paramDashboard));
      } else {
        setShowWarning(true);
        setSearchDateTo(null);
      }
    }
  }, [paramDashboard, searchDateTo, searchDateFrom]);

  const handleReloadData = () => {
    dispatch<any>(getDashboardCashier(paramDashboard));
  };

  return (
    <>
      <Helmet title={translate('model.capitalizeOne.cashier')} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummaryOutline
              isPrice
              isLoading={isLoadingDashboard}
              icon={<PaidOutlinedIcon fontSize="large" />}
              total={cashierDashboard?.totalRevenuesDaily as number}
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.revenueOfToday') })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummaryOutline
              color={Color.INFO}
              isLoading={isLoadingDashboard}
              total={cashierDashboard?.totalOrdersDaily as number}
              icon={<DescriptionOutlinedIcon fontSize="large" />}
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.ordersOfToday') })}
            />
          </Grid>
        </Grid>

        <Stack gap={5} mt={5}>
          <Card>
            <CardHeader
              title={translate('page.title.list', { model: translate('model.lowercase.ordersSuccess') })}
              sx={{
                p: 2,
                px: 3,
                borderBottom: 1,
                borderColor: (theme) => theme.palette.grey[400],
              }}
            />

            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <CustomTableToolbar<OrderTable>
                  showWarning={showWarning}
                  selected={selected}
                  headCells={orderHeadCells}
                  model={translate('model.lowercase.store')}
                  setSelected={setSelected}
                  handleReloadData={handleReloadData}
                  handleChangeSearchDateFrom={handleChangeSearchDateFrom}
                  handleChangeSearchDateTo={handleChangeSearchDateTo}
                  haveSelectSearchDateFrom
                  haveSelectSearchDateTo
                />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CustomTableHead<OrderTable>
                      showAction
                      headCells={orderHeadCells}
                      selectedCol={selected}
                      onRequestSort={() => {}}
                    />
                    {isLoadingDashboard ? (
                      <OrderTableRowSkeleton length={5} />
                    ) : (
                      <TableBody>
                        {cashierDashboard?.orders?.map((order, index) => {
                          return <OrderTableRow key={order.id} index={index} order={order} selected={selected} />;
                        })}
                        {cashierDashboard?.orders.length === 0 && (
                          <EmptyTable
                            colNumber={orderHeadCells.length + 2}
                            model={translate('model.lowercase.orders')}
                          />
                        )}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <Stack alignItems="end" mt={2} pr={2}>
                  <Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                    to={PATH_CASHIER_APP.order.list}
                  >
                    {translate('page.content.viewAll')}
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Link>
                </Stack>
              </Paper>
            </Box>
          </Card>

          <Card>
            <Box sx={{ width: '100%' }} p={2}>
              <Paper sx={{ width: '100%' }}>
                <CardHeader
                  title={translate('page.title.new', {
                    model:
                      currentLang.value === Language.ENGLISH
                        ? translate('model.lowercase.shipperPayments')
                        : translate('model.capitalizeOne.shipperPayments'),
                  })}
                  sx={{ p: 0, pb: 2 }}
                />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CommonTableHead<ShipperPaymentTable>
                      headCells={shipperPaymentHeadCells}
                      onRequestSort={() => {}}
                    />
                    {isLoadingDashboard ? (
                      <ShipperPaymentTableRowSkeleton />
                    ) : (
                      <TableBody>
                        {cashierDashboard?.shipperPayments.map((shipperPayment, index) => {
                          return <ShipperPaymentTableRow key={index} index={index} shipperPayment={shipperPayment} />;
                        })}

                        {cashierDashboard?.shipperPayments.length === 0 && (
                          <EmptyTable
                            colNumber={shipperPaymentHeadCells.length + 2}
                            model={translate('model.lowercase.shipperPayments')}
                          />
                        )}
                      </TableBody>
                    )}
                  </Table>

                  <Stack alignItems="end" mt={2}>
                    <Link
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                      to={PATH_CASHIER_APP.wallet.shipperPayments}
                    >
                      {translate('page.content.viewAll')}
                      <KeyboardArrowRightIcon fontSize="small" />
                    </Link>
                  </Stack>
                </TableContainer>
              </Paper>
            </Box>
          </Card>

          <Card>
            <Box sx={{ width: '100%' }} p={2}>
              <Paper sx={{ width: '100%' }}>
                <CardHeader
                  title={translate('page.title.new', {
                    model:
                      currentLang.value === Language.ENGLISH
                        ? translate('model.lowercase.transactions')
                        : translate('model.capitalizeOne.transactions'),
                  })}
                  sx={{ p: 0, pb: 2 }}
                />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CommonTableHead<MoneyExchangeTable> headCells={MoneyExchangeHeadCells} onRequestSort={() => {}} />

                    {isLoadingDashboard ? (
                      <MoneyExchangeTableRowSkeleton />
                    ) : (
                      <TableBody>
                        {cashierDashboard?.moneyExchanges.map((moneyExchange, index) => {
                          return <MoneyExchangeTableRow key={index} index={index} moneyExchange={moneyExchange} />;
                        })}

                        {cashierDashboard?.moneyExchanges.length === 0 && (
                          <EmptyTable
                            colNumber={MoneyExchangeHeadCells.length + 2}
                            model={translate('model.lowercase.moneyExchanges')}
                          />
                        )}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>

                <Stack alignItems="end" mt={2}>
                  <Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                    to={PATH_CASHIER_APP.wallet.moneyExchanges}
                  >
                    {translate('page.content.viewAll')}
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Link>
                </Stack>
              </Paper>
            </Box>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

export default CashierDashboard;
