import { OptionParams } from 'common/@types';
import { path, pathRoot } from 'utils';

const ROOTS_AUTH = '/authentications';
const ROOTS_DASHBOARDS = '/dashboards';
const ROOTS_ACCOUNT = '/accounts';
const ROOTS_VERIFY = '/verifications';
const ROOTS_KITCHEN_CENTERS = '/kitchen-centers';
const ROOTS_BRANDS = '/brands';
const ROOTS_STORES = '/stores';
const ROOTS_PARTNERS = '/partners';
const ROOTS_STORE_PARTNERS = '/store-partners';
const ROOTS_CATEGORY = '/categories';
const ROOTS_PRODUCTS = '/products';
const ROOTS_PARTNER_PRODUCTS = '/partner-products';
const ROOTS_ORDERS = '/orders';
const ROOTS_CASHIERS = '/cashiers';
const ROOTS_BANKING_ACCOUNTS = '/banking-accounts';
const ROOTS_TRANSACTION = '/transactions';
const ROOTS_WALLET = '/wallets';
const ROOTS_ADDRESS = '/province';
const ROOTS_CONFIGURATION = '/configurations';
const ROOTS_MONEY_EXCHANGES = '/money-exchanges';
const ROOTS_SHIPPER_PAYMENTS = '/shipper-payments';

export const ROUTES_API_AUTH = {
  LOGIN: path(ROOTS_AUTH, `/login`),
  REFRESH_TOKEN: path(ROOTS_AUTH, `/regeneration-tokens`),
  RESET_PASSWORD: path(ROOTS_AUTH, `/password-resetation`),
  FORGOT_PASSWORD: path(ROOTS_VERIFY, `/email-verification`),
  VERIFY_OTP: path(ROOTS_VERIFY, `/otp-verification`),
};

export const ROUTES_API_DASHBOARD = {
  GET_DASHBOARD_ADMIN: path(ROOTS_DASHBOARDS, `/admin`),
  GET_DASHBOARD_KITCHEN_CENTER: path(ROOTS_DASHBOARDS, `/kitchen-center`),
  GET_DASHBOARD_BRAND: ({ idStore = '' }: OptionParams) => path(ROOTS_DASHBOARDS, `/brand?storeId=${idStore}`),
  GET_DASHBOARD_CASHIER: ({ searchDateFrom = '', searchDateTo = '' }: OptionParams) =>
    path(ROOTS_DASHBOARDS, `/cashier?orderSearchDateFrom=${searchDateFrom}&orderSearchDateTo=${searchDateTo}`),
};

export const ROUTES_API_ACCOUNT = {
  ACCOUNT_INFORMATION: (accountId: number) => path(ROOTS_ACCOUNT, `/${accountId}`),
  UPDATE_PASSWORD: (accountId: number) => path(ROOTS_ACCOUNT, `/${accountId}`),
};

export const ROUTES_API_CONFIGURATION = {
  GET_CONFIGURATION: pathRoot(ROOTS_CONFIGURATION),
  UPDATE_CONFIGURATION: pathRoot(ROOTS_CONFIGURATION),
};

export const ROUTES_API_ADDRESS = {
  GET_ALL_PROVINCE: pathRoot(ROOTS_ADDRESS),
  GET_ALL_DISTRICT_BY_PROVINCE_ID: (provinceId: number) => path(ROOTS_ADDRESS, `/district/${provinceId}`),
  GET_ALL_WARD_BY_DISTRICT_ID: (districtId: number) => path(ROOTS_ADDRESS, `/ward/${districtId}`),
};

