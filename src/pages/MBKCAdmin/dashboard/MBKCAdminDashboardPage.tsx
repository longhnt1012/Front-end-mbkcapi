/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StoreIcon from '@mui/icons-material/Store';
// redux
import { useAppSelector } from 'redux/configStore';
// section
import { BrandTableRowDashboardSkeleton } from 'sections/brand';
import { AppWidgetSummaryOutline, ListNewStores } from 'sections/dashboard';
import { KitchenCenterTableRowDashboardSkeleton } from 'sections/kitchenCenter';
// interface
import { Color, Language, Status } from 'common/enums';
//
import { EmptyTable, Helmet, Label } from 'components';
import { useLocales, useResponsive } from 'hooks';
import { getDashboardAdmin } from 'redux/dashboard/dashboardSlice';
import { PATH_ADMIN_APP } from 'routes/paths';

// ----------------------------------------------------------------------

function MBKCAdminDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mdLg = useResponsive('up', 'lg', 'lg');
  const mdMd = useResponsive('up', 'md', 'md');
  const mdSm = useResponsive('up', 'sm', 'sm');

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();

  const { adminDashboard, isLoading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch<any>(getDashboardAdmin(navigate));
  }, []);

  return (
    <>
      <Helmet title={translate('role.mbkcAdmin')} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              total={adminDashboard?.totalKitchenCenters as number}
              isLoading={isLoading}
              icon={<BusinessIcon fontSize="large" />}
              title={translate('page.content.total', {
                model: translate('model.lowercase.kitchenCenters'),
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              color={Color.SECONDARY}
              total={adminDashboard?.totalBrands as number}
              isLoading={isLoading}
              icon={<BrandingWatermarkOutlinedIcon fontSize="large" />}
              title={translate('page.content.total', {
                model: translate('model.lowercase.brands'),
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              color={Color.WARNING}
              total={adminDashboard?.totalStores as number}
              isLoading={isLoading}
              icon={<StoreIcon fontSize="large" />}
              title={translate('page.content.total', {
                model: translate('model.lowercase.stores'),
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              color={Color.SUCCESS}
              total={adminDashboard?.totalPartners as number}
              isLoading={isLoading}
              icon={<StoreIcon fontSize="large" />}
              title={translate('page.content.total', {
                model: translate('model.lowercase.partners'),
              })}
            />
          </Grid>
        </Grid>

        <Stack gap={5} mt={5}>
          <Card>
            <CardHeader
              title={
                currentLang.value === Language.ENGLISH
                  ? translate('page.title.new', { model: translate('model.lowercase.kitchenCenters') })
                  : translate('page.title.new', { model: translate('model.capitalizeOne.kitchenCenters') })
              }
            />
            <Box p={2}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('table.no')}</TableCell>
                      <TableCell>Logo</TableCell>
                      <TableCell>{translate('table.name')}</TableCell>
                      <TableCell>{translate('table.address')}</TableCell>
                      <TableCell>{translate('table.status')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      <KitchenCenterTableRowDashboardSkeleton />
                    ) : (
                      <>
                        {adminDashboard?.kitchenCenters.map((kitchenCenter, index) => (
                          <TableRow
                            key={index}
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                              navigate(PATH_ADMIN_APP.kitchenCenter.root + `/${kitchenCenter.kitchenCenterId}`)
                            }
                          >
                            <TableCell width={60} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell width={80} align="left">
                              <Avatar src={kitchenCenter.logo} alt="logo" />
                            </TableCell>

                            <TableCell align="left" width={mdLg ? 300 : mdMd ? 260 : mdSm ? 220 : 300}>
                              {kitchenCenter.name}
                            </TableCell>

                            <TableCell width={mdLg ? 600 : mdMd ? 550 : mdSm ? 300 : 600}>
                              {kitchenCenter?.address
                                .split(', ')
                                .slice(0, kitchenCenter?.address.split(', ').length - 3)
                                .join(', ')}
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                color={
                                  kitchenCenter?.status === Status.ACTIVE
                                    ? Color.SUCCESS
                                    : kitchenCenter?.status === Status.INACTIVE
                                    ? Color.WARNING
                                    : Color.ERROR
                                }
                              >
                                {kitchenCenter?.status === Status.INACTIVE
                                  ? translate('status.inactive')
                                  : kitchenCenter?.status === Status.ACTIVE
                                  ? translate('status.active')
                                  : translate('status.deActive')}
                              </Label>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    {adminDashboard?.kitchenCenters.length === 0 && (
                      <EmptyTable colNumber={6} model={translate('model.lowercase.kitchenCenter')} />
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
                    to={PATH_ADMIN_APP.kitchenCenter.list}
                  >
                    {translate('page.content.viewAll')}
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Link>
                </Stack>
              </TableContainer>
            </Box>
          </Card>

          <Card>
            <CardHeader
              title={
                currentLang.value === Language.ENGLISH
                  ? translate('page.title.new', { model: translate('model.lowercase.brands') })
                  : translate('page.title.new', { model: translate('model.capitalizeOne.brands') })
              }
            />
            <Box p={2}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('table.no')}</TableCell>
                      <TableCell>Logo</TableCell>
                      <TableCell>{translate('table.name')}</TableCell>
                      <TableCell>{translate('table.address')}</TableCell>
                      <TableCell>{translate('table.status')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      <BrandTableRowDashboardSkeleton />
                    ) : (
                      <>
                        {adminDashboard?.brands.map((brand, index) => (
                          <TableRow
                            key={index}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate(PATH_ADMIN_APP.brand.root + `/${brand.brandId}`)}
                          >
                            <TableCell width={60} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell width={80}>
                              <Avatar src={brand.logo} alt="logo" />
                            </TableCell>
                            <TableCell width={mdLg ? 300 : mdMd ? 260 : mdSm ? 150 : 300}>{brand.name}</TableCell>
                            <TableCell width={mdLg ? 600 : mdMd ? 550 : mdSm ? 350 : 600}>
                              {brand.address
                                .split(', ')
                                .slice(0, brand?.address.split(', ').length - 3)
                                .join(', ')}
                            </TableCell>
                            <TableCell>
                              <Label
                                color={
                                  brand?.status === Status.ACTIVE
                                    ? Color.SUCCESS
                                    : brand?.status === Status.INACTIVE
                                    ? Color.WARNING
                                    : Color.ERROR
                                }
                              >
                                {brand?.status === Status.INACTIVE
                                  ? translate('status.inactive')
                                  : brand?.status === Status.ACTIVE
                                  ? translate('status.active')
                                  : translate('status.deActive')}
                              </Label>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    {adminDashboard?.brands.length === 0 && (
                      <EmptyTable colNumber={6} model={translate('model.lowercase.brand')} />
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
                    to={PATH_ADMIN_APP.brand.list}
                  >
                    {translate('page.content.viewAll')}
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Link>
                </Stack>
              </TableContainer>
            </Box>
          </Card>

          <ListNewStores pathname={pathname} listStores={adminDashboard ? adminDashboard?.stores : []} />
        </Stack>
      </Container>
    </>
  );
}

export default MBKCAdminDashboardPage;
