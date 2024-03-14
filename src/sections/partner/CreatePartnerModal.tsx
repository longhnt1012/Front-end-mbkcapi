import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { updatePartner } from 'redux/partner/partnerSlice';
//
import { Params } from 'common/@types';
import { PartnerToCreate, PartnerToUpdate } from 'common/models';
import { Color, Language, Status } from 'common/enums';
import { InputField, UploadImageField } from 'components';
import { useLocales, useValidationForm } from 'hooks';

interface CreatePartnerModalProps {
  page: number;
  rowsPerPage: number;
  isOpen: boolean;
  handleOpen: (title: any) => void;
  filterName: string;
  sortBy: string;
}

function CreatePartnerModal({ page, rowsPerPage, isOpen, handleOpen, filterName, sortBy }: CreatePartnerModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();
  const { schemaPartner } = useValidationForm();

  const { partner, isEditing, isLoading } = useAppSelector((state) => state.partner);

  const createPartnerForm = useForm<PartnerToCreate>({
    defaultValues: {
      name: isEditing && partner ? partner?.name : '',
      logo: isEditing && partner ? partner?.logo : '',
      taxCommission: isEditing && partner ? partner?.taxCommission : 0,
      webUrl: isEditing && partner ? (partner?.webUrl === 'null' ? '' : partner?.webUrl) : '',
    },
    resolver: yupResolver(schemaPartner),
  });

  const { handleSubmit, reset } = createPartnerForm;

  const onSubmit = async (values: PartnerToCreate) => {
    const data = { ...values };

    const paramUpdate: Params<PartnerToUpdate> = {
      data: {
        name: data.name,
        status: partner?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
        logo: typeof values.logo === 'string' ? '' : data.logo,
        webUrl: data.webUrl,
        taxCommission: data.taxCommission,
      },
      optionParams: {
        searchValue: filterName,
        currentPage: page,
        itemsPerPage: rowsPerPage,
        sortBy: sortBy,
      },
      idParams: {
        partnerId: partner?.partnerId,
      },
      navigate,
    };
    dispatch(updatePartner(paramUpdate));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...createPartnerForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {isEditing
                    ? translate('page.title.update', {
                        model: `${translate('model.lowercase.information')} ${translate('model.lowercase.partner')}`,
                      })
                    : translate('page.title.create', {
                        model: `${translate('model.lowercase.information')} ${translate('model.lowercase.partner')}`,
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
                    disabled={isEditing}
                    label={translate(
                      'page.form.nameExchange',
                      currentLang.value === Language.ENGLISH
                        ? {
                            model: translate('model.capitalizeOne.partner'),
                            name: translate('page.form.nameLower'),
                          }
                        : {
                            model: translate('page.form.name'),
                            name: translate('model.lowercase.partner'),
                          }
                    )}
                  />

                  <InputField fullWidth name="webUrl" label={translate('page.form.webUrlLower')} />

                  <InputField
                    fullWidth
                    type="number"
                    name="taxCommission"
                    label={translate('table.taxCommission')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
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
                      name: partner?.name,
                      logo: partner?.logo,
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

export default CreatePartnerModal;
