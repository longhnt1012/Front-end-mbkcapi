import { Route } from 'common/@types';
import { CashierDashboard, TransferMoneyPage } from 'pages/cashier';
import { ListOrdersPage, OrderDetailPage } from 'pages/common';
import { ListMoneyExchangePage, ListShipperPaymentPage, WalletPage } from 'pages/kitchenCenter';
import { ProfilePage } from 'pages/profile';
import { PATH_CASHIER_APP } from 'routes/paths';

export const cashierRoutes: Route[] = [
  {
    path: PATH_CASHIER_APP.root,
    component: <CashierDashboard />,
    index: true,
  },
  {
    path: PATH_CASHIER_APP.transferMoney,
    component: <TransferMoneyPage />,
    index: true,
  },
  {
    path: PATH_CASHIER_APP.profile,
    component: <ProfilePage />,
    index: true,
  },
  {
    path: PATH_CASHIER_APP.order.list,
    component: <ListOrdersPage />,
    index: false,
  },
  {
    path: PATH_CASHIER_APP.order.detailById,
    component: <OrderDetailPage />,
    index: false,
  },
  {
    path: PATH_CASHIER_APP.wallet.root,
    component: <WalletPage />,
    index: false,
  },
  {
    path: PATH_CASHIER_APP.wallet.shipperPayments,
    component: <ListShipperPaymentPage />,
    index: false,
  },
  {
    path: PATH_CASHIER_APP.wallet.moneyExchanges,
    component: <ListMoneyExchangePage />,
    index: false,
  },
];
