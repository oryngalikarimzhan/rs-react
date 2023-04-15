import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchValueState = {
  value: string;
};

const initialState: SearchValueState = {
  value: '',
};

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<{ searchValue: string }>) {
      state.value = action.payload.searchValue;
    },
  },
});

export const searchValueActions = searchValueSlice.actions;

export const searchValueReducer = searchValueSlice.reducer;
