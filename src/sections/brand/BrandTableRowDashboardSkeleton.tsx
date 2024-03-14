import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';
import { useResponsive } from 'hooks';

function BrandTableRowDashboardSkeleton() {
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
          <TableCell width={mdLg ? 300 : mdMd ? 260 : mdSm ? 150 : 300}>
            <Skeleton />
          </TableCell>
          <TableCell width={mdLg ? 600 : mdMd ? 550 : mdSm ? 350 : 600}>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" width={130} height={24} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default BrandTableRowDashboardSkeleton;
