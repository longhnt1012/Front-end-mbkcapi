import { axiosServiceAddress } from 'axiosClient/axiosClient';
import { ListResponseAddress } from 'common/@types';
import { District, Province, Ward } from 'common/models';
import { ROUTES_API_ADDRESS } from 'constants/routesApiKeys';
import { NavigateFunction } from 'react-router-dom';
import { setMessageError } from 'redux/auth/authSlice';
import { getErrorMessage, handleResponseMessage } from 'utils';

export const getAllProvincesThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  try {
    const response: ListResponseAddress<Province> = await axiosServiceAddress.get(ROUTES_API_ADDRESS.GET_ALL_PROVINCE);
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllDistrictByProvinceIdThunk = async (params: any, thunkAPI: any) => {
  const { provinceId, navigate } = params;

  try {
    const response: ListResponseAddress<District> = await axiosServiceAddress.get(
      ROUTES_API_ADDRESS.GET_ALL_DISTRICT_BY_PROVINCE_ID(provinceId)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllWardByDistrictIdThunk = async (params: any, thunkAPI: any) => {
  const { districtId, navigate } = params;

  try {
    const response: ListResponseAddress<Ward> = await axiosServiceAddress.get(
      ROUTES_API_ADDRESS.GET_ALL_WARD_BY_DISTRICT_ID(districtId)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};
