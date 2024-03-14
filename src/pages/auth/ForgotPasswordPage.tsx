import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Card, LinearProgress, Link as MuiLink, Stack, Typography } from '@mui/material';
// redux
import { forgotPassword, setEmail } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { EmailForm } from 'common/@types';
import images from 'assets';
import { Helmet, InputField, Logo } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_AUTH } from 'routes/paths';
import { StyledContent, StyledRoot } from './styles';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { schemaForgotPassword } = useValidationForm();

  const { isLoading } = useAppSelector((state) => state.auth);

  const forgotPasswordForm = useForm<EmailForm>({
    defaultValues: {},
    resolver: yupResolver(schemaForgotPassword),
  });

  const { handleSubmit } = forgotPasswordForm;

  const handleForgotPassword = (values: EmailForm) => {
    const params = {
      data: { ...values },
      navigate,
    };
    dispatch(setEmail(values));
    dispatch(forgotPassword(params));
  };

  return (
    <>
      <Helmet title={translate('auth.forgotPassword.title')} />

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
            <FormProvider {...forgotPasswordForm}>
              <Stack direction="column" alignItems="center" justifyContent="center" gap={5}>
                <Stack direction="column" alignItems="center" textAlign="center" gap={1} px={3}>
                  <Box px={10}>
                    <img src={images.illustrations.email} alt="email" />
                  </Box>
                  <Typography variant="h3">{translate('auth.forgotPassword.title')}</Typography>
                  <Typography variant="body2" color="GrayText">
                    {translate('auth.forgotPassword.content')}
                  </Typography>
                </Stack>

                <Stack width="100%" alignItems="center" gap={4} px={2}>
                  <InputField fullWidth size="large" name="email" label={translate('page.form.email')} />

                  <Stack width="100%" px={3}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      onClick={handleSubmit(handleForgotPassword)}
                    >
                      {translate('button.sendEmail')}
                    </Button>
                  </Stack>

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

export default ForgotPasswordPage;
