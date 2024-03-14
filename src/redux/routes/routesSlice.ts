import { createSlice } from '@reduxjs/toolkit';
import { StorageKeys } from 'constants/storageKeys';
import { getPathname, setLocalStorage } from 'utils';

interface RoutesState {
  pathnameToBack: string;
}

const getPathnameInStorage = getPathname(StorageKeys.PATH_TO_BACK) ? getPathname(StorageKeys.PATH_TO_BACK) : '';

const initialState: RoutesState = {
  pathnameToBack: getPathnameInStorage,
};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutesToBack: (state, action) => {
      state.pathnameToBack = action.payload;
      setLocalStorage(StorageKeys.PATH_TO_BACK, action.payload);
    },
  },
  extraReducers(builder) {},
});

export const { setRoutesToBack } = routesSlice.actions;
const routesReducer = routesSlice.reducer;

export default routesReducer;
