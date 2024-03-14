import { ExchangeType, FilterStatus, PartnerOrderStatus, PaymentMethod, SystemStatusToFilter } from 'common/enums';
import { Partner } from './partner';
import { Product } from './product';
import { _ShipperPayment } from './shipperPayment';
import { Store } from './store';

export interface Order {
  id: number;
  orderPartnerId: string;
  shipperName: string;
  shipperPhone: string;
  customerName: string;
  customerPhone: string;
  note: string;
  paymentMethod: string;
  deliveryFee: number;
  subTotalPrice: number;
  totalStoreDiscount: number;
  finalTotalPrice: number;
  collectedPrice: number;
  isPaid: boolean;
  promotionPrice: number;
  taxPartnerCommission: number;
  tax: number;
  systemStatus: string;
  displayId: string;
  address: string;
  cutlery: number;
  partnerOrderStatus: string;
  totalQuantity: number;
  confirmedBy: number;
  rejectedReason: string;
  storePartnerCommission: number;
  store: Store;
  partner: Partner;
  shipperPayments: _ShipperPayment[];
  orderDetails: OrderDetails[];
  orderHistories: OrderHistory[];
}

export interface OrderDetails {
  orderDetailId: number;
  sellingPrice: number;
  discountPrice: number;
  quantity: number;
  note: string;
  orderId: number;
  masterOrderDetail: string;
  product: Product;
  extraOrderDetails: ExtraOrderDetails[];
}

export interface OrderHistory {
  orderHistoryId: number;
  image: string;
  createdDate: string;
  systemStatus: string;
  partnerOrderStatus: string;
}

export interface ExtraOrderDetails extends OrderDetails {}

export interface CompletedOrderForm {
  orderPartnerId?: string;
  bankingAccountId: string;
  image?: string;
  paymentType: string;
}
export interface CompletedOrderParams {
  orderPartnerId: string;
  bankingAccountId: string;
  image: string;
}

export enum OrderTypeEnum {
  ALL = 'ALL_ORDER',
  READY = 'READY',
  BEING_PREPARED = 'BEING_PREPARED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum OrderStatusActions {
  READY = 'READY',
  READY_DELIVERY = 'READY_DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCEL = 'CANCEL',
}

export const ORDER_TYPE_TABS = [
  {
    value: OrderTypeEnum.ALL,
    label: 'All Orders',
    id: 'All',
  },
  {
    value: OrderTypeEnum.BEING_PREPARED,
    label: 'Being Prepared',
    id: 'Pre',
  },
  {
    value: OrderTypeEnum.READY,
    label: 'Ready',
    id: 'Rea',
  },
  {
    value: OrderTypeEnum.COMPLETED,
    label: 'Completed',
    id: 'Don',
  },
  {
    value: OrderTypeEnum.CANCELED,
    label: 'Canceled',
    id: 'Can',
  },
];

export const SYSTEM_STATUS_OPTIONS = [
  {
    value: SystemStatusToFilter.IN_STORE,
    label: 'In Store',
    id: 'In',
  },
  {
    value: SystemStatusToFilter.READY_DELIVERY,
    label: 'Ready Delivery',
    id: 'Rea',
  },
  {
    value: SystemStatusToFilter.COMPLETED,
    label: 'Completed',
    id: 'Com',
  },
  {
    value: SystemStatusToFilter.CANCELLED,
    label: 'Cancelled',
    id: 'Can',
  },
];

export const PARTNER_ORDER_STATUS = [
  {
    value: PartnerOrderStatus.UPCOMING,
    label: 'Upcoming',
    id: 'Up',
  },
  {
    value: PartnerOrderStatus.READY,
    label: 'Ready',
    id: 'Rea',
  },
  {
    value: PartnerOrderStatus.PREPARING,
    label: 'Preparing',
    id: 'Pre',
  },
  {
    value: PartnerOrderStatus.COMPLETED,
    label: 'Completed',
    id: 'Com',
  },
  {
    value: PartnerOrderStatus.CANCELLED,
    label: 'Cancelled',
    id: 'Can',
  },
];

export const EXCHANGE_TYPE_OPTIONS = [
  {
    value: ExchangeType.RECEIVE,
    label: 'Receive',
    id: 'Rec',
  },
  {
    value: ExchangeType.SEND,
    label: 'Send',
    id: 'Sen',
  },
  {
    value: ExchangeType.WITHDRAW,
    label: 'Withdraw',
    id: 'Wit',
  },
];

export const FILTER_STATUS_OPTIONS = [
  {
    value: FilterStatus.FAIL,
    label: 'Fail',
    id: 'Fai',
  },
  {
    value: FilterStatus.SUCCESS,
    label: 'Success',
    id: 'Suc',
  },
];

export const PAYMENT_METHOD_OPTIONS = [
  {
    value: PaymentMethod.CASH,
    label: 'Cash',
    id: 'Cas',
  },
  {
    value: PaymentMethod.CASH_LESS,
    label: 'Cashless',
    id: 'Cas',
  },
];
