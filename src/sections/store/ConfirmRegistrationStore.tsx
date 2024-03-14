import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Dialog, DialogActions, DialogContent, Divider, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch } from 'redux/configStore';
import { confirmRegistrationStore } from 'redux/store/storeSlice';
//
import { OptionSelect } from 'common/@types';
import { Color, Status } from 'common/enums';
import { Store, StoreToConfirm } from 'common/models';
import { InputField } from 'components';
import { useLocales } from 'hooks';

interface ConfirmRegistrationStoreProps {
  page?: number;
  rowsPerPage?: number;
  store?: Store | null;
  isOpen: boolean;
  filterName?: string;
  sortBy?: string;
  storeStatus: Status;
  statusFilter?: OptionSelect | null;
  handleOpen: (title: any) => void;
  handleCloseMenuConfirm: () => void;
}

function ConfirmRegistrationStore({
  store,
  isOpen,
  handleOpen,
  page = 1,
  rowsPerPage = 5,
  handleCloseMenuConfirm,
  storeStatus = Status.ACTIVE,
  statusFilter,
  filterName,
  sortBy,
}: ConfirmRegistrationStoreProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const confirmRegistrationForm = useForm<StoreToConfirm>({
    defaultValues: {
      status: storeStatus === Status.ACTIVE ? Status.ACTIVE : Status.REJECTED,
      rejectedReason: storeStatus === Status.ACTIVE ? Status.ACTIVE : '',
    },
    resolver: yupResolver(
      yup.object({
        status: yup.string().required(
          translate('page.validation.select', {
            name: translate('table.lowercase.status'),
          })
        ),
        rejectedReason: yup.string().required(
          translate('page.validation.required', {
            name: translate('page.form.contentLower'),
          })
        ),
      })
    ),
  });

  const { handleSubmit } = confirmRegistrationForm;

  const onSubmit = async (values: StoreToConfirm) => {
    handleOpen(values.status);
    handleCloseMenuConfirm();
    const data = { ...values };

    dispatch(
      confirmRegistrationStore({
        data: { ...data },
        idParams: { storeId: store?.storeId },
        optionParams: {
          searchValue: filterName,
          itemsPerPage: rowsPerPage,
          currentPage: page + 1,
          status: statusFilter ? statusFilter?.value : '',
          sortBy: sortBy,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...confirmRegistrationForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {storeStatus === Status.ACTIVE
                    ? translate('dialog.confirmAcceptTitle', { model: translate('model.lowercase.store') })
                    : translate('page.title.registration', {
                        model: translate('model.lowercase.store'),
                      })}
                </Typography>
              </Stack>

              <Divider sx={{ mt: 1.5, mb: 3.5 }} />

              <Stack direction="row" alignItems="start" gap={2}>
                <img src={store?.logo} alt={store?.name} height={150} width={150} />
                <Stack gap={0.5}>
                  <Typography variant="subtitle1">
                    {translate('table.name')}:{' '}
                    <Typography component="span" variant="body1">
                      {store?.name}
                    </Typography>
                  </Typography>

                  <Typography variant="subtitle1">
                    {translate('model.capitalizeOne.brand')}:{' '}
                    <Typography component="span" variant="body1">
                      {store?.brand.name}
                    </Typography>
                  </Typography>
                  <Typography variant="subtitle1">
                    {translate('model.capitalizeOne.kitchenCenter')}:{' '}
                    <Typography component="span" variant="body1">
                      {store?.kitchenCenter.name}
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>

              <Stack alignItems="start" gap={1} mt={2}>
                <Typography component="span" variant="body2" color={Color.ERROR}>
                  {storeStatus === Status.ACTIVE
                    ? translate('dialog.confirmAcceptContent', { model: translate('model.lowercase.store') })
                    : translate('dialog.confirmRejectContent', { model: translate('model.lowercase.store') })}
                </Typography>
                {storeStatus === Status.REJECTED && (
                  <InputField
                    fullWidth
                    name="rejectedReason"
                    label={translate('page.form.content')}
                    multiline
                    minRows={3}
                  />
                )}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  handleOpen(Status.REJECTED);
                  handleCloseMenuConfirm();
                }}
              >
                {translate('button.cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color={storeStatus === Status.ACTIVE ? Color.SUCCESS : Color.ERROR}
                onClick={handleSubmit(onSubmit)}
              >
                {storeStatus === Status.ACTIVE ? translate('button.accept') : translate('button.reject')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default ConfirmRegistrationStore;
