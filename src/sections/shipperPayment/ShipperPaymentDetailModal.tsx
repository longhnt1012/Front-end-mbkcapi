// @mui
import { Dialog, DialogContent, Divider, IconButton, Stack, Typography } from '@mui/material';
// @mui icon
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// interface
import { Color, FilterStatus, Language, PaymentMethod } from 'common/enums';
import { ShipperPayment } from 'common/models';
//
import { Label } from 'components';
import { useLocales } from 'hooks';
import { fDateTime, formatCurrency } from 'utils';

interface ShipperPaymentDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
  shipperPayment: ShipperPayment;
}

function ShipperPaymentDetailModal({ isOpen, handleOpen, shipperPayment }: ShipperPaymentDetailModalProps) {
  const { translate, currentLang } = useLocales();

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">
                {translate('page.title.detail', {
                  model:
                    currentLang.value === Language.ENGLISH
                      ? translate('model.capitalizeOne.shipperPayment')
                      : translate('model.lowercase.shipperPayment'),
                })}
              </Typography>
              <IconButton color="inherit" onClick={handleOpen}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 2 }} />

            <Stack width="100%" gap={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">{translate('table.partnerOrderId')}: </Typography>
                <Typography variant="body1">{shipperPayment.orderPartnerId}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">{translate('table.cashierCreated')}: </Typography>
                <Typography variant="body1">{shipperPayment.cashierCreated}</Typography>
              </Stack>

              {shipperPayment.kcBankingAccountName !== null && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1">{translate('model.capitalizeOne.bankingAccount')}: </Typography>
                  <Typography variant="body1">{shipperPayment.kcBankingAccountName}</Typography>
                </Stack>
              )}

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">{translate('table.collect')}: </Typography>
                <Typography variant="body1">{formatCurrency(shipperPayment.amount)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">{translate('page.content.finalTotalPrice')}: </Typography>
                <Typography variant="body1">{formatCurrency(shipperPayment.finalTotalPrice)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">{translate('table.createDate')}:</Typography>
                <Typography variant="body1">{fDateTime(shipperPayment.createDate)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">{translate('page.content.paymentMethod')}:</Typography>
                <Typography variant="body1">
                  {shipperPayment.paymentMethod.toLowerCase() === PaymentMethod.CASH.toLowerCase()
                    ? translate('page.content.cash')
                    : translate('page.content.cashless')}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1">{translate('table.status')}:</Typography>
                <Label color={shipperPayment.status === FilterStatus.SUCCESS ? Color.SUCCESS : Color.ERROR}>
                  {shipperPayment.status === FilterStatus.SUCCESS
                    ? translate('status.success')
                    : translate('status.fail')}
                </Label>
              </Stack>

              <Typography variant="subtitle1">
                {translate('page.form.content')}:{' '}
                <Typography variant="body1" component="span">
                  {shipperPayment.content}
                </Typography>
              </Typography>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default ShipperPaymentDetailModal;
