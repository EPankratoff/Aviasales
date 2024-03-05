/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './filterSlice';
import fetchSlice from './fetchSlice';

const store = configureStore({
  reducer: {
    filterReducer: filterSlice.reducer,
    fetchReducer: fetchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
