import { ReactNode } from 'react';
// @mui
import { Box, Card, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
//
import { Color } from 'common/enums';
import { fShortenNumber, formatCurrency } from 'utils';

// ----------------------------------------------------------------------

export const StyledIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2.5),
}));

// ----------------------------------------------------------------------

interface AppWidgetSummaryOutlineProps {
  isPrice?: boolean;
  color?: Color;
  icon: ReactNode;
  title: string;
  total: number;
  sx?: object;
  isLoading: boolean;
}

function AppWidgetSummaryOutline({
  isPrice,
  title,
  total,
  icon,
  color = Color.PRIMARY,
  sx,
  isLoading,
  ...other
}: AppWidgetSummaryOutlineProps) {
  return (
    <Card
      sx={{
        p: 3,
        boxShadow: 0,
        border: 2,
        textAlign: 'center',
        borderColor: (theme: any) => theme.palette[color].light,
        color: (theme: any) => theme.palette[color].darker,
        height: '100%',
        ...sx,
      }}
      {...other}
    >
      <Stack alignItems="center" gap={2}>
        <StyledIcon
          sx={{
            color: (theme: any) => theme.palette[color].dark,
            backgroundImage: (theme: any) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0.08)} 0%, ${alpha(
                theme.palette[color].dark,
                0.12
              )} 100%)`,
          }}
        >
          {icon}
        </StyledIcon>

        <Stack>
          {isLoading ? (
            <Box p={0.987}>
              <CircularProgress
                size={26}
                sx={{
                  color: (theme: any) => theme.palette[color].darker,
                }}
              />
            </Box>
          ) : (
            <>
              {isPrice ? (
                <Typography variant="h3">{formatCurrency(total) || 0}</Typography>
              ) : (
                <Typography variant="h3">{fShortenNumber(total)}</Typography>
              )}
            </>
          )}

          <Typography variant="subtitle1">{title}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default AppWidgetSummaryOutline;
