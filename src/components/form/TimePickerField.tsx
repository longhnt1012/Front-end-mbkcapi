/* eslint-disable react/prop-types */
import { TimeView } from '@mui/x-date-pickers';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface TimePickerFieldProps {
  sx?: object;
  name: string;
  fullWidth?: boolean;
  ampm?: boolean;
  rules?: Record<string, unknown>;
  disabled?: boolean;
  className?: string | null;
  required?: boolean;
  helperText?: string;
  defaultValue?: any;
  setView: Dispatch<SetStateAction<TimeView>>;
  view: TimeView;
}

const TimePickerField = ({
  sx,
  name,
  fullWidth = false,
  rules = {},
  defaultValue,
  disabled = false,
  className = null,
  helperText,
  ampm = true,
  setView,
  view,
  ...props
}: TimePickerFieldProps) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue ? dayjs(defaultValue) : dayjs(new Date())}
      render={({ field, fieldState }) => (
        <TimeClock
          {...field}
          value={dayjs(field.value)}
          onChange={(newValue) => {
            field.onChange(newValue);
            setValue(name, newValue);
          }}
          ampm={ampm}
          disabled={disabled}
          onViewChange={(view) => setView(view)}
          view={view}
          {...props}
          sx={sx}
        />
      )}
    />
  );
};

export default TimePickerField;
