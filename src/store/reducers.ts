import { searchValueReducer } from './searchbar/searchValueSlice';
import { searchHistoryReducer } from './searchbar/searchHistorySlice';
import { usersReducer } from './users/usersSlice';
import { theMovieDbApi } from './themoviedb-api/apiQueries';
import { movieReducer } from './themoviedb-api/movieSlice';

export const rootReducer = {
  [theMovieDbApi.reducerPath]: theMovieDbApi.reducer,
  searchValue: searchValueReducer,
  searchHistory: searchHistoryReducer,
  users: usersReducer,
  movies: movieReducer,
};
