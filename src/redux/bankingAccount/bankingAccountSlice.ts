import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BankingAccount } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, setLocalStorage } from 'utils';
import {
  createNewBankingAccountThunk,
  deleteBankingAccountThunk,
  getAllBankingAccountsThunk,
  getBankingAccountDetailThunk,
  updateBankingAccountThunk,
  updateStatusBankingAccountThunk,
} from './bankingAccountThunk';

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_BANKING_ACCOUNT)
  ? getIsEditing(StorageKeys.IS_EDIT_BANKING_ACCOUNT)
  : false;

interface BankingAccountState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  bankingAccounts: BankingAccount[];
  bankingAccount: BankingAccount | null;
  numberItems: number;
}

const initialState: BankingAccountState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  bankingAccounts: [],
  bankingAccount: null,
  numberItems: 0,
};

export const createNewBankingAccount = createAsyncThunk(
  'BankingAccount/create-BankingAccount',
  createNewBankingAccountThunk
);
export const getAllBankingAccounts = createAsyncThunk(
  'BankingAccount/get-all-BankingAccounts',
  getAllBankingAccountsThunk
);
export const getBankingAccountDetails = createAsyncThunk(
  'BankingAccount/get-BankingAccount-details',
  getBankingAccountDetailThunk
);
export const updateBankingAccount = createAsyncThunk('BankingAccount/update-BankingAccount', updateBankingAccountThunk);
export const updateStatusBankingAccount = createAsyncThunk(
  'BankingAccount/update-status-BankingAccount',
  updateStatusBankingAccountThunk
);
export const deleteBankingAccount = createAsyncThunk('BankingAccount/delete-BankingAccount', deleteBankingAccountThunk);

const BankingAccountSlice = createSlice({
  name: 'BankingAccount',
  initialState,
  reducers: {
    setAddBankingAccount: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_BANKING_ACCOUNT, false);
    },
    setEditBankingAccount: (state, action) => {
      state.isEditing = true;
      state.bankingAccount = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_BANKING_ACCOUNT, true);
    },
    getBankingAccountDetail_local: (state, action) => {
      state.bankingAccount = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewBankingAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBankingAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewBankingAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllBankingAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBankingAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bankingAccounts = [...action.payload?.bankingAccounts];
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllBankingAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getBankingAccountDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBankingAccountDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bankingAccount = action.payload;
      })
      .addCase(getBankingAccountDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateBankingAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBankingAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateBankingAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStatusBankingAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusBankingAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusBankingAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteBankingAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBankingAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteBankingAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddBankingAccount, setEditBankingAccount, getBankingAccountDetail_local } =
  BankingAccountSlice.actions;
const BankingAccountReducer = BankingAccountSlice.reducer;

export default BankingAccountReducer;
