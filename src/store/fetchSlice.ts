/* eslint-disable import/prefer-default-export */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TicketData } from '../component/TicketList/Ticket/Ticket';
// import axios from "axios";

type Tickets = TicketData[];

export type FetchSlicer = {
  searchId: string;
  loading: boolean;
  error: string | null;
  stop: boolean;
  tickets: Tickets;
  sorting: {
    byPrice: boolean;
    byDuration: boolean;
    byOptimal: boolean;
  };
};

const initialState: FetchSlicer = {
  searchId: '',
  loading: false,
  error: null,
  stop: false,
  tickets: [],
  sorting: {
    byPrice: false,
    byDuration: true,
    byOptimal: false,
  },
};

export const fetchSearchId = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'fetch/fetchSearchId',
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

export const fetchTickets = createAsyncThunk<
  { tickets: Tickets; stop: boolean },
  string,
  { rejectValue: string }
>('fetch/fetchTickets', async (id, { rejectWithValue }) => {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
  if (!response.ok) {
    return rejectWithValue(`Server Error add tickets ${response.status}`);
  }
  const data = response.json();
  return data;
});

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    // byPrice: (state) => { },
    // byDuration: (state, action) => { },
    // byOpimal: (state, action) => { }
  },
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
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets.push(...action.payload.tickets);
        state.stop = action.payload.stop;
        state.loading = false;
        state.error = null;
      });
  },
});

export default fetchSlice;
