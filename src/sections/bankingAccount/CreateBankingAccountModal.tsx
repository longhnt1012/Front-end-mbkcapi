import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { createNewBankingAccount, updateBankingAccount } from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { Params } from 'common/@types';
import { Color, Language, Status } from 'common/enums';
import { BankingAccountToCreate, BankingAccountToUpdate } from 'common/models';
import { InputField, InputNumber, UploadImageField } from 'components';
import { useLocales, useValidationForm } from 'hooks';

interface CreateBankingAccountModalProps {
  page: number;
  rowsPerPage: number;
  isOpen: boolean;
  handleOpen: () => void;
  filterName: string;
  sortBy: string;
}

function CreateBankingAccountModal({
  page = 1,
  rowsPerPage,
  isOpen,
  handleOpen,
  filterName,
  sortBy,
}: CreateBankingAccountModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();
  const { schemaBankingAccount } = useValidationForm();

  const { isEditing, isLoading, bankingAccount } = useAppSelector((state) => state.bankingAccount);

  const createBankingAccountForm = useForm<BankingAccountToCreate>({
    defaultValues: {
      bankName: isEditing && bankingAccount ? bankingAccount.name : '',
      bankLogo: isEditing && bankingAccount ? bankingAccount.logoUrl : '',
      numberAccount: isEditing && bankingAccount ? bankingAccount.numberAccount : '',
    },
    resolver: yupResolver(schemaBankingAccount),
  });

  const { handleSubmit, reset } = createBankingAccountForm;

  const onSubmit = async (values: BankingAccountToCreate) => {
    const data = { ...values };

    handleOpen();

    if (isEditing) {
      const paramUpdate: Params<BankingAccountToUpdate> = {
        data: {
          bankName: data.bankName,
          bankLogo: data.bankLogo,
          status: Status.ACTIVE,
        },
        optionParams: {
          searchValue: filterName,
          currentPage: page,
          itemsPerPage: rowsPerPage,
          sortBy: sortBy,
        },
        idParams: {
          bankingAccountId: bankingAccount?.bankingAccountId,
        },
        navigate,
      };
      dispatch(updateBankingAccount(paramUpdate));
    } else {
      const paramCreate: Params<BankingAccountToCreate> = {
        data: data,
        optionParams: {
          searchValue: filterName,
          currentPage: page,
          itemsPerPage: rowsPerPage,
          sortBy: sortBy,
        },
        navigate,
      };
      dispatch(createNewBankingAccount(paramCreate));
    }
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...createBankingAccountForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {isEditing
                    ? translate('page.title.update', {
                        model: ` ${translate('model.lowercase.bankingAccount')}`,
                      })
                    : translate('page.title.create', {
                        model: ` ${translate('model.lowercase.bankingAccount')}`,
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
                  name="bankLogo"
                  defaultValue=""
                  isEditing={isEditing}
                />

                <Stack width="100%" gap={2}>
                  <InputField
                    fullWidth
                    name="bankName"
                    label={translate(
                      'page.form.nameExchange',
                      currentLang.value === Language.ENGLISH
                        ? {
                            model: translate('model.capitalizeOne.bankingAccount'),
                            name: translate('page.form.nameLower'),
                          }
                        : {
                            model: translate('page.form.name'),
                            name: translate('model.lowercase.bankingAccount'),
                          }
                    )}
                  />
                  <InputNumber
                    fullWidth
                    name="numberAccount"
                    disabled={isEditing}
                    label={translate('page.form.numberAccount')}
                  />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              {isEditing && (
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    reset({
                      bankName: bankingAccount?.name,
                      bankLogo: bankingAccount?.logoUrl,
                      numberAccount: bankingAccount?.numberAccount,
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
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default CreateBankingAccountModal;
