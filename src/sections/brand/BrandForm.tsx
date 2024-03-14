/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Stack, Typography } from '@mui/material';
// redux
import { getAllDistrictByProvinceId, getAllProvinces, getAllWardByDistrictId } from 'redux/address/addressSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { Language } from 'common/enums';
import { AutoCompleteField, InputField, UploadImageField } from 'components';
import { useLocales } from 'hooks';

function BrandForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();

  const { isEditing } = useAppSelector((state) => state.brand);
  const { provinces, districts, wards } = useAppSelector((state) => state.address);

  const { watch } = useFormContext();

  const provinceId = watch('provinceId');
  const districtId = watch('districtId');

  const provinceOptions = provinces.map((province) => ({
    label: province.province_name,
    value: Number(province.province_id),
  }));

  const getOpObjProvince = (option: any) => {
    if (!option) return option;
    if (!option.value) return provinceOptions.find((opt) => opt.value === option);
    return option;
  };

  const districtOptions = districts.map((district) => ({
    label: district.district_name,
    value: Number(district.district_id),
  }));

  const getOpObjDistrict = (option: any) => {
    if (!option) return option;
    if (!option.value) return districtOptions.find((opt) => opt.value === option);
    return option;
  };

  const wardOptions = wards.map((ward) => ({
    label: ward.ward_name,
    value: Number(ward.ward_id),
  }));

  const getOpObjWard = (option: any) => {
    if (!option) return option;
    if (!option.value) return wardOptions.find((opt) => opt.value === option);
    return option;
  };

  useEffect(() => {
    dispatch(getAllProvinces(navigate));
  }, []);

  useEffect(() => {
    if (provinceId !== 0) {
      dispatch(getAllDistrictByProvinceId({ provinceId: provinceId < 10 ? `0${provinceId}` : provinceId, navigate }));
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId !== 0) {
      dispatch(getAllWardByDistrictId({ districtId, navigate }));
    }
  }, [districtId]);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.logo')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.brand') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            subLabel={translate('page.content.imageAllowed')}
            name="logo"
            captionWidth={200}
            defaultValue=""
            isEditing={isEditing}
          />
        </Stack>
      </Grid>
      <Grid item md={8} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.detail')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('table.name')}, {translate('table.lowercase.address')},{translate('table.lowercase.email')},...
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <InputField
              fullWidth
              name="name"
              label={translate(
                'page.form.nameExchange',
                currentLang.value === Language.ENGLISH
                  ? {
                      model: translate('model.capitalizeOne.brand'),
                      name: translate('page.form.nameLower'),
                    }
                  : {
                      model: translate('page.form.name'),
                      name: translate('model.lowercase.brand'),
                    }
              )}
            />
            <InputField fullWidth name="managerEmail" label={translate('page.form.managerEmail')} />
            <Stack direction="row" gap={2}>
              <InputField fullWidth name="address" label={translate('page.form.addressDetail')} />
              <AutoCompleteField
                options={provinceOptions}
                getOptionLabel={(value: any) => {
                  return getOpObjProvince(value)?.label;
                }}
                isOptionEqualToValue={(option: any, value: any) => {
                  if (!option) return option;
                  return option.value === getOpObjProvince(value)?.value;
                }}
                transformValue={(opt: any) => opt.value}
                name="provinceId"
                type="text"
                label={translate('page.form.province')}
              />
            </Stack>
            <Stack direction="row" gap={2}>
              <AutoCompleteField
                options={districtOptions}
                getOptionLabel={(value: any) => {
                  const label = getOpObjDistrict(value)?.label;
                  return label === undefined ? '' : label;
                }}
                isOptionEqualToValue={(option: any, value: any) => {
                  if (!option) return option;
                  return option.value === getOpObjDistrict(value)?.value;
                }}
                transformValue={(opt: any) => opt.value}
                name="districtId"
                type="text"
                label={translate('page.form.district')}
                disabled={provinceId === 0}
              />
              <AutoCompleteField
                options={wardOptions}
                getOptionLabel={(value: any) => {
                  const label = getOpObjWard(value)?.label;
                  return label === undefined ? '' : label;
                }}
                isOptionEqualToValue={(option: any, value: any) => {
                  if (!option) return option;
                  return option.value === getOpObjWard(value)?.value;
                }}
                transformValue={(opt: any) => opt.value}
                name="wardId"
                type="text"
                label={translate('page.form.ward')}
                disabled={districtId === 0}
              />
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BrandForm;
