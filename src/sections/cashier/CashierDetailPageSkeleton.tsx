// @mui
import { Divider, Grid, Skeleton, Stack } from '@mui/material';
//
import { useResponsive } from 'hooks';

function CashierDetailPage() {
  const mdMd = useResponsive('up', 'md', 'md');
  const mdSm = useResponsive('up', 'sm', 'sm');

  return (
    <>
      <Grid container columnSpacing={mdMd ? 10 : 6} rowSpacing={6}>
        <Grid item xs={12} sm={12} md={4}>
          <Stack width="100%" alignItems="center" justifyContent="center">
            <Skeleton variant="rounded" width={300} height={300} sx={{ borderRadius: 2 }} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Stack gap={2}>
            <Stack justifyContent="center" height={48}>
              <Skeleton variant="rounded" width={300} height={38} />
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Skeleton width={140} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Stack>
            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Skeleton width={140} />
              <Skeleton width={200} />
            </Stack>
            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Skeleton width={140} />
              <Skeleton width={140} />
            </Stack>
            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Skeleton width={140} />
              <Skeleton width={140} />
            </Stack>
            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Skeleton width={140} />
              <Skeleton width={140} />
            </Stack>
            <Divider />

            <Stack sx={{ flexDirection: { md: 'row', sm: 'column' } }} alignItems="start" gap={2}>
              <Skeleton width={140} />
              <Stack direction="row" gap={2}>
                <Skeleton variant="rounded" height={120} width={120} />
                <Stack gap={0.5}>
                  <Skeleton width={200} />
                  <Skeleton width={mdMd ? 420 : mdSm ? 600 : 350} />
                  <Skeleton width={mdMd ? 420 : mdSm ? 600 : 350} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default CashierDetailPage;
