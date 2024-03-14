import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KitchenCenter } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, setLocalStorage } from 'utils';
import {
  createNewKitchenCenterThunk,
  deleteKitchenCenterThunk,
  getAllKitchenCentersThunk,
  getKitchenCenterDetailThunk,
  updateKitchenCenterThunk,
  updateStatusKitchenCenterThunk,
} from './kitchenCenterThunk';

interface KitchenCenterState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  kitchenCenters: KitchenCenter[];
  kitchenCenter: KitchenCenter | null;
  totalPages: number;
  numberItems: number;
}

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_KITCHEN_CENTER)
  ? getIsEditing(StorageKeys.IS_EDIT_KITCHEN_CENTER)
  : false;

const initialState: KitchenCenterState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  kitchenCenters: [],
  kitchenCenter: null,
  totalPages: 0,
  numberItems: 0,
};

export const createNewKitchenCenter = createAsyncThunk(
  'kitchenCenter/create-kitchen-center',
  createNewKitchenCenterThunk
);
export const getAllKitchenCenters = createAsyncThunk(
  'kitchenCenter/get-all-kitchen-centers',
  getAllKitchenCentersThunk
);
export const getKitchenCenterDetail = createAsyncThunk(
  'kitchenCenter/get-kitchen-center-detail',
  getKitchenCenterDetailThunk
);
export const updateKitchenCenter = createAsyncThunk('kitchenCenter/update-kitchen-center', updateKitchenCenterThunk);
export const updateStatusKitchenCenter = createAsyncThunk(
  'kitchenCenter/update-status-kitchen-center',
  updateStatusKitchenCenterThunk
);
export const deleteKitchenCenter = createAsyncThunk('kitchenCenter/delete-kitchen-center', deleteKitchenCenterThunk);

const kitchenCenterSlice = createSlice({
  name: 'kitchenCenter',
  initialState,
  reducers: {
    setAddKitchenCenter: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_KITCHEN_CENTER, false);
    },
    setEditKitchenCenter: (state, action) => {
      state.isEditing = true;
      state.kitchenCenter = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_KITCHEN_CENTER, true);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewKitchenCenter.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewKitchenCenter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllKitchenCenters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllKitchenCenters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.kitchenCenters = [...action.payload?.kitchenCenters];
        state.numberItems = action.payload?.numberItems;
        state.totalPages = action.payload?.totalPagess;
      })
      .addCase(getAllKitchenCenters.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getKitchenCenterDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKitchenCenterDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.kitchenCenter = { ...action.payload };
      })
      .addCase(getKitchenCenterDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateKitchenCenter.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateKitchenCenter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStatusKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusKitchenCenter.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusKitchenCenter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteKitchenCenter.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteKitchenCenter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddKitchenCenter, setEditKitchenCenter } = kitchenCenterSlice.actions;
const kitchenCenterReducer = kitchenCenterSlice.reducer;

export default kitchenCenterReducer;
