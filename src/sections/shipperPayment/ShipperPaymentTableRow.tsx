// @mui
import { TableCell, TableRow } from '@mui/material';
// section
import ShipperPaymentDetailModal from './ShipperPaymentDetailModal';
// interface
import { Color, FilterStatus, PaymentMethod } from 'common/enums';
import { ShipperPayment } from 'common/models';
//
import { Label } from 'components';
import { useLocales, useModal } from 'hooks';
import { fDateTime, formatCurrency } from 'utils';

interface ShipperPaymentTableRowProps {
  index: number;
  shipperPayment: ShipperPayment;
}

function ShipperPaymentTableRow({ index, shipperPayment }: ShipperPaymentTableRowProps) {
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();

  return (
    <>
      <TableRow hover tabIndex={-1} key={shipperPayment.paymentId} sx={{ cursor: 'pointer', height: '60px' }}>
        <TableCell width={60} align="center" onClick={handleOpen}>
          {index + 1}
        </TableCell>
        <TableCell align="left" width={250} onClick={handleOpen}>
          {shipperPayment.orderPartnerId}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {shipperPayment.cashierCreated}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {fDateTime(shipperPayment.createDate)}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {formatCurrency(shipperPayment.amount)}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {formatCurrency(shipperPayment.finalTotalPrice)}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {shipperPayment.paymentMethod.toLowerCase() === PaymentMethod.CASH.toLowerCase()
            ? translate('page.content.cash')
            : translate('page.content.cashless')}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {shipperPayment.kcBankingAccountName}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          <Label color={shipperPayment?.status === FilterStatus.SUCCESS ? Color.SUCCESS : Color.ERROR}>
            {shipperPayment?.status === FilterStatus.SUCCESS
              ? translate('status.success')
              : translate('status.success')}
          </Label>
        </TableCell>
      </TableRow>

      {isOpen && <ShipperPaymentDetailModal shipperPayment={shipperPayment} isOpen={isOpen} handleOpen={handleOpen} />}
    </>
  );
}

export default ShipperPaymentTableRow;
