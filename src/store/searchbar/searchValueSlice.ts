import { createSlice } from '@reduxjs/toolkit';

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: { value: '' },
  reducers: {
    changeSearchValue(state, action) {
      state.value = action.payload;
    },
  },
});

export const searchValueActions = searchValueSlice.actions;

export const searchValueReducer = searchValueSlice.reducer;
