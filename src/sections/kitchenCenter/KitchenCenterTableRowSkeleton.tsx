import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';
import { OrderSortBy } from 'common/@types';

function KitchenCenterTableRowSkeleton({ length, selected }: { length: number; selected: readonly string[] }) {
  return (
    <TableBody>
      {Array.from({ length: length ? length : 5 }).map((_, index: any) => (
        <TableRow key={index}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>

          {selected.includes(OrderSortBy.LOGO) && (
            <TableCell component="th" scope="row" width={80}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
          )}

          <TableCell align="left" width={selected.includes(OrderSortBy.LOGO) ? 250 : 250}>
            <Skeleton />
          </TableCell>

          {selected.includes(OrderSortBy.ADDRESS) && (
            <TableCell align="left" width={selected.includes(OrderSortBy.LOGO) ? 450 : 600}>
              <Skeleton />
            </TableCell>
          )}

          <TableCell align="left">
            <Skeleton variant="rounded" width={100} height={24} />
          </TableCell>

          <TableCell align="right">
            <Stack direction="row" alignItems="center" justifyContent="right">
              <Skeleton variant="rounded" width={30} height={14} />
              <IconButton color="inherit">
                <Skeleton variant="circular" width={28} height={28} />
              </IconButton>
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default KitchenCenterTableRowSkeleton;
