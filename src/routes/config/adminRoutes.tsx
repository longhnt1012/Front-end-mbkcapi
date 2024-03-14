import { Route } from 'common/@types';
import {
  BrandDetailPage,
  ConfigurationsPage,
  CreateBrandPage,
  CreateKitchenCenterPage,
  KitchenCenterDetailPage,
  ListBrandPage,
  ListKitchenCenterPage,
  MBKCAdminDashboardPage,
} from 'pages/MBKCAdmin';
import { ListPartnerPage, ListStorePage, StoreDetailPage } from 'pages/common';
import { PATH_ADMIN_APP } from 'routes/paths';

export const adminRoutes: Route[] = [
  {
    path: PATH_ADMIN_APP.root,
    component: <MBKCAdminDashboardPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.configurations,
    component: <ConfigurationsPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.kitchenCenter.list,
    component: <ListKitchenCenterPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.kitchenCenter.detailById,
    component: <KitchenCenterDetailPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.kitchenCenter.newKitchenCenter,
    component: <CreateKitchenCenterPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.kitchenCenter.editById,
    component: <CreateKitchenCenterPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brand.list,
    component: <ListBrandPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brand.detailById,
    component: <BrandDetailPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brand.newBrand,
    component: <CreateBrandPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brand.editById,
    component: <CreateBrandPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.store.list,
    component: <ListStorePage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.store.detailById,
    component: <StoreDetailPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.partner.list,
    component: <ListPartnerPage />,
    index: true,
  },
];
