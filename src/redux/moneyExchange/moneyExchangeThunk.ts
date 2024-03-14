import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { MoneyExchange, PaymentForStoresToCreate } from 'common/models';
import { ROUTES_API_MONEY_EXCHANGES } from 'constants/routesApiKeys';
import { NavigateFunction } from 'react-router-dom';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { getCashierReportShift } from 'redux/cashier/cashierSlice';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllMoneyExchangeWithdraw } from './moneyExchangeSlice';

export const getAllMoneyExchangeThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;
  try {
    const response: ListResponse<MoneyExchange> = await axiosClient.get(
      ROUTES_API_MONEY_EXCHANGES.GET_ALL_MONEY_EXCHANGES(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllMoneyExchangeWithdrawThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<MoneyExchange> = await axiosClient.get(
      ROUTES_API_MONEY_EXCHANGES.GET_ALL_MONEY_EXCHANGES_WITHDRAW(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createPaymentForStoreThunk = async (params: Params<PaymentForStoresToCreate>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(
      ROUTES_API_MONEY_EXCHANGES.CREATE_PAYMENT_FOR_STORES,
      formData
    );
    if (response) {
      const paramsCallback = {
        optionParams: optionParams ? optionParams : {},
        navigate,
      };
      await thunkAPI.dispatch(getAllMoneyExchangeWithdraw(paramsCallback));
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

export const sendMoneyToKitchenCenterThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  try {
    const response: MessageResponse = await axiosClient.put(ROUTES_API_MONEY_EXCHANGES.SEND_MONEY_TO_KITCHEN_CENTER);
    if (response) {
      await thunkAPI.dispatch(getCashierReportShift(navigate));
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
