import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { Brand, BrandToCreate, BrandToUpdate, ToUpdateStatus } from 'common/models';
import { ROUTES_API_BRANDS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllBrands } from './brandSlice';

export const getAllBrandsThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<Brand> = await axiosClient.get(ROUTES_API_BRANDS.GET_ALL_BRAND(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getBrandDetailThunk = async (params: any, thunkAPI: any) => {
  const { brandId, navigate } = params;

  try {
    const response: Brand = await axiosClient.get(ROUTES_API_BRANDS.GET_BRAND_DETAIL(brandId));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404 || errorResponse?.statusCode === 400) {
      navigate(PATH_ADMIN_APP.brand.list);
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewBrandThunk = async (params: Params<BrandToCreate>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_BRANDS.CREATE_BRAND, formData);
    if (response) {
      navigate(PATH_ADMIN_APP.brand.list);
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

export const updateBrandThunk = async (params: Params<BrandToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_BRANDS.UPDATE_BRAND(idParams?.brandId ? idParams?.brandId : 0),
      formData
    );
    if (response) {
      navigate(pathname !== undefined ? pathname : PATH_ADMIN_APP.brand.list);
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

export const updateStatusBrandThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_BRANDS.UPDATE_STATUS_BRAND(idParams?.brandId ? idParams?.brandId : 0),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: optionParams ? optionParams : {},
        navigate,
      };
      await thunkAPI.dispatch(getAllBrands(paramsCallback));
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

export const deleteBrandThunk = async (params: Params<Brand>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_BRANDS.DELETE_BRAND(idParams?.brandId ? idParams?.brandId : 0)
    );
    if (response) {
      if (pathname && pathname === PATH_ADMIN_APP.brand.list) {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllBrands(paramsCallback));
      } else {
        navigate(PATH_ADMIN_APP.brand.list);
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
