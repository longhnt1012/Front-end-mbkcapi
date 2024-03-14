/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// @mui
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Grid, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllPartners } from 'redux/partner/partnerSlice';
import { getAllStoresActiveInactive } from 'redux/store/storeSlice';
//
import { ListParams } from 'common/@types';
import { Language } from 'common/enums';
import { StorePartnerToCreate } from 'common/models';
import { AutoCompleteField, InputField } from 'components';
import { useLocales } from 'hooks';

interface StorePartnerFormProps {
  defaultValues: StorePartnerToCreate;
}

function StorePartnerForm({ defaultValues }: StorePartnerFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();

  const { stores } = useAppSelector((state) => state.store);
  const { partners } = useAppSelector((state) => state.partner);
  const { brandProfile } = useAppSelector((state) => state.profile);
  const { isLoading } = useAppSelector((state) => state.storePartner);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const storeOptions = stores.map((store) => ({
    label: store.name,
    value: store.storeId,
    center: store.kitchenCenter.name,
    image: store.logo,
  }));

  const getOpObjStore = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions.find((opt) => opt.value === option);
    return option;
  };

  const partnerOptions = partners.map((partner) => ({
    label: partner.name,
    value: partner.partnerId,
    image: partner.logo,
  }));

  const getOpObjPartner = (option: any) => {
    if (!option) return option;
    if (!option.value) return partnerOptions.find((opt) => opt.value === option);
    return option;
  };

  const { control, getValues, setValue, reset } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: 'partnerAccounts',
  });

  const paramsStore: ListParams = useMemo(() => {
    return {
      optionParams: {
        idBrand: brandProfile?.brandId,
        isGetAll: true,
      },
      navigate,
    };
  }, []);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, []);

  useEffect(() => {
    dispatch(getAllStoresActiveInactive(paramsStore));
    dispatch(getAllPartners(params));
  }, [params]);

  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid item md={5} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">
              {translate('page.title.detail', {
                model:
                  currentLang.value === Language.ENGLISH
                    ? translate('model.capitalizeOne.store')
                    : translate('model.lowercase.store'),
              })}
            </Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.selectStore')}
            </Typography>
          </Stack>
          <AutoCompleteField
            options={storeOptions}
            getOptionLabel={(value: any) => {
              return getOpObjStore(value)?.label;
            }}
            isOptionEqualToValue={(option: any, value: any) => {
              if (!option) return option;
              return option.value === getOpObjStore(value)?.value;
            }}
            transformValue={(opt: any) => opt.value}
            name="storeId"
            type="text"
            label={translate('model.capitalizeOne.store')}
          />
        </Stack>
      </Grid>
      <Grid item md={7} sm={12}>
        {fields.map((item, index) => (
          <Stack key={item.id} gap={3}>
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: index > 0 ? 3 : 0 }}
            >
              <Stack>
                <Typography variant="subtitle1">
                  {translate('page.title.detail', {
                    model:
                      currentLang.value === Language.ENGLISH
                        ? translate('page.form.accountPartner')
                        : translate('page.form.accountPartner'),
                  })}{' '}
                  {index + 1}
                </Typography>
                <Typography variant="body2" color="grey.600">
                  {translate('model.capitalizeOne.partner')}, {translate('page.form.lowercase.userName')},{' '}
                  {translate('page.form.lowercase.password')},...
                </Typography>
              </Stack>

              {index > 0 && (
                <IconButton color="error" onClick={() => remove(index)}>
                  <CancelIcon />
                </IconButton>
              )}
            </Stack>

            <Stack spacing={2.2}>
              <AutoCompleteField
                options={partnerOptions}
                getOptionLabel={(value: any) => {
                  return getOpObjPartner(value)?.label;
                }}
                isOptionEqualToValue={(option: any, value: any) => {
                  if (!option) return option;
                  return option.value === getOpObjPartner(value)?.value;
                }}
                transformValue={(opt: any) => opt.value}
                name={`partnerAccounts.${index}.partnerId`}
                type="text"
                label={translate('model.capitalizeOne.partner')}
              />

              <InputField
                fullWidth
                name={`partnerAccounts.${index}.userName`}
                label={translate('page.form.userName')}
              />
              <InputField
                fullWidth
                name={`partnerAccounts.${index}.password`}
                label={translate('page.form.password')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <InputField
                fullWidth
                type="number"
                name={`partnerAccounts.${index}.commission`}
                label={translate('page.form.commission')}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Stack>
          </Stack>
        ))}
        <Box textAlign="right" mt={3}>
          <Button variant="outlined" color="secondary" disabled={isLoading} onClick={() => reset(defaultValues)}>
            {translate('button.reset')}
          </Button>
          <Button
            disabled={isLoading}
            variant="outlined"
            color="secondary"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              setValue('partnerAccounts', [
                ...(getValues().partnerAccounts || []),
                {
                  partnerId: 0,
                  userName: '',
                  password: '',
                  commission: 0,
                },
              ]);
            }}
            sx={{ ml: 1.5 }}
          >
            {translate('button.add', { model: translate('model.lowercase.partner') })}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default StorePartnerForm;
