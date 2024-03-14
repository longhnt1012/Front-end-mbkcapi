import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, IconButton, InputBase, Stack, Switch, TableCell, TableRow, Box } from '@mui/material';
// redux
import { useAppDispatch } from 'redux/configStore';
import {
  deleteStorePartner,
  setEditStorePartner,
  updateStatusStorePartner,
} from 'redux/storePartner/storePartnerSlice';
//
import { Params } from 'common/@types';
import { PartnerInStore, ToUpdateStatus } from 'common/models';
import { Color, Status } from 'common/enums';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import UpdateStorePartnerModal from './UpdateStorePartnerModal';

interface StorePartnerTableDetailRowProps {
  partner: PartnerInStore;
  storeId: number;
  index: number;
}

function StorePartnerTableDetailRow({ index, partner, storeId }: StorePartnerTableDetailRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenUpdate, isOpen: isOpenUpdate } = useModal();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEdit = () => {
    dispatch(setEditStorePartner(partner));
    handleOpenUpdate();
  };

  const handleDelete = () => {
    handleOpen();
    dispatch(
      deleteStorePartner({
        idParams: { storeId, partnerId: partner.partnerId },
        pathname: pathname,
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
        storeId: storeId,
        partnerId: partner?.partnerId,
      },
      pathname: pathname,
      navigate,
    };
    dispatch(updateStatusStorePartner(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={80} align="center">
          {index + 1}
        </TableCell>

        <TableCell component="th" scope="row" width={100}>
          <Avatar alt={partner.partnerName} src={partner.partnerLogo} />
        </TableCell>

        <TableCell align="left">{partner.partnerName}</TableCell>

        <TableCell align="left">
          <Box pl={2}>{partner.commission} %</Box>
        </TableCell>
        <TableCell align="left">{partner.userName}</TableCell>
        <TableCell align="left">
          <Stack direction="row" alignItems="center" gap={3}>
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
            </IconButton>

            <Stack>
              <InputBase
                value={showPassword ? partner.password : '888888888'}
                type={showPassword ? 'text' : 'password'}
              />
            </Stack>
          </Stack>
        </TableCell>

        <TableCell align="left">
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

        <TableCell align="right">
          <Switch
            size="small"
            onClick={handleUpdateStatus}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={partner.status === Status.DEACTIVE}
            checked={partner.status === Status.ACTIVE ? true : false}
            color={partner?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
          />
          <IconButton color="inherit" disabled={partner.status === Status.DEACTIVE} onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />
      {isOpenUpdate && (
        <UpdateStorePartnerModal
          isOpen={isOpenUpdate}
          handleOpen={handleOpenUpdate}
          partnerId={partner.partnerId}
          storeId={storeId}
        />
      )}

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          model={partner.partnerName}
          onClose={handleOpen}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', {
            model: translate('model.lowercase.storePartner'),
          })}
          description={translate('dialog.confirmDeleteContent', {
            model: translate('model.lowercase.storePartner'),
          })}
        />
      )}
    </>
  );
}

export default StorePartnerTableDetailRow;
