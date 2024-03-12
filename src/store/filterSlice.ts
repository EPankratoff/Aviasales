import { createSlice } from '@reduxjs/toolkit';

export type FilterSlice = {
  all: boolean;
  one: boolean;
  two: boolean;
  tree: boolean;
  without: boolean;
  currentSum: number;
  prevSum: number;
};
const initialState: FilterSlice = {
  all: false,
  one: true,
  two: true,
  tree: false,
  without: true,
  currentSum: 3,
  prevSum: 3,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    all: (state, action) => {
      state.all = !state.all;
      state.one = state.all;
      state.two = state.all;
      state.tree = state.all;
      state.without = state.all;
      state.currentSum = +state.without + +state.one + +state.two + +state.tree;
      state.prevSum = action.payload;
    },
    one: (state, action) => {
      state.one = !state.one;
      state.all = state.one && state.two && state.tree && state.without;
      state.currentSum = +state.without + +state.one + +state.two + +state.tree;
      state.prevSum = action.payload;
    },
    two: (state, action) => {
      state.two = !state.two;
      state.all = state.one && state.two && state.tree && state.without;
      state.currentSum = +state.without + +state.one + +state.two + +state.tree;
      state.prevSum = action.payload;
    },
    tree: (state, action) => {
      state.tree = !state.tree;
      state.all = state.one && state.two && state.tree && state.without;
      state.currentSum = +state.without + +state.one + +state.two + +state.tree;
      state.prevSum = action.payload;
    },
    without: (state, action) => {
      state.without = !state.without;
      state.all = state.one && state.two && state.tree && state.without;
      state.currentSum = +state.without + +state.one + +state.two + +state.tree;
      state.prevSum = action.payload;
    },
  },
});

export const { all, one, two, tree, without } = filterSlice.actions;
export default filterSlice;
