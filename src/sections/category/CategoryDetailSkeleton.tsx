import { Box, Card, Grid, Skeleton, Stack } from '@mui/material';

function CategoryDetailSkeleton() {
  return (
    <Card sx={{ minWidth: 800 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 3,
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Skeleton variant="rounded" width={165} height={28} />
        </Stack>
      </Stack>
      <Stack sx={{ px: 3, py: 3 }}>
        <Grid container columnSpacing={2}>
          <Grid item md={3} sm={12}>
            <Stack width="100%" alignItems="center">
              <Skeleton variant="circular" sx={{ width: 150, height: 150 }} />
            </Stack>
          </Grid>
          <Grid item md={9} sm={12}>
            <Stack gap={1}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Skeleton width={150} />
                </Stack>
                <Skeleton variant="rounded" width={100} height={24} />
              </Stack>

              <Stack direction="row" alignItems="center" gap={0.5}>
                <Skeleton width={150} />
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Skeleton width={150} />
              </Stack>
              <Box>
                <Skeleton width={50} />
                <Skeleton width={560} />
                <Skeleton width={560} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}

export default CategoryDetailSkeleton;
