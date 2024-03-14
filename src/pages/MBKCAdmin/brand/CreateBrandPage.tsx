/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { createNewBrand, getBrandDetail, updateBrand } from 'redux/brand/brandSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { checkEmail, setStatus } from 'redux/auth/authSlice';
// section
import { BrandForm } from 'sections/brand';
// interface
import { AddressFormInterface, EmailForm, Params } from 'common/@types';
import { Color, Status } from 'common/enums';
import { BrandToCreate, BrandToUpdate } from 'common/models';
//
import { LoadingScreen, Page } from 'components';
import { useDebounce, useLocales, useValidationForm } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

function CreateBrandPage() {
  const { id: brandId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaCommonBrandKitchenCenter } = useValidationForm();

  const { status } = useAppSelector((state) => state.auth);
  const { pathnameToBack } = useAppSelector((state: any) => state.routes);
  const { provinces, districts, wards } = useAppSelector((state) => state.address);
  const { isEditing, isLoading, brand } = useAppSelector((state: any) => state.brand);

  const createBrandForm = useForm<AddressFormInterface>({
    defaultValues: {
      name: '',
      address: '',
      logo: '',
      managerEmail: '',
      provinceId: 0,
      districtId: 0,
      wardId: 0,
    },
    resolver: yupResolver(schemaCommonBrandKitchenCenter),
  });

  const { handleSubmit, watch, reset, setValue, setError, clearErrors } = createBrandForm;

  const provinceId = watch('provinceId');
  const districtId = watch('districtId');
  const wardId = watch('wardId');

  const province = provinces.find((opt) => Number(opt.province_id) === provinceId);
  const district = districts.find((opt) => Number(opt.district_id) === districtId);
  const ward = wards.find((opt) => Number(opt.ward_id) === wardId);

  useEffect(() => {
    if (brand !== null && isEditing === true) {
      setValue('name', brand?.name as string);
      setValue(
        'address',
        brand?.address
          .split(', ')
          .slice(0, brand?.address.split(', ').length - 6)
          .join(', ') as string
      );
      setValue('logo', brand?.logo as string);
      setValue('managerEmail', brand?.brandManagerEmail as string);
      setValue('provinceId', Number(brand?.address.split(', ').slice(-3)[2]));
      setValue('districtId', Number(brand?.address.split(', ').slice(-3)[1]));
      setValue('wardId', Number(brand?.address.split(', ').slice(-3)[0]));
    }
  }, [brand, isEditing, setValue]);

  const params = useMemo(() => {
    return {
      brandId,
      navigate,
    };
  }, [brandId, navigate]);

  useEffect(() => {
    if (isEditing) {
      dispatch(getBrandDetail(params));
    }
  }, [params, isEditing]);

  useEffect(() => {
    setValue('districtId', 0);
    setValue('wardId', 0);
  }, [provinceId]);

  useEffect(() => {
    setValue('wardId', wardId !== undefined ? wardId : 0);
  }, [districtId]);

  const email = watch('managerEmail');

  const debounceValue = useDebounce(email?.trim(), 1000);

  const validationEmail = () => {
    const params: Params<EmailForm> = {
      data: { email: email },
      navigate,
    };
    dispatch(checkEmail(params));
  };

  useEffect(() => {
    if (email !== undefined && email !== '' && email !== null) {
      validationEmail();
    }
  }, [debounceValue]);

  useEffect(() => {
    if (status === Status.INVALID) {
      setError('managerEmail', { message: translate('page.validation.emailInvalid') });
    }
    if (status === Status.VALID) {
      clearErrors();
    }
  }, [status]);

  const onSubmit = (values: AddressFormInterface) => {
    const data = { ...values };

    if (isEditing) {
      const paramUpdate: Params<BrandToUpdate> = {
        data: {
          name: data.name,
          address: `${data.address}, ${ward?.ward_name}, ${district?.district_name}, ${province?.province_name}, ${ward?.ward_id}, ${district?.district_id}, ${province?.province_id}`,
          status: Status.ACTIVE,
          logo: typeof values.logo === 'string' ? '' : data.logo,
          brandManagerEmail: data.managerEmail,
        },
        idParams: {
          brandId: brand?.brandId,
        },
        pathname: pathnameToBack,
        navigate,
      };
      dispatch<any>(updateBrand(paramUpdate));
    } else {
      const createBrand: Params<BrandToCreate> = {
        data: {
          Name: data.name,
          Address: `${data.address}, ${ward?.ward_name}, ${district?.district_name}, ${province?.province_name}, ${ward?.ward_id}, ${district?.district_id}, ${province?.province_id}`,
          Logo: data.logo,
          ManagerEmail: data.managerEmail,
        },
        navigate,
      };

      dispatch<any>(createNewBrand(createBrand));
    }
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Page
        title={
          isEditing
            ? translate('page.title.update', { model: translate('model.lowercase.brand') })
            : translate('page.title.create', { model: translate('model.lowercase.brand') })
        }
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createBrandForm}>
          <Card sx={{ p: 3 }}>
            <BrandForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                navigate(pathnameToBack);
                dispatch(setStatus());
              }}
            >
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={2}>
              {isEditing && (
                <Button
                  variant="contained"
                  disabled={isLoading}
                  color="inherit"
                  onClick={() => {
                    reset({
                      name: brand?.name,
                      address: brand?.address
                        ? brand?.address
                            .split(', ')
                            .slice(0, brand?.address.split(', ').length - 6)
                            .join(', ')
                        : brand?.address,
                      logo: brand?.logo,
                      managerEmail: brand?.brandManagerEmail,
                      provinceId: Number(brand?.address.split(', ').slice(-3)[2]),
                      districtId: Number(brand?.address.split(', ').slice(-3)[1]),
                      wardId: Number(brand?.address.split(', ').slice(-3)[0]),
                    });
                  }}
                >
                  {translate('button.reset')}
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                color={isEditing ? Color.WARNING : Color.PRIMARY}
                onClick={handleSubmit(onSubmit)}
              >
                {isEditing ? translate('button.update') : translate('button.create')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateBrandPage;
