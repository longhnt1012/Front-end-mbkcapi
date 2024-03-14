import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Box, FormHelperText, Typography, Stack } from '@mui/material';
//
import UploadAvatar from '../upload/UploadAvatar';

interface UploadImageFieldProps {
  name: string;
  label: string;
  subLabel?: string;
  defaultValue?: any;
  isEditing?: boolean;
  margin?: string;
  width?: number;
  borderRadius?: string;
  captionWidth?: number;
}

const UploadImageField: FC<UploadImageFieldProps> = ({
  name,
  label,
  subLabel,
  defaultValue = '',
  isEditing,
  margin,
  width = 200,
  borderRadius = '50%',
  captionWidth,
  ...others
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Box sx={{ mb: 5, width: 'fit-content' }} {...others}>
          <UploadAvatar
            sx={{ margin, width, borderRadius }}
            borderRadius={borderRadius}
            captionWidth={captionWidth}
            caption={
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  color: 'text.secondary',
                }}
              >
                {label}
                {subLabel && (
                  <Stack>
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 0.5,
                        color: 'text.secondary',
                      }}
                    >
                      {subLabel}
                    </Typography>
                  </Stack>
                )}
              </Typography>
            }
            error={Boolean(fieldState.error)}
            value={field.value}
            onChange={field.onChange}
            isEditing={isEditing}
            file={null}
          />
          <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
            {fieldState.error && fieldState.error.message}
          </FormHelperText>
        </Box>
      )}
    />
  );
};

export default UploadImageField;
