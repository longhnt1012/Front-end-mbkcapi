import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Stack, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { useAppDispatch } from 'redux/configStore';
import { deletePartner, setEditPartner, updateStatusPartner } from 'redux/partner/partnerSlice';
// section
import CreatePartnerModal from './CreatePartnerModal';
import PartnerDetailModal from './PartnerDetailModal';
//
import { OrderSortBy, Params } from 'common/@types';
import { Partner, ToUpdateStatus } from 'common/models';
import { Color, PopoverType, Status } from 'common/enums';
import { ConfirmDialog, Label, Popover } from 'components';
import { StorageKeys } from 'constants/storageKeys';
import { useLocales, useModal, usePopover } from 'hooks';
import { setLocalStorage } from 'utils';

interface PartnerTableRowProps {
  partner: Partner;
  index: number;
  lengthPartners: number;
  showAction?: boolean;
  page: number;
  rowsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  selected: readonly string[];
  filterName: string;
  sortBy: string;
}

function PartnerTableRow({
  lengthPartners,
  index,
  partner,
  showAction = false,
  page,
  rowsPerPage,
  setPage,
  selected,
  filterName,
  sortBy,
}: PartnerTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();
  const { handleOpen: handleOpenCreate, isOpen: isOpenCreate } = useModal();
  const { handleOpen: handleOpenDetail, isOpen: isOpenDetail } = useModal();

  const handleEdit = () => {
    handleOpenCreate();
    dispatch(setEditPartner(partner));
  };

  const handleDelete = () => {
    handleOpen();
    const newPage = lengthPartners === 1 ? page - 1 : page;
    if (setPage && lengthPartners === 1) {
      setPage(newPage === -1 ? 0 : newPage);
      setLocalStorage(StorageKeys.PAGE, newPage === -1 ? 0 : newPage);
    }
    dispatch(
      deletePartner({
        idParams: { partnerId: partner.partnerId },
        optionParams: {
          searchValue: filterName,
          itemsPerPage: rowsPerPage,
          currentPage: (newPage === -1 ? 0 : newPage) + 1,
          sortBy: sortBy,
        },
        navigate,
      })
    );
  };

  const handleUpdateStatus = () => {
    const paramUpdate: Params<ToUpdateStatus> = {
      data: {
        status: partner.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        partnerId: partner?.partnerId,
      },
      optionParams: {
        searchValue: filterName,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: sortBy,
      },
      navigate,
    };
    dispatch(updateStatusPartner(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={partner.name} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={100} align="center" onClick={handleOpenDetail}>
          {index + 1}
        </TableCell>
        {selected.includes(OrderSortBy.LOGO) && (
          <TableCell component="th" scope="row" padding="none" width={200} onClick={handleOpenDetail}>
            <Avatar alt={partner.name} src={partner.logo} />
          </TableCell>
        )}
        <TableCell align="left" padding="none" width={250} onClick={handleOpenDetail}>
          {partner.name}
        </TableCell>
        {selected.includes(OrderSortBy.TAX_COMMISSION) && (
        <TableCell align="left" padding="none" width={250} onClick={handleOpenDetail}>
          {partner.taxCommission}
        </TableCell>   )}
        <TableCell align="left" onClick={handleOpenDetail}>
          <Label
            color={
              partner?.status === Status.ACTIVE
                ? Color.SUCCESS
                : partner?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {partner?.status === Status.INACTIVE
              ? translate('status.inactive')
              : partner?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>

        {showAction && (
          <TableCell align="right">
            <Stack direction="row" alignItems="center" justifyContent="right">
              <Switch
                size="small"
                onClick={handleUpdateStatus}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={partner.status === Status.DEACTIVE}
                checked={partner.status === Status.INACTIVE || partner.status === Status.DEACTIVE ? false : true}
                color={partner?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
              />
              <IconButton color="inherit" onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </TableCell>
        )}
      </TableRow>

      <Popover
        type={PopoverType.EDIT}
        open={open}
        handleCloseMenu={handleCloseMenu}
        onEdit={handleEdit}
        onDelete={handleOpen}
      />

      {isOpenCreate && (
        <CreatePartnerModal
          page={page + 1}
          rowsPerPage={rowsPerPage}
          isOpen={isOpenCreate}
          handleOpen={handleOpenCreate}
          filterName={filterName}
          sortBy={sortBy}
        />
      )}

      {isOpenDetail && (
        <PartnerDetailModal
          partner={partner}
          isOpen={isOpenDetail}
          handleOpen={handleOpenDetail}
          filterName={filterName}
          sortBy={sortBy}
        />
      )}

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={partner.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.partner') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.partner') })}
        />
      )}
    </>
  );
}

export default PartnerTableRow;
