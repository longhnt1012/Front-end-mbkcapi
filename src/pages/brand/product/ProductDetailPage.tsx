/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import {
  deletePartnerProduct,
  getPartnerProductDetail,
  setEditPartnerProduct,
} from 'redux/partnerProduct/partnerProductSlice';
import { deleteProduct, getProductDetail, setEditProduct } from 'redux/product/productSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import { CreatePartnerProductModal } from 'sections/partnerProduct';
import { ProductDetailPageSkeleton, ProductTableRow } from 'sections/product';
// interface
import { OrderSort, OrderSortBy, ProductTable } from 'common/@types';
import { Color, Language, PopoverType, Role, Status } from 'common/enums';
import { PartnerProductStatusEnum, ProductTypeEnum } from 'common/models';
//
import { CommonTableHead, ConfirmDialog, ContentLabel, ContentSpace, EmptyTable, Page, Popover } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination, usePopover, useResponsive } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { fCurrencyVN, getComparator, stableSort } from 'utils';

function ProductDetailPage() {
  const { id: productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mdSm = useResponsive('up', 'md', 'md');
  const mdXs = useResponsive('up', 'xs', 'xs');

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();
  const { productHeadCells } = useConfigHeadTable();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { handleOpen: handleOpenDeletePartnerProduct, isOpen: isOpenDeletePartnerProduct } = useModal();
  const { handleOpen: handleOpenUpdatePartnerProduct, isOpen: isOpenUpdatePartnerProduct } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const {
    open: openPartnerProduct,
    handleOpenMenu: handleOpenMenuPartnerProduct,
    handleCloseMenu: handleCloseMenuPartnerProduct,
  } = usePopover();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const {
    page: pageExtra,
    setPage: setPageExtra,
    rowsPerPage: rowsPerPageExtra,
    handleChangePage: handleChangePageExtra,
    handleChangeRowsPerPage: handleChangeRowsPerPageExtra,
  } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isLoading: isLoadingPartnerProduct, partnerProduct } = useAppSelector((state) => state.partnerProduct);
  const { isLoading, isProduct, product } = useAppSelector((state) => state.product);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductTable>(OrderSortBy.NAME);
  const [orderExtra, setOrderExtra] = useState<OrderSort>('asc');
  const [orderByExtra, setOrderByExtra] = useState<keyof ProductTable>(OrderSortBy.NAME);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRequestSortExtra = (event: React.MouseEvent<unknown>, property: keyof ProductTable) => {
    const isAsc = orderByExtra === property && orderExtra === 'asc';
    setOrderExtra(isAsc ? 'desc' : 'asc');
    setOrderByExtra(property);
  };

  const childProductList =
    product?.childrenProducts && product.type === ProductTypeEnum.PARENT ? product?.childrenProducts : [];

  const extraProductList =
    product?.extraProducts && (product.type === ProductTypeEnum.CHILD || product.type === ProductTypeEnum.SINGLE)
      ? product?.extraProducts
      : [];

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - childProductList.length) : 0;
  const emptyRowsExtra = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - extraProductList.length) : 0;

  const childProductRows = useMemo(
    () =>
      stableSort(childProductList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, childProductList]
  );

  const extraProductRows = useMemo(
    () =>
      stableSort(extraProductList, getComparator(orderExtra, orderByExtra)).slice(
        pageExtra * rowsPerPageExtra,
        pageExtra * rowsPerPageExtra + rowsPerPageExtra
      ),
    [orderExtra, orderByExtra, pageExtra, rowsPerPageExtra, extraProductList]
  );

  const paramPartnerProduct = useMemo(() => {
    return {
      productId,
      partnerId: partnerProduct?.partnerId,
      storeId: partnerProduct?.storeId,
      pathname: pathnameToBack,
      navigate,
    };
  }, [partnerProduct?.productId, partnerProduct?.partnerId, partnerProduct?.storeId]);

  useEffect(() => {
    if (pathnameToBack === PATH_BRAND_APP.partnerProduct.list) {
      console.log('pathnameToBack', pathnameToBack);
      dispatch(getPartnerProductDetail(paramPartnerProduct));
    }
  }, [paramPartnerProduct]);

  const params = useMemo(() => {
    return {
      productId,
      pathname: pathnameToBack,
      navigate,
    };
  }, [productId, navigate]);

  useEffect(() => {
    dispatch(getProductDetail(params));
  }, [dispatch, navigate, params]);

  const handleDelete = () => {
    handleOpenModal(product?.name);
    dispatch(
      deleteProduct({
        idParams: { productId: product?.productId },
        pathname: pathname,
        navigate,
      })
    );
  };

  const handleDeletePartnerProduct = () => {
    handleOpenDeletePartnerProduct();
    dispatch(
      deletePartnerProduct({
        idParams: {
          productId: partnerProduct?.productId,
          partnerId: partnerProduct?.partnerId,
          storeId: partnerProduct?.storeId,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  return (
    <>
      <Page
        title={translate('page.title.detail', {
          model: isProduct
            ? currentLang.value === Language.ENGLISH
              ? translate('model.capitalize.product')
              : translate('model.lowercase.product')
            : currentLang.value === Language.ENGLISH
            ? translate('model.capitalize.partnerProduct')
            : translate('model.lowercase.partnerProduct'),
        })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => {
          const listAction: ReactNode[] =
            userAuth?.roleName === Role.BRAND_MANAGER && !(product?.status === Status.DEACTIVE)
              ? [
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                    }}
                    sx={{
                      '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: 'rgba(145, 158, 171, 0.08)',
                      },
                    }}
                    disabled={product?.status === Status.DEACTIVE}
                    onClick={isProduct ? handleOpenMenu : handleOpenMenuPartnerProduct}
                  >
                    {translate('button.menuAction')}
                  </Button>,
                ]
              : [];
          return listAction;
        }}
      >
        {isLoading || isLoadingPartnerProduct ? (
          <ProductDetailPageSkeleton lengthChildProducts={childProductRows?.length} />
        ) : (
          <>
            <Grid container columnSpacing={5} rowSpacing={5}>
              <Grid item xs={12} sm={4} md={4}>
                <Stack width="100%" alignItems="center" justifyContent="center">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    style={{ borderRadius: 16, width: mdSm ? '100%' : mdXs ? 300 : 241, objectFit: 'fill' }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Stack gap={2}>
                  <Box>
                    {isProduct && (
                      <Typography variant="h6" mb={1}>
                        {translate('table.uppercase.code')} MBKC:{' '}
                        <Typography component="span">{product?.code}</Typography>
                      </Typography>
                    )}
                    <Typography variant="h4">{product?.name}</Typography>
                    <Typography variant="body1" textAlign="justify">
                      {product?.description}
                    </Typography>
                  </Box>

                  <Stack gap={2} mt={2}>
                    {product?.numberOfProductsSold && (
                      <ContentSpace
                        divider={false}
                        title={translate('table.codeMapping')}
                        content={partnerProduct?.productCode}
                      />
                    )}

                    {partnerProduct && !isProduct ? (
                      <>
                        <ContentSpace
                          divider={false}
                          title={translate('table.codeMapping')}
                          content={partnerProduct?.productCode}
                        />
                        <ContentSpace title={translate('table.codeSystem')} content={product?.code} />

                        <ContentLabel
                          divider={!isProduct || product?.numberOfProductsSold}
                          title={translate('table.status')}
                          color={
                            partnerProduct?.status === PartnerProductStatusEnum.AVAILABLE
                              ? Color.SUCCESS
                              : partnerProduct?.status === PartnerProductStatusEnum.OUT_OF_STOCK_TODAY
                              ? Color.WARNING
                              : Color.ERROR
                          }
                          content={
                            partnerProduct?.status === PartnerProductStatusEnum.AVAILABLE
                              ? translate('status.available')
                              : partnerProduct?.status === PartnerProductStatusEnum.OUT_OF_STOCK_TODAY
                              ? translate('status.outOfStockToday')
                              : partnerProduct?.status === PartnerProductStatusEnum.OUT_OF_STOCK_INDEFINITELY
                              ? translate('status.outOfStockIndefinitely')
                              : translate('status.deActive')
                          }
                        />
                      </>
                    ) : (
                      <ContentLabel
                        divider={false}
                        title={translate('table.status')}
                        color={
                          product?.status === Status.ACTIVE
                            ? Color.SUCCESS
                            : product?.status === Status.INACTIVE
                            ? Color.WARNING
                            : Color.ERROR
                        }
                        content={
                          product?.status === Status.INACTIVE
                            ? translate('status.inactive')
                            : product?.status === Status.ACTIVE
                            ? translate('status.active')
                            : translate('status.deActive')
                        }
                      />
                    )}

                    <ContentLabel title={translate('table.type')} color={Color.INFO} content={product?.type} />

                    {product?.size !== null ? (
                      <ContentSpace title={translate('table.size')} content={product?.size} />
                    ) : (
                      <></>
                    )}
                    {product?.type !== ProductTypeEnum.PARENT && (
                      <>
                        {isProduct && (
                          <ContentSpace
                            title={translate('table.historicalPrice')}
                            content={fCurrencyVN(product?.historicalPrice ? product?.historicalPrice : '') + ' đ'}
                          />
                        )}
                        <ContentSpace
                          title={translate('table.sellingPrice')}
                          content={fCurrencyVN(product?.sellingPrice ? product?.sellingPrice : '') + ' đ'}
                        />
                        {isProduct && (
                          <ContentSpace
                            title={translate('table.discountPrice')}
                            content={fCurrencyVN(product?.discountPrice ? product?.discountPrice : '') + ' đ'}
                          />
                        )}
                      </>
                    )}
                    <ContentSpace title={translate('model.capitalizeOne.category')} content={product?.categoryName} />
                    {partnerProduct && !isProduct && (
                      <>
                        <ContentSpace title={translate('table.partner')} content={partnerProduct?.partnerName} />
                        <ContentSpace title={translate('table.store')} content={partnerProduct?.storeName} />
                        <ContentSpace
                          title={translate('table.mappedDate')}
                          content={moment(partnerProduct?.mappedDate).format('ddd DD/MM/YYYY - HH:mm:ss')}
                        />
                        <ContentSpace
                          title={translate('table.updatedDate')}
                          content={moment(partnerProduct?.updatedDate).format('ddd DD/MM/YYYY - HH:mm:ss')}
                        />
                      </>
                    )}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            {isProduct && (
              <>
                {product?.type === ProductTypeEnum.PARENT && (
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
                              order={order}
                              orderBy={orderBy}
                              headCells={productHeadCells}
                              onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                              {childProductRows?.map((productChild, index) => {
                                return (
                                  <ProductTableRow
                                    index={index}
                                    key={productChild.productId}
                                    setPage={setPage}
                                    page={page + 1}
                                    rowsPerPage={rowsPerPage}
                                    length={childProductRows?.length}
                                    product={productChild}
                                    isInDetail
                                    isDetailList={true}
                                  />
                                );
                              })}
                              {emptyRows > 0 ||
                                (childProductRows?.length === 0 && (
                                  <EmptyTable
                                    colNumber={productHeadCells.length + 2}
                                    model={translate('model.lowercase.childProduct')}
                                  />
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={product?.childrenProducts ? product?.childrenProducts?.length : 3}
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
              <>
                {(product?.type === ProductTypeEnum.CHILD || product?.type === ProductTypeEnum.SINGLE) && (
                  <Card sx={{ mt: 7 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} py={2}>
                      <Typography variant="h6">
                        {translate('page.title.list', { model: translate('model.lowercase.extraProduct') })}
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
                              order={order}
                              orderBy={orderBy}
                              headCells={productHeadCells}
                              onRequestSort={handleRequestSortExtra}
                            />
                            <TableBody>
                              {extraProductRows?.map((productExtra, index) => {
                                return (
                                  <ProductTableRow
                                    index={index}
                                    key={productExtra.productId}
                                    setPage={setPageExtra}
                                    page={page + 1}
                                    rowsPerPage={rowsPerPage}
                                    length={extraProductRows?.length}
                                    product={productExtra}
                                    isInDetail
                                    isDetailList={true}
                                  />
                                );
                              })}
                              {emptyRowsExtra > 0 ||
                                (extraProductRows?.length === 0 && (
                                  <EmptyTable
                                    colNumber={productHeadCells.length + 2}
                                    model={translate('model.lowercase.extraProduct')}
                                  />
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={product?.childrenProducts ? product?.childrenProducts?.length : 3}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          labelRowsPerPage={translate('table.rowsPerPage')}
                          onPageChange={handleChangePageExtra}
                          onRowsPerPageChange={handleChangeRowsPerPageExtra}
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
                            <TableCell>{translate('table.store')}</TableCell>
                            <TableCell>{translate('table.codeMapping')}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {product?.partnerProducts !== null &&
                            product?.partnerProducts?.map((partnerProducts, index) => {
                              return (
                                <TableRow key={index}>
                                  <TableCell width={60} component="th" scope="row">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell width={200}>{partnerProducts.partnerName}</TableCell>
                                  <TableCell>{partnerProducts.storeName}</TableCell>
                                  <TableCell width={500}> {partnerProducts.productCode}</TableCell>
                                </TableRow>
                              );
                            })}
                          {(product?.partnerProducts === null || product?.partnerProducts?.length === 0) && (
                            <EmptyTable colNumber={3} model={translate('model.lowercase.childProduct')} />
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={product?.partnerProducts ? product?.partnerProducts?.length : 3}
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
      </Page>

      <Popover
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_BRAND_APP.product.root + `/updation/${productId}`);
          dispatch(setRoutesToBack(pathname));
          dispatch(setEditProduct(product));
        }}
      />

      <Popover
        type={PopoverType.ALL}
        open={openPartnerProduct}
        handleCloseMenu={handleCloseMenuPartnerProduct}
        onDelete={handleOpenDeletePartnerProduct}
        onEdit={() => {
          dispatch(setRoutesToBack(pathname));
          dispatch(setEditPartnerProduct(partnerProduct));
          handleOpenUpdatePartnerProduct();
        }}
      />

      {isOpenUpdatePartnerProduct && (
        <CreatePartnerProductModal
          isOpen={isOpenUpdatePartnerProduct}
          handleOpen={handleOpenUpdatePartnerProduct}
          partnerProduct={partnerProduct}
        />
      )}

      {isOpenDeletePartnerProduct && (
        <ConfirmDialog
          open={isOpenDeletePartnerProduct}
          onClose={handleOpenDeletePartnerProduct}
          onAction={handleDeletePartnerProduct}
          model={partnerProduct?.productName}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.partnerProduct') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.partnerProduct') })}
        />
      )}

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          model={product?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.product') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.product') })}
        />
      )}
    </>
  );
}

export default ProductDetailPage;
