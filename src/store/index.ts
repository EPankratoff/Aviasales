/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './filterSlice';
import fetchSlice from './fetchSlice';
import ticketListSlice from './ticketListSlice';

const store = configureStore({
  reducer: {
    filterReducer: filterSlice.reducer,
    fetchReducer: fetchSlice.reducer,
    ticketListReducer: ticketListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
