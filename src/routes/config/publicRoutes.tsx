import { Route } from 'common/@types';
import { ForgotPasswordPage, LoginPage, ResetPasswordPage, VerificationOtpPage } from 'pages/auth';
import { Page403, Page404, Page500 } from 'pages/error';
import { PATH_AUTH, PATH_ERROR } from 'routes/paths';

export const publicRoutes: Route[] = [
  {
    path: PATH_AUTH.login,
    component: <LoginPage />,
    index: true,
  },
  {
    path: PATH_AUTH.forgotPassword,
    component: <ForgotPasswordPage />,
    index: false,
  },
  {
    path: PATH_AUTH.verificationOTP,
    component: <VerificationOtpPage />,
    index: false,
  },
  {
    path: PATH_AUTH.resetPassword,
    component: <ResetPasswordPage />,
    index: false,
  },
];

export const errorRoutes: Route[] = [
  {
    path: PATH_ERROR.noPermission,
    component: <Page403 />,
    index: true,
  },
  {
    path: PATH_ERROR.notFound,
    component: <Page404 />,
    index: false,
  },
  {
    path: PATH_ERROR.serverError,
    component: <Page500 />,
    index: false,
  },
];
