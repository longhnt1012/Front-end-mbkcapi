// @mui
import { TableCell, TableRow } from '@mui/material';
//
import { MoneyExchange } from 'common/models';
import { Color, FilterStatus, ExchangeType } from 'common/enums';
import { Label } from 'components';
import { useLocales, useModal } from 'hooks';
import MoneyExchangeDetailModal from './MoneyExchangeDetailModal';
import { fDateTime, formatCurrency } from 'utils';

interface MoneyExchangeTableRowProps {
  index: number;
  moneyExchange: MoneyExchange;
}

function MoneyExchangeTableRow({ index, moneyExchange }: MoneyExchangeTableRowProps) {
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();

  return (
    <>
      <TableRow hover tabIndex={-1} key={moneyExchange.amount} sx={{ cursor: 'pointer', height: '60px' }}>
        <TableCell width={60} align="center" onClick={handleOpen}>
          {index + 1}
        </TableCell>
        <TableCell align="left" onClick={handleOpen}>
          {moneyExchange.senderName}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {moneyExchange.receiveName}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {fDateTime(moneyExchange.transactionTime)}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {formatCurrency(moneyExchange.amount)}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          {moneyExchange.exchangeType === ExchangeType.RECEIVE
            ? translate('table.receive')
            : moneyExchange.exchangeType === ExchangeType.SEND
            ? translate('table.send')
            : translate('table.withdraw')}
        </TableCell>

        <TableCell align="left" onClick={handleOpen}>
          <Label color={moneyExchange?.status === FilterStatus.SUCCESS ? Color.SUCCESS : Color.ERROR}>
            {moneyExchange?.status === FilterStatus.SUCCESS ? translate('status.success') : translate('status.fail')}
          </Label>
        </TableCell>
      </TableRow>

      {isOpen && <MoneyExchangeDetailModal isOpen={isOpen} handleOpen={handleOpen} moneyExchange={moneyExchange} />}
    </>
  );
}

export default MoneyExchangeTableRow;
