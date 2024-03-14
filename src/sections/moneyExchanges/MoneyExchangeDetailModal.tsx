// @mui
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { Backdrop, Dialog, DialogContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
// @mui icon
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
//
import { Color, ExchangeType, FilterStatus, Language } from 'common/enums';
import { MoneyExchange } from 'common/models';
import { Label } from 'components';
import { useLocales } from 'hooks';
import { useState } from 'react';
import { fDateTime } from 'utils';

interface MoneyExchangeDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
  moneyExchange: MoneyExchange;
}

function MoneyExchangeDetailModal({ isOpen, handleOpen, moneyExchange }: MoneyExchangeDetailModalProps) {
  const { translate, currentLang } = useLocales();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">
                {translate('page.title.detail', {
                  model:
                    currentLang.value === Language.ENGLISH
                      ? translate('model.capitalizeOne.moneyExchange')
                      : translate('model.lowercase.moneyExchange'),
                })}
              </Typography>
              <IconButton color="inherit" onClick={handleOpen}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 3.5 }} />

            <Stack width="100%">
              <Grid container columnSpacing={4}>
                <Grid item md={5}>
                  {moneyExchange.exchangeImage === null ? (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      height="100%"
                      border={1}
                      sx={{
                        borderStyle: 'dashed',
                        borderColor: (theme) => theme.palette.grey[500],
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <ImageNotSupportedIcon />
                      <Typography>{translate('page.content.noImage')}</Typography>
                    </Stack>
                  ) : (
                    <Stack onClick={moneyExchange.exchangeImage !== null ? handleOpenBackdrop : () => {}}>
                      <img src={moneyExchange.exchangeImage} alt="Exchange img" width="100%" height="100%" />
                    </Stack>
                  )}
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                    onClick={handleCloseBackdrop}
                  >
                    <img src={moneyExchange.exchangeImage} alt="invoice" width="80%" height="80%" />
                  </Backdrop>
                </Grid>
                <Grid item md={7}>
                  <Stack gap={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1">{translate('table.sender')}: </Typography>
                      <Typography variant="body1">{moneyExchange.senderName}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1">{translate('table.receiver')}: </Typography>
                      <Typography variant="body1">{moneyExchange.receiveName}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1">{translate('model.capitalizeOne.transactionTime')}:</Typography>
                      <Typography variant="body1">{fDateTime(moneyExchange.transactionTime)}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1">{translate('table.exchangeType')}:</Typography>
                      <Typography variant="body1">
                        {moneyExchange.exchangeType === ExchangeType.RECEIVE
                          ? translate('table.receive')
                          : moneyExchange.exchangeType === ExchangeType.SEND
                          ? translate('table.send')
                          : translate('table.withdraw')}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle1">{translate('table.status')}:</Typography>
                      <Label color={moneyExchange?.status === FilterStatus.SUCCESS ? Color.SUCCESS : Color.ERROR}>
                        {moneyExchange?.status === FilterStatus.SUCCESS
                          ? translate('status.success')
                          : translate('status.fail')}
                      </Label>
                    </Stack>

                    <Typography variant="subtitle1">
                      {translate('page.form.content')}:{' '}
                      <Typography component="span">{moneyExchange.content}</Typography>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default MoneyExchangeDetailModal;
