export interface BrandData {
  no: number;
  brand: string;
  address: string;
  status: string;
}

export interface Brand {
  brandId: number;
  name: string;
  address: string;
  logo: string;
  status: string;
  brandManagerEmail: string;
}

export interface BrandToCreate {
  Name: string;
  Address: string;
  ManagerEmail: string;
  Logo?: string;
}

export interface BrandToUpdate {
  name: string;
  address: string;
  brandManagerEmail: string;
  logo?: string;
  status: string;
}
