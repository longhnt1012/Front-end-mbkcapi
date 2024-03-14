import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Partner } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, setLocalStorage } from 'utils';
import {
  deletePartnerThunk,
  getAllPartnersThunk,
  getPartnerDetailThunk,
  updatePartnerThunk,
  updateStatusPartnerThunk,
} from './partnerThunk';

interface PartnerState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  partners: Partner[];
  partner: Partner | null;
  totalPages: number;
  numberItems: number;
}

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_PARTNER)
  ? getIsEditing(StorageKeys.IS_EDIT_PARTNER)
  : false;

const initialState: PartnerState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  partners: [],
  partner: null,
  totalPages: 0,
  numberItems: 5,
};

export const getAllPartners = createAsyncThunk('partner/get-all-partners', getAllPartnersThunk);
export const getPartnerDetail = createAsyncThunk('partner/get-partner-detail', getPartnerDetailThunk);
export const updatePartner = createAsyncThunk('partner/update-partner', updatePartnerThunk);
export const updateStatusPartner = createAsyncThunk('partner/update-status-partner', updateStatusPartnerThunk);
export const deletePartner = createAsyncThunk('partner/delete-partner', deletePartnerThunk);

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setAddPartner: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_PARTNER, false);
    },
    setEditPartner: (state, action) => {
      state.isEditing = true;
      state.partner = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_PARTNER, true);
    },
    getPartnerDetail_local: (state, action) => {
      state.partner = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.partners = [...action.payload?.partners];
        state.totalPages = action.payload?.totalPages;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getPartnerDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartnerDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.partner = { ...action.payload };
      })
      .addCase(getPartnerDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updatePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStatusPartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusPartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusPartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deletePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddPartner, setEditPartner, getPartnerDetail_local } = partnerSlice.actions;
const partnerReducer = partnerSlice.reducer;

export default partnerReducer;
