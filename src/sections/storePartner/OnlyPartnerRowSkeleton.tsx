import { IconButton, Skeleton, Stack, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useLocales } from 'hooks';

function OnlyPartnerRowSkeleton({ length }: { length: number }) {
  const { translate } = useLocales();

  return (
    <>
      {Array.from({ length: length ? length : 3 }).map((_, index: any) => (
        <Stack key={index} direction="row" alignItems="center" sx={{ cursor: 'pointer', height: '72.89px' }}>
          <Stack width={30}>
            <FiberManualRecordIcon sx={{ fontSize: 10, color: (theme) => theme.palette.grey[500] }} />
          </Stack>
          <Stack width={60}>
            <Skeleton variant="circular" width={40} height={40} />
          </Stack>
          <Stack width={170} px={2}>
            <Skeleton />
          </Stack>
          <Stack width={170} px={2}>
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500], mb: 0.5 }}>
              {translate('page.form.userName')}
            </Typography>
            <Skeleton />
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="end" gap={5} width={380} px={2}>
              <IconButton color="inherit">
                <Skeleton variant="circular" width={20} height={20} />
              </IconButton>

              <Stack>
                <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500], mb: 0.5 }}>
                  {translate('page.form.password')}
                </Typography>
                <Skeleton width={150} />
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Skeleton variant="rounded" width={100} height={24} />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="right" sx={{ ml: 'auto' }}>
            <Skeleton variant="rounded" width={30} height={14} />
            <IconButton color="inherit">
              <Skeleton variant="circular" width={28} height={28} />
            </IconButton>
          </Stack>
        </Stack>
      ))}
    </>
  );
}

export default OnlyPartnerRowSkeleton;
