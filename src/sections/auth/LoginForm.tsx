import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, IconButton, InputAdornment, Link as MuiLink, Stack } from '@mui/material';
// @mui icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// redux
import { login, setIsLogout } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { LoginForm as LoginFormType } from 'common/@types';
import { InputField } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_AUTH } from 'routes/paths';
import { hashPasswordMD5 } from 'utils';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { schemaLogin } = useValidationForm();

  const { isLoading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginForm = useForm<LoginFormType>({
    defaultValues: {},
    resolver: yupResolver(schemaLogin),
  });

  const { handleSubmit } = loginForm;

  const handleLogin = (values: LoginFormType) => {
    const hashPassword = hashPasswordMD5(values.password).toLocaleLowerCase();
    const params = {
      data: { ...values, password: hashPassword },
      navigate,
    };
    dispatch(login(params));
    dispatch(setIsLogout(false));
  };

  return (
    <>
      <FormProvider {...loginForm}>
        <Stack spacing={3}>
          <InputField fullWidth size="large" name="email" defaultValue="" label={translate('page.form.email')} />

          <InputField
            fullWidth
            size="large"
            name="password"
            defaultValue=""
            label={translate('page.form.password')}
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
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="end" sx={{ mt: 2, mb: 7 }}>
          <Box onClick={() => navigate(PATH_AUTH.forgotPassword)} sx={{ cursor: 'pointer' }}>
            <MuiLink variant="subtitle2" underline="hover">
              {translate('auth.login.forgot')}
            </MuiLink>
          </Box>
        </Stack>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isLoading}
          onClick={handleSubmit(handleLogin)}
        >
          {translate('button.login')}
        </Button>
      </FormProvider>
    </>
  );
}

export default LoginForm;
