import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';
import { OrderSortBy } from 'common/@types';

interface CategoryTableRowSkeletonProps {
  length: number;
  selected: readonly string[];
}

function CategoryTableRowSkeleton({ length, selected }: CategoryTableRowSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: length ? length : 5 }).map((_, index: any) => (
        <TableRow key={index}>
          <TableCell width={80} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          {selected.includes(OrderSortBy.IMAGE_URL) && (
            <TableCell component="th" scope="row" padding="none" width={100}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
          )}
          <TableCell
            align="left"
            width={
              !selected.includes(OrderSortBy.IMAGE_URL) &&
              !selected.includes(OrderSortBy.CODE) &&
              !selected.includes(OrderSortBy.DISPLAY_ORDER)
                ? 450
                : !selected.includes(OrderSortBy.CODE) && !selected.includes(OrderSortBy.DISPLAY_ORDER)
                ? 420
                : !selected.includes(OrderSortBy.IMAGE_URL) && !selected.includes(OrderSortBy.DISPLAY_ORDER)
                ? 350
                : !selected.includes(OrderSortBy.CODE) && !selected.includes(OrderSortBy.IMAGE_URL)
                ? 350
                : !selected.includes(OrderSortBy.CODE)
                ? 300
                : !selected.includes(OrderSortBy.DISPLAY_ORDER)
                ? 300
                : 250
            }
          >
            <Skeleton />
          </TableCell>
          {selected.includes(OrderSortBy.CODE) && (
            <TableCell
              align="left"
              width={
                !selected.includes(OrderSortBy.IMAGE_URL) && !selected.includes(OrderSortBy.DISPLAY_ORDER)
                  ? 350
                  : !selected.includes(OrderSortBy.DISPLAY_ORDER)
                  ? 300
                  : 200
              }
            >
              <Skeleton />
            </TableCell>
          )}
          {selected.includes(OrderSortBy.DISPLAY_ORDER) && (
            <TableCell
              align="left"
              width={
                !selected.includes(OrderSortBy.IMAGE_URL) && !selected.includes(OrderSortBy.CODE)
                  ? 350
                  : !selected.includes(OrderSortBy.CODE)
                  ? 300
                  : 200
              }
            >
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

export default CategoryTableRowSkeleton;
