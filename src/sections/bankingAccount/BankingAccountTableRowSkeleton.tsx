import { IconButton, Skeleton, Stack, TableCell, TableRow } from '@mui/material';
import { OrderSortBy } from 'common/@types';

function BankingAccountTableRow({ length = 5, selected }: { length: number; selected: readonly string[] }) {
  return (
    <>
      {Array.from({ length: length > 0 ? length : 3 }).map((_, index) => (
        <>
          <TableRow key={index} hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
            <TableCell width={100} align="center">
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Skeleton width={20} />
              </Stack>
            </TableCell>

            {selected.includes(OrderSortBy.LOGO_URL) && (
              <TableCell scope="row" component="th" width={200}>
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
            )}

            <TableCell component="th" scope="row" width={!selected.includes(OrderSortBy.LOGO_URL) ? 450 : 400}>
              <Skeleton width={200} />
            </TableCell>

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
        </>
      ))}
    </>
  );
}

export default BankingAccountTableRow;
