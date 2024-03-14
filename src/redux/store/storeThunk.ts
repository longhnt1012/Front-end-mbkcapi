import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { Role } from 'common/enums';
import { Store, StoreToConfirm, StoreToCreate, StoreToUpdate, ToUpdateStatus, UserAuth } from 'common/models';
import { ROUTES_API_STORES } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { appendData, getErrorMessage, getUserAuth, handleResponseMessage } from 'utils';
import { getAllStores, getStoreDetail } from './storeSlice';

export const getAllStoresThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Store> = await axiosClient.get(ROUTES_API_STORES.GET_ALL_STORE(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllStoresActiveInactiveThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Store> = await axiosClient.get(
      ROUTES_API_STORES.GET_ALL_STORE_ACTIVE_INACTIVE(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getStoreDetailThunk = async (params: any, thunkAPI: any) => {
  const { storeId, navigate } = params;

  try {
    const response: Store = await axiosClient.get(ROUTES_API_STORES.GET_STORE_DETAIL(storeId));
    return response;
  } catch (error: any) {
    const getUserInStorage: UserAuth = getUserAuth();
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404 || errorResponse?.statusCode === 400) {
      navigate(
        getUserInStorage.roleName === Role.BRAND_MANAGER
          ? PATH_BRAND_APP.store.list
          : getUserInStorage.roleName === Role.KITCHEN_CENTER_MANAGER
          ? PATH_KITCHEN_CENTER_APP.store.list
          : PATH_ADMIN_APP.store.list
      );
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewStoreThunk = async (params: Params<StoreToCreate>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_STORES.CREATE_STORE, formData);
    if (response) {
      navigate(PATH_BRAND_APP.store.list);
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

export const updateStoreThunk = async (params: Params<StoreToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_STORES.UPDATE_STORE_INFORMATION(idParams?.storeId ? idParams?.storeId : 0),
      formData
    );
    if (response) {
      navigate(pathname !== undefined ? pathname : PATH_ADMIN_APP.store.list);
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

export const updateStatusStoreThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_STORES.UPDATE_STORE_STATUS(idParams?.storeId ? idParams?.storeId : 0),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: optionParams ? optionParams : {},
        navigate,
      };
      await thunkAPI.dispatch(getAllStores(paramsCallback));
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

export const confirmRegistrationStoreThunk = async (params: Params<StoreToConfirm>, thunkAPI: any) => {
  const { data, idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_STORES.CONFIRM_STORE_REGISTRATION(idParams?.storeId ? idParams?.storeId : 0),
      data
    );
    if (response) {
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        await thunkAPI.dispatch(getStoreDetail({ storeId: idParams?.storeId, navigate }));
      } else {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllStores(paramsCallback));
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

export const deleteStoreThunk = async (params: Params<Store>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_STORES.DELETE_STORE(idParams?.storeId ? idParams?.storeId : 0)
    );
    if (response) {
      if (pathname && pathname === PATH_ADMIN_APP.store.list) {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllStores(paramsCallback));
      } else {
        navigate(PATH_ADMIN_APP.store.list);
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
