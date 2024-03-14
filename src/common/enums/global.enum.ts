export enum Status {
  ALL = '',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DEACTIVE = 'Disable',
  BE_CONFIRMING = 'Confirming',
  REJECTED = 'Rejected',
  VALID = 'valid',
  INVALID = 'invalid',
}

export enum SystemStatus {
  IN_STORE = 'In store',
  READY_DELIVERY = 'Ready delivery',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum SystemStatusToFilter {
  IN_STORE = 'IN_STORE',
  READY_DELIVERY = 'READY_DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PartnerOrderStatus {
  PREPARING = 'Preparing',
  READY = 'Ready',
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum PartnerOrderStatusToFilter {
  PREPARING = 'PREPARING',
  READY = 'READY',
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export const GENDER_OPTIONS = [
  {
    value: Gender.MALE,
    label: 'Male',
    id: 'Ma',
  },
  {
    value: Gender.FEMALE,
    label: 'Female',
    id: 'Fe',
  },
];

export enum Language {
  ENGLISH = 'en',
  VIETNAMESE = 'vi',
}

export enum Error {
  SERVER_ERROR = 'ERR_NETWORK',
}

export enum PaymentStatus {
  PAID = 'Paid',
  NOT_PAID = 'Not paid',
}

export enum PaymentMethod {
  CASH = 'Cash',
  CASH_LESS = 'Cashless',
}

export const PAYMENT_METHOD_OPTIONS = [
  {
    value: PaymentMethod.CASH,
    label: 'Cash',
    id: 'ca',
  },
  {
    value: PaymentMethod.CASH_LESS,
    label: 'Cashless',
    id: 'cl',
  },
];

export enum ExchangeType {
  SEND = 'Send',
  RECEIVE = 'Receive',
  WITHDRAW = 'Withdraw',
}

export enum FilterStatus {
  FAIL = 'Fail',
  SUCCESS = 'Success',
}

export enum FieldNameError {
  MAPPING_PRODUCT = 'Mapping product',
  STORE_ID = 'Store id',
  PRODUCT_CODE = 'Product code',
  PRICE = 'Price',
  LOGO = 'Logo',
  IMAGE = 'Image',
  IMAGE_URL = 'ImageUrl',
  AVATAR = 'avatar',
}
