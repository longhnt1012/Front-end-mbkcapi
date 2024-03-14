import { Skeleton, Stack } from '@mui/material';

function ConfirmRegistrationStoreSkeleton() {
  return (
    <Stack direction="row" alignItems="start" gap={2}>
      <Skeleton variant="rounded" width={150} height={150} />
      <Stack gap={0.5}>
        <Skeleton width={300} />

        <Skeleton width={300} />

        <Skeleton width={300} />
      </Stack>
    </Stack>
  );
}

export default ConfirmRegistrationStoreSkeleton;
