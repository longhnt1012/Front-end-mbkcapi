import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';
import { useResponsive } from 'hooks';

function CashierTableRowDashboardSkeleton() {
  const mdLg = useResponsive('up', 'lg', 'lg');
  const mdMd = useResponsive('up', 'md', 'md');
  const mdSm = useResponsive('up', 'sm', 'sm');

  return (
    <>
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
          <TableCell width={mdMd ? 250 : mdSm ? 200 : 250}>
            <Skeleton />
          </TableCell>
          <TableCell width={mdLg ? 350 : mdMd ? 300 : mdSm ? 220 : 350}>
            <Skeleton />
          </TableCell>
          <TableCell width={mdLg ? 300 : mdMd ? 240 : mdSm ? 220 : 300}>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default CashierTableRowDashboardSkeleton;
