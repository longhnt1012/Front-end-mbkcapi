import { Brand } from './brand';
import { Cashier } from './cashier';
import { KitchenCenter } from './kitchenCenter';
import { MoneyExchange } from './moneyExchange';
import { Order } from './order';
import { ShipperPayment } from './shipperPayment';
import { Store } from './store';

export interface Revenues {
  date: string;
  amount: number;
}

export interface AdminDashboard {
  totalKitchenCenters: number;
  totalBrands: number;
  totalStores: number;
  totalPartners: number;
  kitchenCenters: KitchenCenter[];
  brands: Brand[];
  stores: Store[];
}

export interface KitchenCenterDashboard {
  totalStores: number;
  totalCashiers: number;
  totalBalancesDaily: number;
  columnChartMoneyExchanges: Revenues[];
  stores: Store[];
  cashiers: Cashier[];
}

export interface BrandDashboard {
  totalStores: number;
  totalNormalCategories: number;
  totalExtraCategories: number;
  totalProducts: number;
  storeRevenues: {
    storeId: number;
    storeName: string;
    revenues: Revenues[];
  };
  numberOfProductSolds: {
    productId: number;
    productName: string;
    quantity: number;
  }[];
  stores: Store[];
}

export interface CashierDashboard {
  totalRevenuesDaily: number;
  totalOrdersDaily: number;
  orders: Order[];
  moneyExchanges: MoneyExchange[];
  shipperPayments: ShipperPayment[];
}
