import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { Product, ProductToCreateParams, ProductToUpdate, ToUpdateStatus } from 'common/models';
import { ROUTES_API_PRODUCTS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllProducts, getProductDetail } from './productSlice';

export const getAllProductsThunk = async (params: any, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Product> = await axiosClient.get(ROUTES_API_PRODUCTS.GET_ALL_PRODUCT(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllProductsParentThunk = async (params: any, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Product> = await axiosClient.get(ROUTES_API_PRODUCTS.GET_ALL_PRODUCT(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllProductsSoldThunk = async (params: any, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Product> = await axiosClient.get(
      ROUTES_API_PRODUCTS.GET_ALL_PRODUCT_SOLD(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getProductDetailThunk = async (params: any, thunkAPI: any) => {
  const { productId, pathname, navigate } = params;

  try {
    const response: Product = await axiosClient.get(ROUTES_API_PRODUCTS.GET_PRODUCT_DETAIL(productId));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (pathname === PATH_BRAND_APP.product.list) {
      if (errorResponse?.statusCode === 404 || errorResponse?.statusCode === 400) {
        navigate(PATH_BRAND_APP.product.list);
      }
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getProductParentDetailThunk = async (params: any, thunkAPI: any) => {
  const { productId, navigate } = params;

  try {
    const response: Product = await axiosClient.get(ROUTES_API_PRODUCTS.GET_PRODUCT_DETAIL(productId));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewProductThunk = async (params: Params<ProductToCreateParams>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_PRODUCTS.CREATE_PRODUCT, formData);
    if (response) {
      navigate(PATH_BRAND_APP.product.list);
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

export const updateProductThunk = async (params: Params<ProductToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_PRODUCTS.UPDATE_PRODUCT(idParams?.productId ? idParams?.productId : 0),
      formData
    );
    if (response) {
      navigate(pathname !== undefined ? pathname : PATH_BRAND_APP.product.list);
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

export const updateStatusProductThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_PRODUCTS.UPDATE_PRODUCT_STATUS(idParams?.productId ? idParams?.productId : 0),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: optionParams ? optionParams : {},
        navigate,
      };
      await thunkAPI.dispatch(getAllProducts(paramsCallback));
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

export const deleteProductThunk = async (params: Params<Product>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_PRODUCTS.DELETE_PRODUCT(idParams?.productId ? idParams?.productId : 0)
    );
    if (response) {
      if (pathname && pathname === PATH_BRAND_APP.product.list) {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllProducts(paramsCallback));
      } else if (pathname && pathname !== PATH_BRAND_APP.product.list && optionParams?.isDetailList === true) {
        await thunkAPI.dispatch(getProductDetail({ productId: optionParams?.idProduct as number, navigate }));
        navigate(pathname);
      } else {
        navigate(PATH_BRAND_APP.product.list);
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
