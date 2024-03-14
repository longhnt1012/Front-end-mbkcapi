import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
// redux
import { useAppDispatch } from 'redux/configStore';
import { setStatus } from 'redux/auth/authSlice';
//
import { NavItem as NavItemInterface } from 'common/@types';
import { Breadcrumb } from 'common/enums';
import { StorageKeys } from 'constants/storageKeys';
import { removeLocalStorage } from 'utils';

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface NavItemProps {
  item: NavItemInterface;
}

function NavItem({ item }: NavItemProps) {
  const { title, path, icon } = item;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname: location } = useLocation();

  const pathItems = path.split('/').filter((x) => x);
  const locationItems = location.split('/').filter((x) => x);

  const pathModel =
    pathItems[1] === Breadcrumb.BRANDS
      ? Breadcrumb.BRAND
      : pathItems[1] === Breadcrumb.KITCHEN_CENTERS
      ? Breadcrumb.KITCHEN_CENTER
      : pathItems[1] === Breadcrumb.STORES
      ? Breadcrumb.STORE
      : pathItems[1] === Breadcrumb.PARTNERS
      ? Breadcrumb.PARTNER
      : pathItems[1] === Breadcrumb.STORE_PARTNERS
      ? Breadcrumb.STORE_PARTNER
      : pathItems[1] === Breadcrumb.CATEGORIES
      ? Breadcrumb.CATEGORY
      : pathItems[1] === Breadcrumb.EXTRA_CATEGORIES
      ? Breadcrumb.EXTRA_CATEGORY
      : pathItems[1] === Breadcrumb.PRODUCTS
      ? Breadcrumb.PRODUCT
      : pathItems[1] === Breadcrumb.PARTNER_PRODUCTS
      ? Breadcrumb.PARTNER_PRODUCT
      : pathItems[1] === Breadcrumb.CASHIERS
      ? Breadcrumb.CASHIER
      : pathItems[1] === Breadcrumb.ORDERS
      ? Breadcrumb.ORDER
      : pathItems[1] === Breadcrumb.BANKING_ACCOUNTS
      ? Breadcrumb.BANKING_ACCOUNT
      : pathItems[1] === Breadcrumb.TRANSACTIONS
      ? Breadcrumb.TRANSACTION
      : '';
  const active = locationItems[1] === pathModel || locationItems[1] === pathItems[1];

  return (
    <ListItemButton
      disableGutters
      sx={(theme) => ({
        ...theme.typography.body2,
        height: 48,
        borderRadius: '6px',
        position: 'relative',
        textTransform: 'capitalize',
        color: active ? theme.palette.primary.main : theme.palette.text.secondary,
        fontWeight: active ? theme.typography.fontWeightBold : theme.typography.fontWeightLight,
        bgcolor: active ? theme.palette.primary.lighter : 'none',
        '&:hover': {
          bgcolor: active ? theme.palette.primary.lighter : 'none',
        },
      })}
      onClick={() => {
        navigate(path);
        dispatch(setStatus());
        removeLocalStorage(StorageKeys.PAGE);
        removeLocalStorage(StorageKeys.ROW_PER_PAGE);
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />
    </ListItemButton>
  );
}

interface NavSectionProps {
  data: NavItemInterface[];
}

function NavSection({ data = [], ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1, pl: 1.4 }}>
        {data.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
}

export default NavSection;
