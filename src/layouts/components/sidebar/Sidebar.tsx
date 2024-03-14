import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Drawer, Stack, Typography } from '@mui/material';
// hooks
import { useResponsive } from 'hooks';
// components
import { Logo, NavSection } from 'components';
//
import images from 'assets';
import { Role } from 'common/enums';
import { useAppSelector } from 'redux/configStore';
import { useConfigSidebar } from './useConfigSidebar';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

interface SidebarProps {
  openNav: boolean;
  onCloseNav: () => void;
}

function Sidebar({ openNav, onCloseNav }: SidebarProps) {
  const { pathname } = useLocation();
  const { navAdmin, navBrand, navKitchenCenter, navCashier } = useConfigSidebar();

  const { userAuth } = useAppSelector((state) => state.auth);

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Stack
      justifyContent="space-between"
      sx={(theme) => ({
        bgcolor: '#fff',
        height: '100vh',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': { width: 5 },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 2,
          bgcolor: theme.palette.grey[500],
        },
      })}
    >
      <Box>
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
          <Logo />
        </Box>

        {userAuth?.roleName === Role.MBKC_ADMIN && (
          <Box width="100%">
            {navAdmin.map((navItem, index) => (
              <Box key={index} mb={1}>
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: (theme) => theme.palette.grey[600],
                  }}
                >
                  {navItem.missions}
                </Typography>
                <NavSection data={navItem.listNav} />
              </Box>
            ))}
          </Box>
        )}
        {userAuth?.roleName === Role.BRAND_MANAGER && (
          <Box width="100%">
            {navBrand.map((navItem, index) => (
              <Box key={index} mb={1}>
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: (theme) => theme.palette.grey[600],
                  }}
                >
                  {navItem.missions}
                </Typography>
                <NavSection data={navItem.listNav} />
              </Box>
            ))}
          </Box>
        )}
        {userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER && (
          <Box width="100%">
            {navKitchenCenter.map((navItem, index) => (
              <Box key={index} mb={1}>
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: (theme) => theme.palette.grey[600],
                  }}
                >
                  {navItem.missions}
                </Typography>
                <NavSection data={navItem.listNav} />
              </Box>
            ))}
          </Box>
        )}
        {userAuth?.roleName === Role.CASHIER && (
          <Box width="100%">
            {navCashier.map((navItem, index) => (
              <Box key={index} mb={1}>
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: (theme) => theme.palette.grey[600],
                  }}
                >
                  {navItem.missions}
                </Typography>
                <NavSection data={navItem.listNav} />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Stack alignItems="center" sx={{ py: 3 }}>
        {userAuth?.roleName === Role.BRAND_MANAGER ? (
          <Box width={200} component="img" src={images.illustrations.mbkc_cook} alt="brand" />
        ) : userAuth?.roleName === Role.CASHIER ? (
          <Box width={200} component="img" src={images.common.cashier_sidebar} alt="cashier" />
        ) : (
          <Box width={200} component="img" src={images.illustrations.kitchen_login} alt="admin-kitchenCenter" />
        )}
      </Stack>
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
