import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchHistoryState = {
  list: string[];
};

const initialState: SearchHistoryState = {
  list: [],
};

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<{ searchValue: string }>) {
      const { searchValue } = action.payload;
      if (!state.list.includes(searchValue) && searchValue) {
        state.list.push(searchValue);
      }
    },

    deleteFromHistory(state, action: PayloadAction<{ searchValue: string }>) {
      const newHistory = state.list.filter((text) => text !== action.payload.searchValue);
      state.list = newHistory;
    },
  },
});

export const searchHistoryReducer = searchHistorySlice.reducer;
export const searchHistoryActions = searchHistorySlice.actions;
