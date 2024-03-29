import { createSlice, createAsyncThunk, Action, PayloadAction } from '@reduxjs/toolkit';

import { TicketData } from '../component/TicketList/Ticket/Ticket';

type Tickets = TicketData[];
type SortValue = 'cheap' | 'fast' | 'optimal';

export type FetchSlicer = {
  searchId: string;
  loading: boolean;
  error: string | null;
  stop: boolean;
  tickets: Tickets;
  sortValue: SortValue;
};

const initialState: FetchSlicer = {
  searchId: '',
  loading: false,
  error: null,
  stop: false,
  tickets: [],
  sortValue: 'cheap',
};

export const fetchSearchId = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'fetch/fetchSearchId',
  (_, { rejectWithValue }) =>
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((response) => {
        if (response.status !== 200) {
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
  if (response.status !== 200) {
    return rejectWithValue(`Server Error add tickets ${response.status}`);
  }
  const data = response.json();
  return data;
});

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

function sortCheap<T extends TicketData>(newArray: T[]): T[] {
  return newArray.sort((a: T, b: T) => a.price - b.price);
}

function sortFast<T extends TicketData>(newArray: T[]): T[] {
  return newArray.sort(
    (a: T, b: T) =>
      a.segments[0].duration +
      a.segments[1].duration -
      (b.segments[0].duration + b.segments[1].duration)
  );
}

function sortOptimal<T extends TicketData>(rawArray: T[]): T[] {
  return rawArray.sort((a: T, b: T) => {
    if (a.price !== b.price) {
      return a.price - b.price;
    }
    return (
      a.segments[0].duration +
      a.segments[1].duration -
      (b.segments[0].duration + b.segments[1].duration)
    );
  });
}
type SortParams = {
  sortValue: SortValue;
  ticket: TicketData[];
};

export const asyncSort = createAsyncThunk<TicketData[], SortParams>(
  'fetch/sort',
  async (params) => {
    if (params.sortValue === 'cheap') {
      const result = await new Promise<TicketData[]>((resolve) => {
        setTimeout(() => {
          resolve(sortCheap([...params.ticket]));
        });
      });
      return result;
    }
    if (params.sortValue === 'fast') {
      const result = await new Promise<TicketData[]>((resolve) => {
        setTimeout(() => {
          resolve(sortFast([...params.ticket]));
        });
      });
      return result;
    }
    const result = await new Promise<TicketData[]>((resolve) => {
      setTimeout(() => {
        resolve(sortOptimal([...params.ticket]));
      });
    });
    return result;
  }
);

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    cheap: (state, action) => {
      if (action.payload !== 'cheap') {
        state.loading = true;
        state.sortValue = 'cheap';
      }
    },
    fast: (state, action) => {
      if (action.payload !== 'fast') {
        state.loading = true;
        state.sortValue = 'fast';
      }
    },
    optimal: (state, action) => {
      if (action.payload !== 'optimal') {
        state.loading = true;
        state.sortValue = 'optimal';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSort.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncSort.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.loading = false;
      })
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
        if (state.sortValue === 'cheap') {
          state.tickets = sortCheap(state.tickets);
        } else if (state.sortValue === 'fast') {
          state.tickets = sortFast(state.tickets);
        } else {
          state.tickets = sortOptimal(state.tickets);
        }
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { fast, cheap, optimal } = fetchSlice.actions;

export default fetchSlice;
