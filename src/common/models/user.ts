export interface UserAuth {
  accountId: number;
  email: string;
  roleName: string;
  isConfirmed: boolean;
}

export interface UserInfo {
  accountId: number;
  email: string;
  roleName: string;
  status: string;
  isConfirmed: boolean;
}
