import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
// redux
import { logout, updatePassword } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import images from 'assets';
import { Params, UpdatePasswordForm } from 'common/@types';
import { Color } from 'common/enums';
import { InputField } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { hashPasswordMD5 } from 'utils';
import { CircularProgress } from '@mui/material';

interface UpdatePasswordToUseModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

function UpdatePasswordToUseModal({ isOpen, handleOpen, handleClose }: UpdatePasswordToUseModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { schemaUpdatePassword } = useValidationForm();

  const { userAuth, isLoading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

  const updatePasswordForm = useForm<UpdatePasswordForm>({
    defaultValues: {},
    resolver: yupResolver(schemaUpdatePassword),
  });

  const { handleSubmit } = updatePasswordForm;

  const onSubmit = async (values: UpdatePasswordForm) => {
    const hashPassword = hashPasswordMD5(values.newPassword);
    const params: Params<Omit<UpdatePasswordForm, 'confirmPassword'>> = {
      data: { newPassword: hashPassword },
      idParams: { accountId: userAuth?.accountId },
      navigate,
    };
    dispatch(updatePassword(params));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={userAuth?.isConfirmed ? handleOpen : handleClose}>
          <FormProvider {...updatePasswordForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.update', {
                    model: translate('page.form.password'),
                  })}
                </Typography>
                <IconButton disabled={!userAuth?.isConfirmed} onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3} pb={1}>
                <Stack alignItems="center" gap={4} py={3}>
                  <Box width={300} component="img" src={images.illustrations.kitchen_login} alt="store" />
                  {userAuth?.isConfirmed ? (
                    <Stack direction="column" alignItems="center" gap={2}>
                      <Typography variant="h6" sx={{ color: (theme) => theme.palette.success.main }}>
                        {translate('common.welcomeMBKC')}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: (theme) => theme.palette.success.main }}>
                        {translate('dialog.updatePasswordSuccess')}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography variant="subtitle1" sx={{ color: (theme) => theme.palette.error.main }}>
                      {translate('dialog.updatePasswordContent')}
                    </Typography>
                  )}
                </Stack>

                {isLoading ? (
                  <Stack alignItems="center" justifyContent="center" height={150}>
                    <CircularProgress />
                  </Stack>
                ) : (
                  <>
                    {userAuth?.isConfirmed ? (
                      <Stack width="100%" alignItems="center" pt={3} pb={1}>
                        <IconButton color="success">
                          <TaskAltIcon sx={{ fontSize: 100 }} />
                        </IconButton>
                      </Stack>
                    ) : (
                      <Stack width="100%" gap={2}>
                        <InputField
                          fullWidth
                          size="large"
                          name="newPassword"
                          label={translate('page.form.newPassword')}
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <InputField
                          fullWidth
                          size="large"
                          name="confirmPassword"
                          label={translate('page.form.confirmPassword')}
                          type={showPasswordConfirm ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} edge="end">
                                  {showPasswordConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                    )}
                  </>
                )}
              </Stack>
            </DialogContent>
            {userAuth?.isConfirmed ? (
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button variant="contained" onClick={handleOpen}>
                  {translate('button.continue')}
                </Button>
              </DialogActions>
            ) : (
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                  variant="contained"
                  disabled={isLoading}
                  color="inherit"
                  onClick={() => dispatch(logout(navigate))}
                >
                  {translate('header.logout')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  color={Color.WARNING}
                  onClick={handleSubmit(onSubmit)}
                >
                  {translate('button.update')}
                </Button>
              </DialogActions>
            )}
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default UpdatePasswordToUseModal;
