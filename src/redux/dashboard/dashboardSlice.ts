import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AdminDashboard, BrandDashboard, CashierDashboard, KitchenCenterDashboard } from 'common/models';
import {
  getDashboardAdminThunk,
  getDashboardBrandThunk,
  getDashboardCashierThunk,
  getDashboardKitchenCenterThunk,
} from './dashboardThunk';

interface DashboardState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  adminDashboard: AdminDashboard | null;
  kitchenCenterDashboard: KitchenCenterDashboard | null;
  brandDashboard: BrandDashboard | null;
  cashierDashboard: CashierDashboard | null;
}

const initialState: DashboardState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  adminDashboard: null,
  kitchenCenterDashboard: null,
  brandDashboard: null,
  cashierDashboard: null,
};

export const getDashboardAdmin = createAsyncThunk('dashboard/get-dashboard-admin', getDashboardAdminThunk);
export const getDashboardKitchenCenter = createAsyncThunk(
  'dashboard/get-dashboard-kitchen-center',
  getDashboardKitchenCenterThunk
);
export const getDashboardBrand = createAsyncThunk('dashboard/get-dashboard-brand', getDashboardBrandThunk);
export const getDashboardCashier = createAsyncThunk('dashboard/get-dashboard-cashier', getDashboardCashierThunk);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setBrandDashboard: (state) => {
      state.brandDashboard = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDashboardAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.adminDashboard = action.payload;
      })
      .addCase(getDashboardAdmin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getDashboardKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardKitchenCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.kitchenCenterDashboard = action.payload;
      })
      .addCase(getDashboardKitchenCenter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getDashboardBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandDashboard = action.payload;
      })
      .addCase(getDashboardBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getDashboardCashier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardCashier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cashierDashboard = action.payload;
      })
      .addCase(getDashboardCashier.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setBrandDashboard } = dashboardSlice.actions;
const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;
