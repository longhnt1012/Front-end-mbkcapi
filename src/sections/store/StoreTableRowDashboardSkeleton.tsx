import { Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';
import { useResponsive } from 'hooks';
import { useLocation } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';

function StoreTableRowDashboardSkeleton() {
  const mdLg = useResponsive('up', 'lg', 'lg');
  const mdMd = useResponsive('up', 'md', 'md');
  const mdSm = useResponsive('up', 'sm', 'sm');

  const { pathname } = useLocation();

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
          <TableCell
            width={
              pathname === PATH_ADMIN_APP.root
                ? mdLg
                  ? 300
                  : mdMd
                  ? 280
                  : mdSm
                  ? 150
                  : 300
                : mdLg
                ? 400
                : mdMd
                ? 280
                : mdSm
                ? 200
                : 400
            }
          >
            <Skeleton />
          </TableCell>
          <TableCell width={346}>
            <Skeleton />
          </TableCell>
          <TableCell width={261}>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default StoreTableRowDashboardSkeleton;
