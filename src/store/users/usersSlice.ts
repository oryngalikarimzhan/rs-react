import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'models';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [] as User[],
  },
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload);
    },
  },
});

export const usersActions = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
