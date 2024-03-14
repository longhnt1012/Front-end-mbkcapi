import { Dispatch, SetStateAction, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Popover as MUIPopover, MenuItem, Stack, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { deleteStore, setEditStore, updateStatusStore } from 'redux/store/storeSlice';
// section
import ConfirmRegistrationStore from './ConfirmRegistrationStore';
//
import { OptionSelect, OrderSortBy, Params } from 'common/@types';
import { Color, PopoverType, Role, Status } from 'common/enums';
import { Store, ToUpdateStatus } from 'common/models';
import { ConfirmDialog, Label, Popover } from 'components';
import { StorageKeys } from 'constants/storageKeys';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { setLocalStorage } from 'utils';
import { getRuleWidths } from './rules';

interface StoreTableRowProps {
  store: Store;
  index: number;
  length?: number;
  page?: number;
  rowsPerPage?: number;
  showAction?: boolean;
  setPage?: Dispatch<SetStateAction<number>>;
  status: OptionSelect | null;
  selected: readonly string[];
  filterName?: string;
  sortBy?: string;
}

function StoreTableRow({
  index,
  store,
  page = 1,
  rowsPerPage = 5,
  showAction = false,
  length,
  setPage,
  status,
  selected,
  filterName,
  sortBy,
}: StoreTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const rules = getRuleWidths(selected);

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenConfirm, isOpen: isOpenConfirm } = useModal();
  const {
    open: openConfirm,
    handleOpenMenu: handleOpenMenuConfirm,
    handleCloseMenu: handleCloseMenuConfirm,
  } = usePopover();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { brandProfile } = useAppSelector((state) => state.profile);

  const [statusConfirm, setStatusConfirm] = useState<Status>(Status.ACTIVE);

  const handleNavigateDetail = () => {
    navigate(
      userAuth?.roleName === Role.BRAND_MANAGER
        ? PATH_BRAND_APP.store.root + `/${store.storeId}`
        : userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
        ? PATH_KITCHEN_CENTER_APP.store.root + `/${store.storeId}`
        : PATH_ADMIN_APP.store.root + `/${store.storeId}`
    );
    dispatch(setRoutesToBack(pathname));
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.store.root + `/updation/${store.storeId}`);
    dispatch(setRoutesToBack(pathname));
    dispatch(setEditStore(store));
  };

  const handleDelete = () => {
    handleOpen();
    const newPage = length === 1 ? page - 1 : page;
    if (setPage && length === 1) {
      setPage(newPage === -1 ? 0 : newPage);
      setLocalStorage(StorageKeys.PAGE, newPage === -1 ? 0 : newPage);
    }
    dispatch(
      deleteStore({
        idParams: { storeId: store.storeId },
        optionParams: {
          searchValue: filterName,
          itemsPerPage: rowsPerPage,
          currentPage: (newPage === -1 ? 0 : newPage) + 1,
          status: status?.value,
          sortBy: sortBy,
        },
        pathname,
        navigate,
      })
    );
  };

  const handleUpdateStatus = () => {
    const paramUpdate: Params<ToUpdateStatus> = {
      data: {
        status: store.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        storeId: store?.storeId,
      },
      optionParams: {
        searchValue: filterName,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        status: status?.value,
        sortBy: sortBy,
        idBrand: brandProfile?.brandId,
      },
      navigate,
    };
    dispatch(updateStatusStore(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={60} align="center" onClick={handleNavigateDetail}>
          {index + 1}
        </TableCell>
        {selected.includes(OrderSortBy.LOGO) && (
          <TableCell component="th" scope="row" padding="none" width={70} onClick={handleNavigateDetail}>
            <Avatar alt={store.name} src={store.logo} />
          </TableCell>
        )}
        <TableCell width={rules.name} align="left" padding="none" onClick={handleNavigateDetail}>
          {store.name}
        </TableCell>
        {selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && (
          <TableCell width={rules.store_manager_email} align="left" onClick={handleNavigateDetail}>
            {store.storeManagerEmail}
          </TableCell>
        )}
        {selected.includes(OrderSortBy.KITCHEN_CENTER) && (
          <TableCell width={rules.kitchen_center} align="left" onClick={handleNavigateDetail}>
            {store.kitchenCenter.name}
          </TableCell>
        )}
        {selected.includes(OrderSortBy.BRAND) && (
          <TableCell width={rules.brand} align="left" onClick={handleNavigateDetail}>
            {store.brand.name}
          </TableCell>
        )}
        <TableCell align="left" onClick={handleNavigateDetail}>
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
        </TableCell>

        {showAction && (
          <TableCell align="right">
            {userAuth?.roleName === Role.BRAND_MANAGER ? (
              <Stack direction="row" alignItems="center" justifyContent="right">
                <Switch
                  size="small"
                  onClick={handleUpdateStatus}
                  inputProps={{ 'aria-label': 'controlled' }}
                  disabled={
                    store.status === Status.DEACTIVE ||
                    store.status === Status.BE_CONFIRMING ||
                    store.status === Status.REJECTED
                  }
                  checked={store.status === Status.ACTIVE ? true : false}
                  color={store?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
                />
                <IconButton
                  color="inherit"
                  disabled={
                    store?.status === Status.DEACTIVE ||
                    store.status === Status.BE_CONFIRMING ||
                    store?.status === Status.REJECTED
                  }
                  onClick={handleOpenMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </Stack>
            ) : (
              <>
                {store?.status === Status.ACTIVE ||
                store?.status === Status.INACTIVE ||
                store?.status === Status.REJECTED ? (
                  <IconButton color="inherit" onClick={handleOpenMenu}>
                    <MoreVertIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="inherit"
                    disabled={store?.status === Status.DEACTIVE}
                    onClick={handleOpenMenuConfirm}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              </>
            )}
          </TableCell>
        )}
      </TableRow>

      <Popover
        open={open}
        handleCloseMenu={handleCloseMenu}
        onEdit={handleEdit}
        onDelete={handleOpen}
        type={userAuth?.roleName === Role.BRAND_MANAGER ? PopoverType.EDIT : PopoverType.DELETE}
      />

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
            setStatusConfirm(Status.ACTIVE);
            handleOpenConfirm(Status.ACTIVE);
          }}
        >
          <CheckIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.accept')}
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => {
            setStatusConfirm(Status.REJECTED);
            handleOpenConfirm(Status.REJECTED);
          }}
        >
          <ClearIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.reject')}
        </MenuItem>
      </MUIPopover>

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          model={store.name}
          onClose={handleOpen}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.store') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.store') })}
        />
      )}

      {isOpenConfirm && (
        <ConfirmRegistrationStore
          store={store}
          storeStatus={statusConfirm}
          statusFilter={status}
          filterName={filterName}
          sortBy={sortBy}
          page={page}
          rowsPerPage={rowsPerPage}
          isOpen={isOpenConfirm}
          handleOpen={handleOpenConfirm}
          handleCloseMenuConfirm={handleCloseMenuConfirm}
        />
      )}
    </>
  );
}

export default StoreTableRow;
