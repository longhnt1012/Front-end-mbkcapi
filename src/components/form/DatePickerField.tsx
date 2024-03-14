/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';

interface DatePickerFieldProps {
  name: string;
  label: string;
  fullWidth?: boolean;
  rules?: Record<string, unknown>;
  disabled?: boolean;
  className?: string | null;
  required?: boolean;
  helperText?: string;
  defaultValue?: string;
}

const DatePickerField = ({
  name,
  label,
  fullWidth = false,
  rules = {},
  defaultValue = '',
  disabled = false,
  className = null,
  helperText,
  ...props
}: DatePickerFieldProps) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue ? defaultValue : dayjs(new Date())}
      render={({ field, fieldState }) => (
        <FormControl error={false} className={className || undefined} fullWidth={fullWidth}>
          <DatePicker
            label={label}
            onChange={(newValue) => {
              field.onChange(newValue);
              setValue(name, newValue);
            }}
            value={dayjs(field.value)}
            inputRef={field.ref}
            slotProps={{ textField: { size: 'small' } }}
            {...props}
          />
          <FormHelperText sx={{ color: 'red' }}>{fieldState.error && fieldState.error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default DatePickerField;
