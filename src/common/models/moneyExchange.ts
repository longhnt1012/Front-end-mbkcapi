import { FilterStatus, ExchangeType } from 'common/enums';

export interface MoneyExchange {
  exchangeId: number;
  amount: number;
  exchangeType: ExchangeType;
  content: string;
  status: FilterStatus;
  senderId: number;
  senderName: string;
  receiveId: number;
  receiveName: string;
  exchangeImage: string;
  transactionTime: string;
}
