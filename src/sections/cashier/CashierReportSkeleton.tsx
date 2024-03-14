import { Box, Card, Grid, Skeleton, Stack } from '@mui/material';

function CashierReportSkeleton() {
  return (
    <Stack alignItems="center" width="100%">
      <Box sx={{ width: '100%' }}>
        <Card>
          <Stack
            px={3}
            py={2}
            sx={{
              borderBottom: 1,
              borderColor: (theme) => theme.palette.grey[400],
            }}
          >
            <Skeleton variant="rounded" width={200} height={28} />
          </Stack>
          <Stack p={4} pb={2}>
            <Grid container columnSpacing={4} rowSpacing={3}>
              <Grid item xs={12} md={4}>
                <Stack
                  gap={2}
                  sx={{
                    borderRight: 1,
                    borderColor: (theme) => theme.palette.grey[400],
                  }}
                >
                  <Skeleton width={180} />

                  <Stack direction="column" alignItems="center" gap={1}>
                    <Skeleton variant="circular" sx={{ width: 100, height: 100 }} />

                    <Skeleton width={150} />
                    <Skeleton width={170} />
                  </Stack>

                  <Skeleton width={160} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack gap={2}>
                  <Stack direction="column" gap={1.5}>
                    <Skeleton width={120} />
                    <Stack direction="row" gap={2}>
                      <Skeleton variant="rectangular" width={100} height={100} />
                      <Stack>
                        <Skeleton width={400} />
                        <Skeleton width={400} />
                        <Skeleton width={400} />
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Skeleton width={275} />
                    <Skeleton width={50} />
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Skeleton width={210} />
                    <Skeleton width={100} />
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Skeleton width={50} />
                    <Skeleton width={100} />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="right"
              mt={4}
              sx={{
                pt: 2,
                borderTop: 1,
                borderColor: (theme) => theme.palette.grey[400],
              }}
            >
              <Skeleton variant="rounded" width={250} height={36} />
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
}

export default CashierReportSkeleton;