export const ROUTES_API_KITCHEN_CENTER = {
  GET_ALL_KITCHEN_CENTER: ({
    itemsPerPage = '',
    currentPage = '',
    searchValue = '',
    sortBy = '',
    isGetAll = '',
  }: OptionParams) => {
    return path(
      ROOTS_KITCHEN_CENTERS,
      `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}&isGetAll=${isGetAll}&sortBy=${sortBy}`
    );
  },
  GET_KITCHEN_CENTER_DETAIL: (kitchenCenterId: number) => path(ROOTS_KITCHEN_CENTERS, `/${kitchenCenterId}`),
  CREATE_KITCHEN_CENTER: pathRoot(ROOTS_KITCHEN_CENTERS),
  UPDATE_KITCHEN_CENTER: (kitchenCenterId: number) => path(ROOTS_KITCHEN_CENTERS, `/${kitchenCenterId}`),
  UPDATE_STATUS_KITCHEN_CENTER: (kitchenCenterId: number) =>
    path(ROOTS_KITCHEN_CENTERS, `/${kitchenCenterId}/updating-status`),
  DELETE_KITCHEN_CENTER: (kitchenCenterId: number) => path(ROOTS_KITCHEN_CENTERS, `/${kitchenCenterId}`),
  GET_PROFILE_KITCHEN_CENTER: path(ROOTS_KITCHEN_CENTERS, `/profile`),
};

export const ROUTES_API_MONEY_EXCHANGES = {
  CREATE_PAYMENT_FOR_STORES: path(ROOTS_MONEY_EXCHANGES, '/withdraw-money-to-store'),
  GET_ALL_MONEY_EXCHANGES: ({
    itemsPerPage = '',
    currentPage = '',
    searchDateFrom = '',
    searchDateTo = '',
    exchangeType = '',
    status = '',
    sortBy = '',
  }: OptionParams) =>
    path(
      ROOTS_MONEY_EXCHANGES,
      `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchDateFrom=${searchDateFrom}&searchDateTo=${searchDateTo}&exchangeType=${exchangeType}&status=${status}&sortBy=${sortBy}`
    ),
  GET_ALL_MONEY_EXCHANGES_WITHDRAW: ({
    itemsPerPage = '',
    currentPage = '',
    searchDateFrom = '',
    searchDateTo = '',
    status = '',
    sortBy = '',
  }: OptionParams) =>
    path(
      ROOTS_MONEY_EXCHANGES,
      `/withdraw-type?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchDateFrom=${searchDateFrom}&searchDateTo=${searchDateTo}&status=${status}&sortBy=${sortBy}`
    ),
  SEND_MONEY_TO_KITCHEN_CENTER: path(ROOTS_MONEY_EXCHANGES, '/money-exchange-to-kitchen-center'),
};

export const ROUTES_API_SHIPPER_PAYMENTS = {
  GET_ALL_SHIPPER_PAYMENTS: ({
    itemsPerPage = '',
    currentPage = '',
    searchDateFrom = '',
    searchDateTo = '',
    paymentMethod = '',
    status = '',
    sortBy = '',
  }: OptionParams) =>
    path(
      ROOTS_SHIPPER_PAYMENTS,
      `?ItemsPerPage=${itemsPerPage}&CurrentPage=${currentPage}&SearchDateFrom=${searchDateFrom}&SearchDateTo=${searchDateTo}&PaymentMethod=${paymentMethod}&Status=${status}&SortBy=${sortBy}`
    ),
};

export const ROUTES_API_BRANDS = {
  GET_ALL_BRAND: ({
    searchValue = '',
    currentPage = '',
    itemsPerPage = '',
    isGetAll = '',
    sortBy = '',
  }: OptionParams) => {
    return path(
      ROOTS_BRANDS,
      `?searchValue=${searchValue}&sortBy=${sortBy}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&isGetAll=${isGetAll}`
    );
  },
  CREATE_BRAND: pathRoot(ROOTS_BRANDS),
  GET_BRAND_DETAIL: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),
  UPDATE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),
  UPDATE_STATUS_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}/updating-status`),
  DELETE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),
  GET_PROFILE_BRAND: path(ROOTS_BRANDS, `/profile`),
  UPDATE_PROFILE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}/profile`),
};

