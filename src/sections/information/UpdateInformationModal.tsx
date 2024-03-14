/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { updateBrandProfile } from 'redux/profile/profileSlice';
import { getAllDistrictByProvinceId, getAllProvinces, getAllWardByDistrictId } from 'redux/address/addressSlice';
// interface
import { Params } from 'common/@types';
import { Color, Language } from 'common/enums';
import { UpdateBrandProfile, UpdateBrandProfileForm } from 'common/models';
//
import { AutoCompleteField, InputField, UploadImageField } from 'components';
import { useLocales, useValidationForm } from 'hooks';

interface UpdateInformationModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function UpdateInformationModal({ isOpen, handleOpen }: UpdateInformationModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();
  const { schemaUpdateProfile } = useValidationForm();

  const { provinces, districts, wards } = useAppSelector((state) => state.address);
  const { brandProfile, isLoading, isEditing } = useAppSelector((state) => state.profile);

  const createPartnerForm = useForm<UpdateBrandProfileForm>({
    defaultValues: {
      name: brandProfile?.name,
      logo: brandProfile?.logo,
      address: brandProfile?.address
        .split(', ')
        .slice(0, brandProfile?.address.split(', ').length - 6)
        .join(', ') as string,
      provinceId: Number(brandProfile?.address.split(', ').slice(-3)[2]),
      districtId: Number(brandProfile?.address.split(', ').slice(-3)[1]),
      wardId: Number(brandProfile?.address.split(', ').slice(-3)[0]),
    },
    resolver: yupResolver(schemaUpdateProfile),
  });

  const { handleSubmit, reset, watch } = createPartnerForm;

  const provinceId = watch('provinceId');
  const districtId = watch('districtId');
  const wardId = watch('wardId');

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

  const province = provinces.find((opt) => Number(opt.province_id) === provinceId);
  const district = districts.find((opt) => Number(opt.district_id) === districtId);
  const ward = wards.find((opt) => Number(opt.ward_id) === wardId);

  const onSubmit = async (values: UpdateBrandProfileForm) => {
    const data = { ...values };

    const paramUpdate: Params<UpdateBrandProfile> = {
      data: {
        name: data.name,
        logo: typeof values.logo === 'string' ? '' : data.logo,
        address: `${data.address}, ${ward?.ward_name}, ${district?.district_name}, ${province?.province_name}, ${ward?.ward_id}, ${district?.district_id}, ${province?.province_id}`,
      },
      idParams: {
        brandId: brandProfile?.brandId,
      },
      navigate,
    };
    dispatch(updateBrandProfile(paramUpdate));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...createPartnerForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.update', {
                    model: `${translate('model.lowercase.information')} ${translate('model.lowercase.brand')}`,
                  })}
                </Typography>
                <IconButton onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3} pb={1}>
                <UploadImageField
                  label={translate('page.content.dragDrop')}
                  subLabel={translate('page.content.imageAllowed')}
                  margin="auto"
                  name="logo"
                  defaultValue=""
                  isEditing={isEditing}
                />

                <Stack width="100%" gap={2}>
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
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                disabled={isLoading}
                variant="contained"
                color="inherit"
                onClick={() => {
                  reset({
                    name: brandProfile?.name,
                    logo: brandProfile?.logo,
                    address: brandProfile?.address,
                  });
                }}
              >
                {translate('button.reset')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                color={Color.WARNING}
                onClick={handleSubmit(onSubmit)}
              >
                {translate('button.update')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default UpdateInformationModal;
