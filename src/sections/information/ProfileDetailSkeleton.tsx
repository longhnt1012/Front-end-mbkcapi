import { Card, Divider, IconButton, Skeleton, Stack } from '@mui/material';

function ProfileDetailSkeleton() {
  return (
    <Card sx={{ width: '70%' }}>
      <Skeleton variant="rectangular" width="100%" height={100} />
      <Stack gap={1.5} p={3} mt={-8}>
        <Stack direction="row" alignItems="end" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="end" gap={2}>
            <Skeleton variant="circular" width={100} height={100} />
            <Stack>
              <Skeleton width={50} />
              <Skeleton width={200} />
            </Stack>
          </Stack>
          <IconButton color="inherit">
            <Skeleton variant="circular" width={28} height={28} />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Skeleton width={50} />
          <Skeleton width={160} />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Skeleton width={70} />
          <Skeleton variant="rounded" width={100} height={24} />
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileDetailSkeleton;
