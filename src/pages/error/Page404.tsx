// @mui
import { Box, Button, Container, Typography } from '@mui/material';
//
import images from 'assets';
import { Helmet } from 'components';
import { useLocales, useNavigate } from 'hooks';
import { StyledContent } from './styles';

// ----------------------------------------------------------------------

function Page404() {
  const { translate } = useLocales();
  const { handleNavigateDashboard } = useNavigate();

  return (
    <>
      <Helmet title="404 Page Not Found" />

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {translate('error.notFoundTitle')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>{translate('error.notFoundContent')}</Typography>

          <Box
            component="img"
            alt="Not found"
            src={images.illustrations.not_found}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button size="large" color="inherit" variant="contained" onClick={handleNavigateDashboard}>
            {translate('button.goHome')}
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}

export default Page404;
