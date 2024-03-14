import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { useAppDispatch } from 'redux/configStore';
import {
  deleteKitchenCenter,
  setEditKitchenCenter,
  updateStatusKitchenCenter,
} from 'redux/kitchenCenter/kitchenCenterSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { OrderSortBy, Params } from 'common/@types';
import { Color, Status } from 'common/enums';
import { KitchenCenter, ToUpdateStatus } from 'common/models';
import { ConfirmDialog, Label, Popover } from 'components';
import { StorageKeys } from 'constants/storageKeys';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import { removeLocalStorage, setLocalStorage } from 'utils';

interface KitchenCenterTableRowProps {
  kitchenCenter: KitchenCenter;
  index: number;
  length: number;
  page: number;
  rowsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  selected: readonly string[];
  filterName: string;
  sortBy: string;
}

function KitchenCenterTableRow({
  index,
  kitchenCenter,
  length,
  page,
  rowsPerPage,
  setPage,
  selected,
  filterName,
  sortBy,
}: KitchenCenterTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = () => {
    dispatch(setRoutesToBack(pathname));
    removeLocalStorage(StorageKeys.PAGE);
    removeLocalStorage(StorageKeys.ROW_PER_PAGE);
    navigate(PATH_ADMIN_APP.kitchenCenter.root + `/${kitchenCenter.kitchenCenterId}`);
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.kitchenCenter.root + `/updation/${kitchenCenter.kitchenCenterId}`);
    dispatch(setEditKitchenCenter(kitchenCenter));
    dispatch(setRoutesToBack(pathname));
  };

  const handleDelete = () => {
    handleOpen();
    const newPage = length === 1 ? page - 1 : page;
    if (setPage && length === 1) {
      setPage(newPage === -1 ? 0 : newPage);
      setLocalStorage(StorageKeys.PAGE, newPage === -1 ? 0 : newPage);
    }
    dispatch<any>(
      deleteKitchenCenter({
        idParams: { kitchenCenterId: kitchenCenter?.kitchenCenterId },
        optionParams: {
          searchValue: filterName,
          itemsPerPage: rowsPerPage,
          currentPage: (newPage === -1 ? 0 : newPage) + 1,
          sortBy: sortBy,
        },
        pathname,
        navigate,
      })
    );
  };

  const handleChangeStatus = () => {
    const paramUpdateStatus: Params<ToUpdateStatus> = {
      data: {
        status: kitchenCenter.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        kitchenCenterId: kitchenCenter?.kitchenCenterId,
      },
      optionParams: {
        searchValue: filterName,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: sortBy,
      },
      navigate,
    };
    dispatch<any>(updateStatusKitchenCenter(paramUpdateStatus));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={handleNavigateDetail}>
          {index + 1}
        </TableCell>

        {selected.includes(OrderSortBy.LOGO) && (
          <TableCell component="th" scope="row" onClick={handleNavigateDetail} width={80}>
            <Avatar alt={kitchenCenter.name} src={kitchenCenter.logo} />
          </TableCell>
        )}

        <TableCell align="left" width={250} onClick={handleNavigateDetail}>
          {kitchenCenter.name}
        </TableCell>

        {selected.includes(OrderSortBy.ADDRESS) && (
          <TableCell
            align="left"
            onClick={handleNavigateDetail}
            width={selected.includes(OrderSortBy.LOGO) ? 450 : 600}
          >
            {kitchenCenter?.address
              .split(', ')
              .slice(0, kitchenCenter?.address.split(', ').length - 3)
              .join(', ')}
          </TableCell>
        )}
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
        <TableCell align="right">
          <Switch
            size="small"
            onChange={handleChangeStatus}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={kitchenCenter.status === Status.DEACTIVE}
            checked={
              kitchenCenter.status === Status.INACTIVE || kitchenCenter.status === Status.DEACTIVE ? false : true
            }
            color={kitchenCenter?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
          />
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={kitchenCenter?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.kitchenCenter') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.kitchenCenter') })}
        />
      )}
    </>
  );
}

export default KitchenCenterTableRow;