export const ROUTES_API_STORES = {
  CREATE_STORE: pathRoot(ROOTS_STORES),
  GET_ALL_STORE: ({
    itemsPerPage = '',
    currentPage = '',
    searchValue = '',
    idBrand = '',
    idKitchenCenter = '',
    status = '',
    isGetAll = '',
    sortBy = '',
  }: OptionParams) => {
    return path(
      ROOTS_STORES,
      `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}&idBrand=${idBrand}&idKitchenCenter=${idKitchenCenter}&status=${status}&isGetAll=${isGetAll}&sortBy=${sortBy}`
    );
  },
  GET_ALL_STORE_ACTIVE_INACTIVE: ({
    itemsPerPage = '',
    currentPage = '',
    searchValue = '',
    idBrand = '',
    idKitchenCenter = '',
    status = '',
    isGetAll = '',
    sortBy = '',
  }: OptionParams) => {
    return path(
      ROOTS_STORES,
      `/active-inactive-stores?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}&idBrand=${idBrand}&idKitchenCenter=${idKitchenCenter}&status=${status}&isGetAll=${isGetAll}&sortBy=${sortBy}`
    );
  },
  GET_STORE_DETAIL: (storeId: number) => path(ROOTS_STORES, `/${storeId}`),
  UPDATE_STORE_INFORMATION: (storeId: number) => path(ROOTS_STORES, `/${storeId}`),
  UPDATE_STORE_STATUS: (storeId: number) => path(ROOTS_STORES, `/${storeId}/updating-status`),
  CONFIRM_STORE_REGISTRATION: (storeId: number) => path(ROOTS_STORES, `/${storeId}/confirming-registration`),
  DELETE_STORE: (storeId: number) => path(ROOTS_STORES, `/${storeId}`),
  GET_PROFILE_STORE: path(ROOTS_STORES, `/profile`),
};

export const ROUTES_API_PARTNERS = {
  CREATE_PARTNER: pathRoot(ROOTS_PARTNERS),
  GET_ALL_PARTNER: ({
    searchValue = '',
    currentPage = '',
    itemsPerPage = '',
    sortBy = '',
    isGetAll = '',
  }: OptionParams) =>
    path(
      ROOTS_PARTNERS,
      `?searchValue=${searchValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&sortBy=${sortBy}&isGetAll=${isGetAll}`
    ),
  GET_PARTNER_DETAIL: (partnerId: number) => path(ROOTS_PARTNERS, `/${partnerId}`),
  UPDATE_PARTNER: (partnerId: number) => path(ROOTS_PARTNERS, `/${partnerId}`),
  UPDATE_STATUS_PARTNER: (partnerId: number) => path(ROOTS_PARTNERS, `/${partnerId}/updating-status`),
  DELETE_PARTNER: (partnerId: number) => path(ROOTS_PARTNERS, `/${partnerId}`),
};

export const ROUTES_API_STORE_PARTNERS = {
  CREATE_STORE_PARTNER: pathRoot(ROOTS_STORE_PARTNERS),
  GET_ALL_STORE_PARTNER: ({
    searchValue = '',
    currentPage = '',
    itemsPerPage = '',
    sortBy = '',
    isGetAll = '',
  }: OptionParams) =>
    path(
      ROOTS_STORE_PARTNERS,
      `?searchValue=${searchValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&sortBy=${sortBy}&isGetAll=${isGetAll}`
    ),
  GET_ALL_STORE_PARTNER_BY_STORE_ID: ({
    idStore = 0,
    keySortName = '',
    keySortStatus = '',
    keySortCommission = '',
  }: OptionParams) =>
    path(
      ROOTS_STORE_PARTNERS,
      `/stores/${idStore}?keySortName=${keySortName}&keySortStatus=${keySortStatus}&keySortCommission=${keySortCommission}`
    ),
  UPDATE_STORE_PARTNER: (storeId: number, partnerId: number) =>
    path(ROOTS_STORE_PARTNERS, `/stores/${storeId}/partners/${partnerId}`),
  UPDATE_STORE_PARTNER_STATUS: (storeId: number, partnerId: number) =>
    path(ROOTS_STORE_PARTNERS, `/stores/${storeId}/partners/${partnerId}/updating-status`),
  DELETE_STORE_PARTNER: (storeId: number, partnerId: number) =>
    path(ROOTS_STORE_PARTNERS, `/stores/${storeId}/partners/${partnerId}`),
};

