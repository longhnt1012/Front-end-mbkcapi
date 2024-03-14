import { TableCell, TableRow, Skeleton, Stack } from '@mui/material';

function MoneyExchangeTableRowSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow tabIndex={-1} key={index} sx={{ cursor: 'pointer', height: '60px' }}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>

          <TableCell width={192}>
            <Skeleton />
          </TableCell>

          <TableCell width={291}>
            <Skeleton />
          </TableCell>

          <TableCell width={240.43}>
            <Skeleton />
          </TableCell>

          <TableCell width={156}>
            <Skeleton />
          </TableCell>

          <TableCell width={173}>
            <Skeleton />
          </TableCell>

          <TableCell>
            <Skeleton variant="rounded" width={120} height={24} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default MoneyExchangeTableRowSkeleton;
