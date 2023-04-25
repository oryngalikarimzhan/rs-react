import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { theMovieDbApi } from './themoviedb-api/apiQueries';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(theMovieDbApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type Store = typeof store;

export function createStore(preloadedState?: RootState) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(theMovieDbApi.middleware),
    preloadedState,
  });
}
