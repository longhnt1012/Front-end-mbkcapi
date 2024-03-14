import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PartnerProduct } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, getPartnerProduct, setLocalStorage, setPartnerProduct } from 'utils';
import {
  createNewPartnerProductThunk,
  deletePartnerProductThunk,
  getAllPartnerProductsThunk,
  getPartnerProductDetailThunk,
  updatePartnerProductThunk,
  updateStatusPartnerProductThunk,
} from './partnerProductThunk';
import { ActionPayloadErrorData } from 'common/@types';

interface PartnerProductState {
  statusCode: number;
  fieldNameError: string;
  messageError: string;
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  partnerProducts: PartnerProduct[];
  partnerProduct: PartnerProduct | null;
  totalPages: number;
  numberItems: number;
}

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_PARTNER_PRODUCT)
  ? getIsEditing(StorageKeys.IS_EDIT_PARTNER_PRODUCT)
  : false;
const getPartnerProductInStorage = getPartnerProduct() ? getPartnerProduct() : null;

const initialState: PartnerProductState = {
  statusCode: 0,
  fieldNameError: '',
  messageError: '',
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  partnerProducts: [],
  partnerProduct: getPartnerProductInStorage,
  totalPages: 0,
  numberItems: 5,
};

export const createNewPartnerProduct = createAsyncThunk(
  'partner-product/create-partner-product',
  createNewPartnerProductThunk
);
export const getAllPartnerProducts = createAsyncThunk(
  'partner-product/get-all-partner-products',
  getAllPartnerProductsThunk
);
export const getPartnerProductDetail = createAsyncThunk(
  'partner-product/get-partner-product-detail',
  getPartnerProductDetailThunk
);
export const updatePartnerProduct = createAsyncThunk(
  'partner-product/update-partner-product',
  updatePartnerProductThunk
);
export const updateStatusPartnerProduct = createAsyncThunk(
  'partner-product/update-status-partner-product',
  updateStatusPartnerProductThunk
);
export const deletePartnerProduct = createAsyncThunk(
  'partner-product/delete-status-partner-product',
  deletePartnerProductThunk
);

const partnerProductSlice = createSlice({
  name: 'partnerProduct',
  initialState,
  reducers: {
    setStatusCode: (state) => {
      state.statusCode = 0;
    },
    setFieldNameError: (state) => {
      state.fieldNameError = '';
    },
    setAddPartnerProduct: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_PARTNER_PRODUCT, false);
    },
    setEditPartnerProduct: (state, action) => {
      state.isEditing = true;
      state.partnerProduct = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_PARTNER_PRODUCT, true);
    },
    getPartnerProductDetail_local: (state, action) => {
      state.partnerProduct = action.payload;
      setPartnerProduct(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewPartnerProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPartnerProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.statusCode = 200;
      })
      .addCase(createNewPartnerProduct.rejected, (state, action: any) => {
        const payloadData: ActionPayloadErrorData = action.payload.data;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.statusCode = payloadData.StatusCode;
        state.fieldNameError = payloadData.Message[0].FieldNameError;
      })
      .addCase(getAllPartnerProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPartnerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.partnerProducts = [...action.payload?.partnerProducts];
        state.totalPages = action.payload?.totalPages;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllPartnerProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getPartnerProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartnerProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.partnerProduct = { ...action.payload };
      })
      .addCase(getPartnerProductDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updatePartnerProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePartnerProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.statusCode = 200;
      })
      .addCase(updatePartnerProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStatusPartnerProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusPartnerProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusPartnerProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deletePartnerProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePartnerProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deletePartnerProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const {
  setAddPartnerProduct,
  setEditPartnerProduct,
  getPartnerProductDetail_local,
  setStatusCode,
  setFieldNameError,
} = partnerProductSlice.actions;
const mappingProductReducer = partnerProductSlice.reducer;

export default mappingProductReducer;
