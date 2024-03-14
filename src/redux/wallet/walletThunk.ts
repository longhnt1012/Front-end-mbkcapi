import { axiosClient } from 'axiosClient/axiosClient';
import { ListParams } from 'common/@types';
import { Wallet } from 'common/models';
import { ROUTES_API_WALLET } from 'constants/routesApiKeys';
import { setMessageError } from 'redux/auth/authSlice';
import { getErrorMessage, handleResponseMessage } from 'utils';

export const getWalletInformationThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: Wallet = await axiosClient.get(ROUTES_API_WALLET.GET_WALLET_INFORMATION(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage ? errorMessage?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};
