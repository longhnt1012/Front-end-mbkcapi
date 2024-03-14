import { Box, Card, Paper, Stack, Typography, Skeleton } from '@mui/material';

export default function OrderTimelineSkeleton({ length = 1 }: { length?: number }) {
  return (
    <Card>
      <Box width="100%" pb={2}>
        <Paper sx={{ width: '100%' }}>
          <Stack gap={1} direction="row" alignItems="center" px={3} py={2}>
            <Skeleton width={150} />
          </Stack>

          <Stack
            py={1}
            px={7}
            sx={{
              mb: 5,
              borderTop: 1,
              borderBottom: 1,
              borderColor: (theme) => theme.palette.grey[400],
              bgcolor: (theme) => theme.palette.grey[200],
            }}
          >
            <Typography>
              <Skeleton width={180} />
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="center" mt={-4}>
            <Stack>
              {Array.from({ length }).map((_, index) => {
                return <Skeleton key={index} width={300} height={200} />;
              })}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Card>
  );
}
