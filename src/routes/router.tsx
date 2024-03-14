import { Navigate, Route, Routes } from 'react-router-dom';
//layout
import DashboardLayout from 'layouts/dashboard/DashboardLayout';
import SimpleLayout from 'layouts/simple/SimpleLayout';
//router
import AdminRouter from './adminRouter';
import BrandRouter from './brandRouter';
import CashierRouter from './cashierRouter';
import KitchenCenterRouter from './kitchenCenterRouter';
//routes
import { Role } from 'common/enums';
import { useAppSelector } from 'redux/configStore';
import PublicRouter from './PublicRouter';
import { adminRoutes, brandRoutes, cashierRoutes, errorRoutes, kitchenCenterRoutes, publicRoutes } from './config';
import {
  PATH_ADMIN_APP,
  PATH_AUTH,
  PATH_BRAND_APP,
  PATH_CASHIER_APP,
  PATH_ERROR,
  PATH_KITCHEN_CENTER_APP,
} from './paths';

function AppRouter() {
  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route element={<PublicRouter />}>
        <Route element={<Navigate to={PATH_AUTH.login} />} index={true} />
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>

      <Route element={<SimpleLayout />}>
        {userAuth?.roleName === Role.MBKC_ADMIN ? (
          <Route element={<Navigate to={PATH_ADMIN_APP.root} />} />
        ) : userAuth?.roleName === Role.BRAND_MANAGER ? (
          <Route element={<Navigate to={PATH_BRAND_APP.root} />} />
        ) : userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER ? (
          <Route element={<Navigate to={PATH_KITCHEN_CENTER_APP.root} />} />
        ) : userAuth?.roleName === Role.CASHIER ? (
          <Route element={<Navigate to={PATH_CASHIER_APP.root} />} />
        ) : (
          <></>
        )}
        <Route path="*" element={<Navigate to={PATH_ERROR.notFound} />} />
        {errorRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to={PATH_ERROR.notFound} replace />} />

      {/* brand routes */}
      <Route element={<BrandRouter />}>
        <Route element={<DashboardLayout />}>
          <Route element={<Navigate to={PATH_BRAND_APP.root} />} index={true} />
          <Route element={<Navigate to={PATH_BRAND_APP.profile} />} index={true} />
          {brandRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>

      {/* kitchen center routes */}
      <Route path="/" element={<KitchenCenterRouter />}>
        <Route element={<DashboardLayout />}>
          <Route element={<Navigate to={PATH_KITCHEN_CENTER_APP.root} />} index={true} />
          {kitchenCenterRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>

      {/* kitchen center routes */}
      <Route path="/" element={<CashierRouter />}>
        <Route element={<DashboardLayout />}>
          <Route element={<Navigate to={PATH_CASHIER_APP.root} />} index={true} />
          {cashierRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>

      {/* MBKC admin routes */}
      <Route path="/" element={<AdminRouter />}>
        <Route element={<DashboardLayout />}>
          <Route element={<Navigate to={PATH_ADMIN_APP.root} />} index={true} />
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
