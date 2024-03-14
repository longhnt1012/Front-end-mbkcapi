import { Grid, Skeleton, Stack } from '@mui/material';

function BrandDetailPage() {
  return (
    <>
      <Stack sx={{ px: 3.5, py: 3 }}>
        <Grid container columnSpacing={2}>
          <Grid item md={3} sm={12}>
            <Stack width="100%" alignItems="center">
              <Skeleton variant="circular" width={150} height={150} />
            </Stack>
          </Grid>
          <Grid item md={9} sm={12}>
            <Stack width="100%" alignItems="start" gap={1}>
              <Skeleton variant="rounded" width={200} height={30} />

              <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                <Skeleton width={82} />
                <Skeleton variant="rounded" width={120} height={24} />
              </Stack>
              <Stack direction="column" gap={0.5}>
                <Skeleton width={350} />
                <Skeleton width={515} />
                <Skeleton width={515} />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default BrandDetailPage;
