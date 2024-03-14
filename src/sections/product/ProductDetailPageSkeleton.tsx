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
  Typography,
} from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { ProductTable } from 'common/@types';
import { ProductTypeEnum } from 'common/models';
import { CommonTableHead } from 'components';
import { useConfigHeadTable, useLocales, usePagination, useResponsive } from 'hooks';
import { TableHead } from '@mui/material';

function ProductDetailPageSkeleton({ lengthChildProducts }: { lengthChildProducts: number }) {
  const mdUp = useResponsive('up', 'lg', 'lg');

  const { translate } = useLocales();
  const { productHeadCells } = useConfigHeadTable();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { productType, isProduct } = useAppSelector((state) => state.product);

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
            <Stack gap={1} mb={2}>
              {isProduct && (
                <Box mb={1}>
                  <Skeleton variant="rounded" width={180} height={25} />
                </Box>
              )}
              <Skeleton variant="rounded" width={300} height={38} />
              <Box width="100%">
                <Skeleton />
              </Box>
            </Stack>
            <Stack gap={2} mt={2}>
              {!isProduct ? (
                <>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={85} />
                    <Skeleton width={240} />
                  </Stack>

                  <Divider />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={225} />
                    <Skeleton width={100} />
                  </Stack>

                  <Divider />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={80} />
                    <Skeleton variant="rounded" width={120} height={24} />
                  </Stack>

                  <Divider />
                </>
              ) : (
                <>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={80} />
                    <Skeleton variant="rounded" width={120} height={24} />
                  </Stack>

                  <Divider />
                </>
              )}

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Skeleton width={80} />
                <Skeleton variant="rounded" width={120} height={24} />
              </Stack>

              {!isProduct && (
                <>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={80} />
                    <Skeleton width={30} />
                  </Stack>

                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={80} />
                    <Skeleton width={80} />
                  </Stack>

                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={80} />
                    <Skeleton width={150} />
                  </Stack>

                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={80} />
                    <Skeleton width={100} />
                  </Stack>
                </>
              )}

              {isProduct && productType === ProductTypeEnum.PARENT && (
                <>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={100} />
                    <Skeleton width={150} />
                  </Stack>
                </>
              )}

              {!isProduct && (
                <>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={70} />
                    <Skeleton width={180} />
                  </Stack>

                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={100} />
                    <Skeleton width={200} />
                  </Stack>

                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Skeleton width={110} />
                    <Skeleton width={200} />
                  </Stack>
                </>
              )}

              {isProduct && (
                <>
                  {productType !== ProductTypeEnum.PARENT && (
                    <>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Skeleton width={80} />
                        <Skeleton width={30} />
                      </Stack>

                      <Divider />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Skeleton width={120} />
                        <Skeleton width={150} />
                      </Stack>

                      <Divider />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Skeleton width={120} />
                        <Skeleton width={150} />
                      </Stack>

                      <Divider />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Skeleton width={120} />
                        <Skeleton width={150} />
                      </Stack>

                      <Divider />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Skeleton width={120} />
                        <Skeleton width={150} />
                      </Stack>
                    </>
                  )}
                </>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {isProduct && (
        <>
          {productType === ProductTypeEnum.PARENT && (
            <Card sx={{ mt: 7 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} py={2}>
                <Typography variant="h6">
                  {translate('page.title.list', { model: translate('model.lowercase.childProduct') })}
                </Typography>
              </Stack>

              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer>
                    <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                      <CommonTableHead<ProductTable>
                        hideCategory
                        hideType
                        showAction
                        headCells={productHeadCells}
                        onRequestSort={() => {}}
                      />

                      <TableBody>
                        {Array.from({ length: lengthChildProducts }).map((_, index) => {
                          return (
                            <TableRow key={index} hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
                              <TableCell width={60} align="center">
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Skeleton width={20} />
                                </Stack>
                              </TableCell>
                              <TableCell component="th" padding="none" align="center" width={70}>
                                <Skeleton variant="circular" width={40} height={40} />
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none" width={160}>
                                <Skeleton />
                              </TableCell>
                              <TableCell align="left" width={150}>
                                <Skeleton />
                              </TableCell>
                              <TableCell align="left" width={130}>
                                <Skeleton />
                              </TableCell>
                              <TableCell align="left" width={110}>
                                <Skeleton />
                              </TableCell>
                              <TableCell align="left" width={120}>
                                <Skeleton />
                              </TableCell>
                              <TableCell align="left" width={110}>
                                <Skeleton />
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
                          );
                        })}
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
        </>
      )}

      {isProduct && (
        <Card sx={{ mt: 7 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} py={2}>
            <Typography variant="h6">{translate('page.content.linkProduct')}</Typography>
          </Stack>

          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('table.no')}</TableCell>
                      <TableCell>{translate('table.partner')}</TableCell>
                      <TableCell>{translate('table.codeMapping')}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Array.from({ length: 2 }).map((_, index) => {
                      return (
                        <TableRow key={index} hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
                          <TableCell width={60} align="center">
                            <Stack direction="row" alignItems="center" justifyContent="center">
                              <Skeleton width={20} />
                            </Stack>
                          </TableCell>

                          <TableCell width={200}>
                            <Skeleton />
                          </TableCell>

                          <TableCell>
                            <Skeleton />
                          </TableCell>

                          <TableCell width={500}>
                            <Skeleton />
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
    </>
  );
}

export default ProductDetailPageSkeleton;
