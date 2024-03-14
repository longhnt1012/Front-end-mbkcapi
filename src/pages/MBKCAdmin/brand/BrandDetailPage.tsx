/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// redux
import { deleteBrand, getBrandDetail, setEditBrand } from 'redux/brand/brandSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { getAllStores } from 'redux/store/storeSlice';
// section
import { BrandDetailPageSkeleton } from 'sections/brand';
import { StoreTableRow, StoreTableRowSkeleton } from 'sections/store';
//
import { ListParams, OptionSelect, OrderSort, OrderSortBy, StoreTable } from 'common/@types';
import { Color, Language, PopoverType, Status } from 'common/enums';
import {
  ConfirmDialog,
  CustomTableHead,
  CustomTableToolbar,
  EmptyTable,
  Label,
  Page,
  Popover,
  SearchNotFound,
} from 'components';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination, usePopover } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import { STATUS_OPTIONS } from 'common/models';

function BrandDetailPage() {
  const { id: brandId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();
  const { storeHeadCells } = useConfigHeadTable();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { brand, isLoading } = useAppSelector((state) => state.brand);
  const { stores, numberItems, isLoading: isLoadingStores } = useAppSelector((state) => state.store);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StoreTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [storeStatus, setStoreStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StoreTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const handleChangeStatus = (newValue: OptionSelect | null) => {
    setStoreStatus(newValue);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !stores.length && !!filterName;

  const handleDelete = () => {
    handleOpenModal();
    dispatch<any>(
      deleteBrand({
        idParams: { brandId: brand?.brandId },
        navigate,
      })
    );
  };

  const debounceValue = useDebounce(filterName.trim(), 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        idBrand: brandId,
        status: storeStatus !== null ? storeStatus.value : '',
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, brandId, storeStatus]);

  const paramsDetails = useMemo(() => {
    return {
      brandId,
      navigate,
    };
  }, [brandId]);

  useEffect(() => {
    dispatch<any>(getBrandDetail(paramsDetails));
    dispatch<any>(getAllStores(params));
  }, [params, paramsDetails]);

  const handleReloadData = () => {
    dispatch<any>(getAllStores(params));
  };

  return (
    <>
      <Page
        title={translate('page.title.detail', {
          model:
            currentLang.value === Language.ENGLISH
              ? translate('model.capitalize.brand')
              : translate('model.lowercase.brand'),
        })}
        actions={() => [
          <Button
            color="inherit"
            onClick={handleOpenMenu}
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
          >
            {translate('button.menuAction')}
          </Button>,
        ]}
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <Stack spacing={5} mb={10} width="65%">
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 3,
                py: 1.5,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="h6">{translate('page.content.generalInformation')}</Typography>
              </Stack>
            </Stack>
            {isLoading ? (
              <BrandDetailPageSkeleton />
            ) : (
              <Stack sx={{ px: 3.5, py: 3 }}>
                <Grid container columnSpacing={2}>
                  <Grid item md={3} sm={12}>
                    <Stack width="100%" alignItems="center">
                      <Avatar src={brand?.logo} alt={brand?.name} sx={{ width: 150, height: 150 }} />
                    </Stack>
                  </Grid>
                  <Grid item md={9} sm={12}>
                    <Stack width="100%" alignItems="start" gap={1}>
                      <Typography variant="h5">{brand?.name}</Typography>

                      <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                        <Typography variant="subtitle1">{translate('table.status')}:</Typography>
                        <Label color={(brand?.status === Status.INACTIVE && Color.WARNING) || Color.SUCCESS}>
                          {brand?.status === Status.INACTIVE
                            ? translate('status.inactive')
                            : translate('status.active')}
                        </Label>
                      </Stack>
                      <Typography variant="subtitle1">
                        {translate('table.manageEmail')}:{' '}
                        <Typography variant="body1" component="span">
                          {brand?.brandManagerEmail}
                        </Typography>
                      </Typography>
                      <Typography variant="subtitle1">
                        {translate('table.address')}:{' '}
                        <Typography variant="body1" component="span">
                          {brand?.address
                            .split(', ')
                            .slice(0, brand?.address.split(', ').length - 3)
                            .join(', ')}
                        </Typography>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Card>
        </Stack>

        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                px={3}
                py={2}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Typography variant="h6">
                  {translate('page.title.list', { model: translate('model.lowercase.store') })}
                </Typography>
              </Stack>

              <CustomTableToolbar<StoreTable>
                model={translate('model.lowercase.store')}
                selected={selected}
                setSelected={setSelected}
                headCells={storeHeadCells.filter((col) => col.id !== OrderSortBy.BRAND)}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
                haveSelectStatus
                options={STATUS_OPTIONS}
                status={storeStatus}
                handleChangeStatus={handleChangeStatus}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<StoreTable>
                    headCells={storeHeadCells.filter((col) => col.id !== OrderSortBy.BRAND)}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />
                  {isLoadingStores ? (
                    <StoreTableRowSkeleton length={stores.length} selected={selected} />
                  ) : (
                    <TableBody>
                      {stores.map((store, index) => {
                        return (
                          <StoreTableRow
                            key={store.storeId}
                            index={index}
                            store={store}
                            status={storeStatus}
                            setPage={setPage}
                            page={page + 1}
                            rowsPerPage={rowsPerPage}
                            length={stores.length}
                            selected={selected}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (stores.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={storeHeadCells.length + 2}
                            model={translate('model.lowercase.store')}
                          />
                        ))}
                    </TableBody>
                  )}

                  {isNotFound && <SearchNotFound colNumber={storeHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                page={page}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Page>

      <Popover
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_ADMIN_APP.brand.root + `/updation/${brandId}`);
          dispatch(setRoutesToBack(pathname));
          dispatch(setEditBrand(brand));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          model={brand?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.brand') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.brand') })}
        />
      )}
    </>
  );
}

export default BrandDetailPage;
