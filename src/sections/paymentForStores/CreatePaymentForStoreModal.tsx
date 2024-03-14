import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllStores } from 'redux/store/storeSlice';
import { createPaymentForStore } from 'redux/moneyExchange/moneyExchangeSlice';
// interface
import { ListParams, Params } from 'common/@types';
import { Color, ExchangeType } from 'common/enums';
import { PaymentForStoresToCreate, Store } from 'common/models';
//
import { AutoCompleteField, InputNumber, UploadImageField } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { fDate, formatCurrency } from 'utils';

interface CreatePaymentForStoreModalProps {
  page: number;
  rowsPerPage: number;
  isOpen: boolean;
  handleOpen: (title: any) => void;
  sortBy: string;
  searchDateFrom: Date | null;
  searchDateTo: Date | null;
  status: string;
}

function CreatePaymentForStoreModal({
  page,
  rowsPerPage,
  isOpen,
  handleOpen,
  sortBy,
  searchDateFrom,
  searchDateTo,
  status,
}: CreatePaymentForStoreModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { schemaPaymentForStore } = useValidationForm();

  const { stores } = useAppSelector((state) => state.store);
  const { isLoading } = useAppSelector((state) => state.wallet);

  const [storeAmountWallet, setStoreAmountWallet] = useState<number>(0);

  const createPaymentForStoreForm = useForm<PaymentForStoresToCreate>({
    defaultValues: {
      storeId: 0,
      amount: '',
      image: '',
    },
    resolver: yupResolver(schemaPaymentForStore),
  });

  const { handleSubmit, watch } = createPaymentForStoreForm;

  const storeId = watch('storeId');

  const storeOptions = stores.map((store: Store) => ({
    label: store.name,
    value: store.storeId,
    center: store.kitchenCenter.name,
    image: store.logo,
    amount: store.walletBalance,
  }));

  const getOpObjStore = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions.find((opt) => opt.value === option);
    setStoreAmountWallet(option.amount);
    return option;
  };

  const onSubmit = async (values: PaymentForStoresToCreate) => {
    const data = { ...values };
    handleOpen('');
    const paramCreate: Params<PaymentForStoresToCreate> = {
      data: data,
      optionParams: {
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        sortBy: sortBy,
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
        status: status,
        exchangeType: ExchangeType.WITHDRAW,
      },
      navigate,
    };
    dispatch(createPaymentForStore(paramCreate));
  };

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, [navigate]);

  useEffect(() => {
    dispatch(getAllStores(params));
  }, [params, dispatch]);

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...createPaymentForStoreForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.create', {
                    model: ` ${translate('model.lowercase.paymentForStore')}`,
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
                  name="image"
                  defaultValue=""
                  width={500}
                  borderRadius="unset"
                />

                <Stack width="100%" gap={2}>
                  <AutoCompleteField
                    options={storeOptions}
                    getOptionLabel={(value: any) => {
                      const label = getOpObjStore(value)?.label;
                      return label === undefined ? '' : label;
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

                  {storeId !== 0 && storeId !== undefined && (
                    <Stack alignItems="left" width="100%" pl={2}>
                      <Typography>
                        {translate('dialog.amountOfStoreWallet')}:{' '}
                        <Typography component="span" variant="subtitle1">
                          {formatCurrency(storeAmountWallet)}
                        </Typography>
                      </Typography>
                    </Stack>
                  )}

                  <InputNumber fullWidth name="amount" label={translate('page.form.amount')} />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                disabled={isLoading}
                type="submit"
                variant="contained"
                color={Color.PRIMARY}
                onClick={handleSubmit(onSubmit)}
              >
                {translate('button.create')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default CreatePaymentForStoreModal;
