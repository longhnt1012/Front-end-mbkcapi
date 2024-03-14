import { Route } from 'common/@types';
import { ListOrdersPage, ListStorePage, OrderDetailPage, StoreDetailPage } from 'pages/common';
import {
  CashierDetailPage,
  CreateCashierPage,
  KitchenCenterDashboard,
  ListBankingAccountPage,
  ListCashierPage,
  ListMoneyExchangePage,
  ListPaymentForStoresPage,
  ListShipperPaymentPage,
  WalletPage,
} from 'pages/kitchenCenter';
import { InformationPage, ProfilePage } from 'pages/profile';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

export const kitchenCenterRoutes: Route[] = [
  {
    path: PATH_KITCHEN_CENTER_APP.root,
    component: <KitchenCenterDashboard />,
    index: true,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.profile,
    component: <ProfilePage />,
    index: true,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.information,
    component: <InformationPage />,
    index: true,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.store.list,
    component: <ListStorePage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.store.detailById,
    component: <StoreDetailPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.cashier.list,
    component: <ListCashierPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.cashier.detailById,
    component: <CashierDetailPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.cashier.newCashier,
    component: <CreateCashierPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.cashier.editById,
    component: <CreateCashierPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.bankingAccount.list,
    component: <ListBankingAccountPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.order.list,
    component: <ListOrdersPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.order.detailById,
    component: <OrderDetailPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.wallet.root,
    component: <WalletPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.wallet.shipperPayments,
    component: <ListShipperPaymentPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.wallet.moneyExchanges,
    component: <ListMoneyExchangePage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.paymentForStores.list,
    component: <ListPaymentForStoresPage />,
    index: false,
  },
];
