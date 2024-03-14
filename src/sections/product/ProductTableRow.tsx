import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Stack, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { useAppDispatch } from 'redux/configStore';
import {
  deleteProduct,
  getProductDetail_local,
  setEditProduct,
  setIsProduct,
  setProductType,
  updateStatusProduct,
} from 'redux/product/productSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { OrderSortBy, Params } from 'common/@types';
import { Color, Status } from 'common/enums';
import { Product, ToUpdateStatus } from 'common/models';
import { ConfirmDialog, Label, Popover } from 'components';
import { StorageKeys } from 'constants/storageKeys';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { fCurrencyVN, setLocalStorage } from 'utils';
import { getRuleWidths } from './rules';

interface ProductTableRowProps {
  product: Product;
  index: number;
  inTab?: boolean;
  isInDetail?: boolean;
  page?: number;
  rowsPerPage?: number;
  length: number;
  setPage?: Dispatch<SetStateAction<number>>;
  selected?: readonly string[];
  filterName?: string;
  productType?: string;
  sortBy?: string;
  isDetailList?: boolean;
}

function ProductTableRow({
  index,
  product,
  inTab = false,
  isInDetail = false,
  page = 1,
  rowsPerPage = 5,
  length,
  setPage,
  selected,
  filterName,
  productType,
  sortBy,
  isDetailList = false,
}: ProductTableRowProps) {
  const { id: productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const rules = getRuleWidths(selected ? selected : [], inTab);

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = () => {
    navigate(PATH_BRAND_APP.product.root + `/${product?.productId}`);
    dispatch(getProductDetail_local(product));
    dispatch(setProductType(product.type));
    dispatch(setRoutesToBack(pathname));
    dispatch(setIsProduct());
  };

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.product.root + `/updation/${product?.productId}`);
    dispatch(setEditProduct(product));
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
      deleteProduct({
        idParams: { productId: product?.productId },
        optionParams: {
          searchValue: filterName,
          itemsPerPage: rowsPerPage,
          currentPage: (newPage === -1 ? 0 : newPage) + 1,
          type: productType,
          sortBy: sortBy,
          isDetailList: isDetailList,
          idProduct: productId,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  const handleUpdateStatus = () => {
    const paramUpdate: Params<ToUpdateStatus> = {
      data: {
        status: product?.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        productId: product?.productId,
      },
      optionParams: {
        searchValue: filterName,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        type: productType,
        sortBy: sortBy,
      },
      navigate,
    };
    dispatch(updateStatusProduct(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={60} align="center" onClick={handleNavigateDetail}>
          {index + 1}
        </TableCell>
        {isInDetail ? (
          <TableCell component="th" padding="none" width={70} align="center" onClick={handleNavigateDetail}>
            <Avatar alt={product?.name} src={product?.image} />
          </TableCell>
        ) : (
          <>
            {selected?.includes(OrderSortBy.IMAGE) && (
              <TableCell component="th" padding="none" width={80} align="center" onClick={handleNavigateDetail}>
                <Avatar alt={product?.name} src={product?.image} />
              </TableCell>
            )}
          </>
        )}
        <TableCell
          component="th"
          scope="row"
          padding="none"
          width={isInDetail ? 160 : rules.name}
          onClick={handleNavigateDetail}
        >
          <Typography variant="subtitle2" width={160} noWrap>
            {product?.name}
          </Typography>
        </TableCell>
        {isInDetail ? (
          <>
            <TableCell align="left" width={150} onClick={handleNavigateDetail}>
              <Typography variant="body2" noWrap>
                {product?.code}
              </Typography>
            </TableCell>
            <TableCell align="left" padding="none" width={130} onClick={handleNavigateDetail}>
              {product?.displayOrder}
            </TableCell>
            <TableCell align="left" onClick={handleNavigateDetail} width={110}>
              {fCurrencyVN(product?.sellingPrice)} đ
            </TableCell>
          </>
        ) : (
          <>
            {selected?.includes(OrderSortBy.CODE) && (
              <TableCell align="left" width={rules.code} onClick={handleNavigateDetail}>
                <Typography variant="body2" noWrap>
                  {product?.code}
                </Typography>
              </TableCell>
            )}
            {selected?.includes(OrderSortBy.DISPLAY_ORDER) && (
              <TableCell align="left" padding="none" width={rules.display_order} onClick={handleNavigateDetail}>
                {product?.displayOrder}
              </TableCell>
            )}
            {selected?.includes(OrderSortBy.SELLING_PRICE) && (
              <TableCell align="left" width={rules.selling_price} onClick={handleNavigateDetail}>
                {fCurrencyVN(product?.sellingPrice)} đ
              </TableCell>
            )}
          </>
        )}

        {isInDetail ? (
          <>
            <TableCell align="left" width={120} onClick={handleNavigateDetail}>
              {fCurrencyVN(product?.discountPrice)} đ
            </TableCell>
            <TableCell align="left" width={110} onClick={handleNavigateDetail}>
              {fCurrencyVN(product?.historicalPrice)} đ
            </TableCell>
          </>
        ) : (
          <>
            {selected?.includes(OrderSortBy.DISCOUNT_PRICE) && (
              <TableCell align="left" width={rules.discount_price} onClick={handleNavigateDetail}>
                {fCurrencyVN(product?.discountPrice)} đ
              </TableCell>
            )}
            {selected?.includes(OrderSortBy.HISTORICAL_PRICE) && (
              <TableCell align="left" width={rules.historical_price} onClick={handleNavigateDetail}>
                {fCurrencyVN(product?.historicalPrice)} đ
              </TableCell>
            )}
          </>
        )}

        {!isInDetail && (
          <>
            {selected?.includes(OrderSortBy.CATEGORY) && (
              <TableCell align="left" width={rules.category} onClick={handleNavigateDetail}>
                {product?.categoryName}
              </TableCell>
            )}
            {selected?.includes(OrderSortBy.TYPE) && (
              <TableCell align="left" width={rules.type} onClick={handleNavigateDetail}>
                {product?.type}
              </TableCell>
            )}
          </>
        )}

        <TableCell align="left" onClick={handleNavigateDetail}>
          <Label
            color={
              product?.status === Status.ACTIVE
                ? Color.SUCCESS
                : product?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {product?.status === Status.INACTIVE
              ? translate('status.inactive')
              : product?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        {!inTab && (
          <TableCell align="right">
            <Stack direction="row" alignItems="center" justifyContent="right">
              <Switch
                size="small"
                onClick={handleUpdateStatus}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={product?.status === Status.DEACTIVE}
                checked={product?.status === Status.INACTIVE || product?.status === Status.DEACTIVE ? false : true}
                color={product?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
              />
              <IconButton color="inherit" onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </TableCell>
        )}
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={product?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.product') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.product') })}
        />
      )}
    </>
  );
}

export default ProductTableRow;
