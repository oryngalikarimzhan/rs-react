import { searchHistoryActions } from './searchbar/searchHistorySlice';
import { searchValueActions } from './searchbar/searchValueSlice';
import { movieActions } from './themoviedb-api/movieSlice';
import { usersActions } from './users/usersSlice';

export const actions = {
  ...searchHistoryActions,
  ...searchValueActions,
  ...usersActions,
  ...movieActions,
};
