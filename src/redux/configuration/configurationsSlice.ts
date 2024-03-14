import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Configuration } from 'common/models';
import { getSystemConfigurationThunk, updateSystemConfigurationThunk } from './configurationThunk';

interface ConfigurationState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  configuration: Configuration | null;
}

const initialState: ConfigurationState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  configuration: null,
};

export const getSystemConfiguration = createAsyncThunk(
  'configuration/get-system-configuration',
  getSystemConfigurationThunk
);
export const updateSystemConfiguration = createAsyncThunk(
  'configuration/update-configuration',
  updateSystemConfigurationThunk
);

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setEditConfiguration: (state, action) => {
      state.isEditing = true;
      state.configuration = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSystemConfiguration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSystemConfiguration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.configuration = action.payload;
      })
      .addCase(getSystemConfiguration.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateSystemConfiguration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSystemConfiguration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateSystemConfiguration.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setEditConfiguration } = configurationSlice.actions;
const configurationReducer = configurationSlice.reducer;

export default configurationReducer;
