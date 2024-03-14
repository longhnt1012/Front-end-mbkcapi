import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Brand } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, setLocalStorage } from 'utils';
import {
  createNewBrandThunk,
  deleteBrandThunk,
  getAllBrandsThunk,
  getBrandDetailThunk,
  updateBrandThunk,
  updateStatusBrandThunk,
} from './brandThunk';

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_BRAND) ? getIsEditing(StorageKeys.IS_EDIT_BRAND) : false;

interface BrandState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  brands: Brand[];
  brand: Brand | null;
  numberItems: number;
}

const initialState: BrandState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  brands: [],
  brand: null,
  numberItems: 0,
};

export const createNewBrand = createAsyncThunk('brand/create-brand', createNewBrandThunk);
export const getAllBrands = createAsyncThunk('brand/get-all-brands', getAllBrandsThunk);
export const getBrandDetail = createAsyncThunk('brand/get-brand-detail', getBrandDetailThunk);
export const updateBrand = createAsyncThunk('brand/update-brand', updateBrandThunk);
export const updateStatusBrand = createAsyncThunk('brand/update-status-brand', updateStatusBrandThunk);
export const deleteBrand = createAsyncThunk('brand/delete-brand', deleteBrandThunk);

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setAddBrand: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_BRAND, false);
    },
    setEditBrand: (state, action) => {
      state.isEditing = true;
      state.brand = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_BRAND, true);
    },
    setBrandToNull: (state) => {
      state.brand = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = [...action.payload?.brands];
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(getBrandDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brand = action.payload;
      })
      .addCase(getBrandDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStatusBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddBrand, setEditBrand, setBrandToNull } = brandSlice.actions;
const brandReducer = brandSlice.reducer;

export default brandReducer;
