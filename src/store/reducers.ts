import { combineReducers } from '@reduxjs/toolkit';

import { searchValueReducer } from './searchbar/searchValueSlice';
import { searchHistoryReducer } from './searchbar/searchHistorySlice';
import { usersReducer } from './users/usersSlice';
import { theMovieDbApi } from './themoviedb-api/apiQueries';

export const rootReducer = combineReducers({
  [theMovieDbApi.reducerPath]: theMovieDbApi.reducer,
  searchValue: searchValueReducer,
  searchHistory: searchHistoryReducer,
  users: usersReducer,
});
