import { createSlice } from '@reduxjs/toolkit';

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState: { value: [] as string[] },
  reducers: {
    addToHistory(state, action) {
      if (!state.value.includes(action.payload) && action.payload.length) {
        state.value.push(action.payload);
      }
    },

    deleteFromHistory(state, action) {
      const newHistory = state.value.filter((text) => text !== action.payload);
      state.value = newHistory;
    },
  },
});

export const searchHistoryReducer = searchHistorySlice.reducer;
export const searchHistoryActions = searchHistorySlice.actions;
