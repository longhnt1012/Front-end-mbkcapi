import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { District, Province, Ward } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getNumberInStorage, setLocalStorage } from 'utils';
import { getAllDistrictByProvinceIdThunk, getAllProvincesThunk, getAllWardByDistrictIdThunk } from './addressThunk';

interface AddressState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  KCProvinceId: number;
  KCDistrictId: number;
  KCWardId: number;
  brandProvinceId: number;
  brandDistrictId: number;
  brandWardId: number;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
}

const KCProvinceIdStorage = getNumberInStorage(StorageKeys.KC_PROVINCE_ID);
const KCDistrictIdStorage = getNumberInStorage(StorageKeys.KC_DISTRICT_ID);
const KCWardIdStorage = getNumberInStorage(StorageKeys.KC_WARD_ID);
const brandProvinceIdStorage = getNumberInStorage(StorageKeys.BRAND_PROVINCE_ID);
const brandDistrictIdStorage = getNumberInStorage(StorageKeys.BRAND_DISTRICT_ID);
const brandWardIdStorage = getNumberInStorage(StorageKeys.BRAND_WARD_ID);

const initialState: AddressState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  KCProvinceId: KCProvinceIdStorage ? KCProvinceIdStorage : 0,
  KCDistrictId: KCDistrictIdStorage ? KCDistrictIdStorage : 0,
  KCWardId: KCWardIdStorage ? KCWardIdStorage : 0,
  brandProvinceId: brandProvinceIdStorage ? brandProvinceIdStorage : 0,
  brandDistrictId: brandDistrictIdStorage ? brandDistrictIdStorage : 0,
  brandWardId: brandWardIdStorage ? brandWardIdStorage : 0,
  provinces: [],
  districts: [],
  wards: [],
};

export const getAllProvinces = createAsyncThunk('address/get-all-province', getAllProvincesThunk);
export const getAllDistrictByProvinceId = createAsyncThunk(
  'address/get-all-district-by-province-id',
  getAllDistrictByProvinceIdThunk
);
export const getAllWardByDistrictId = createAsyncThunk(
  'address/get-all-ward-by-district-id',
  getAllWardByDistrictIdThunk
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setKCProvinceId: (state, action) => {
      state.KCProvinceId = action.payload;
      setLocalStorage(StorageKeys.KC_PROVINCE_ID, action.payload);
    },
    setKCDistrictId: (state, action) => {
      state.KCDistrictId = action.payload;
      setLocalStorage(StorageKeys.KC_DISTRICT_ID, action.payload);
    },
    setKCWardId: (state, action) => {
      state.KCWardId = action.payload;
      setLocalStorage(StorageKeys.KC_WARD_ID, action.payload);
    },
    setBrandProvinceId: (state, action) => {
      state.brandProvinceId = action.payload;
      setLocalStorage(StorageKeys.BRAND_PROVINCE_ID, action.payload);
    },
    setBrandDistrictId: (state, action) => {
      state.brandDistrictId = action.payload;
      setLocalStorage(StorageKeys.BRAND_DISTRICT_ID, action.payload);
    },
    setBrandWardId: (state, action) => {
      state.brandWardId = action.payload;
      setLocalStorage(StorageKeys.BRAND_WARD_ID, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllProvinces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProvinces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.provinces = [...action.payload.results];
      })
      .addCase(getAllProvinces.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllDistrictByProvinceId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDistrictByProvinceId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.districts = [...action.payload.results];
      })
      .addCase(getAllDistrictByProvinceId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllWardByDistrictId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWardByDistrictId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wards = [...action.payload.results];
      })
      .addCase(getAllWardByDistrictId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setKCProvinceId, setKCDistrictId, setKCWardId, setBrandProvinceId, setBrandDistrictId, setBrandWardId } =
  addressSlice.actions;
const addressReducer = addressSlice.reducer;

export default addressReducer;
