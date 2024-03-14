import { Brand } from './brand';
import { Category } from './category';

export interface Product {
  productId: number;
  code: string;
  name: string;
  description: string;
  sellingPrice: number;
  discountPrice: number;
  historicalPrice: number;
  type: string;
  image: string;
  status: string;
  size: string | null;
  displayOrder: number;
  numberOfProductsSold: number;
  parentProductId: string | null;
  childrenProducts: ChildrenProduct[];
  extraProducts: ExtraProduct[];
  categoryId: number;
  categoryName: string;
  brand: Brand;
  category: Category;
  partnerProducts: { partnerName: string; productCode: string; storeName: string }[];
}

export interface ChildrenProduct extends Product {}
export interface ExtraProduct extends Product {}
export interface ProductToCreate {
  name: string;
  code: string;
  description: string;
  historicalPrice: number;
  sellingPrice: number;
  discountPrice: number;
  displayOrder: number;
  size: string;
  type: string;
  image?: File | string;
  parentProductId: number;
  categoryId: number;
}

export interface ProductToCreateParams {
  name: string;
  code: string;
  description: string;
  historicalPrice: number | null | string;
  sellingPrice: number | null | string;
  discountPrice: number | null | string;
  displayOrder: number;
  size: string | null | undefined;
  type: string;
  image?: File | string;
  parentProductId: number | null | string;
  categoryId: number | null | string;
}

export interface ProductToUpdate {
  name: string | null;
  description: string;
  historicalPrice: number | null | string;
  sellingPrice: number | null | string;
  discountPrice: number | null | string;
  image?: File | string;
  displayOrder: number;
  parentProductId: number | null | string;
  categoryId: number | null | string;
  status: string;
}

export enum ProductSizeEnum {
  SMALL = 'S',
  MEDIUM = 'M',
  LARGE = 'L',
}

export enum ProductTypeEnum {
  ALL = '',
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  SINGLE = 'SINGLE',
  EXTRA = 'EXTRA',
}

export const PRODUCT_TYPE_OPTIONS = [
  {
    value: ProductTypeEnum.PARENT,
    label: 'Parent Product',
    id: 'Fat',
  },
  {
    value: ProductTypeEnum.CHILD,
    label: 'Child Product',
    id: 'Chi',
  },
  {
    value: ProductTypeEnum.SINGLE,
    label: 'Single Product',
    id: 'Sin',
  },
  {
    value: ProductTypeEnum.EXTRA,
    label: 'Extra Product',
    id: 'Ext',
  },
];

export const PRODUCT_TYPE_TABS = [
  {
    value: ProductTypeEnum.ALL,
    label: 'All Products',
    id: 'All',
  },
  {
    value: ProductTypeEnum.PARENT,
    label: 'Parent Product',
    id: 'Fat',
  },
  {
    value: ProductTypeEnum.CHILD,
    label: 'Child Product',
    id: 'Chi',
  },
  {
    value: ProductTypeEnum.SINGLE,
    label: 'Single Product',
    id: 'Sin',
  },
  {
    value: ProductTypeEnum.EXTRA,
    label: 'Extra Product',
    id: 'Ext',
  },
];

export const PRODUCT_SIZE_OPTIONS = [
  {
    value: ProductSizeEnum.SMALL,
    label: 'Size S',
    id: 's',
  },
  {
    value: ProductSizeEnum.MEDIUM,
    label: 'Size M',
    id: 'm',
  },
  {
    value: ProductSizeEnum.LARGE,
    label: 'Size L',
    id: 'l',
  },
];
