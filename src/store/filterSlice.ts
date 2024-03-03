/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

export type FilterSlice = {
  all: boolean;
  one: boolean;
  two: boolean;
  tree: boolean;
  without: boolean;
};
const initialState: FilterSlice = {
  all: true,
  one: true,
  two: true,
  tree: true,
  without: true,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    all: (state) => {
      state.all = !state.all;
      state.one = state.all;
      state.two = state.all;
      state.tree = state.all;
      state.without = state.all;
    },
    one: (state) => {
      state.one = !state.one;
      state.all = state.one && state.two && state.tree && state.without;
    },
    two: (state) => {
      state.two = !state.two;
      state.all = state.one && state.two && state.tree && state.without;
    },
    tree: (state) => {
      state.tree = !state.tree;
      state.all = state.one && state.two && state.tree && state.without;
    },
    without: (state) => {
      state.without = !state.without;
      state.all = state.one && state.two && state.tree && state.without;
    },
  },
});

export const { all, one, two, tree, without } = filterSlice.actions;
export default filterSlice;
