import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { KitchenCenter, KitchenCenterToAdd, KitchenCenterToUpdate, ToUpdateStatus } from 'common/models';
import { ROUTES_API_KITCHEN_CENTER } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllKitchenCenters } from './kitchenCenterSlice';

export const getAllKitchenCentersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<KitchenCenter> = await axiosClient.get(
      ROUTES_API_KITCHEN_CENTER.GET_ALL_KITCHEN_CENTER(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getKitchenCenterDetailThunk = async (params: any, thunkAPI: any) => {
  const { kitchenCenterId, navigate } = params;

  try {
    const response: KitchenCenter = await axiosClient.get(
      ROUTES_API_KITCHEN_CENTER.GET_KITCHEN_CENTER_DETAIL(kitchenCenterId)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404 || errorResponse?.statusCode === 400) {
      navigate(PATH_ADMIN_APP.kitchenCenter.list);
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewKitchenCenterThunk = async (params: Params<KitchenCenterToAdd>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(
      ROUTES_API_KITCHEN_CENTER.CREATE_KITCHEN_CENTER,
      formData
    );
    if (response) {
      navigate(PATH_ADMIN_APP.kitchenCenter.list);
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

export const updateKitchenCenterThunk = async (params: Params<KitchenCenterToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_KITCHEN_CENTER.UPDATE_KITCHEN_CENTER(idParams?.kitchenCenterId ? idParams?.kitchenCenterId : 0),
      formData
    );
    if (response) {
      navigate(pathname !== undefined ? pathname : PATH_ADMIN_APP.kitchenCenter.list);
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

export const updateStatusKitchenCenterThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_KITCHEN_CENTER.UPDATE_STATUS_KITCHEN_CENTER(idParams?.kitchenCenterId ? idParams?.kitchenCenterId : 0),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: optionParams ? optionParams : {},
        navigate,
      };
      await thunkAPI.dispatch(getAllKitchenCenters(paramsCallback));
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

export const deleteKitchenCenterThunk = async (params: Params<KitchenCenter>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_KITCHEN_CENTER.DELETE_KITCHEN_CENTER(idParams?.kitchenCenterId ? idParams?.kitchenCenterId : 0)
    );
    if (response) {
      if (pathname && pathname === PATH_ADMIN_APP.kitchenCenter.list) {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllKitchenCenters(paramsCallback));
      } else {
        navigate(PATH_ADMIN_APP.kitchenCenter.list);
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
