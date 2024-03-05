/* eslint-disable import/prefer-default-export */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from "axios";

export type FetchSlicer = {
  searchId: string;
  loading: boolean;
  error: string | null;
};

const initialState: FetchSlicer = {
  searchId: '',
  loading: false,
  error: null,
};

export const fetchSearchId = createAsyncThunk<string, undefined>(
  'fetch/id',
  (_, { rejectWithValue }) =>
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data.searchId)
      .catch((error) => rejectWithValue(`My custom error, error message: ${error.message}`))
);

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export default fetchSlice;
