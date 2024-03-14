/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { createNewStorePartner } from 'redux/storePartner/storePartnerSlice';
// section
import { AddStorePartnerConfirm, StorePartnerForm } from 'sections/storePartner';
//
import { StorePartnerToCreate, StorePartnerToCreateAPI } from 'common/models';
import { Params } from 'common/@types';
import { LoadingScreen, Page } from 'components';
import { useLocales, useModal, useValidationForm } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

function AddPartnerToStorePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { schemaStorePartner } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isLoading, isAddFormDetail, storeId } = useAppSelector((state) => state.storePartner);

  const defaultValues = {
    storeId: isAddFormDetail ? storeId : 0,
    partnerAccounts: [
      {
        partnerId: 0,
        userName: '',
        password: '',
        commission: 0,
      },
    ],
  };

  const createStoreForm = useForm<StorePartnerToCreate>({
    defaultValues,
    resolver: yupResolver(schemaStorePartner),
  });

  const { handleSubmit } = createStoreForm;

  const onSubmit = handleSubmit((values: StorePartnerToCreate) => {
    const data = { ...values };
    const paramCreate: Params<StorePartnerToCreateAPI> = {
      data: { ...data, isMappingProducts: false },
      navigate,
    };
    dispatch(createNewStorePartner(paramCreate));
  });

  const onSubmitToLink = handleSubmit((values: StorePartnerToCreate) => {
    const data = { ...values };
    const paramCreate: Params<StorePartnerToCreateAPI> = {
      data: { ...data, isMappingProducts: true },
      navigate,
    };
    dispatch(createNewStorePartner(paramCreate));
  });

  return (
    <>
      {isLoading && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Page
        title={translate('page.title.create', { model: translate('model.lowercase.storePartner') })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
      >
        <FormProvider {...createStoreForm}>
          <Card sx={{ p: 3 }}>
            <StorePartnerForm defaultValues={defaultValues} />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameToBack)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={1.5}>
              <Button type="submit" variant="contained" disabled={isLoading} onClick={handleOpen}>
                {translate('button.create')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>

      {isOpen && (
        <AddStorePartnerConfirm
          isOpen={isOpen}
          handleOpen={handleOpen}
          onSubmit={onSubmit}
          onSubmitToLink={onSubmitToLink}
        />
      )}
    </>
  );
}

export default AddPartnerToStorePage;
