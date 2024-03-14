/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { createNewCashier, getCashierDetail, updateCashier } from 'redux/cashier/cashierSlice';
import { checkEmail, setStatus } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// interface
import { EmailForm, Params } from 'common/@types';
import { CashierToCreate, CashierToUpdate } from 'common/models';
import { Color, Gender, Status } from 'common/enums';
// section
import { CashierForm } from 'sections/cashier';
import { LoadingScreen, Page } from 'components';
import { useDebounce, useLocales, useValidationForm } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function CreateCashierPage() {
  const { id: cashierId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaCashier } = useValidationForm();

  const { status } = useAppSelector((state) => state.auth);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isEditing, isLoading, cashier } = useAppSelector((state) => state.cashier);

  const createCashierForm = useForm<CashierToCreate>({
    defaultValues: {
      email: '',
      fullName: '',
      gender: '',
      avatar: '',
      citizenNumber: '',
    },
    resolver: yupResolver(schemaCashier),
  });

  const { handleSubmit, setValue, watch, setError, clearErrors } = createCashierForm;

  useEffect(() => {
    if (cashier !== null && isEditing === true) {
      setValue('email', cashier?.email as string);
      setValue('fullName', cashier?.fullName as string);
      setValue('gender', cashier?.gender.toLowerCase() === Gender.MALE ? Gender.MALE : Gender.FEMALE);
      setValue('avatar', cashier?.avatar);
      setValue('citizenNumber', cashier?.citizenNumber as string);
      setValue('dateOfBirth', cashier?.dateOfBirth);
    }
  }, [cashier, isEditing, setValue]);

  const email = watch('email');

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
      setError('email', { message: translate('page.validation.emailInvalid') });
    }
    if (status === Status.VALID) {
      clearErrors();
    }
  }, [status]);

  const onSubmit = async (values: CashierToCreate) => {
    const data = { ...values };

    if (isEditing) {
      const paramsUpdate: Params<CashierToUpdate> = {
        data: {
          fullName: data.fullName,
          gender: data.gender as 'male' | 'female',
          dateOfBirth: data.dateOfBirth,
          avatar: data.avatar,
          citizenNumber: data.citizenNumber,
          newPassword: '',
          status: Status.ACTIVE,
        },
        idParams: {
          cashierId: cashier?.accountId,
        },
        pathname: pathnameToBack,
        navigate,
      };
      dispatch<any>(updateCashier(paramsUpdate));
    } else {
      const paramsCreate: Params<CashierToCreate> = {
        data: {
          email: data.email,
          fullName: data.fullName,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          avatar: data.avatar,
          citizenNumber: data.citizenNumber,
        },
        navigate,
      };
      dispatch<any>(createNewCashier(paramsCreate));
    }
  };

  const paramsDetail = useMemo(() => {
    return {
      cashierId,
      navigate,
    };
  }, [cashierId, navigate]);

  useEffect(() => {
    if (isEditing) {
      dispatch<any>(getCashierDetail(paramsDetail));
    }
  }, [dispatch, navigate, paramsDetail, isEditing]);

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
            ? translate('page.title.update', { model: translate('model.lowercase.cashier') })
            : translate('page.title.create', { model: translate('model.lowercase.cashier') })
        }
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
      >
        <FormProvider {...createCashierForm}>
          <Card sx={{ p: 3 }}>
            <CashierForm />
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
                <Button variant="contained" disabled={isLoading} color="inherit">
                  {translate('button.reset')}
                </Button>
              )}
              <Button
                variant="contained"
                color={isEditing ? Color.WARNING : Color.PRIMARY}
                type="submit"
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

export default CreateCashierPage;
