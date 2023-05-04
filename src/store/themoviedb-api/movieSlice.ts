import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MovieCut } from 'models';

type MoviesState = {
  list: MovieCut[];
};

const initialState: MoviesState = {
  list: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    changeMovieList: (state, action: PayloadAction<MovieCut[]>) => {
      state.list = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;

export const movieReducer = movieSlice.reducer;
