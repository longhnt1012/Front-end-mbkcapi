import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { AddExtraCategory, Category, CategoryToCreate, CategoryToUpdate, CategoryType } from 'common/models';
import { ROUTES_API_CATEGORIES } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllCategories, getAllExtraCategoriesInCategory } from './categorySlice';

export const getAllCategoriesThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Category> = await axiosClient.get(
      ROUTES_API_CATEGORIES.GET_ALL_CATEGORY(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllExtraCategoriesThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Category> = await axiosClient.get(
      ROUTES_API_CATEGORIES.GET_ALL_CATEGORY(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllExtraCategoriesInCategoryThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Category> = await axiosClient.get(
      ROUTES_API_CATEGORIES.GET_EXTRA_CATEGORY_OF_CATEGORY(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getCategoryDetailThunk = async (params: any, thunkAPI: any) => {
  const { categoryId, categoryType, navigate } = params;

  try {
    const response: Category = await axiosClient.get(ROUTES_API_CATEGORIES.GET_CATEGORY_DETAIL(categoryId));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 400 || errorResponse?.statusCode === 404) {
      navigate(categoryType === CategoryType.NORMAL ? PATH_BRAND_APP.category.list : PATH_BRAND_APP.category.extraList);
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewCategoryThunk = async (params: Params<CategoryToCreate>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_CATEGORIES.CREATE_CATEGORY, formData);
    if (response) {
      navigate(data?.type === CategoryType.NORMAL ? PATH_BRAND_APP.category.list : PATH_BRAND_APP.category.extraList);
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const addExtraCategoryThunk = async (params: Params<AddExtraCategory>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.post(
      ROUTES_API_CATEGORIES.ADD_EXTRA_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: {
          ...optionParams,
          idCategory: idParams?.categoryId,
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      await thunkAPI.dispatch(getAllExtraCategoriesInCategory(paramsCallback));
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateCategoryThunk = async (params: Params<CategoryToUpdate>, thunkAPI: any) => {
  const { data, idParams, optionParams, pathname, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_CATEGORIES.UPDATE_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0),
      formData
    );
    if (response) {
      if (optionParams?.isUpdateStatus) {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllCategories(paramsCallback));
      }
      navigate(
        pathname !== undefined
          ? pathname
          : optionParams?.type === CategoryType.NORMAL
          ? PATH_BRAND_APP.category.list
          : PATH_BRAND_APP.category.extraList
      );
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteCategoryThunk = async (params: Params<Category>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_CATEGORIES.DELETE_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0)
    );
    if (response) {
      if (pathname === PATH_BRAND_APP.category.list || pathname === PATH_BRAND_APP.category.extraList) {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllCategories(paramsCallback));
      } else {
        navigate(
          optionParams?.type === CategoryType.NORMAL ? PATH_BRAND_APP.category.list : PATH_BRAND_APP.category.extraList
        );
      }
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};
