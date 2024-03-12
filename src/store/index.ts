/* eslint-disable import/no-extraneous-dependencies */
import { Middleware, configureStore } from '@reduxjs/toolkit';

import filterSlice from './filterSlice';
import fetchSlice from './fetchSlice';
import ticketListSlice from './ticketListSlice';

const myLogger: Middleware = (/* store */) => (next) => (action) => {
  const result = next(action);
  return result;
};

const store = configureStore({
  reducer: {
    filterReducer: filterSlice.reducer,
    fetchReducer: fetchSlice.reducer,
    ticketListReducer: ticketListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
