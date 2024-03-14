/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { PartnerProductStatusEnum, ProductTypeEnum } from 'common/models';
import { Gender, PaymentMethod, Status } from 'common/enums';
import { useLocales } from 'hooks';
import { Controller, useFormContext } from 'react-hook-form';

interface Option<T> {
  label: string;
  value: T;
}

interface SelectFieldProps<T> {
  name: string;
  label: string;
  options?: Option<T>[];
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  rules?: Record<string, unknown>;
  disabled?: boolean;
  className?: string | null;
  multiple?: boolean;
  required?: boolean;
  helperText?: string;
}

function SelectField<T extends string | number>({
  name,
  label,
  options = [],
  children = null,
  size = 'small',
  fullWidth = false,
  rules = {},
  disabled = false,
  className = null,
  multiple = false,
  helperText,
  ...props
}: SelectFieldProps<T>) {
  const { translate } = useLocales();

  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl
          className={className || undefined}
          fullWidth={fullWidth}
          size={size === 'small' ? 'small' : size === 'medium' ? 'medium' : undefined}
          disabled={disabled}
          required={props.required}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            multiple={multiple}
            id={name}
            label={label}
            labelId=""
            {...field}
            {...props}
            value={field.value || []}
          >
            {children ??
              options?.map(({ label, value }) => (
                <MenuItem value={value} key={`${value}`}>
                  {label === PartnerProductStatusEnum.IN_STOCK
                    ? translate('status.inStock')
                    : label === PartnerProductStatusEnum.AVAILABLE
                    ? translate('status.available')
                    : label === PartnerProductStatusEnum.OUT_OF_STOCK_TODAY
                    ? translate('status.outOfStockToday')
                    : label.toLowerCase() === PartnerProductStatusEnum.OUT_OF_STOCK_INDEFINITELY.toLowerCase()
                    ? translate('status.outOfStockIndefinitely')
                    : label === Status.ACTIVE
                    ? translate('status.active')
                    : label === Status.INACTIVE
                    ? translate('status.inactive')
                    : label === Status.BE_CONFIRMING
                    ? translate('status.beConfirming')
                    : label === Status.REJECTED
                    ? translate('status.reject')
                    : value === ProductTypeEnum.PARENT
                    ? translate('productType.parent')
                    : value === ProductTypeEnum.CHILD
                    ? translate('productType.child')
                    : value === ProductTypeEnum.SINGLE
                    ? translate('productType.single')
                    : value === ProductTypeEnum.EXTRA
                    ? translate('productType.extra')
                    : value === Gender.MALE
                    ? translate('gender.male')
                    : value === Gender.FEMALE
                    ? translate('gender.female')
                    : value === PaymentMethod.CASH
                    ? translate('page.content.cash')
                    : value === PaymentMethod.CASH_LESS
                    ? translate('page.content.cashless')
                    : label}
                </MenuItem>
              ))}
            {!children && !options?.length && (
              <MenuItem value="" disabled key={`${name}-select-empty`}>
                Empty
              </MenuItem>
            )}
          </Select>
          <FormHelperText sx={{ color: 'red' }}>{fieldState.error && fieldState.error.message}</FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
      defaultValue={multiple ? [] : ''}
      rules={rules}
    />
  );
}

export default SelectField;
