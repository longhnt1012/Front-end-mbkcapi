import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, InputBase, Stack, Switch, Typography } from '@mui/material';
// @mui icon
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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

interface OnlyPartnerRowProps {
  storeId: number;
  partner: PartnerInStore;
}

function OnlyPartnerRow({ partner, storeId }: OnlyPartnerRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenUpdate, isOpen: isOpenUpdate } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEdit = () => {
    dispatch(setEditStorePartner(partner));
    handleOpenUpdate();
  };

  const handleDelete = () => {
    handleOpen();
    dispatch(
      deleteStorePartner({
        idParams: { storeId: storeId, partnerId: partner.partnerId },
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
      <Stack direction="row" alignItems="center" sx={{ cursor: 'pointer', height: '72.89px' }}>
        <Stack width={30}>
          <FiberManualRecordIcon sx={{ fontSize: 10, color: (theme) => theme.palette.grey[500] }} />
        </Stack>
        <Stack width={60}>
          <Avatar alt={partner.partnerName} src={partner.partnerLogo} />
        </Stack>
        <Stack width={140} px={2}>
          <Typography variant="subtitle2" noWrap>
            {partner.partnerName}
          </Typography>
        </Stack>
        <Stack width={140} px={2}>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500] }}>
            {translate('page.form.userName')}
          </Typography>
          <Typography variant="body2" lineHeight={2.286} noWrap>
            {partner.userName}
          </Typography>
        </Stack>
        <Stack width={160} px={2}>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500] }}>
            {translate('page.form.commission')}
          </Typography>
          <Typography variant="body2" lineHeight={2.286} noWrap>
            {partner.commission} %
          </Typography>
        </Stack>
        <Stack>
          <Stack direction="row" alignItems="end" gap={5} width={330} px={2}>
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
            </IconButton>

            <Stack>
              <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500] }}>
                {translate('page.form.password')}
              </Typography>
              <InputBase
                readOnly
                value={showPassword ? partner.password : '888888888'}
                type={showPassword ? 'text' : 'password'}
                sx={{ mb: 0.4 }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack>
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
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="right" sx={{ ml: 'auto' }}>
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
        </Stack>
      </Stack>

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

export default OnlyPartnerRow;
