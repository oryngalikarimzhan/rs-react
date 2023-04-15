import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../store';
import { searchHistoryActions } from '../searchbar/searchHistorySlice';
import { searchValueActions } from '../searchbar/searchValueSlice';
import { usersActions } from '../users/usersSlice';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const actions = {
  ...searchHistoryActions,
  ...searchValueActions,
  ...usersActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
