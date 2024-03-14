import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

function OrderTableRowSkeleton({ length }: { length: number }) {
  return (
    <TableBody>
      {Array.from({ length: length > 0 ? length : 5 }).map((_, index) => {
        return (
          <TableRow hover tabIndex={-1} key={index}>
            <TableCell width={60} align="center">
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Skeleton width={20} />
              </Stack>
            </TableCell>

            <TableCell padding="none">
              <Stack alignItems="center" pr={3.7}>
                <Skeleton width={60} />
              </Stack>
            </TableCell>

            <TableCell padding="none" align="left" width={250}>
              <Skeleton width={200} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={90} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={150} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={100} />
            </TableCell>
            <TableCell align="left">
              <Skeleton variant="rounded" width={130} height={24} />
            </TableCell>
            <TableCell align="left">
              <Skeleton variant="rounded" width={130} height={24} />
            </TableCell>
            <TableCell align="right">
              <IconButton color="inherit">
                <Skeleton variant="circular" width={28} height={28} />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default OrderTableRowSkeleton;
