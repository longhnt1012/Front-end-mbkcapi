import { Box, Container, LinearProgress, Typography } from '@mui/material';
// hooks
import useResponsive from 'hooks/useResponsive';
// // components
import { Helmet, Logo } from 'components';
// sections
import { LoginForm } from 'sections/auth';
// redux
import { useAppSelector } from 'redux/configStore';
//
import images from 'assets';
import { useLocales } from 'hooks';
import { StyledContent, StyledRootLogin, StyledSection } from './styles';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md', 'md');

  const { isLoading } = useAppSelector((state) => state.auth);

  return (
    <>
      <Helmet title={translate('auth.login.title')} />

      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      <StyledRootLogin>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              {translate('common.welcome')}
            </Typography>
            <Box sx={{ px: 7 }}>
              <img src={images.illustrations.kitchen_login} alt="login" />
            </Box>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {translate('auth.login.title')}
            </Typography>

            <Typography variant="body2" sx={{ mb: 7 }}>
              {translate('auth.login.content')}
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRootLogin>
    </>
  );
}
