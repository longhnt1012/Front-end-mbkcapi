import { path } from 'utils';

const ROOTS_ERROR = '/error';
const ROOTS_AUTH = '/auth';
const ROOTS_BRAND_DASHBOARD = '/brand';
const ROOTS_KITCHEN_CENTER_DASHBOARD = '/kitchen-center';
const ROOTS_CASHIER_DASHBOARD = '/cashier';
export const ROOTS_ADMIN_DASHBOARD = '/mbkc-admin';

export const PATH_ERROR = {
  noPermission: path(ROOTS_ERROR, '/403'),
  notFound: path(ROOTS_ERROR, '/404'),
  serverError: path(ROOTS_ERROR, '/500'),
};

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, '/login'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
  verificationOTP: path(ROOTS_AUTH, '/verification-otp'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_ADMIN_APP = {
  root: path(ROOTS_ADMIN_DASHBOARD, '/dashboard'),
  configurations: path(ROOTS_ADMIN_DASHBOARD, '/configurations'),
  kitchenCenter: {
    root: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center'),
    list: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-centers'),
    detailById: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center/updation/:id'),
    newKitchenCenter: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center/creation'),
  },
  brand: {
    root: path(ROOTS_ADMIN_DASHBOARD, '/brand'),
    list: path(ROOTS_ADMIN_DASHBOARD, '/brands'),
    detailById: path(ROOTS_ADMIN_DASHBOARD, '/brand/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/brand/updation/:id'),
    newBrand: path(ROOTS_ADMIN_DASHBOARD, '/brand/creation'),
  },
  partner: {
    root: path(ROOTS_ADMIN_DASHBOARD, '/partner'),
    list: path(ROOTS_ADMIN_DASHBOARD, '/partners'),
    detailById: path(ROOTS_ADMIN_DASHBOARD, '/partner/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/partner/updation/:id'),
    newPartner: path(ROOTS_ADMIN_DASHBOARD, '/partner/creation'),
  },
  store: {
    root: path(ROOTS_ADMIN_DASHBOARD, '/store'),
    list: path(ROOTS_ADMIN_DASHBOARD, '/stores'),
    detailById: path(ROOTS_ADMIN_DASHBOARD, '/store/:id'),
  },
};

export const PATH_BRAND_APP = {
  root: path(ROOTS_BRAND_DASHBOARD, '/dashboard'),
  profile: path(ROOTS_BRAND_DASHBOARD, '/profile'),
  information: path(ROOTS_BRAND_DASHBOARD, '/information'),
  store: {
    root: path(ROOTS_BRAND_DASHBOARD, '/store'),
    list: path(ROOTS_BRAND_DASHBOARD, '/stores'),
    detailById: path(ROOTS_BRAND_DASHBOARD, '/store/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/store/updation/:id'),
    newStore: path(ROOTS_ADMIN_DASHBOARD, '/store/registration'),
  },
  storePartner: {
    root: path(ROOTS_BRAND_DASHBOARD, '/store-partner'),
    list: path(ROOTS_BRAND_DASHBOARD, '/store-partners'),
    detailById: path(ROOTS_BRAND_DASHBOARD, '/store-partner/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/store-partner/updation/:id'),
    newStorePartner: path(ROOTS_ADMIN_DASHBOARD, '/store-partner/creation'),
  },
  product: {
    root: path(ROOTS_BRAND_DASHBOARD, '/product'),
    list: path(ROOTS_BRAND_DASHBOARD, '/products'),
    detailById: path(ROOTS_BRAND_DASHBOARD, '/product/:id'),
    editById: path(ROOTS_BRAND_DASHBOARD, '/product/updation/:id'),
    newProduct: path(ROOTS_BRAND_DASHBOARD, '/product/creation'),
  },
  category: {
    root: path(ROOTS_BRAND_DASHBOARD, '/category'),
    rootExtra: path(ROOTS_BRAND_DASHBOARD, '/extra-category'),
    list: path(ROOTS_BRAND_DASHBOARD, '/categories'),
    extraList: path(ROOTS_BRAND_DASHBOARD, '/extra-categories'),
    detailById: path(ROOTS_BRAND_DASHBOARD, '/category/:id'),
    extraDetailById: path(ROOTS_BRAND_DASHBOARD, '/extra-category/:id'),
    editById: path(ROOTS_BRAND_DASHBOARD, '/category/updation/:id'),
    extraEditById: path(ROOTS_BRAND_DASHBOARD, '/extra-category/updation/:id'),
    newCategory: path(ROOTS_BRAND_DASHBOARD, '/category/creation'),
    newCategoryExtra: path(ROOTS_BRAND_DASHBOARD, '/extra-category/creation'),
  },
  partnerProduct: {
    root: path(ROOTS_BRAND_DASHBOARD, '/partner-product'),
    list: path(ROOTS_BRAND_DASHBOARD, '/partner-products'),
    detailById: path(ROOTS_BRAND_DASHBOARD, '/partner-product/:id'),
    editById: path(ROOTS_BRAND_DASHBOARD, '/partner-product/updation/:id'),
    newPartnerProduct: path(ROOTS_BRAND_DASHBOARD, '/partner-product/creation'),
  },
};

export const PATH_KITCHEN_CENTER_APP = {
  root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/dashboard'),
  profile: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/profile'),
  information: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/information'),
  store: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/store'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/stores'),
    detailById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/store/:id'),
  },
  cashier: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashier'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashiers'),
    detailById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashier/:id'),
    editById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashier/updation/:id'),
    newCashier: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashier/creation'),
  },
  order: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/order'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/orders'),
    detailById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/order/:id'),
  },
  bankingAccount: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-accounts'),
    detailById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account/:id'),
    editById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account/updation/:id'),
    newBankingAccount: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account/creation'),
  },
  wallet: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/wallet'),
    shipperPayments: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/wallet/shipper-payments'),
    moneyExchanges: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/wallet/money-exchanges'),
  },
  paymentForStores: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/payment-for-store'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/payment-for-stores'),
    newPaymentForStore: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/payment-for-stores/creation'),
  },
};

export const PATH_CASHIER_APP = {
  root: path(ROOTS_CASHIER_DASHBOARD, '/dashboard'),
  profile: path(ROOTS_CASHIER_DASHBOARD, '/profile'),
  transferMoney: path(ROOTS_CASHIER_DASHBOARD, '/transfer-money'),
  order: {
    root: path(ROOTS_CASHIER_DASHBOARD, '/order'),
    list: path(ROOTS_CASHIER_DASHBOARD, '/orders'),
    detailById: path(ROOTS_CASHIER_DASHBOARD, '/order/:id'),
  },
  wallet: {
    root: path(ROOTS_CASHIER_DASHBOARD, '/wallet'),
    shipperPayments: path(ROOTS_CASHIER_DASHBOARD, '/wallet/shipper-payments'),
    moneyExchanges: path(ROOTS_CASHIER_DASHBOARD, '/wallet/money-exchanges'),
  },
};
