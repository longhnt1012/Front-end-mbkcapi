import { Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

function ProductTableRowDashboardSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          <TableCell width={80}>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>
          <TableCell width={200}>
            <Skeleton />
          </TableCell>
          <TableCell width={192}>
            <Skeleton />
          </TableCell>
          <TableCell width={176}>
            <Skeleton />
          </TableCell>
          <TableCell width={143}>
            <Skeleton />
          </TableCell>
          <TableCell width={164}>
            <Skeleton />
          </TableCell>
          <TableCell width={113}>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" width={130} height={24} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default ProductTableRowDashboardSkeleton;
