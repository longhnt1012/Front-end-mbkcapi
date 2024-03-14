import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
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
import { updatePassword } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { Params, UpdatePasswordForm } from 'common/@types';
import { Color } from 'common/enums';
import { InputField } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { hashPasswordMD5 } from 'utils';

interface UpdatePasswordModalProps {
  isOpen: boolean;
  handleOpen: () => void;
}

function UpdatePasswordModal({ isOpen, handleOpen }: UpdatePasswordModalProps) {
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
    handleOpen();
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
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...updatePasswordForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.update', {
                    model: translate('page.form.password'),
                  })}
                </Typography>
                <IconButton onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3} pb={1}>
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
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button variant="contained" disabled={isLoading} color="inherit" onClick={handleOpen}>
                {translate('button.cancel')}
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
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default UpdatePasswordModal;
