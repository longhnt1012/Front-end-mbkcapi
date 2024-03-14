import { axiosClient } from 'axiosClient/axiosClient';
import { MessageResponse, Params } from 'common/@types';
import { Configuration } from 'common/models';
import { ROUTES_API_CONFIGURATION } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { getErrorMessage, handleResponseMessage } from 'utils';
import { getSystemConfiguration } from './configurationsSlice';

export const getSystemConfigurationThunk = async (params: any, thunkAPI: any) => {
  const { navigate } = params;

  try {
    const response: Configuration = await axiosClient.get(ROUTES_API_CONFIGURATION.GET_CONFIGURATION);
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateSystemConfigurationThunk = async (params: Params<Omit<Configuration, 'id'>>, thunkAPI: any) => {
  const { data, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(ROUTES_API_CONFIGURATION.UPDATE_CONFIGURATION, data);
    if (response) {
      thunkAPI.dispatch(getSystemConfiguration(navigate));
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
