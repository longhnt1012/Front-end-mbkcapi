import { Status } from 'common/enums';
import { Brand } from './brand';
import { KitchenCenter } from './kitchenCenter';
import { Partner } from './partner';

export interface Store {
  storeId: number;
  name: string;
  status: string;
  logo: string;
  storeManagerEmail: string;
  rejectedReason?: string | null;
  walletBalance: number;
  kitchenCenter: KitchenCenter;
  brand: Brand;
  storePartners: {
    partner: Partner;
  }[];
}

export interface StoreToCreate {
  name: string;
  logo?: File | string;
  storeManagerEmail: string;
  kitchenCenterId: number;
  brandId: number;
}

export interface StoreToUpdate {
  name: string;
  status: string;
  logo?: File | string;
  storeManagerEmail: string;
}

export interface ToUpdateStatus {
  status: string;
}

export interface StoreToConfirm {
  status: string;
  rejectedReason: string;
}

export const STATUS_OPTIONS = [
  {
    value: Status.ACTIVE,
    label: 'Active',
    id: 'Act',
  },
  {
    value: Status.INACTIVE,
    label: 'Inactive',
    id: 'Ina',
  },
  {
    value: Status.BE_CONFIRMING,
    label: 'Be Confirming',
    id: 'Con',
  },
  {
    value: Status.REJECTED,
    label: 'Rejected',
    id: 'Rej',
  },
];
