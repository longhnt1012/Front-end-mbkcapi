/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui icon
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// @mui
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Popover as MUIPopover,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { deleteStore, getStoreDetail, setAddFormDetail, setEditStore } from 'redux/store/storeSlice';
import { getAllStorePartnersByStoreId } from 'redux/storePartner/storePartnerSlice';
// section
import { ConfirmRegistrationStore, StoreDetailPageSkeleton } from 'sections/store';
import { StorePartnerTableDetailRow, StorePartnerTableDetailRowSkeleton } from 'sections/storePartner';
//
import { ListParams, OrderSort, OrderSortBy, StorePartnerDetailTable } from 'common/@types';
import { Color, Language, PopoverType, Role, Status } from 'common/enums';
import { CommonTableHead, ConfirmDialog, EmptyTable, Label, Page, Popover } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination, usePopover, useResponsive } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';

function StoreDetailPage() {
  const { id: storeId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mdSm = useResponsive('up', 'md', 'md');
  const mdXs = useResponsive('up', 'xs', 'xs');

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();
  const { storePartnerDetailHeadCells } = useConfigHeadTable();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const { handleOpen: handleOpenConfirm, isOpen: isOpenConfirm } = useModal();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const {
    open: openConfirm,
    handleOpenMenu: handleOpenMenuConfirm,
    handleCloseMenu: handleCloseMenuConfirm,
  } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isLoading: isLoadingStore, store } = useAppSelector((state) => state.store);
  const { storePartners, isLoading: isLoadingStorePartner } = useAppSelector((state) => state.storePartner);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StorePartnerDetailTable>(OrderSortBy.PARTNER_NAME);
  const [status, setStatus] = useState<Status>(Status.ACTIVE);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StorePartnerDetailTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const paramsStoreDetail = useMemo(() => {
    return {
      storeId,
      navigate,
    };
  }, [storeId, navigate]);

  useEffect(() => {
    dispatch(getStoreDetail(paramsStoreDetail));
  }, [dispatch, navigate, paramsStoreDetail]);

  const handleDelete = () => {
    handleOpenModal();
    dispatch(
      deleteStore({
        idParams: { storeId: store?.storeId },
        navigate,
      })
    );
  };

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        idStore: storeId,
        keySortName: orderBy === OrderSortBy.PARTNER_NAME ? order : '',
        keySortStatus: orderBy === OrderSortBy.STATUS ? order : '',
      },
      pathname: pathnameToBack,
      navigate,
    };
  }, [storeId, orderBy, order]);

  useEffect(() => {
    if (userAuth?.roleName === Role.BRAND_MANAGER) {
      dispatch(getAllStorePartnersByStoreId(params));
    }
  }, [params, userAuth?.roleName]);

  return (
    <>
      <Page
        title={translate('page.title.detail', {
          model:
            currentLang.value === Language.ENGLISH
              ? translate('model.capitalize.store')
              : translate('model.lowercase.store'),
        })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => {
          const listAction: ReactNode[] =
            userAuth?.roleName === Role.MBKC_ADMIN && store?.status === Status.BE_CONFIRMING
              ? [
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                    }}
                    sx={{
                      '.css-190udkw-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: 'rgba(145, 158, 171, 0.08)',
                      },
                    }}
                    onClick={handleOpenMenuConfirm}
                  >
                    {translate('button.menuAction')}
                  </Button>,
                ]
              : userAuth?.roleName === Role.MBKC_ADMIN &&
                (store?.status === Status.ACTIVE ||
                  store?.status === Status.INACTIVE ||
                  store?.status === Status.REJECTED)
              ? [
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                    }}
                    sx={{
                      '.css-190udkw-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: 'rgba(145, 158, 171, 0.08)',
                      },
                    }}
                    onClick={handleOpenMenu}
                  >
                    {translate('button.menuAction')}
                  </Button>,
                ]
              : userAuth?.roleName === Role.BRAND_MANAGER &&
                (store?.status === Status.INACTIVE || store?.status === Status.ACTIVE)
              ? [
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                    }}
                    sx={{
                      '.css-190udkw-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: 'rgba(145, 158, 171, 0.08)',
                      },
                    }}
                    onClick={handleOpenMenu}
                  >
                    {translate('button.menuAction')}
                  </Button>,
                ]
              : [];
          return listAction;
        }}
      >
        {isLoadingStore ? (
          <StoreDetailPageSkeleton rejectedReason={store?.rejectedReason} />
        ) : (
          <>
            <Grid container columnSpacing={5} rowSpacing={5}>
              <Grid item xs={12} sm={4} md={4}>
                <Stack width="100%" alignItems="center" justifyContent="center">
                  <img
                    src={store?.logo}
                    alt={store?.name}
                    style={{ borderRadius: 16, width: mdSm ? '100%' : mdXs ? 300 : 241, objectFit: 'fill' }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Stack gap={2}>
                  <Typography variant="h3">{store?.name}</Typography>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">{translate('table.status')}</Typography>
                    <Label
                      color={
                        store?.status === Status.ACTIVE
                          ? Color.SUCCESS
                          : store?.status === Status.INACTIVE
                          ? Color.WARNING
                          : store?.status === Status.BE_CONFIRMING
                          ? Color.SECONDARY
                          : store?.status === Status.REJECTED
                          ? Color.ERROR
                          : Color.ERROR
                      }
                    >
                      {store?.status === Status.INACTIVE
                        ? translate('status.inactive')
                        : store?.status === Status.ACTIVE
                        ? translate('status.active')
                        : store?.status === Status.BE_CONFIRMING
                        ? translate('status.beConfirming')
                        : store?.status === Status.REJECTED
                        ? translate('status.reject')
                        : translate('status.deActive')}
                    </Label>
                  </Stack>

                  <Divider />

                  {store?.rejectedReason !== null && (
                    <>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">{translate('table.rejectedReason')}</Typography>
                        <Typography variant="body1">{store?.rejectedReason}</Typography>
                      </Stack>

                      <Divider />
                    </>
                  )}

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">{translate('table.manageEmail')}</Typography>
                    <Typography variant="body1">{store?.storeManagerEmail}</Typography>
                  </Stack>

                  {(userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER) && (
                    <>
                      <Divider />

                      <Stack direction="row" alignItems="start" gap={2}>
                        <Typography variant="subtitle1" minWidth={mdSm ? 150 : 110}>
                          {translate('table.kitchenCenter')}
                        </Typography>
                        <Stack direction="row" alignItems="start" gap={1}>
                          <img
                            src={store?.kitchenCenter.logo}
                            alt={store?.kitchenCenter.name}
                            height={120}
                            width={120}
                          />
                          <Stack gap={0.5}>
                            <Typography variant="subtitle1">
                              {translate('table.name')}:{' '}
                              <Typography component="span" variant="body1">
                                {store?.kitchenCenter.name}
                              </Typography>
                            </Typography>

                            <Typography variant="subtitle1">
                              {translate('table.address')}:{' '}
                              <Typography component="span" variant="body1">
                                {store?.kitchenCenter.address
                                  .split(', ')
                                  .slice(0, store?.kitchenCenter?.address.split(', ').length - 3)
                                  .join(', ')}
                              </Typography>
                            </Typography>
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
                        <Typography variant="subtitle1" minWidth={mdSm ? 150 : 110}>
                          {translate('table.brand')}
                        </Typography>
                        <Stack direction="row" alignItems="start" gap={1}>
                          <Box sx={{ border: 1, borderColor: (theme) => theme.palette.primary.main }}>
                            <img src={store?.brand.logo} alt={store?.brand.name} height={120} width={120} />
                          </Box>
                          <Stack gap={0.5}>
                            <Typography variant="subtitle1">
                              {translate('table.name')}:{' '}
                              <Typography component="span" variant="body1">
                                {store?.brand.name}
                              </Typography>
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </>
                  )}

                  {(userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER) && (
                    <>
                      <Divider />

                      <Stack direction="row" alignItems="start" gap={2}>
                        <Typography variant="subtitle1" minWidth={mdSm ? 150 : 110}>
                          {translate('table.partner')}
                        </Typography>
                        {store?.storePartners?.length === 0 ? (
                          <Typography variant="body2">{translate('page.content.noHavePartner')}</Typography>
                        ) : (
                          <Stack direction="row" gap={3}>
                            {store?.storePartners?.map((partner) => (
                              <Stack
                                key={partner.partner.partnerId}
                                direction="row"
                                gap={1}
                                sx={(theme) => ({
                                  p: 1.2,
                                  borderRadius: 1,
                                  backgroundColor: theme.palette.grey[200],
                                })}
                              >
                                <Avatar
                                  src={partner.partner.logo}
                                  alt="partner"
                                  variant="rounded"
                                  sx={{ width: 45, height: 45 }}
                                />
                                <Typography variant="subtitle2">{partner.partner.name}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>

            {userAuth?.roleName === Role.BRAND_MANAGER && (
              <Card sx={{ mt: 7 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} py={2}>
                  <Typography variant="h6" textTransform="capitalize">
                    {translate('model.capitalizeOne.storePartner')}
                  </Typography>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate(PATH_BRAND_APP.storePartner.newStorePartner);
                      dispatch(setAddFormDetail(store));
                    }}
                  >
                    {translate('button.add', { model: translate('model.lowercase.partner') })}
                  </Button>
                </Stack>

                <Box sx={{ width: '100%' }}>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                      <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                        <CommonTableHead<StorePartnerDetailTable>
                          showAction
                          order={order}
                          orderBy={orderBy}
                          headCells={storePartnerDetailHeadCells}
                          onRequestSort={handleRequestSort}
                        />
                        {isLoadingStorePartner ? (
                          <StorePartnerTableDetailRowSkeleton />
                        ) : (
                          <TableBody>
                            {storePartners?.storePartners?.map((partner, index) => {
                              return (
                                <StorePartnerTableDetailRow
                                  key={partner.partnerId}
                                  index={index}
                                  partner={partner}
                                  storeId={Number(storeId)}
                                />
                              );
                            })}
                            {storePartners?.storePartners?.length === 0 && (
                              <EmptyTable
                                colNumber={storePartnerDetailHeadCells.length + 2}
                                model={translate('model.lowercase.storePartner')}
                              />
                            )}
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={storePartners?.storePartners ? storePartners?.storePartners?.length : 5}
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

            <Box mt={10} textAlign="right">
              <Button color="inherit" variant="outlined" onClick={() => navigate(pathnameToBack)}>
                {translate('button.back')}
              </Button>
            </Box>
          </>
        )}
      </Page>

      <Popover
        type={userAuth?.roleName === Role.BRAND_MANAGER ? PopoverType.EDIT : PopoverType.DELETE}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_ADMIN_APP.store.root + `/updation/${storeId}`);
          dispatch(setRoutesToBack(pathname));
          dispatch(setEditStore(store));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          model={store?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.store') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.store') })}
        />
      )}

      <MUIPopover
        open={Boolean(openConfirm)}
        anchorEl={openConfirm}
        onClose={handleCloseMenuConfirm}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 0.5,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setStatus(Status.ACTIVE);
            handleOpenConfirm(Status.ACTIVE);
          }}
        >
          <CheckIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.accept')}
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => {
            setStatus(Status.REJECTED);
            handleOpenConfirm(Status.REJECTED);
          }}
        >
          <ClearIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.reject')}
        </MenuItem>
      </MUIPopover>

      {isOpenConfirm && (
        <ConfirmRegistrationStore
          store={store}
          storeStatus={status}
          isOpen={isOpenConfirm}
          handleOpen={handleOpenConfirm}
          handleCloseMenuConfirm={handleCloseMenuConfirm}
        />
      )}
    </>
  );
}

export default StoreDetailPage;
