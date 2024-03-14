import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
// redux
import { resetPassword } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { Params, ResetForm } from 'common/@types';
import images from 'assets';
import { Helmet, InputField, Logo } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_AUTH } from 'routes/paths';
import { hashPasswordMD5 } from 'utils';
import { StyledContent, StyledRoot } from './styles';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { schemaResetPassword } = useValidationForm();

  const { isLoading, email } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

  const resetPasswordForm = useForm<ResetForm>({
    defaultValues: {
      email: email ? email : '',
    },
    resolver: yupResolver(schemaResetPassword),
  });

  const { handleSubmit } = resetPasswordForm;

  const handleResetPassword = (values: ResetForm) => {
    const hashPassword = hashPasswordMD5(values.newPassword);
    const params: Params<Omit<ResetForm, 'confirmPassword'>> = {
      data: { email: values.email, newPassword: hashPassword },
      navigate,
    };
    dispatch(resetPassword(params));
  };

  return (
    <>
      <Helmet title={translate('auth.resetPassword.title')} />

      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <StyledContent>
          <Card sx={{ p: 3.5, width: 520 }}>
            <FormProvider {...resetPasswordForm}>
              <Stack direction="column" alignItems="center" justifyContent="center" gap={5}>
                <Stack direction="column" alignItems="center" textAlign="center" gap={1} px={5}>
                  <Box px={14}>
                    <img src={images.illustrations.otp} alt="email" />
                  </Box>
                  <Typography variant="h3">{translate('auth.resetPassword.title')}</Typography>
                  <Typography variant="body2">{translate('auth.resetPassword.content')}</Typography>
                </Stack>

                <Stack width="100%" alignItems="center" gap={2}>
                  <InputField
                    fullWidth
                    size="large"
                    name="email"
                    label={translate('page.form.email')}
                    disabled={email ? true : false}
                  />
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

                <Stack width="100%" alignItems="center" gap={4} px={3}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    onClick={handleSubmit(handleResetPassword)}
                  >
                    {translate('button.updatePassword')}
                  </Button>

                  <Box onClick={() => navigate(PATH_AUTH.login)} sx={{ cursor: 'pointer' }}>
                    <Stack direction="row" alignItems="center">
                      <KeyboardArrowLeftIcon fontSize="small" />
                      <MuiLink variant="subtitle2" underline="hover">
                        {translate('auth.backLogin')}
                      </MuiLink>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </FormProvider>
          </Card>
        </StyledContent>
      </StyledRoot>
    </>
  );
}

export default ResetPasswordPage;
