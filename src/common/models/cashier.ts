import { Gender, Status } from 'common/enums';
import { KitchenCenter } from './kitchenCenter';

export interface Cashier {
  accountId: number;
  fullName: string;
  gender: Gender;
  dateOfBirth: string;
  avatar: string;
  citizenNumber: string;
  email: string;
  status: Status;
  kitchenCenter: KitchenCenter;
}

export interface CashierToCreate {
  email: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  avatar?: string;
  citizenNumber: string;
}

export interface CashierToUpdate {
  fullName: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  avatar?: string;
  citizenNumber: string;
  newPassword?: string;
  status: Status;
}
