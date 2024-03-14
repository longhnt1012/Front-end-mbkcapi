import { Cashier } from './cashier';

export interface ShiftReport {
  cashier: Cashier;
  totalOrderToday: number;
  totalMoneyToday: number;
  balance: number;
  isShiftEnded: boolean;
}
