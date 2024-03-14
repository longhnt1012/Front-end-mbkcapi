import { Grid, Skeleton } from '@mui/material';

function WalletCardSkeleton() {
  return (
    <Grid container rowSpacing={3} columnSpacing={3} mb={5}>
      <Grid item xs={12} sm={12} md={4}>
        <Skeleton variant="rounded" width="100%" height={156} />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rounded" width="100%" height={156} />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rounded" width="100%" height={156} />
      </Grid>
    </Grid>
  );
}

export default WalletCardSkeleton;
