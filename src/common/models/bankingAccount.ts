import { Status } from 'common/enums';

export interface BankingAccount {
  bankingAccountId: number;
  numberAccount: string;
  name: string;
  logoUrl: string;
  status: Status;
}

export interface BankingAccountToCreate {
  bankName: string;
  numberAccount: string;
  bankLogo?: string;
}

export interface BankingAccountToUpdate {
  bankName?: string;
  bankLogo?: string;
  status: Status;
}
