import { searchHistoryActions } from './searchbar/searchHistorySlice';
import { searchValueActions } from './searchbar/searchValueSlice';
import { usersActions } from './users/usersSlice';

export const actions = {
  ...searchHistoryActions,
  ...searchValueActions,
  ...usersActions,
};
