import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ShipperPayment } from 'common/models';
import { getAllShipperPaymentThunk } from './shipperPaymentThunk';

interface ShipperPaymentState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  shipperPayments: ShipperPayment[];
  shipperPayment: ShipperPayment | null;
  numberItems: number;
}

const initialState: ShipperPaymentState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  shipperPayments: [],
  shipperPayment: null,
  numberItems: 0,
};

export const getAllShipperPayment = createAsyncThunk(
  'shipper-payment/get-all-shipper-payment',
  getAllShipperPaymentThunk
);

const shipperPaymentSlice = createSlice({
  name: 'shipperPayment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getAllShipperPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShipperPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.shipperPayments = [...action.payload?.shipperPayments];
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllShipperPayment.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

const shipperPaymentReducer = shipperPaymentSlice.reducer;

export default shipperPaymentReducer;
