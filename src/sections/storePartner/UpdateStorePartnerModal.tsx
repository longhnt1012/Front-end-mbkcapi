/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { updateStorePartner } from 'redux/storePartner/storePartnerSlice';
//
import { Params } from 'common/@types';
import { Color, Status } from 'common/enums';
import { StorePartnerToUpdateApi } from 'common/models';
import { InputField } from 'components';
import { useLocales, useValidationForm } from 'hooks';

interface UpdateStorePartnerModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  partnerId: number;
  storeId: number;
}

function UpdateStorePartnerModal({ isOpen, handleOpen, partnerId, storeId }: UpdateStorePartnerModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaUpdateStorePartner } = useValidationForm();

  const { storePartner, isLoading } = useAppSelector((state) => state.storePartner);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const updateStorePartnerForm = useForm<Omit<StorePartnerToUpdateApi, 'status'>>({
    defaultValues: {
      userName: storePartner?.userName,
      password: storePartner?.password,
      commission: storePartner?.commission,
    },
    resolver: yupResolver(schemaUpdateStorePartner),
  });

  const { handleSubmit } = updateStorePartnerForm;

  const onSubmit = async (values: Omit<StorePartnerToUpdateApi, 'status'>) => {
    const data = { ...values };
    const params: Params<StorePartnerToUpdateApi> = {
      data: { ...data, status: storePartner?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE },
      idParams: {
        partnerId,
        storeId,
      },
      pathname,
      navigate,
    };
    dispatch(updateStorePartner(params));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...updateStorePartnerForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.update', {
                    model: `${translate('model.lowercase.information')} ${translate('model.lowercase.partner')}`,
                  })}
                </Typography>
                <IconButton onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={4} pb={1}>
                <Grid container columnSpacing={2}>
                  <Grid item md={3}>
                    <Stack alignItems="center" gap={1}>
                      <Avatar
                        src={storePartner?.partnerLogo}
                        alt={storePartner?.partnerName}
                        sx={{ height: 100, width: 100 }}
                      />
                      <Typography>{storePartner?.partnerName}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={9}>
                    <Stack width="100%" gap={2}>
                      <InputField fullWidth name="userName" label={translate('page.form.userName')} type="text" />
                      <InputField
                        fullWidth
                        name="password"
                        label={translate('page.form.password')}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? (
                                  <VisibilityIcon fontSize="small" />
                                ) : (
                                  <VisibilityOffIcon fontSize="small" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <InputField
                        fullWidth
                        type="number"
                        name="commission"
                        label={translate('page.form.commission')}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button variant="contained" disabled={isLoading} color="inherit" onClick={handleOpen}>
                {translate('button.cancel')}
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

export default UpdateStorePartnerModal;
