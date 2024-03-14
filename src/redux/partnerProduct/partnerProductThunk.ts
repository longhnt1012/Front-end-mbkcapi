import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { axiosClient } from 'axiosClient/axiosClient';
import { ROUTES_API_PARTNER_PRODUCTS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { getErrorMessage, handleResponseMessage } from 'utils';
import { getAllPartnerProducts, getPartnerProductDetail } from './partnerProductSlice';
import { PartnerProduct, PartnerProductToCreate, PartnerProductToUpdate, ToUpdateStatus } from 'common/models';

export const getAllPartnerProductsThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<PartnerProduct> = await axiosClient.get(
      ROUTES_API_PARTNER_PRODUCTS.GET_ALL_PARTNER_PRODUCT(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getPartnerProductDetailThunk = async (params: any, thunkAPI: any) => {
  const { productId, partnerId, storeId, pathname, navigate } = params;

  try {
    const response: PartnerProduct = await axiosClient.get(
      ROUTES_API_PARTNER_PRODUCTS.GET_PARTNER_PRODUCT_DETAIL(productId, partnerId, storeId)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (pathname === PATH_BRAND_APP.partnerProduct.list) {
      console.log('pathname', pathname);
      if (errorResponse?.statusCode === 404 || errorResponse?.statusCode === 400) {
        navigate(PATH_BRAND_APP.partnerProduct.list);
      }
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewPartnerProductThunk = async (params: Params<PartnerProductToCreate>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params;
  try {
    const response: MessageResponse = await axiosClient.post(ROUTES_API_PARTNER_PRODUCTS.CREATE_PARTNER_PRODUCT, data);
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: optionParams ? optionParams : {},
        navigate,
      };
      thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
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

export const updatePartnerProductThunk = async (params: Params<PartnerProductToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_PARTNER_PRODUCTS.UPDATE_PARTNER_PRODUCT(
        idParams?.productId as number,
        idParams?.partnerId as number,
        idParams?.storeId as number
      ),
      data
    );
    if (response) {
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        await thunkAPI.dispatch(
          getPartnerProductDetail({
            productId: idParams?.productId,
            partnerId: idParams?.partnerId,
            storeId: idParams?.storeId,
            navigate,
          })
        );
      } else {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
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

export const updateStatusPartnerProductThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_PARTNER_PRODUCTS.UPDATE_PARTNER_PRODUCT_STATUS(
        idParams?.productId ? idParams?.productId : 0,
        idParams?.partnerId ? idParams?.partnerId : 0,
        idParams?.storeId ? idParams?.storeId : 0
      ),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: optionParams ? optionParams : {},
        navigate,
      };
      await thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
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

export const deletePartnerProductThunk = async (params: Params<PartnerProduct>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_PARTNER_PRODUCTS.DELETE_PARTNER_PRODUCT(
        idParams?.productId ? idParams?.productId : 0,
        idParams?.partnerId ? idParams?.partnerId : 0,
        idParams?.storeId ? idParams?.storeId : 0
      )
    );
    if (response) {
      if (pathname === PATH_BRAND_APP.partnerProduct.list) {
        const paramsCallback: ListParams = {
          optionParams: optionParams ? optionParams : {},
          navigate,
        };
        await thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
      } else {
        navigate(PATH_BRAND_APP.partnerProduct.list);
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
