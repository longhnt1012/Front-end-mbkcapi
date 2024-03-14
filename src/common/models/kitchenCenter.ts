export interface KitchenCentersData {
  no: number;
  kitchenCenter: string;
  status: string;
}

export interface KitchenCenter {
  kitchenCenterId: number;
  name: string;
  address: string;
  status: string;
  logo: string;
  kitchenCenterManagerEmail: string;
}

export interface KitchenCenterToAdd {
  name: string;
  address: string;
  logo?: string;
  managerEmail: string;
}

export interface KitchenCenterToUpdate {
  name: string;
  address: string;
  logo?: string;
  managerEmail: string;
  status: string;
}
