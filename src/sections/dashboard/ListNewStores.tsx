/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
// @mui icon
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// redux
import { useAppSelector } from 'redux/configStore';
// section
import { StoreTableRowDashboardSkeleton } from 'sections/store';
// interface
import { Store } from 'common/models';
//
import { EmptyTable } from 'components';
import { useLocales, useResponsive } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { Role } from 'common/enums';

interface ListNewStoresProps {
  pathname: string;
  listStores: Store[];
}

function ListNewStores({ pathname, listStores }: ListNewStoresProps) {
  const navigate = useNavigate();

  const mdLg = useResponsive('up', 'lg', 'lg');
  const mdMd = useResponsive('up', 'md', 'md');
  const mdSm = useResponsive('up', 'sm', 'sm');

  const { translate } = useLocales();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { isLoading: isLoadingStore } = useAppSelector((state) => state.store);
  const { isLoading: isLoadingDashboard } = useAppSelector((state) => state.dashboard);

  return (
    <Card>
      <CardHeader title={translate('page.dashboard.storeIsActive')} />
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{translate('table.no')}</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>{translate('table.name')}</TableCell>
                <TableCell>{translate('table.manageEmail')}</TableCell>
                {pathname !== PATH_KITCHEN_CENTER_APP.root && <TableCell>{translate('table.kitchenCenter')}</TableCell>}
                {pathname !== PATH_BRAND_APP.root && <TableCell>{translate('table.brand')}</TableCell>}
              </TableRow>
            </TableHead>

            {isLoadingDashboard || isLoadingStore ? (
              <StoreTableRowDashboardSkeleton />
            ) : (
              <TableBody>
                {listStores?.map((store, index) => (
                  <TableRow
                    key={index}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(PATH_ADMIN_APP.store.root + `/${store.storeId}`)}
                  >
                    <TableCell width={60} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell width={80} align="left">
                      <Avatar src={store.logo} alt="logo" />
                    </TableCell>

                    <TableCell
                      align="left"
                      width={
                        pathname === PATH_ADMIN_APP.root
                          ? mdLg
                            ? 300
                            : mdMd
                            ? 280
                            : mdSm
                            ? 150
                            : 300
                          : mdLg
                          ? 400
                          : mdMd
                          ? 280
                          : mdSm
                          ? 200
                          : 400
                      }
                    >
                      {store?.name}
                    </TableCell>
                    <TableCell align="left">{store?.storeManagerEmail}</TableCell>
                    {pathname !== PATH_KITCHEN_CENTER_APP.root && (
                      <TableCell align="left">{store.kitchenCenter?.name}</TableCell>
                    )}
                    {pathname !== PATH_BRAND_APP.root && <TableCell align="left">{store.brand?.name}</TableCell>}
                  </TableRow>
                ))}

                {(listStores?.length === 0 || listStores === undefined) && (
                  <EmptyTable colNumber={6} model={translate('model.lowercase.store')} />
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
              to={
                userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                  ? PATH_KITCHEN_CENTER_APP.store.list
                  : userAuth?.roleName === Role.BRAND_MANAGER
                  ? PATH_BRAND_APP.store.list
                  : PATH_ADMIN_APP.store.list
              }
            >
              {translate('page.content.viewAll')}
              <KeyboardArrowRightIcon fontSize="small" />
            </Link>
          </Stack>
        </TableContainer>
      </Box>
    </Card>
  );
}

export default ListNewStores;
