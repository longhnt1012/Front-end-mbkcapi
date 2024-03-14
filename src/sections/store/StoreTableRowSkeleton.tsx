import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';
import { OrderSortBy } from 'common/@types';
import { Role } from 'common/enums';
import { useAppSelector } from 'redux/configStore';
import { getRuleWidths } from './rules';

interface StoreTableRowSkeletonProps {
  length?: number;
  selected: readonly string[];
  showAction?: boolean;
}

function StoreTableRowSkeleton({ length, selected, showAction = false }: StoreTableRowSkeletonProps) {
  const rules = getRuleWidths(selected);
  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index: any) => (
        <TableRow key={index}>
          <TableCell width={60} align="center" sx={{ height: '72.89px' }}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          {selected.includes(OrderSortBy.LOGO) && (
            <TableCell component="th" scope="row" padding="none" width={70}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
          )}
          <TableCell width={rules.name} align="left" padding="none" sx={{ pr: 2 }}>
            <Skeleton width={200} />
          </TableCell>
          {selected.includes(OrderSortBy.STORE_MANAGER_EMAIL) && (
            <TableCell width={rules.store_manager_email} align="left">
              <Skeleton />
            </TableCell>
          )}
          {selected.includes(OrderSortBy.KITCHEN_CENTER) && (
            <TableCell width={rules.kitchen_center} align="left">
              <Skeleton />
            </TableCell>
          )}
          {selected.includes(OrderSortBy.BRAND) && (
            <TableCell width={rules.brand} align="left">
              <Skeleton />
            </TableCell>
          )}
          <TableCell align="left">
            <Skeleton variant="rounded" width={100} height={24} />
          </TableCell>
          {showAction && (
            <TableCell align="right">
              {userAuth?.roleName === Role.BRAND_MANAGER ? (
                <Stack direction="row" alignItems="center" justifyContent="right">
                  <Skeleton variant="rounded" width={30} height={14} />
                  <IconButton color="inherit">
                    <Skeleton variant="circular" width={28} height={28} />
                  </IconButton>
                </Stack>
              ) : userAuth?.roleName === Role.MBKC_ADMIN ? (
                <IconButton color="inherit">
                  <Skeleton variant="circular" width={28} height={28} />
                </IconButton>
              ) : (
                <></>
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default StoreTableRowSkeleton;
