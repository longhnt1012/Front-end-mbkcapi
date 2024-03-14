import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BrandProfile, KitchenCenterProfile } from 'common/models';
import { getBrandInfo, getKitchenCenterInfo } from 'utils';
import { getBrandProfileThunk, getKitchenCenterProfileThunk, updateBrandProfileThunk } from './profileThunk';

interface ProfileState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  kitchenCenterProfile: KitchenCenterProfile | null;
  brandProfile: BrandProfile | null;
}

const getKitchenCenterInStorage = getKitchenCenterInfo() ? getKitchenCenterInfo() : null;
const getBrandInStorage = getBrandInfo() ? getBrandInfo() : null;

const initialState: ProfileState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  kitchenCenterProfile: getKitchenCenterInStorage,
  brandProfile: getBrandInStorage,
};

export const getKitchenCenterProfile = createAsyncThunk(
  'profile/get-kitchen-center-profile',
  getKitchenCenterProfileThunk
);
export const getBrandProfile = createAsyncThunk('profile/get-brand-profile', getBrandProfileThunk);
export const updateBrandProfile = createAsyncThunk('profile/update-brand-profile', updateBrandProfileThunk);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setEditProfile: (state) => {
      state.isEditing = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getKitchenCenterProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKitchenCenterProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.kitchenCenterProfile = action.payload;
      })
      .addCase(getKitchenCenterProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getBrandProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandProfile = action.payload;
      })
      .addCase(getBrandProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateBrandProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrandProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateBrandProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setEditProfile } = profileSlice.actions;
const profileReducer = profileSlice.reducer;

export default profileReducer;
