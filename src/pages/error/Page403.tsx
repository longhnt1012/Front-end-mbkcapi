import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Container, Typography } from '@mui/material';
//
import { logout } from 'redux/auth/authSlice';
import { useAppDispatch } from 'redux/configStore';
//
import images from 'assets';
import { Helmet } from 'components';
import { useLocales } from 'hooks';
import { StyledContent } from './styles';

// ----------------------------------------------------------------------

function Page403() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <>
      <Helmet title="403 Page No Permission" />

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {translate('error.permissionTitle')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}> {translate('error.permissionContent')}</Typography>

          <Box
            component="img"
            alt="No permissions"
            src={images.illustrations.no_permission}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button size="large" color="inherit" variant="contained" onClick={handleLogout}>
            {translate('button.loginAgain')}
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}

export default Page403;
