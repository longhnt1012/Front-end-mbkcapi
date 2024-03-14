import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { Role } from 'common/enums';
import { CompletedOrderParams, Order, UserAuth } from 'common/models';
import { ROUTES_API_ORDERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { appendData, getErrorMessage, getUserAuth, handleResponseMessage } from 'utils';
import { getOrderDetail } from './orderSlice';

export const getAllOrdersThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<Order> = await axiosClient.get(ROUTES_API_ORDERS.GET_ALL_ORDERS(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};
export const getOrderDetailThunk = async (params: any, thunkAPI: any) => {
  const { orderId, navigate } = params;
  try {
    const response: Order = await axiosClient.get(ROUTES_API_ORDERS.GET_ORDER_DETAIL(orderId));
    return response;
  } catch (error: any) {
    const getUserInStorage: UserAuth = getUserAuth();
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404 || errorResponse?.statusCode === 400) {
      navigate(
        getUserInStorage.roleName === Role.KITCHEN_CENTER_MANAGER
          ? PATH_KITCHEN_CENTER_APP.order.list
          : PATH_CASHIER_APP.order.list
      );
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const confirmOrderToCompletedThunk = async (params: Params<CompletedOrderParams>, thunkAPI: any) => {
  const { data, idParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(ROUTES_API_ORDERS.CONFIRM_ORDER_TO_COMPLETED, formData);
    if (response) {
      await thunkAPI.dispatch(getOrderDetail({ orderId: idParams?.orderId }));
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

export const changeOrderToReadyDeliveryThunk = async (params: any, thunkAPI: any) => {
  const { orderId, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_ORDERS.CHANGE_ORDER_TO_READY_DELIVERY(orderId ? orderId : 0)
    );
    if (response) {
      await thunkAPI.dispatch(getOrderDetail({ orderId }));
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
