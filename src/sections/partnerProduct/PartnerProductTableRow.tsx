/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { IconButton, MenuItem, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { useAppDispatch } from 'redux/configStore';
import {
  deletePartnerProduct,
  getPartnerProductDetail_local,
  setEditPartnerProduct,
  updateStatusPartnerProduct,
} from 'redux/partnerProduct/partnerProductSlice';
import { setIsPartnerProduct } from 'redux/product/productSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import CreatePartnerProductModal from './CreatePartnerProductModal';
//
import { OrderSortBy, Params } from 'common/@types';
import { ConfirmDialog, Popover } from 'components';
import { StorageKeys } from 'constants/storageKeys';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { setLocalStorage } from 'utils';
import {
  PartnerProduct,
  PartnerProductStatusEnum,
  PartnerProductStatusUpdateEnum,
  ToUpdateStatus,
} from 'common/models';

interface PartnerProductTableRowProps {
  partnerProduct: PartnerProduct;
  index: number;
  page?: number;
  rowsPerPage?: number;
  filterName?: string;
  sortBy?: string;
  length: number;
  setPage?: Dispatch<SetStateAction<number>>;
  selected: readonly string[];
}

function PartnerProductTableRow({
  index,
  partnerProduct,
  page = 1,
  rowsPerPage = 5,
  length,
  setPage,
  selected,
  filterName,
  sortBy,
}: PartnerProductTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenUpdate, isOpen: isOpenUpdate } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const [status, setStatus] = useState<string>(partnerProduct?.status.toLowerCase());

  const handleNavigateDetail = () => {
    navigate(PATH_BRAND_APP.partnerProduct.root + `/${partnerProduct?.productId}`);
    dispatch(getPartnerProductDetail_local(partnerProduct));
    dispatch(setRoutesToBack(pathname));
    dispatch(setIsPartnerProduct());
  };

  const handleEdit = () => {
    handleOpenUpdate();
    dispatch(setEditPartnerProduct(partnerProduct));
    dispatch(setRoutesToBack(pathname));
  };

  const handleDelete = () => {
    handleOpen();
    const newPage = length === 1 ? page - 1 : page;
    if (setPage && length === 1) {
      setPage(newPage === -1 ? 0 : newPage);
      setLocalStorage(StorageKeys.PAGE, newPage === -1 ? 0 : newPage);
    }
    dispatch(
      deletePartnerProduct({
        idParams: {
          productId: partnerProduct?.productId,
          partnerId: partnerProduct.partnerId,
          storeId: partnerProduct.storeId,
        },
        optionParams: {
          searchValue: filterName,
          itemsPerPage: rowsPerPage,
          currentPage: (newPage === -1 ? 0 : newPage) + 1,
          sortBy: sortBy,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  const handleUpdateStatus = (valueStatus: string) => {
    const paramUpdate: Params<ToUpdateStatus> = {
      data: {
        status: valueStatus,
      },
      idParams: {
        productId: partnerProduct.productId,
        partnerId: partnerProduct.partnerId,
        storeId: partnerProduct.storeId,
      },
      optionParams: {
        searchValue: filterName,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: sortBy,
      },
      pathname: pathname,
      navigate,
    };
    dispatch(updateStatusPartnerProduct(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={60} align="center" onClick={handleNavigateDetail}>
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          onClick={handleNavigateDetail}
          width={
            !selected.includes(OrderSortBy.PARTNER_NAME) && !selected.includes(OrderSortBy.STORE_NAME)
              ? 400
              : !selected.includes(OrderSortBy.PARTNER_NAME)
              ? 300
              : !selected.includes(OrderSortBy.STORE_NAME)
              ? 300
              : 220
          }
        >
          <Typography variant="subtitle2" noWrap>
            {partnerProduct?.productName}
          </Typography>
        </TableCell>
        <TableCell
          align="left"
          onClick={handleNavigateDetail}
          width={
            !selected.includes(OrderSortBy.PARTNER_NAME) && !selected.includes(OrderSortBy.STORE_NAME)
              ? 400
              : !selected.includes(OrderSortBy.PARTNER_NAME)
              ? 340
              : !selected.includes(OrderSortBy.STORE_NAME)
              ? 340
              : 320
          }
        >
          <Typography variant="body2" noWrap>
            {partnerProduct?.productCode}
          </Typography>
        </TableCell>
        {selected.includes(OrderSortBy.PARTNER_NAME) && (
          <TableCell
            align="left"
            padding="none"
            onClick={handleNavigateDetail}
            width={!selected.includes(OrderSortBy.STORE_NAME) ? 200 : 150}
          >
            {partnerProduct?.partnerName}
          </TableCell>
        )}
        {selected.includes(OrderSortBy.STORE_NAME) && (
          <TableCell
            align="left"
            onClick={handleNavigateDetail}
            width={!selected.includes(OrderSortBy.PARTNER_NAME) ? 280 : 240}
          >
            {partnerProduct?.storeName}
          </TableCell>
        )}
        <TableCell align="left">
          <Stack width={200}>
            <TextField
              select
              size="small"
              label={translate('table.status')}
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
              fullWidth
            >
              <MenuItem
                value={PartnerProductStatusEnum.AVAILABLE.toLowerCase()}
                onClick={() => handleUpdateStatus(PartnerProductStatusUpdateEnum.AVAILABLE)}
              >
                {translate('status.available')}
              </MenuItem>
              <MenuItem
                value={PartnerProductStatusEnum.OUT_OF_STOCK_TODAY.toLowerCase()}
                onClick={() => handleUpdateStatus(PartnerProductStatusUpdateEnum.OUT_OF_STOCK_TODAY)}
              >
                {translate('status.outOfStockToday')}
              </MenuItem>
              <MenuItem
                value={PartnerProductStatusEnum.OUT_OF_STOCK_INDEFINITELY.toLowerCase()}
                onClick={() => handleUpdateStatus(PartnerProductStatusUpdateEnum.OUT_OF_STOCK_INDEFINITELY)}
              >
                {translate('status.outOfStockIndefinitely')}
              </MenuItem>
            </TextField>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpenUpdate && (
        <CreatePartnerProductModal
          isOpen={isOpenUpdate}
          handleOpen={handleOpenUpdate}
          partnerProduct={partnerProduct}
          filterName={filterName ? filterName : ''}
          sortBy={sortBy}
        />
      )}

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={partnerProduct?.productName}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.partnerProduct') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.partnerProduct') })}
        />
      )}
    </>
  );
}

export default PartnerProductTableRow;
