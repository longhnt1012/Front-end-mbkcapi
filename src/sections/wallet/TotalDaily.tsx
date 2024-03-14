// @mui
import { Card, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// section
import { Color } from 'common/enums';
import { formatCurrency } from 'utils';

export const StyledIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
}));

interface TotalDailyProps {
  title: string;
  icon: React.ReactNode;
  totalMoney: number;
  color: Color;
}

function TotalDaily({ icon, title, totalMoney, color }: TotalDailyProps) {
  return (
    <Card sx={{ height: '100%', boxShadow: 'none', border: 1, borderColor: (theme) => theme.palette.grey[400] }}>
      <Stack justifyContent="center" gap={2} p={3}>
        <Typography variant="h6">{title}</Typography>

        <Stack direction="row" alignItems="center" gap={1}>
          <StyledIcon
            sx={{
              color: (theme: any) => theme.palette[color].dark,
              backgroundImage: (theme: any) =>
                `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                  theme.palette[color].dark,
                  0.24
                )} 100%)`,
            }}
          >
            {icon}
          </StyledIcon>
          <Typography variant="h3" color={(theme: any) => theme.palette[color].dark}>
            {formatCurrency(totalMoney as number)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default TotalDaily;
