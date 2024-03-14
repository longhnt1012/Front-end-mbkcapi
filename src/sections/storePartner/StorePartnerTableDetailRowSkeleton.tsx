import { Box, IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

function StorePartnerTableDetailRowSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 2 }).map((_, index: any) => (
        <TableRow key={index} hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
          <TableCell width={80} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>

          <TableCell component="th" scope="row" width={100}>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>

          <TableCell align="left" width={150}>
            <Skeleton />
          </TableCell>

          <TableCell align="left" width={169}>
            <Box pl={2}>
              <Skeleton />
            </Box>
          </TableCell>

          <TableCell align="left" width={123}>
            <Skeleton />
          </TableCell>

          <TableCell align="left" width={276}>
            <Stack direction="row" alignItems="center" gap={3}>
              <IconButton color="inherit">
                <Skeleton variant="circular" width={28} height={28} />
              </IconButton>

              <Stack>
                <Skeleton width={200} />
              </Stack>
            </Stack>
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
      ))}
    </TableBody>
  );
}

export default StorePartnerTableDetailRowSkeleton;
