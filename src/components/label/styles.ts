// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/system';
//
import { Color, VariantLabel } from 'common/enums';

export interface StyledLabelProps {
  theme: import('@mui/material').Theme;
  variant: VariantLabel;
  color: Color;
}

export const StyledLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'color',
})(({ theme, variant, color }: StyledLabelProps) => {
  const isLight = theme.palette.mode === 'light';

  const filledVariant = variant === VariantLabel.FILLED;

  const outlinedVariant = variant === VariantLabel.OUTLINED;

  const softVariant = variant === VariantLabel.SOFT;

  const defaultStyle = {
    ...(color === Color.DEFAULT && {
      // OUTLINED
      ...(outlinedVariant && {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
      }),
      // SOFT
      ...(softVariant && {
        color: isLight ? theme.palette.text.primary : theme.palette.common.white,
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
      }),
    }),
  };

  const colorStyle = {
    ...(color !== Color.DEFAULT && {
      // FILLED
      ...(filledVariant && {
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
      }),
      // OUTLINED
      ...(outlinedVariant && {
        backgroundColor: 'transparent',
        color: theme.palette[color].main,
        border: `1px solid ${theme.palette[color].main}`,
      }),
      // SOFT
      ...(softVariant && {
        color: theme.palette[color][isLight ? 'dark' : 'light'],
        backgroundColor: alpha(theme.palette[color].main, 0.16),
      }),
    }),
  };

  return {
    height: 24,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    textTransform: 'capitalize',
    letterSpacing: theme.spacing(0.05),
    padding: theme.spacing(0.2, 1, 0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,
    ...colorStyle,
    ...defaultStyle,
  };
});
