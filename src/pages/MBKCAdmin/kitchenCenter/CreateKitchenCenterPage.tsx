/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import {
  createNewKitchenCenter,
  getKitchenCenterDetail,
  updateKitchenCenter,
} from 'redux/kitchenCenter/kitchenCenterSlice';
import { checkEmail, setStatus } from 'redux/auth/authSlice';
// section
import KitchenCenterForm from 'sections/kitchenCenter/KitchenCenterForm';
// interface
import { AddressFormInterface, EmailForm, Params } from 'common/@types';
import { Color, Status } from 'common/enums';
import { KitchenCenterToAdd, KitchenCenterToUpdate } from 'common/models';
//
import { LoadingScreen, Page } from 'components';
import { useDebounce, useLocales, useValidationForm } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

function CreateKitchenCenterPage() {
  const { id: kitchenCenterId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaCommonBrandKitchenCenter } = useValidationForm();

  const { status } = useAppSelector((state) => state.auth);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { provinces, districts, wards } = useAppSelector((state) => state.address);
  const { isEditing, isLoading, kitchenCenter } = useAppSelector((state) => state.kitchenCenter);

  const createKitchenCenterForm = useForm<AddressFormInterface>({
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

  const { handleSubmit, watch, reset, setValue, setError, clearErrors } = createKitchenCenterForm;

  const provinceId = watch('provinceId');
  const districtId = watch('districtId');
  const wardId = watch('wardId');

  const province = provinces.find((opt) => Number(opt.province_id) === provinceId);
  const district = districts.find((opt) => Number(opt.district_id) === districtId);
  const ward = wards.find((opt) => Number(opt.ward_id) === wardId);

  useEffect(() => {
    if (kitchenCenter !== null && isEditing === true) {
      setValue('name', kitchenCenter?.name as string);
      setValue(
        'address',
        kitchenCenter?.address
          .split(', ')
          .slice(0, kitchenCenter?.address.split(', ').length - 6)
          .join(', ') as string
      );
      setValue('logo', kitchenCenter?.logo as string);
      setValue('managerEmail', kitchenCenter?.kitchenCenterManagerEmail as string);
      setValue('provinceId', Number(kitchenCenter?.address.split(', ').slice(-3)[2]));
      setValue('districtId', Number(kitchenCenter?.address.split(', ').slice(-3)[1]));
      setValue('wardId', Number(kitchenCenter?.address.split(', ').slice(-3)[0]));
    }
  }, [kitchenCenter, isEditing, setValue]);

  const params = useMemo(() => {
    return {
      kitchenCenterId,
      navigate,
    };
  }, [kitchenCenterId, navigate]);

  useEffect(() => {
    if (isEditing) {
      dispatch(getKitchenCenterDetail(params));
    }
  }, [dispatch, navigate, params]);

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

  const onSubmit = async (values: AddressFormInterface) => {
    const data = { ...values };

    if (isEditing) {
      const paramUpdate: Params<KitchenCenterToUpdate> = {
        data: {
          name: data.name,
          address: `${data.address}, ${ward?.ward_name}, ${district?.district_name}, ${province?.province_name}, ${ward?.ward_id}, ${district?.district_id}, ${province?.province_id}`,
          status: Status.ACTIVE,
          logo: typeof values.logo === 'string' ? '' : data.logo,
          managerEmail: data.managerEmail,
        },
        idParams: {
          kitchenCenterId: kitchenCenter?.kitchenCenterId,
        },
        pathname: pathnameToBack,
        navigate,
      };
      dispatch<any>(updateKitchenCenter(paramUpdate));
    } else {
      const createKitchenCenter: Params<KitchenCenterToAdd> = {
        data: {
          name: data.name,
          address: `${data.address}, ${ward?.ward_name}, ${district?.district_name}, ${province?.province_name}, ${ward?.ward_id}, ${district?.district_id}, ${province?.province_id}`,
          logo: data.logo,
          managerEmail: data.managerEmail,
        },
        navigate,
      };
      dispatch<any>(createNewKitchenCenter(createKitchenCenter));
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
            ? translate('page.title.update', { model: translate('model.lowercase.kitchenCenter') })
            : translate('page.title.create', { model: translate('model.lowercase.kitchenCenter') })
        }
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createKitchenCenterForm}>
          <Card sx={{ p: 3 }}>
            <KitchenCenterForm />
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
                      name: kitchenCenter?.name,
                      address: kitchenCenter?.address
                        ? kitchenCenter?.address
                            .split(', ')
                            .slice(0, kitchenCenter?.address.split(', ').length - 6)
                            .join(', ')
                        : kitchenCenter?.address,
                      logo: kitchenCenter?.logo,
                      managerEmail: kitchenCenter?.kitchenCenterManagerEmail,
                      provinceId: Number(kitchenCenter?.address.split(', ').slice(-3)[2]),
                      districtId: Number(kitchenCenter?.address.split(', ').slice(-3)[1]),
                      wardId: Number(kitchenCenter?.address.split(', ').slice(-3)[0]),
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
                onClick={handleSubmit(onSubmit)}
                color={isEditing ? Color.WARNING : Color.PRIMARY}
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
export default CreateKitchenCenterPage;
