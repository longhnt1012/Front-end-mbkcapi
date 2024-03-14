import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import images from 'assets';
import { Role } from 'common/enums';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';

// ----------------------------------------------------------------------

export interface LogoProps {
  sx?: object;
  disabledLink?: boolean;
}

const Logo = forwardRef(({ disabledLink = false, sx, ...other }: LogoProps, ref) => {
  const { userAuth } = useAppSelector((state) => state.auth);

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'inline-flex',
        color: (theme) => theme.palette.primary.main,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        ...sx,
      }}
      {...other}
    >
      <Box component="img" alt="logo" src={images.logo.logo_mbkc} sx={{ width: 70, height: 70 }} />
      <Box component="img" alt="logo text" src={images.logo.logo_mbkc_text} sx={{ height: 45, mt: 1.5 }} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link
      to={
        userAuth?.roleName === Role.BRAND_MANAGER
          ? PATH_BRAND_APP.root
          : userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
          ? PATH_KITCHEN_CENTER_APP.root
          : userAuth?.roleName === Role.CASHIER
          ? PATH_CASHIER_APP.root
          : PATH_ADMIN_APP.root
      }
      component={RouterLink}
      sx={{ display: 'contents' }}
    >
      {logo}
    </Link>
  );
});

export default Logo;
