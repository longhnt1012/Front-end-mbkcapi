import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Store, StorePartner, StorePartnerDetail } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getIdInStorage, getIsEditing, setLocalStorage } from 'utils';
import {
  createNewStorePartnerThunk,
  deleteStorePartnerThunk,
  getAllStorePartnersByStoreIdThunk,
  getAllStorePartnersThunk,
  updateStatusStorePartnerThunk,
  updateStorePartnerThunk,
} from './storePartnerThunk';

interface StorePartnerState {
  isAddFormDetail: boolean;
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  storeId: number;
  store: Store | null;
  listStorePartners: StorePartnerDetail[];
  storePartners: StorePartner | null;
  storePartner: StorePartnerDetail | null;
  totalPages: number;
  numberItems: number;
}

const getIsEditingInStorage =
  getIsEditing(StorageKeys.IS_EDIT_STORE_PARTNER) === true ? getIsEditing(StorageKeys.IS_EDIT_STORE_PARTNER) : false;
const getIsAddFormDetailInStorage =
  getIsEditing(StorageKeys.IS_ADD_FORM_DETAIL) === true ? getIsEditing(StorageKeys.IS_ADD_FORM_DETAIL) : false;
const getStoreIdlInStorage = getIdInStorage(StorageKeys.STORE_ID);

const initialState: StorePartnerState = {
  isAddFormDetail: getIsAddFormDetailInStorage,
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  listStorePartners: [],
  storePartners: null,
  storePartner: null,
  store: null,
  storeId: getStoreIdlInStorage,
  totalPages: 0,
  numberItems: 5,
};

export const createNewStorePartner = createAsyncThunk('store-partner/create-store-partner', createNewStorePartnerThunk);
export const getAllStorePartners = createAsyncThunk('store-partner/get-all-store-partner', getAllStorePartnersThunk);
export const getAllStorePartnersByStoreId = createAsyncThunk(
  'store-partner/get-all-partner-by-store-id',
  getAllStorePartnersByStoreIdThunk
);
export const updateStorePartner = createAsyncThunk('store-partner/update-store-partner', updateStorePartnerThunk);
export const updateStatusStorePartner = createAsyncThunk(
  'store-partner/update-status-store-partner',
  updateStatusStorePartnerThunk
);
export const deleteStorePartner = createAsyncThunk('store-partner/delete-store-partner', deleteStorePartnerThunk);

const storePartnerSlice = createSlice({
  name: 'storePartner',
  initialState,
  reducers: {
    getStorePartnerDetail_local: (state, action) => {
      state.storePartner = action.payload;
    },
    setAddStorePartner: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_STORE_PARTNER, false);
    },
    setEditStorePartner: (state, action) => {
      state.isEditing = true;
      state.storePartner = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_STORE_PARTNER, true);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewStorePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewStorePartner.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewStorePartner.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllStorePartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStorePartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listStorePartners = action.payload.storePartners;
      })
      .addCase(getAllStorePartners.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllStorePartnersByStoreId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStorePartnersByStoreId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.storePartners = { ...action.payload };
      })
      .addCase(getAllStorePartnersByStoreId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStorePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStorePartner.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStorePartner.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStatusStorePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusStorePartner.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusStorePartner.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteStorePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStorePartner.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteStorePartner.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { getStorePartnerDetail_local, setAddStorePartner, setEditStorePartner } = storePartnerSlice.actions;
const storePartnerReducer = storePartnerSlice.reducer;

export default storePartnerReducer;
