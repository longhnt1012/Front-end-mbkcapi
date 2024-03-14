import { ReactNode, forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, SxProps } from '@mui/system';
//
import { Color, VariantLabel } from 'common/enums';
import { StyledLabel } from './styles';

interface LabelProps {
  sx?: SxProps;
  endIcon?: ReactNode;
  children?: ReactNode;
  startIcon?: ReactNode;
  variant?: VariantLabel;
  color?: Color;
}

const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ children, color = Color.DEFAULT, variant = VariantLabel.SOFT, startIcon, endIcon, sx, ...other }, ref) => {
    const theme = useTheme();

    const iconStyle = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        variant={variant}
        color={color}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyle }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyle }}> {endIcon} </Box>}
      </StyledLabel>
    );
  }
);

export default Label;
