import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import addressReducer from './address/addressSlice';
import authReducer from './auth/authSlice';
import BankingAccountReducer from './bankingAccount/bankingAccountSlice';
import brandReducer from './brand/brandSlice';
import cashierReducer from './cashier/cashierSlice';
import categoryReducer from './category/categorySlice';
import configurationReducer from './configuration/configurationsSlice';
import kitchenCenterReducer from './kitchenCenter/kitchenCenterSlice';
import moneyExchangeReducer from './moneyExchange/moneyExchangeSlice';
import orderReducer from './order/orderSlice';
import partnerReducer from './partner/partnerSlice';
import partnerProductReducer from './partnerProduct/partnerProductSlice';
import productReducer from './product/productSlice';
import profileReducer from './profile/profileSlice';
import routesReducer from './routes/routesSlice';
import shipperPaymentReducer from './shipperPayment/shipperPaymentSlice';
import storeReducer from './store/storeSlice';
import storePartnerReducer from './storePartner/storePartnerSlice';
import walletReducer from './wallet/walletSlice';
import dashboardReducer from './dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    brand: brandReducer,
    kitchenCenter: kitchenCenterReducer,
    store: storeReducer,
    category: categoryReducer,
    product: productReducer,
    cashier: cashierReducer,
    bankingAccount: BankingAccountReducer,
    partner: partnerReducer,
    order: orderReducer,
    routes: routesReducer,
    profile: profileReducer,
    storePartner: storePartnerReducer,
    partnerProduct: partnerProductReducer,
    address: addressReducer,
    configuration: configurationReducer,
    shipperPayment: shipperPaymentReducer,
    moneyExchange: moneyExchangeReducer,
    wallet: walletReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
