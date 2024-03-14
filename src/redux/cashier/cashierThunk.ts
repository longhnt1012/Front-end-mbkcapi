import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { Cashier, CashierToCreate, CashierToUpdate, ShiftReport, ToUpdateStatus } from 'common/models';
import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ROUTES_API_CASHIERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllCashiers } from './cashierSlice';
import { NavigateFunction } from 'react-router-dom';

export const getAllCashiersThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<Cashier> = await axiosClient.get(ROUTES_API_CASHIERS.GET_ALL_CASHIERS(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getCashierDetailThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate } = params;

  try {
    const response: Cashier = await axiosClient.get(ROUTES_API_CASHIERS.GET_CASHIER_DETAIL(cashierId));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404 || errorResponse?.statusCode === 400) {
      navigate(PATH_KITCHEN_CENTER_APP.cashier.list);
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewCashierThunk = async (params: Params<CashierToCreate>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_CASHIERS.CREATE_CASHIER, formData);
    if (response) {
      navigate(PATH_KITCHEN_CENTER_APP.cashier.list);
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

export const updateCashierThunk = async (params: Params<CashierToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_CASHIERS.UPDATE_CASHIER(idParams?.cashierId as number),
      formData
    );
    if (response) {
      navigate(pathname !== undefined ? pathname : PATH_KITCHEN_CENTER_APP.cashier.list);
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

export const updateCashierStatusThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_CASHIERS.UPDATE_CASHIER_STATUS(idParams?.cashierId ? idParams?.cashierId : 0),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: optionParams ? optionParams : {},
        navigate,
      };
      await thunkAPI.dispatch(getAllCashiers(paramsCallback));
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

export const deleteCashierThunk = async (params: Params<Cashier>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_CASHIERS.DELETE_CASHIER(idParams?.cashierId ? idParams?.cashierId : 0)
    );
    if (response) {
      if (pathname === PATH_KITCHEN_CENTER_APP.cashier.list) {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllCashiers(paramsCallback));
      } else {
        navigate(PATH_KITCHEN_CENTER_APP.cashier.list);
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

export const getCashierReportShiftThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  try {
    const response: ShiftReport = await axiosClient.get(ROUTES_API_CASHIERS.CASHIER_REPORT_SHIFT);
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    console.log(errorResponse);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};
