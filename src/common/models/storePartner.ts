export interface StorePartnerDetail {
  storeId: number;
  partnerId: number;
  partnerLogo: string;
  partnerName: string;
  userName: string;
  password: string;
  status: string;
  commission: number;
}

export interface StorePartnerToList {
  storeId: number;
  storePartners: PartnerInStore[];
}
export interface StorePartner {
  storeId: number;
  storeName: string;
  kitchenCenterName: string;
  storePartners: PartnerInStore[];
}

export interface PartnerInStore {
  partnerId: number;
  partnerName: string;
  partnerLogo: string;
  userName: string;
  password: string;
  status: string;
  commission: number;
}

export interface StorePartnerToCreate {
  storeId: number;
  partnerAccounts: PartnerAccount[];
}

export interface StorePartnerToCreateAPI {
  storeId: number;
  partnerAccounts: PartnerAccount[];
  isMappingProducts: boolean;
}

interface PartnerAccount {
  partnerId: number;
  userName: string;
  password: string;
  commission: number;
}

export interface StorePartnerToUpdateApi {
  userName: string;
  password: string;
  commission: number;
  status: string;
}
