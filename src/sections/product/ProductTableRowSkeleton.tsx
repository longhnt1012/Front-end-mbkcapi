import { Box, IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';
import { OrderSortBy } from 'common/@types';
import { getRuleWidths } from './rules';

interface ProductTableRowSkeletonProps {
  length: number;
  inTab?: boolean;
  selected?: readonly string[];
}

function ProductTableRowSkeleton({ length, inTab = false, selected }: ProductTableRowSkeletonProps) {
  const rules = getRuleWidths(selected ? selected : [], inTab);

  return (
    <TableBody>
      {Array.from({ length: length ? length : 5 }).map((_, index: number) => (
        <TableRow key={index} sx={{ height: '72.89px' }}>
          {inTab ? (
            <>
              <TableCell width={60} align="center">
                <Stack direction="row" alignItems="center" justifyContent="center">
                  <Skeleton width={20} />
                </Stack>
              </TableCell>
              <TableCell component="th" padding="none" align="center" width={80}>
                <Skeleton variant="circular" width={40} height={40} />
              </TableCell>
              <TableCell component="th" scope="row" padding="none" width={!inTab ? 206 : 195}>
                <Skeleton />
              </TableCell>
              <TableCell align="left" width={!inTab ? 172 : 192}>
                <Skeleton />
              </TableCell>
              <TableCell align="left" padding="none" width={!inTab ? 150 : 192}>
                <Skeleton />
              </TableCell>
              <TableCell align="left" width={!inTab ? 131 : 133}>
                <Skeleton />
              </TableCell>
              <TableCell align="left" width={!inTab ? 151 : 153}>
                <Skeleton />
              </TableCell>
              <TableCell align="left" width={!inTab ? 106 : 150}>
                <Skeleton />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="rounded" width={!inTab ? 100 : 120} height={24} />
              </TableCell>
              {!inTab && (
                <TableCell align="right">
                  <Stack direction="row" alignItems="center" justifyContent="right">
                    <Skeleton variant="rounded" width={30} height={14} />
                    <IconButton color="inherit">
                      <Skeleton variant="circular" width={28} height={28} />
                    </IconButton>
                  </Stack>
                </TableCell>
              )}
            </>
          ) : (
            <>
              <TableCell width={60} align="center">
                <Stack direction="row" alignItems="center" justifyContent="center">
                  <Skeleton width={20} />
                </Stack>
              </TableCell>
              {selected?.includes(OrderSortBy.IMAGE) && (
                <TableCell component="th" padding="none" align="center" width={80}>
                  <Skeleton variant="circular" width={40} height={40} />
                </TableCell>
              )}
              {selected?.includes(OrderSortBy.NAME) && (
                <TableCell component="th" scope="row" padding="none" width={rules.name}>
                  <Box pr={4}>
                    <Skeleton />
                  </Box>
                </TableCell>
              )}
              {selected?.includes(OrderSortBy.CODE) && (
                <TableCell component="th" scope="row" width={rules.code}>
                  <Box pr={1}>
                    <Skeleton />
                  </Box>
                </TableCell>
              )}
              {selected?.includes(OrderSortBy.DISPLAY_ORDER) && (
                <TableCell align="left" padding="none" width={rules.display_order}>
                  <Box pr={2}>
                    <Skeleton />
                  </Box>
                </TableCell>
              )}
              {selected?.includes(OrderSortBy.SELLING_PRICE) && (
                <TableCell align="left" width={rules.selling_price}>
                  <Skeleton />
                </TableCell>
              )}
              {selected?.includes(OrderSortBy.DISCOUNT_PRICE) && (
                <TableCell align="left" width={rules.discount_price}>
                  <Skeleton />
                </TableCell>
              )}
              {selected?.includes(OrderSortBy.HISTORICAL_PRICE) && (
                <TableCell align="left" width={rules.historical_price}>
                  <Skeleton />
                </TableCell>
              )}
              {selected?.includes(OrderSortBy.CATEGORY) && (
                <TableCell align="left" width={rules.category}>
                  <Skeleton />
                </TableCell>
              )}
              {selected?.includes(OrderSortBy.TYPE) && (
                <TableCell align="left" width={rules.type}>
                  <Skeleton />
                </TableCell>
              )}
              <TableCell align="left">
                <Skeleton variant="rounded" width={!inTab ? 100 : 120} height={24} />
              </TableCell>
              {!inTab && (
                <TableCell align="right">
                  <Stack direction="row" alignItems="center" justifyContent="right">
                    <Skeleton variant="rounded" width={30} height={14} />
                    <IconButton color="inherit">
                      <Skeleton variant="circular" width={28} height={28} />
                    </IconButton>
                  </Stack>
                </TableCell>
              )}
            </>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default ProductTableRowSkeleton;
