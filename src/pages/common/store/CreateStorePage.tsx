/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllKitchenCenters } from 'redux/kitchenCenter/kitchenCenterSlice';
import { createNewStore, getStoreDetail, updateStore } from 'redux/store/storeSlice';
import { checkEmail, setStatus } from 'redux/auth/authSlice';
//
import { EmailForm, ListParams, Params } from 'common/@types';
import { Color, Status } from 'common/enums';
import { StoreToCreate, StoreToUpdate } from 'common/models';
import { LoadingScreen, Page } from 'components';
import { useDebounce, useLocales, useValidationForm } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StoreForm } from 'sections/store';

function CreateStorePage() {
  const { id: storeId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaStore } = useValidationForm();

  const { status } = useAppSelector((state) => state.auth);
  const { brandProfile } = useAppSelector((state) => state.profile);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { store, isEditing, isLoading } = useAppSelector((state) => state.store);
  const { isLoading: isLoadingKitchenCenters } = useAppSelector((state) => state.kitchenCenter);

  const createStoreForm = useForm<Omit<StoreToCreate, 'brandId'>>({
    defaultValues: {
      name: isEditing && store ? store?.name : '',
      logo: isEditing && store ? store?.logo : '',
      storeManagerEmail: isEditing && store ? store?.storeManagerEmail : '',
      kitchenCenterId: isEditing && store ? store?.kitchenCenter.kitchenCenterId : 0,
    },
    resolver: yupResolver(schemaStore),
  });

  const { handleSubmit, reset, watch, setError, clearErrors } = createStoreForm;

  const paramsKitchenCenter: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, []);

  useEffect(() => {
    if (!isEditing) {
      dispatch(getAllKitchenCenters(paramsKitchenCenter));
    }
  }, [paramsKitchenCenter]);

  const params = useMemo(() => {
    return {
      storeId,
      navigate,
    };
  }, [storeId, navigate]);

  useEffect(() => {
    if (store !== null && isEditing === true) {
      reset({
        name: store?.name,
        logo: store?.logo,
        storeManagerEmail: store?.storeManagerEmail,
        kitchenCenterId: store?.kitchenCenter.kitchenCenterId,
      });
    }
  }, [store]);

  useEffect(() => {
    if (isEditing) {
      dispatch(getStoreDetail(params));
    }
  }, [dispatch, navigate, params]);

  const email = watch('storeManagerEmail');

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
      setError('storeManagerEmail', { message: translate('page.validation.emailInvalid') });
    }
    if (status === Status.VALID) {
      clearErrors();
    }
  }, [status]);

  const onSubmit = async (values: Omit<StoreToCreate, 'brandId'>) => {
    const data = { ...values };

    if (isEditing) {
      const paramUpdate: Params<StoreToUpdate> = {
        data: {
          name: data.name,
          status: store?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
          logo: typeof values.logo === 'string' ? '' : data.logo,
          storeManagerEmail: data.storeManagerEmail,
        },
        idParams: {
          storeId: store?.storeId,
        },
        pathname: pathnameToBack,
        navigate,
      };
      dispatch(updateStore(paramUpdate));
    } else {
      const paramCreate: Params<StoreToCreate> = {
        data: { ...data, brandId: brandProfile ? brandProfile?.brandId : 0 },
        navigate,
      };
      dispatch(createNewStore(paramCreate));
    }
  };

  return (
    <>
      {isEditing ? (
        <>
          {isLoading && (
            <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
              <LoadingScreen />
            </Box>
          )}
        </>
      ) : (
        <>
          {isLoadingKitchenCenters && (
            <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
              <LoadingScreen />
            </Box>
          )}
        </>
      )}

      {!isEditing && (
        <>
          {isLoading && (
            <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
              <LoadingScreen />
            </Box>
          )}
        </>
      )}

      <Page
        title={
          isEditing
            ? translate('page.title.update', { model: translate('model.lowercase.store') })
            : translate('button.register', { model: translate('model.lowercase.store') })
        }
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createStoreForm}>
          <Card sx={{ p: 3 }}>
            <StoreForm />
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
            <Stack direction="row" gap={1.5}>
              {isEditing && (
                <Button
                  variant="contained"
                  color="inherit"
                  disabled={isLoading}
                  onClick={() => {
                    reset({
                      name: store?.name,
                      logo: store?.logo,
                      storeManagerEmail: store?.storeManagerEmail,
                      kitchenCenterId: store?.kitchenCenter.kitchenCenterId,
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
                {isEditing ? translate('button.update') : translate('button.registerNew')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateStorePage;
