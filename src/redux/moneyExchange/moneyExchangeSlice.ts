import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MoneyExchange } from 'common/models';
import {
  createPaymentForStoreThunk,
  getAllMoneyExchangeThunk,
  getAllMoneyExchangeWithdrawThunk,
  sendMoneyToKitchenCenterThunk,
} from './moneyExchangeThunk';

interface MoneyExchangeState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  moneyExchanges: MoneyExchange[];
  moneyExchangesWithdraw: MoneyExchange[];
  moneyExchange: MoneyExchange | null;
  numberItems: number;
}

const initialState: MoneyExchangeState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  moneyExchanges: [],
  moneyExchangesWithdraw: [],
  moneyExchange: null,
  numberItems: 0,
};

export const getAllMoneyExchange = createAsyncThunk('money-exchange/get-all-money-exchanges', getAllMoneyExchangeThunk);
export const getAllMoneyExchangeWithdraw = createAsyncThunk(
  'money-exchange/get-all-money-exchanges-withdraw',
  getAllMoneyExchangeWithdrawThunk
);
export const createPaymentForStore = createAsyncThunk(
  'money-exchange/create-payment-for-store',
  createPaymentForStoreThunk
);
export const sendMoneyToKitchenCenter = createAsyncThunk(
  'money-exchange/send-money-to-kitchen-center',
  sendMoneyToKitchenCenterThunk
);

const moneyExchangeSlice = createSlice({
  name: 'moneyExchange',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllMoneyExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMoneyExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.moneyExchanges = [...action.payload?.moneyExchanges];
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllMoneyExchange.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllMoneyExchangeWithdraw.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMoneyExchangeWithdraw.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.moneyExchangesWithdraw = [...action.payload?.moneyExchanges];
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllMoneyExchangeWithdraw.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(createPaymentForStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentForStore.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createPaymentForStore.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(sendMoneyToKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMoneyToKitchenCenter.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(sendMoneyToKitchenCenter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

const moneyExchangeReducer = moneyExchangeSlice.reducer;

export default moneyExchangeReducer;
