import { ReactNode } from 'react';
// @mui
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
//
import { fShortenNumber } from 'utils';
import { Color } from 'common/enums';

// ----------------------------------------------------------------------

export const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

interface AppWidgetSummaryProps {
  color?: Color;
  icon: ReactNode;
  title: string;
  total: number;
  sx?: object;
}

function AppWidgetSummary({ title, total, icon, color = Color.PRIMARY, sx, ...other }: AppWidgetSummaryProps) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme: any) => theme.palette[color].darker,
        bgcolor: (theme: any) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
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

      {total === 0 ? (
        <Box p={0.987}>
          <CircularProgress
            size={26}
            sx={{
              color: (theme: any) => theme.palette[color].dark,
            }}
          />
        </Box>
      ) : (
        <Typography variant="h3">{fShortenNumber(total)}</Typography>
      )}
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}

export default AppWidgetSummary;
