import { ReactNode, memo } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export interface ScrollbarProps {
  sx?: object;
  children: ReactNode;
}

function Scrollbar({ children, sx, ...other }: ScrollbarProps) {
  return (
    <Box
      sx={(theme) => ({
        height: '100vh',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': { width: 5 },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 2,
          bgcolor: theme.palette.grey[500],
        },
      })}
    >
      {children}
    </Box>
  );
}

export default memo(Scrollbar);
