/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Popover as MUIPopover,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
// @mui icon
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { getUserInformation } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import { UpdatePasswordModal, UpdatePasswordToUseModal } from 'sections/auth';
import { ProfileDetailSkeleton } from 'sections/information';
//
import images from 'assets';
import { Color, Role, Status } from 'common/enums';
import { Label, Page } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();
  const { isOpen: isOpenUpdate, handleOpen: handleOpenUpdate } = useModal();

  const { userAuth, userInfo, isLoading } = useAppSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      console.log(reason);
    } else {
      setIsOpen(false);
    }
  };

  const paramsInfo = useMemo(() => {
    return {
      accountId: userAuth?.accountId,
      navigate,
    };
  }, [userAuth?.accountId]);

  useEffect(() => {
    if (userAuth?.isConfirmed) {
      dispatch<any>(getUserInformation(paramsInfo));
    } else {
      handleOpen();
    }
  }, [paramsInfo]);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('model.capitalizeOne.accountInformation')}
        navigateDashboard={
          userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
            ? PATH_KITCHEN_CENTER_APP.root
            : userAuth?.roleName === Role.BRAND_MANAGER
            ? PATH_BRAND_APP.root
            : userAuth?.roleName === Role.CASHIER
            ? PATH_CASHIER_APP.root
            : PATH_ADMIN_APP.root
        }
      >
        <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
          {isLoading ? (
            <ProfileDetailSkeleton />
          ) : (
            <Card sx={{ width: '70%' }}>
              <Box width="100%" height="100px" sx={{ background: '#000' }}></Box>
              <Stack gap={1.5} p={3} mt={-8}>
                <Stack direction="row" alignItems="end" justifyContent="space-between" spacing={2}>
                  <Stack direction="row" alignItems="end" gap={2}>
                    <Avatar src={images.common.avatar_default} alt="PhuSon" sx={{ width: 100, height: 100 }} />
                    <Stack>
                      <Typography variant="body1" noWrap sx={{ textDecoration: 'underline' }}>
                        {translate('header.account')}:
                      </Typography>
                      <Typography variant="subtitle1" noWrap>
                        {userInfo?.email}
                      </Typography>
                    </Stack>
                  </Stack>
                  <IconButton color="inherit" onClick={handleOpenMenu}>
                    <MoreVertIcon />
                  </IconButton>
                </Stack>

                <Divider sx={{ my: 1.5 }} />

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ color: (theme) => theme.palette.grey[500] }}>{translate('table.role')}:</Typography>
                  <Typography variant="subtitle1">
                    {userInfo?.roleName === Role.MBKC_ADMIN
                      ? translate('role.mbkcAdmin')
                      : userInfo?.roleName === Role.BRAND_MANAGER
                      ? translate('role.brandManager')
                      : userInfo?.roleName === Role.KITCHEN_CENTER_MANAGER
                      ? translate('role.kitchenCenterManager')
                      : userInfo?.roleName === Role.CASHIER
                      ? translate('role.cashier')
                      : translate('header.account')}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ color: (theme) => theme.palette.grey[500] }}>
                    {translate('table.status')}:
                  </Typography>
                  <Label color={userInfo?.status === Status.ACTIVE ? Color.SUCCESS : Color.ERROR}>
                    {userInfo?.status === Status.INACTIVE
                      ? translate('status.inactive')
                      : userInfo?.status === Status.ACTIVE
                      ? translate('status.active')
                      : ''}
                  </Label>
                </Stack>
              </Stack>
            </Card>
          )}
        </Stack>
      </Page>

      <MUIPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 0.5,

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
            handleOpenUpdate();
            handleCloseMenu();
          }}
        >
          <EditRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.updatePassword')}
        </MenuItem>
      </MUIPopover>

      {isOpenUpdate && <UpdatePasswordModal isOpen={isOpenUpdate} handleOpen={handleOpenUpdate} />}

      {isOpen && <UpdatePasswordToUseModal isOpen={isOpen} handleOpen={handleOpen} handleClose={handleClose} />}
    </>
  );
}

export default ProfilePage;
