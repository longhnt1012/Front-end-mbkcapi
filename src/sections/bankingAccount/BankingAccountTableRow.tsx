import { useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow, Typography, Stack } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import {
  deleteBankingAccount,
  setEditBankingAccount,
  updateStatusBankingAccount,
} from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch } from 'redux/configStore';
//
import { OrderSortBy, Params } from 'common/@types';
import { BankingAccount, ToUpdateStatus } from 'common/models';
import { Color, Status } from 'common/enums';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';

import BankingAccountDetailModal from './BankingAccountDetailModal';
import CreateBankingAccountModal from './CreateBankingAccountModal';
import { Dispatch, SetStateAction } from 'react';
import { setLocalStorage } from 'utils';
import { StorageKeys } from 'constants/storageKeys';

interface BankingAccountTableRowProps {
  index: number;
  length?: number;
  bankingAccount: BankingAccount;
  page: number;
  rowsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  selected: readonly string[];
  filterName: string;
  sortBy: string;
}

function BankingAccountTableRow({
  index,
  length,
  bankingAccount,
  page,
  rowsPerPage,
  setPage,
  selected,
  filterName,
  sortBy,
}: BankingAccountTableRowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { translate } = useLocales();
  const { handleOpen: handleOpenDelete, isOpen: isOpenDelete } = useModal();
  const { handleOpen: handleOpenModalDetail, isOpen: isOpenModalDetail } = useModal();
  const { handleOpen: handleOpenCreate, isOpen: isOpenCreate } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {
    handleOpenCreate();
    dispatch(setEditBankingAccount(bankingAccount));
  };

  const handleDelete = () => {
    handleOpenDelete();
    const newPage = length === 1 ? page - 1 : page;
    if (setPage && length === 1) {
      setPage(newPage === -1 ? 0 : newPage);
      setLocalStorage(StorageKeys.PAGE, newPage === -1 ? 0 : newPage);
    }
    dispatch(
      deleteBankingAccount({
        idParams: { bankingAccountId: bankingAccount?.bankingAccountId },
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

  const handleChangeStatus = () => {
    const paramUpdate: Params<ToUpdateStatus> = {
      data: {
        status: bankingAccount.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: { bankingAccountId: bankingAccount?.bankingAccountId },
      optionParams: {
        searchValue: filterName,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: sortBy,
      },
      navigate,
    };
    dispatch(updateStatusBankingAccount(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell width={100} align="center" onClick={handleOpenModalDetail}>
          {index + 1}
        </TableCell>
        {selected.includes(OrderSortBy.LOGO_URL) && (
          <TableCell scope="row" component="th" width={200} onClick={handleOpenModalDetail}>
            <Avatar alt={bankingAccount.name} src={bankingAccount.logoUrl} />
          </TableCell>
        )}
        <TableCell
          component="th"
          scope="row"
          onClick={handleOpenModalDetail}
          width={!selected.includes(OrderSortBy.LOGO_URL) ? 450 : 400}
        >
          <Typography variant="subtitle2" noWrap>
            {bankingAccount.name}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={handleOpenModalDetail}>
          <Label
            color={
              bankingAccount?.status === Status.ACTIVE
                ? Color.SUCCESS
                : bankingAccount?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {bankingAccount?.status === Status.INACTIVE
              ? translate('status.inactive')
              : bankingAccount?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Stack direction="row" alignItems="center" justifyContent="right">
            <Switch
              value={bankingAccount.status}
              onChange={handleChangeStatus}
              size="small"
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={bankingAccount.status === Status.DEACTIVE}
              checked={
                bankingAccount.status === Status.INACTIVE || bankingAccount.status === Status.DEACTIVE ? false : true
              }
              color={bankingAccount?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
            />
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpenDelete} />

      {isOpenModalDetail && (
        <BankingAccountDetailModal
          isOpen={isOpenModalDetail}
          handleOpen={handleOpenModalDetail}
          bankingAccount={bankingAccount}
          filterName={filterName}
          sortBy={sortBy}
        />
      )}

      {isOpenCreate && (
        <CreateBankingAccountModal
          page={page + 1}
          rowsPerPage={rowsPerPage}
          isOpen={isOpenCreate}
          handleOpen={handleOpenCreate}
          filterName={filterName}
          sortBy={sortBy}
        />
      )}

      {isOpenDelete && (
        <ConfirmDialog
          open={isOpenDelete}
          onClose={handleOpenDelete}
          onAction={handleDelete}
          model={bankingAccount?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.bankingAccount') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.bankingAccount') })}
        />
      )}
    </>
  );
}

export default BankingAccountTableRow;
