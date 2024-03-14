import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow, Box } from '@mui/material';
import { OrderSortBy } from 'common/@types';

interface ProductTableRowSkeletonProps {
  length: number;
  selected: readonly string[];
}

function ProductTableRowSkeleton({ length, selected }: ProductTableRowSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: length ? length : 5 }).map((_, index: any) => (
        <TableRow key={index} sx={{ height: '72.89px' }}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            padding="none"
            width={
              !selected.includes(OrderSortBy.PARTNER_NAME) && !selected.includes(OrderSortBy.STORE_NAME)
                ? 400
                : !selected.includes(OrderSortBy.PARTNER_NAME)
                ? 300
                : !selected.includes(OrderSortBy.STORE_NAME)
                ? 300
                : 220
            }
          >
            <Skeleton width={200} />
          </TableCell>
          <TableCell
            align="left"
            width={
              !selected.includes(OrderSortBy.PARTNER_NAME) && !selected.includes(OrderSortBy.STORE_NAME)
                ? 400
                : !selected.includes(OrderSortBy.PARTNER_NAME)
                ? 340
                : !selected.includes(OrderSortBy.STORE_NAME)
                ? 340
                : 320
            }
          >
            <Box pr={5}>
              <Skeleton />
            </Box>
          </TableCell>
          {selected.includes(OrderSortBy.PARTNER_NAME) && (
            <TableCell align="left" padding="none" width={!selected.includes(OrderSortBy.STORE_NAME) ? 200 : 150}>
              <Box pr={5}>
                <Skeleton />
              </Box>
            </TableCell>
          )}
          {selected.includes(OrderSortBy.STORE_NAME) && (
            <TableCell align="left" width={!selected.includes(OrderSortBy.PARTNER_NAME) ? 280 : 240}>
              <Box pr={5}>
                <Skeleton />
              </Box>
            </TableCell>
          )}
          <TableCell align="left">
            <Skeleton variant="rounded" width={200} height={40} />
          </TableCell>

          <TableCell align="right">
            <IconButton color="inherit">
              <Skeleton variant="circular" width={28} height={28} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default ProductTableRowSkeleton;
