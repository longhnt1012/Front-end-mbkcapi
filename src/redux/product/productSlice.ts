import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product, ProductTypeEnum } from 'common/models';
import {
  createNewProductThunk,
  deleteProductThunk,
  getAllProductsParentThunk,
  getAllProductsSoldThunk,
  getAllProductsThunk,
  getProductDetailThunk,
  getProductParentDetailThunk,
  updateProductThunk,
  updateStatusProductThunk,
} from './productThunk';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, getProductType, setLocalStorage } from 'utils';

interface ProductState {
  isProduct: boolean;
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  productType: ProductTypeEnum;
  products: Product[];
  productsParent: Product[];
  productsSold: Product[];
  product: Product | null;
  productParent: Product | null;
  productSold: Product | null;
  totalPages: number;
  numberItems: number;
}

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_PRODUCT)
  ? getIsEditing(StorageKeys.IS_EDIT_PRODUCT)
  : false;
const getIsProductInStorage = getIsEditing(StorageKeys.IS_PRODUCT) ? getIsEditing(StorageKeys.IS_PRODUCT) : false;
const getProductTypeInStorage = getProductType() ? getProductType() : ProductTypeEnum.SINGLE;

const initialState: ProductState = {
  isProduct: getIsProductInStorage,
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  productType: getProductTypeInStorage,
  products: [],
  productsParent: [],
  productsSold: [],
  product: null,
  productParent: null,
  productSold: null,
  totalPages: 0,
  numberItems: 5,
};

export const createNewProduct = createAsyncThunk('product/create-product', createNewProductThunk);
export const getAllProducts = createAsyncThunk('product/get-all-products', getAllProductsThunk);
export const getAllProductsParent = createAsyncThunk('product/get-all-products-parent', getAllProductsParentThunk);
export const getAllProductsSold = createAsyncThunk('product/get-all-products-sold', getAllProductsSoldThunk);
export const getProductDetail = createAsyncThunk('product/get-product-detail', getProductDetailThunk);
export const getProductParentDetail = createAsyncThunk(
  'product/get-product-parent-detail',
  getProductParentDetailThunk
);
export const updateProduct = createAsyncThunk('product/update-product', updateProductThunk);
export const updateStatusProduct = createAsyncThunk('product/update-product-status', updateStatusProductThunk);
export const deleteProduct = createAsyncThunk('product/delete-product', deleteProductThunk);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAddProduct: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_PRODUCT, false);
    },
    setEditProduct: (state, action) => {
      state.isEditing = true;
      state.product = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_PRODUCT, true);
    },
    getProductEmpty: (state) => {
      state.productParent = null;
    },
    getProductDetail_local: (state, action) => {
      state.product = action.payload;
    },
    setProductType: (state, action) => {
      state.productType = action.payload;
      setLocalStorage(StorageKeys.PRODUCT_TYPE, action.payload);
    },
    setIsProduct: (state) => {
      state.isProduct = true;
      setLocalStorage(StorageKeys.IS_PRODUCT, true);
    },
    setIsPartnerProduct: (state) => {
      state.isProduct = false;
      setLocalStorage(StorageKeys.IS_PRODUCT, false);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = [...action.payload?.products];
        state.totalPages = action.payload?.totalPages;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllProductsParent.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getAllProductsParent.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productsParent = [...action.payload?.products];
        state.totalPages = action.payload?.totalPages;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllProductsParent.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllProductsSold.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsSold.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productsSold = [...action.payload?.products];
        state.totalPages = action.payload?.totalPages;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllProductsSold.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = { ...action.payload };
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getProductParentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductParentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productParent = { ...action.payload };
      })
      .addCase(getProductParentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStatusProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const {
  setAddProduct,
  setEditProduct,
  getProductDetail_local,
  getProductEmpty,
  setProductType,
  setIsProduct,
  setIsPartnerProduct,
} = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;
