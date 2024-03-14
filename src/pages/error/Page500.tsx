import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Container, Typography } from '@mui/material';
//
import images from 'assets';
import { Helmet } from 'components';
import { useLocales } from 'hooks';
import { StyledContent } from './styles';

// ----------------------------------------------------------------------

function Page500() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet title="500 Internal Server Error" />

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {translate('error.serverTitle')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>{translate('error.serverContent')}</Typography>

          <Box
            component="img"
            alt="Server error"
            src={images.illustrations.server_error}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" color="inherit" variant="contained" component={RouterLink}>
            {translate('button.goHome')}
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}

export default Page500;
