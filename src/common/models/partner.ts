export interface Partner {
  partnerId: number;
  name: string;
  logo: string;
  webUrl: string;
  status: string;
  taxCommission: number;
}

export interface PartnerToCreate {
  name: string;
  webUrl: string;
  logo?: File | string;
  taxCommission: number;
}

export interface PartnerToUpdate {
  name: string;
  logo?: File | string;
  webUrl: string;
  status: string;
  taxCommission: number;
}