export const ROUTES_API_CATEGORIES = {
  CREATE_CATEGORY: pathRoot(ROOTS_CATEGORY),
  GET_ALL_CATEGORY: ({
    type = '',
    searchValue = '',
    currentPage = '',
    itemsPerPage = '',
    sortBy = '',
    isGetAll = '',
  }: OptionParams) =>
    path(
      ROOTS_CATEGORY,
      `?type=${type}&searchValue=${searchValue}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&sortBy=${sortBy}&isGetAll=${isGetAll}`
    ),
  GET_EXTRA_CATEGORY_OF_CATEGORY: ({
    searchValue = '',
    currentPage = '',
    itemsPerPage = '',
    sortBy = '',
    idCategory = '',
  }: OptionParams) =>
    path(
      ROOTS_CATEGORY,
      `/${idCategory}/extra-categories?searchValue=${searchValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&sortBy=${sortBy}`
    ),
  ADD_EXTRA_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}/extra-categories`),
  GET_CATEGORY_DETAIL: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  UPDATE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  DELETE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
};

export const ROUTES_API_PRODUCTS = {
  CREATE_PRODUCT: pathRoot(ROOTS_PRODUCTS),
  GET_ALL_PRODUCT: ({
    type = '',
    searchValue = '',
    currentPage = '',
    itemsPerPage = '',
    isGetAll = '',
    idStore = '',
    idCategory = '',
    sortBy = '',
  }: OptionParams) =>
    path(
      ROOTS_PRODUCTS,
      `?searchValue=${searchValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&productType=${type}&isGetAll=${isGetAll}&idCategory=${idCategory}&idStore=${idStore}&sortBy=${sortBy}`
    ),
  GET_ALL_PRODUCT_SOLD: ({
    type = '',
    searchValue = '',
    currentPage = '',
    itemsPerPage = '',
    isGetAll = '',
    idStore = '',
    idCategory = '',
    sortBy = '',
    searchDateFrom = '',
    searchDateTo = '',
  }: OptionParams) =>
    path(
      ROOTS_PRODUCTS,
      `/products-sold?searchValue=${searchValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&productType=${type}&isGetAll=${isGetAll}&idCategory=${idCategory}&idStore=${idStore}&sortBy=${sortBy}&productSearchDateFrom=${searchDateFrom}&productSearchDateTo=${searchDateTo}`
    ),
  GET_PRODUCT_DETAIL: (productId: number) => path(ROOTS_PRODUCTS, `/${productId}`),
  UPDATE_PRODUCT: (productId: number) => path(ROOTS_PRODUCTS, `/${productId}`),
  UPDATE_PRODUCT_STATUS: (productId: number) => path(ROOTS_PRODUCTS, `/${productId}/updating-status`),
  DELETE_PRODUCT: (productId: number) => path(ROOTS_PRODUCTS, `/${productId}`),
};

export const ROUTES_API_PARTNER_PRODUCTS = {
  CREATE_PARTNER_PRODUCT: pathRoot(ROOTS_PARTNER_PRODUCTS),
  GET_ALL_PARTNER_PRODUCT: ({ searchValue = '', currentPage = '', itemsPerPage = '', sortBy = '' }: OptionParams) =>
    path(
      ROOTS_PARTNER_PRODUCTS,
      `?searchValue=${searchValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&sortBy=${sortBy}`
    ),
  GET_PARTNER_PRODUCT_DETAIL: (productId: number, partnerId: number, storeId: number) =>
    path(ROOTS_PARTNER_PRODUCTS, `/products/${productId}/partners/${partnerId}/stores/${storeId}`),
  UPDATE_PARTNER_PRODUCT: (productId: number, partnerId: number, storeId: number) =>
    path(ROOTS_PARTNER_PRODUCTS, `/products/${productId}/partners/${partnerId}/stores/${storeId}`),
  UPDATE_PARTNER_PRODUCT_STATUS: (productId: number, partnerId: number, storeId: number) =>
    path(ROOTS_PARTNER_PRODUCTS, `/products/${productId}/partners/${partnerId}/stores/${storeId}/updating-status`),
  DELETE_PARTNER_PRODUCT: (productId: number, partnerId: number, storeId: number) =>
    path(ROOTS_PARTNER_PRODUCTS, `/products/${productId}/partners/${partnerId}/stores/${storeId}`),
};

export const ROUTES_API_CASHIERS = {
  GET_ALL_CASHIERS: ({ searchValue = '', currentPage = '', itemsPerPage = '', sortBy = '' }: OptionParams) => {
    return path(
      ROOTS_CASHIERS,
      `?searchValue=${searchValue}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&sortBy=${sortBy}`
    );
  },
  CREATE_CASHIER: pathRoot(ROOTS_CASHIERS),
  GET_CASHIER_DETAIL: (cashierId: number) => path(ROOTS_CASHIERS, `/${cashierId}`),
  UPDATE_CASHIER: (cashierId: number) => path(ROOTS_CASHIERS, `/${cashierId}`),
  UPDATE_CASHIER_STATUS: (cashierId: number) => path(ROOTS_CASHIERS, `/${cashierId}/updating-status`),
  DELETE_CASHIER: (cashierId: number) => path(ROOTS_CASHIERS, `/${cashierId}`),
  CASHIER_REPORT_SHIFT: path(ROOTS_CASHIERS, '/report'),
};

export const ROUTES_API_BANKING_ACCOUNTS = {
  GET_ALL_BANKING_ACCOUNTS: ({ itemsPerPage = '', currentPage = '', searchValue = '', sortBy = '' }: OptionParams) => {
    return path(
      ROOTS_BANKING_ACCOUNTS,
      `?searchValue=${searchValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&sortBy=${sortBy}`
    );
  },
  GET_BANKING_ACCOUNT_DETAIL: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNTS, `/${bankingAccountId}`),
  CREATE_BANKING_ACCOUNT: pathRoot(ROOTS_BANKING_ACCOUNTS),
  UPDATE_BANKING_ACCOUNT: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNTS, `/${bankingAccountId}`),
  UPDATE_STATUS_BANKING_ACCOUNT: (bankingAccountId: number) =>
    path(ROOTS_BANKING_ACCOUNTS, `/${bankingAccountId}/updating-status`),
  DELETE_BANKING_ACCOUNT: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNTS, `/${bankingAccountId}`),
};

export const ROUTES_API_ORDERS = {
  GET_ALL_ORDERS: ({
    itemsPerPage = '',
    currentPage = '',
    searchValue = '',
    sortBy = '',
    systemStatus = '',
    partnerOrderStatus = '',
    searchDateFrom = '',
    searchDateTo = '',
    confirmedBy = '',
  }: OptionParams) => {
    return path(
      ROOTS_ORDERS,
      `?SearchValue=${searchValue}&SearchDateFrom=${searchDateFrom}&SearchDateTo=${searchDateTo}&CurrentPage=${currentPage}&ItemsPerPage=${itemsPerPage}&SystemStatus=${systemStatus}&PartnerOrderStatus=${partnerOrderStatus}&SortBy=${sortBy}&ConfirmedBy=${confirmedBy}`
    );
  },
  GET_ORDER_DETAIL: (orderId: number) => path(ROOTS_ORDERS, `/${orderId}`),
  CONFIRM_ORDER_TO_COMPLETED: path(ROOTS_ORDERS, '/confirm-order-to-completed'),
  CHANGE_ORDER_TO_READY: (orderId: number) => path(ROOTS_ORDERS, `/${orderId}/change-order-to-ready`),
  CHANGE_ORDER_TO_READY_DELIVERY: (orderId: number) => path(ROOTS_ORDERS, `/${orderId}/change-order-to-ready-delivery`),
  CANCEL_ORDER: (orderId: number) => path(ROOTS_ORDERS, `/${orderId}/cancel-order`),
};

export const ROUTES_API_TRANSACTIONS = {
  CREATE_TRANSACTION: pathRoot(ROOTS_TRANSACTION),
  GET_ALL_TRANSACTION: pathRoot(ROOTS_TRANSACTION),
  GET_TRANSACTION_DETAIL: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
  UPDATE_TRANSACTION: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
  DELETE_TRANSACTION: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
};

export const ROUTES_API_WALLET = {
  GET_WALLET_INFORMATION: ({ searchDate = '' }: OptionParams) =>
    path(ROOTS_WALLET, `/transaction-money-exchange-shipper-payment-information?searchDate=${searchDate}`),
};
