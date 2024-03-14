import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category, CategoryType } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getCategoryType, getIsEditing, setLocalStorage } from 'utils';
import {
  addExtraCategoryThunk,
  createNewCategoryThunk,
  deleteCategoryThunk,
  getAllCategoriesThunk,
  getAllExtraCategoriesInCategoryThunk,
  getAllExtraCategoriesThunk,
  getCategoryDetailThunk,
  updateCategoryThunk,
} from './categoryThunk';

interface CategoryState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  categoryType: CategoryType;
  categories: Category[];
  categoriesExtra: Category[];
  category: Category | null;
  totalPages: number;
  numberItems: number;
  numberExtraItems: number;
}

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_CATEGORY)
  ? getIsEditing(StorageKeys.IS_EDIT_CATEGORY)
  : false;
const getCategoryTypeInStorage = getCategoryType() ? getCategoryType() : CategoryType.NORMAL;

const initialState: CategoryState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  categoryType: getCategoryTypeInStorage,
  categories: [],
  categoriesExtra: [],
  category: null,
  totalPages: 0,
  numberItems: 5,
  numberExtraItems: 5,
};

export const createNewCategory = createAsyncThunk('category/create-category', createNewCategoryThunk);
export const addExtraCategory = createAsyncThunk('category/add-extra-category', addExtraCategoryThunk);
export const getAllCategories = createAsyncThunk('category/get-all-categories', getAllCategoriesThunk);
export const getAllExtraCategories = createAsyncThunk('category/get-all-extra-categories', getAllExtraCategoriesThunk);
export const getAllExtraCategoriesInCategory = createAsyncThunk(
  'category/get-all-extra-categories-in-category',
  getAllExtraCategoriesInCategoryThunk
);
export const getCategoryDetail = createAsyncThunk('category/get-category-detail', getCategoryDetailThunk);
export const updateCategory = createAsyncThunk('category/update-category', updateCategoryThunk);
export const deleteCategory = createAsyncThunk('category/delete-category', deleteCategoryThunk);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setAddCategory: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_CATEGORY, false);
    },
    setEditCategory: (state, action) => {
      state.isEditing = true;
      state.category = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_CATEGORY, true);
    },
    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
      setLocalStorage(StorageKeys.CATEGORY_TYPE, action.payload);
    },
    getCategoryDetail_local: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(addExtraCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addExtraCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(addExtraCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = [...action.payload.categories];
        state.totalPages = action.payload?.totalPages;
        state.numberItems = action.payload?.totalItems;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllExtraCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExtraCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.numberExtraItems = action.payload?.totalItems;
      })
      .addCase(getAllExtraCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllExtraCategoriesInCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExtraCategoriesInCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoriesExtra = [...action.payload.categories];
        state.totalPages = action.payload?.totalPages;
        state.numberItems = action.payload?.totalItems;
      })
      .addCase(getAllExtraCategoriesInCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getCategoryDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.category = { ...action.payload };
      })
      .addCase(getCategoryDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddCategory, setEditCategory, setCategoryType, getCategoryDetail_local } = categorySlice.actions;
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
