import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Genre, TheMovieDbApiGenresResponse, Movie, TheMovieDbApiMoviesResponse } from 'models';
import {
  BASE_URL,
  MOVIE_SEARCH_ROUTE,
  MOVIE_GENRES_ROUTE,
  SEARCH_QUERY_KEY,
  API_KEY_QUERY_KEY,
  API_KEY_QUERY_VALUE,
  LANGUAGE_QUERY_KEY,
  LANGUAGE_RU_QUERY_VALUE,
  POPULAR_MOVIES_ROUTE,
} from './constants';

export const theMovieDbApi = createApi({
  reducerPath: 'themoviedb/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (build) => ({
    searchMovies: build.query<Movie[], string>({
      query: (searchValue: string) => ({
        url: MOVIE_SEARCH_ROUTE,
        params: {
          [SEARCH_QUERY_KEY]: searchValue,
          [API_KEY_QUERY_KEY]: API_KEY_QUERY_VALUE,
          [LANGUAGE_QUERY_KEY]: LANGUAGE_RU_QUERY_VALUE,
        },
      }),

      transformResponse: (response: TheMovieDbApiMoviesResponse<Movie>) => response.results,
    }),

    getPopularMovies: build.query<Movie[], void>({
      query: () => ({
        url: POPULAR_MOVIES_ROUTE,
        params: {
          [API_KEY_QUERY_KEY]: API_KEY_QUERY_VALUE,
          [LANGUAGE_QUERY_KEY]: LANGUAGE_RU_QUERY_VALUE,
        },
      }),

      transformResponse: (response: TheMovieDbApiMoviesResponse<Movie>) => response.results,
    }),

    getMovieGenres: build.query<Genre[], void>({
      query: () => ({
        url: MOVIE_GENRES_ROUTE,
        params: {
          [API_KEY_QUERY_KEY]: API_KEY_QUERY_VALUE,
          [LANGUAGE_QUERY_KEY]: LANGUAGE_RU_QUERY_VALUE,
        },
      }),

      transformResponse: (response: TheMovieDbApiGenresResponse) => response.genres,
    }),
  }),
});

export const { useLazySearchMoviesQuery, useGetPopularMoviesQuery, useGetMovieGenresQuery } =
  theMovieDbApi;
