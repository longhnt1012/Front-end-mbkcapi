import { axiosClient } from 'axiosClient/axiosClient';
import { ListParams } from 'common/@types';
import { AdminDashboard, BrandDashboard, CashierDashboard, KitchenCenterDashboard } from 'common/models';
import { ROUTES_API_DASHBOARD } from 'constants/routesApiKeys';
import { NavigateFunction } from 'react-router-dom';
import { setMessageError } from 'redux/auth/authSlice';
import { getErrorMessage, handleResponseMessage } from 'utils';

export const getDashboardAdminThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  try {
    const response: AdminDashboard = await axiosClient.get(ROUTES_API_DASHBOARD.GET_DASHBOARD_ADMIN);
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getDashboardKitchenCenterThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  try {
    const response: KitchenCenterDashboard = await axiosClient.get(ROUTES_API_DASHBOARD.GET_DASHBOARD_KITCHEN_CENTER);
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getDashboardBrandThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: BrandDashboard = await axiosClient.get(ROUTES_API_DASHBOARD.GET_DASHBOARD_BRAND(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getDashboardCashierThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: CashierDashboard = await axiosClient.get(ROUTES_API_DASHBOARD.GET_DASHBOARD_CASHIER(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};
