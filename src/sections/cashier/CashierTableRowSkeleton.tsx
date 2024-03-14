import { Skeleton, TableCell, TableRow, IconButton, Stack } from '@mui/material';
import { OrderSortBy } from 'common/@types';

function CashierTableRow({ length, selected }: { length: number; selected: readonly string[] }) {
  return (
    <>
      {Array.from({ length: length > 0 ? length : 5 }).map((_, index) => (
        <>
          <TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
            <TableCell width={80} align="center">
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Skeleton width={20} />
              </Stack>
            </TableCell>

            {selected.includes(OrderSortBy.AVATAR) && (
              <TableCell scope="row" component="th" padding="none" width={150}>
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
            )}

            <TableCell
              component="th"
              scope="row"
              width={
                !selected.includes(OrderSortBy.AVATAR) &&
                !selected.includes(OrderSortBy.EMAIL) &&
                !selected.includes(OrderSortBy.GENDER)
                  ? 450
                  : !selected.includes(OrderSortBy.EMAIL) && !selected.includes(OrderSortBy.GENDER)
                  ? 400
                  : !selected.includes(OrderSortBy.AVATAR) && !selected.includes(OrderSortBy.GENDER)
                  ? 350
                  : !selected.includes(OrderSortBy.AVATAR) && !selected.includes(OrderSortBy.EMAIL)
                  ? 350
                  : !selected.includes(OrderSortBy.EMAIL)
                  ? 280
                  : !selected.includes(OrderSortBy.GENDER)
                  ? 280
                  : 200
              }
            >
              <Skeleton />
            </TableCell>

            {selected.includes(OrderSortBy.EMAIL) && (
              <TableCell
                align="left"
                width={
                  !selected.includes(OrderSortBy.AVATAR) && !selected.includes(OrderSortBy.GENDER)
                    ? 350
                    : !selected.includes(OrderSortBy.AVATAR)
                    ? 280
                    : !selected.includes(OrderSortBy.GENDER)
                    ? 280
                    : 200
                }
              >
                <Skeleton />
              </TableCell>
            )}

            {selected.includes(OrderSortBy.GENDER) && (
              <TableCell
                align="left"
                width={
                  !selected.includes(OrderSortBy.AVATAR) && !selected.includes(OrderSortBy.EMAIL)
                    ? 350
                    : !selected.includes(OrderSortBy.AVATAR)
                    ? 250
                    : !selected.includes(OrderSortBy.EMAIL)
                    ? 280
                    : 200
                }
              >
                <Skeleton width={100} />
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
        </>
      ))}
    </>
  );
}

export default CashierTableRow;
