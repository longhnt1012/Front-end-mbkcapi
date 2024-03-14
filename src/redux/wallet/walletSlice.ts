import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Wallet } from 'common/models';
import { getWalletInformationThunk } from './walletThunk';

interface WalletState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  walletInformation: Wallet | null;
}

const initialState: WalletState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  walletInformation: null,
};

export const getWalletInformation = createAsyncThunk('wallet/get-wallet-information', getWalletInformationThunk);

const WalletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getWalletInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWalletInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.walletInformation = action.payload;
      })
      .addCase(getWalletInformation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

const WalletReducer = WalletSlice.reducer;

export default WalletReducer;
