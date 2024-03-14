/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// @mui icon
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getDashboardKitchenCenter } from 'redux/dashboard/dashboardSlice';
// interface
import { Color, Gender } from 'common/enums';
// section
import { AppAmountInWallet, AppWidgetSummaryOutline, ListNewStores } from 'sections/dashboard';
//
import { EmptyTable, Helmet } from 'components';
import { useLocales, useResponsive } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { CashierTableRowDashboardSkeleton } from 'sections/cashier';
import { fDate } from 'utils';

function KitchenCenterDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mdLg = useResponsive('up', 'lg', 'lg');
  const mdMd = useResponsive('up', 'md', 'md');
  const mdSm = useResponsive('up', 'sm', 'sm');

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { kitchenCenterDashboard, isLoading: isLoadingDashboard } = useAppSelector((state) => state.dashboard);

  const columnDate = [...(kitchenCenterDashboard ? kitchenCenterDashboard?.columnChartMoneyExchanges : [])].map(
    (column) => column.date
  );

  useEffect(() => {
    dispatch<any>(getDashboardKitchenCenter(navigate));
  }, []);

  return (
    <>
      <Helmet title={translate('page.title.kitchenCenterManagement')} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              isPrice
              title={translate('page.dashboard.totalAmountInWallet')}
              total={kitchenCenterDashboard?.totalBalancesDaily as number}
              isLoading={isLoadingDashboard}
              icon={<ListAltIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.stores') })}
              color={Color.SECONDARY}
              total={kitchenCenterDashboard?.totalStores as number}
              isLoading={isLoadingDashboard}
              icon={<RestaurantMenuIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.cashiers') })}
              color={Color.SUCCESS}
              total={kitchenCenterDashboard?.totalCashiers as number}
              isLoading={isLoadingDashboard}
              icon={<AssignmentIndIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} sm={12} md={12}>
            <AppAmountInWallet
              title={translate('page.dashboard.kitchenCenterChartTitle')}
              subheader={`${moment(columnDate[columnDate.length - 1]).format('DD/MM/YYYY')} - ${moment(
                columnDate[0]
              ).format('DD/MM/YYYY')}`}
              chartLabels={[...(kitchenCenterDashboard ? kitchenCenterDashboard?.columnChartMoneyExchanges : [])].map(
                (column) => {
                  const date = column.date.split('+');
                  return `${date[0]}.000Z`;
                }
              )}
              chartData={[
                {
                  name: 'Amount',
                  type: 'area',
                  fill: 'gradient',
                  data: [...(kitchenCenterDashboard ? kitchenCenterDashboard?.columnChartMoneyExchanges : [])].map(
                    (column) => column.amount
                  ),
                },
              ]}
            />
          </Grid>
        </Grid>

        <Stack gap={5} mt={5}>
          <ListNewStores
            pathname={pathname}
            listStores={kitchenCenterDashboard ? kitchenCenterDashboard?.stores : []}
          />

          <Card>
            <CardHeader title={translate('model.capitalizeOne.cashiers')} />
            <Box p={2}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('table.no')}</TableCell>
                      <TableCell>Logo</TableCell>
                      <TableCell>{translate('table.fullName')}</TableCell>
                      <TableCell>{translate('table.email')}</TableCell>
                      <TableCell>{translate('model.capitalizeOne.dateOfBirth')}</TableCell>
                      <TableCell>{translate('table.gender')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoadingDashboard ? (
                      <CashierTableRowDashboardSkeleton />
                    ) : (
                      <>
                        {kitchenCenterDashboard?.cashiers.map((cashier, index) => (
                          <TableRow
                            key={index}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate(PATH_KITCHEN_CENTER_APP.cashier.root + `/${cashier.accountId}`)}
                          >
                            <TableCell width={60} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell width={80}>
                              <Avatar src={cashier.avatar} alt="logo" />
                            </TableCell>
                            <TableCell width={mdMd ? 250 : mdSm ? 200 : 250}>{cashier.fullName}</TableCell>
                            <TableCell width={mdLg ? 350 : mdMd ? 300 : mdSm ? 220 : 350}>{cashier.email}</TableCell>
                            <TableCell width={mdLg ? 300 : mdMd ? 240 : mdSm ? 220 : 300}>
                              {fDate(cashier.dateOfBirth)}
                            </TableCell>
                            <TableCell align="left">
                              {cashier.gender.toLowerCase() === Gender.MALE
                                ? translate('gender.male')
                                : translate('gender.female')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    {kitchenCenterDashboard?.cashiers?.length === 0 && (
                      <EmptyTable colNumber={6} model={translate('model.lowercase.cashier')} />
                    )}
                  </TableBody>
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
                    to={PATH_KITCHEN_CENTER_APP.cashier.list}
                  >
                    {translate('page.content.viewAll')}
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Link>
                </Stack>
              </TableContainer>
            </Box>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

export default KitchenCenterDashboard;
