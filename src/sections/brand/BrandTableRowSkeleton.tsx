import { IconButton, Skeleton, Stack, TableCell, TableRow, TableBody } from '@mui/material';
import { OrderSortBy } from 'common/@types';

function BrandTableRowSkeleton({ length, selected }: { length: number; selected: readonly string[] }) {
  return (
    <TableBody>
      {Array.from({ length: length > 0 ? length : 5 }).map((_, index) => (
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

          <TableCell
            align="left"
            width={
              !selected.includes(OrderSortBy.LOGO) && selected.includes(OrderSortBy.ADDRESS)
                ? 203
                : !selected.includes(OrderSortBy.ADDRESS) && selected.includes(OrderSortBy.LOGO)
                ? 400
                : !selected.includes(OrderSortBy.LOGO) && !selected.includes(OrderSortBy.ADDRESS)
                ? 430
                : 190
            }
          >
            <Skeleton width={200} />
          </TableCell>

          {selected.includes(OrderSortBy.ADDRESS) && (
            <TableCell align="left" width={selected.includes(OrderSortBy.LOGO) ? 537 : 580}>
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

export default BrandTableRowSkeleton;
