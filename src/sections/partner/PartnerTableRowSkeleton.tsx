import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';
import { OrderSortBy } from 'common/@types';

function PartnerTableRowSkeleton({ length, selected }: { length: number; selected: readonly string[] }) {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index: any) => (
        <TableRow hover tabIndex={-1} key={index}>
          <TableCell width={100} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          {selected.includes(OrderSortBy.LOGO) && (
            <TableCell component="th" scope="row" padding="none" width={200}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
          )}

          <TableCell align="left" padding="none" width={250} sx={{ pr: 2 }}>
            <Skeleton width={120} />
          </TableCell>

          {selected.includes(OrderSortBy.TAX_COMMISSION) && (
            <TableCell component="th" scope="row" padding="none" width={250}>
              <Skeleton width={50} />
            </TableCell>
          )}

          <TableCell align="left">
            <Skeleton variant="rounded" width={125} height={24} />
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

export default PartnerTableRowSkeleton;
