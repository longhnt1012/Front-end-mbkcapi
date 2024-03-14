import { axiosClient } from 'axiosClient/axiosClient';
import { ListParams, ListResponse } from 'common/@types';
import { ShipperPayment } from 'common/models';
import { ROUTES_API_SHIPPER_PAYMENTS } from 'constants/routesApiKeys';
import { setMessageError } from 'redux/auth/authSlice';
import { getErrorMessage, handleResponseMessage } from 'utils';

export const getAllShipperPaymentThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<ShipperPayment> = await axiosClient.get(
      ROUTES_API_SHIPPER_PAYMENTS.GET_ALL_SHIPPER_PAYMENTS(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};
