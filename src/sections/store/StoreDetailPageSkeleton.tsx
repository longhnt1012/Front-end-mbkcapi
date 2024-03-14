// @mui
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import { StorePartnerDetailTable } from 'common/@types';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { Role } from 'common/enums';
import { CommonTableHead } from 'components';
import { useConfigHeadTable, useLocales, usePagination, useResponsive } from 'hooks';

function StoreDetailPageSkeleton({ rejectedReason = '' }: { rejectedReason: string | null | undefined }) {
  const mdUp = useResponsive('up', 'lg', 'lg');

  const { translate } = useLocales();

  const { storePartnerDetailHeadCells } = useConfigHeadTable();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <Grid container columnSpacing={5} rowSpacing={5}>
        <Grid item xs={12} sm={4} md={4}>
          <Stack width="100%" alignItems="center" justifyContent="center">
            <Skeleton
              variant="rounded"
              width={!mdUp ? 241 : 358}
              height={!mdUp ? 241 : 358}
              sx={{ borderRadius: '16px' }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Stack gap={2}>
            <Skeleton variant="rounded" width={300} height={38} />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={80} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Stack>

            <Divider />

            {rejectedReason !== null && rejectedReason !== undefined && (
              <>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Skeleton width={80} />
                  <Skeleton variant="rounded" width={100} height={24} />
                </Stack>

                <Divider />
              </>
            )}

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={80} />
              <Skeleton width={200} />
            </Stack>

            {(userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER) && (
              <>
                <Divider />

                <Stack direction="row" alignItems="start" gap={2}>
                  <Skeleton width={!mdUp ? 150 : 120} />
                  <Stack direction="row" alignItems="start" gap={1}>
                    <Skeleton variant="rectangular" width={120} height={120} />
                    <Stack gap={0.5}>
                      <Skeleton width={!mdUp ? 290 : 480} />
                      <Skeleton width={!mdUp ? 290 : 480} />
                      {!mdUp && <Skeleton width={290} />}
                    </Stack>
                  </Stack>
                </Stack>
              </>
            )}

            {(userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER) && (
              <>
                <Divider />
                {/* Role = 'MBKC Admin' */}
                <Stack direction="row" alignItems="start" gap={2}>
                  <Skeleton width={!mdUp ? 150 : 120} />
                  <Stack direction="row" alignItems="start" gap={1}>
                    <Skeleton variant="rectangular" width={120} height={120} />
                    <Stack gap={0.5}>
                      <Skeleton width={!mdUp ? 290 : 480} />
                    </Stack>
                  </Stack>
                </Stack>
              </>
            )}

            {(userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER) && (
              <>
                <Divider />
                {/* Role = 'MBKC Admin' */}
                <Stack direction="row" alignItems="start" gap={2}>
                  <Skeleton width={!mdUp ? 150 : 120} />
                  <Stack direction="row" alignItems="start" gap={2}>
                    <Stack
                      direction="row"
                      gap={1}
                      sx={(theme) => ({
                        p: 1.2,
                        borderRadius: 1,
                        backgroundColor: theme.palette.grey[200],
                      })}
                    >
                      <Skeleton variant="rounded" width={45} height={45} />
                      <Stack>
                        <Skeleton width={100} />
                      </Stack>
                    </Stack>
                    <Stack
                      direction="row"
                      gap={1}
                      sx={(theme) => ({
                        p: 1.2,
                        borderRadius: 1,
                        backgroundColor: theme.palette.grey[200],
                      })}
                    >
                      <Skeleton variant="rounded" width={45} height={45} />
                      <Stack>
                        <Skeleton width={100} />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>

      {userAuth?.roleName === Role.BRAND_MANAGER && (
        <Card sx={{ mt: 7 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} py={2}>
            <Skeleton variant="rounded" width={156} height={28} />

            <Skeleton variant="rounded" width={124} height={36} />
          </Stack>

          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<StorePartnerDetailTable>
                    showAction
                    headCells={storePartnerDetailHeadCells}
                    onRequestSort={() => {}}
                  />

                  <TableBody>
                    {Array.from({ length: 2 }).map((_, index: any) => (
                      <TableRow key={index} hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
                        <TableCell width={80} align="center">
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Skeleton width={20} />
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row" width={100}>
                          <Skeleton variant="circular" width={40} height={40} />
                        </TableCell>

                        <TableCell align="left" width={150}>
                          <Skeleton />
                        </TableCell>

                        <TableCell align="left" width={165}>
                          <Skeleton />
                        </TableCell>

                        <TableCell align="left" width={354}>
                          <Stack direction="row" alignItems="center" gap={3}>
                            <IconButton color="inherit">
                              <Skeleton variant="circular" width={28} height={28} />
                            </IconButton>

                            <Stack>
                              <Skeleton width={200} />
                            </Stack>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          <Skeleton variant="rounded" width={100} height={24} />
                        </TableCell>

                        <TableCell align="right">
                          <Stack direction="row" alignItems="center" justifyContent="right">
                            <Skeleton variant="rounded" width={30} height={14} />
                            <IconButton color="inherit">
                              <Skeleton variant="circular" width={28} height={28} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={5}
                page={page}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      )}

      <Stack direction="row" justifyContent="right" mt={10}>
        <Skeleton variant="rounded" width={79} height={36} />
      </Stack>
    </>
  );
}

export default StoreDetailPageSkeleton;
