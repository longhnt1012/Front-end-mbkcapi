import { axiosClient } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import {
  StorePartner,
  StorePartnerDetail,
  StorePartnerToCreateAPI,
  StorePartnerToUpdateApi,
  ToUpdateStatus,
} from 'common/models';
import { ROUTES_API_STORE_PARTNERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { getErrorMessage, handleResponseMessage } from 'utils';
import { getAllStorePartners, getAllStorePartnersByStoreId } from './storePartnerSlice';

export const getAllStorePartnersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<StorePartnerDetail> = await axiosClient.get(
      ROUTES_API_STORE_PARTNERS.GET_ALL_STORE_PARTNER(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllStorePartnersByStoreIdThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, pathname, navigate } = params;

  try {
    const response: ListResponse<StorePartner> = await axiosClient.get(
      ROUTES_API_STORE_PARTNERS.GET_ALL_STORE_PARTNER_BY_STORE_ID(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (pathname === PATH_BRAND_APP.storePartner.list) {
      if (errorResponse?.statusCode === 404 || errorResponse?.statusCode === 400) {
        navigate(PATH_BRAND_APP.storePartner.list);
      }
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewStorePartnerThunk = async (params: Params<StorePartnerToCreateAPI>, thunkAPI: any) => {
  const { data, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.post(ROUTES_API_STORE_PARTNERS.CREATE_STORE_PARTNER, data);
    if (response) {
      navigate(PATH_BRAND_APP.storePartner.list);
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

export const updateStorePartnerThunk = async (
  params: Params<Omit<StorePartnerToUpdateApi, 'status'>>,
  thunkAPI: any
) => {
  const { data, idParams, navigate, pathname, optionParams } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_STORE_PARTNERS.UPDATE_STORE_PARTNER(
        idParams?.storeId ? idParams?.storeId : 0,
        idParams?.partnerId ? idParams.partnerId : 0
      ),
      data
    );
    if (response) {
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        const paramsCallback: ListParams = {
          optionParams: {
            idStore: idParams?.storeId ? idParams?.storeId : 0,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllStorePartnersByStoreId(paramsCallback));
      } else {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllStorePartners(paramsCallback));
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

export const updateStatusStorePartnerThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, navigate, pathname } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_STORE_PARTNERS.UPDATE_STORE_PARTNER_STATUS(
        idParams?.storeId ? idParams?.storeId : 0,
        idParams?.partnerId ? idParams.partnerId : 0
      ),
      data
    );
    if (response) {
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        const paramsCallback: ListParams = {
          optionParams: {
            idStore: idParams?.storeId ? idParams?.storeId : 0,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllStorePartnersByStoreId(paramsCallback));
      } else {
        await thunkAPI.dispatch(
          getAllStorePartners({
            optionParams: {
              itemsPerPage: 5,
              currentPage: 1,
            },
            navigate,
          })
        );
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

export const deleteStorePartnerThunk = async (params: Params<StorePartner>, thunkAPI: any) => {
  const { idParams, navigate, pathname } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_STORE_PARTNERS.DELETE_STORE_PARTNER(
        idParams?.storeId ? idParams?.storeId : 0,
        idParams?.partnerId ? idParams.partnerId : 0
      )
    );
    if (response) {
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        const paramsCallback: ListParams = {
          optionParams: {
            idStore: idParams?.storeId ? idParams?.storeId : 0,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllStorePartnersByStoreId(paramsCallback));
      } else {
        await thunkAPI.dispatch(
          getAllStorePartners({
            optionParams: {
              itemsPerPage: 5,
              currentPage: 1,
            },
            navigate,
          })
        );
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
