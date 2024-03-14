import React from 'react';
// @mui
import { CircularProgress, Fade, Tab, Tabs } from '@mui/material';
//
import { OrderTypeEnum, ProductTypeEnum } from 'common/models';
import { Color, Status } from 'common/enums';
import Label from 'components/label/Label';
import { useLocales } from 'hooks';

interface Option<T> {
  label: string;
  value: T;
  id: string;
}

interface CustomTabsProps<T> {
  isLoading: boolean;
  length: number;
  value: string | number;
  handleChange: (event: React.SyntheticEvent, newValue: any) => void;
  options: Option<T>[];
}

function CustomTabs<T extends string | number>({
  value,
  handleChange,
  options,
  isLoading,
  length,
}: CustomTabsProps<T>) {
  const { translate } = useLocales();

  return (
    <Tabs value={value} onChange={handleChange} sx={{ height: 50, borderBottom: 1, borderColor: 'divider' }}>
      {options.map((option) => (
        <Tab
          key={option.id}
          value={option.value}
          label={
            option.value === ProductTypeEnum.PARENT
              ? translate('productType.parent')
              : option.value === ProductTypeEnum.CHILD
              ? translate('productType.child')
              : option.value === ProductTypeEnum.SINGLE
              ? translate('productType.single')
              : option.value === ProductTypeEnum.EXTRA
              ? translate('productType.extra')
              : option.value === OrderTypeEnum.ALL
              ? translate('orderType.all')
              : option.value === OrderTypeEnum.READY
              ? translate('orderType.ready')
              : option.value === OrderTypeEnum.BEING_PREPARED
              ? translate('orderType.prepared')
              : option.value === OrderTypeEnum.COMPLETED
              ? translate('orderType.completed')
              : option.value === OrderTypeEnum.CANCELED
              ? translate('orderType.canceled')
              : option.value === Status.ACTIVE
              ? translate('status.active')
              : option.value === Status.INACTIVE
              ? translate('status.inactive')
              : option.value === Status.BE_CONFIRMING
              ? translate('status.beConfirming')
              : option.value === Status.REJECTED
              ? translate('status.reject')
              : option.value === Status.ALL
              ? translate('status.all')
              : translate('productType.all')
          }
          icon={
            value === option.value && isLoading ? (
              <Fade in={value === option.value && isLoading}>
                <CircularProgress size={15} sx={{ ml: 3, display: 'block' }} />
              </Fade>
            ) : (
              <>
                {value === option.value ? (
                  <Fade in={value === option.value && !isLoading}>
                    <Label color={value === option.value ? Color.PRIMARY : Color.DEFAULT} sx={{ ml: 1 }}>
                      {length}
                    </Label>
                  </Fade>
                ) : (
                  <></>
                )}
              </>
            )
          }
          iconPosition="end"
          sx={{ height: 50, pl: 2, pr: value === option.value ? 1 : 2 }}
        />
      ))}
    </Tabs>
  );
}

export default CustomTabs;
