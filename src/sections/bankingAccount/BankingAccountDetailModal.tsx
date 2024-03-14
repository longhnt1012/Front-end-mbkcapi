import { useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { deleteBankingAccount, setEditBankingAccount } from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch } from 'redux/configStore';
// section
import CreateBankingAccountModal from './CreateBankingAccountModal';
//
import { Color, Language, Status } from 'common/enums';
import { BankingAccount } from 'common/models';
import { ConfirmDialog, ContentLabel, Popover } from 'components';
import { useLocales, useModal, usePagination, usePopover } from 'hooks';

interface BankingAccountDetailModalProps {
  bankingAccount?: BankingAccount | null;
  isOpen: boolean;
  handleOpen: (title: any) => void;
  filterName: string;
  sortBy: string;
}

function BankingAccountDetailModal({
  bankingAccount,
  isOpen,
  handleOpen,
  filterName,
  sortBy,
}: BankingAccountDetailModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { page, rowsPerPage } = usePagination();
  const { translate, currentLang } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();
  const { handleOpen: handleOpenCreate, isOpen: isOpenCreate } = useModal();
  const { handleOpen: handleOpenDelete, isOpen: isOpenDelete } = useModal();

  const handleEdit = () => {
    handleOpenCreate();
    dispatch(setEditBankingAccount(bankingAccount));
  };

  const handleDelete = () => {
    handleOpenDelete();
    dispatch(
      deleteBankingAccount({
        idParams: { bankingAccountId: bankingAccount?.bankingAccountId },
        optionParams: {
          searchValue: filterName,
          itemsPerPage: rowsPerPage,
          currentPage: page + 1,
          sortBy: sortBy,
        },
        navigate,
      })
    );
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">
                {translate('page.title.detail', {
                  model:
                    currentLang.value === Language.ENGLISH
                      ? translate('model.capitalizeOne.bankingAccount')
                      : translate('model.lowercase.bankingAccount'),
                })}
              </Typography>
              <IconButton color="inherit" onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 3.5 }} />

            <Stack width="100%" direction="row" alignItems="center" gap={4}>
              <Avatar alt={bankingAccount?.name} src={bankingAccount?.logoUrl} sx={{ height: 150, width: 150 }} />
              <Stack width="100%" gap={0.5}>
                <ContentLabel
                  divider={false}
                  title={translate('table.status')}
                  color={
                    bankingAccount?.status === Status.ACTIVE
                      ? Color.SUCCESS
                      : bankingAccount?.status === Status.INACTIVE
                      ? Color.WARNING
                      : Color.ERROR
                  }
                  content={
                    bankingAccount?.status === Status.INACTIVE
                      ? translate('status.inactive')
                      : bankingAccount?.status === Status.ACTIVE
                      ? translate('status.active')
                      : translate('status.deactive')
                  }
                />
                <Typography variant="subtitle1">
                  {translate('table.name')}:{' '}
                  <Typography component="span" variant="body1">
                    {bankingAccount?.name}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1">
                  {translate('page.form.numberAccount')}:{' '}
                  <Typography component="span" variant="body1">
                    {bankingAccount?.numberAccount}
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              {translate('button.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpenDelete} />

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
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.capitalize.bankingAccount') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.bankingAccount') })}
        />
      )}
    </>
  );
}

export default BankingAccountDetailModal;
