import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'models';

type UsersState = {
  list: User[];
};

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload);
    },
  },
});

export const usersActions = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
