import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

function StorePartnerTableRowSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index: any) => (
        <TableRow key={index}>
          <TableCell width={120} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>

          <TableCell width={268} padding="none" align="left" sx={{ pr: 5 }}>
            <Skeleton />
          </TableCell>

          <TableCell width={360} align="left" sx={{ pr: 10 }}>
            <Skeleton />
          </TableCell>

          <TableCell width={270} align="left">
            <Stack direction="row">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} sx={{ ml: -1.5 }} />
              <Skeleton variant="circular" width={40} height={40} sx={{ ml: -1.5 }} />
            </Stack>
          </TableCell>

          <TableCell align="right">
            <IconButton color="inherit">
              <Skeleton variant="circular" width={28} height={28} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default StorePartnerTableRowSkeleton;
