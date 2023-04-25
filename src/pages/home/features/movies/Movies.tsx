/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import CSS from 'csstype';

import styles from './Movies.module.scss';
import { ViewButtons } from './components/ViewButtons';

import { Wrapper, Catalog } from 'components/ui';
import { SearchBar } from 'components/shared';
import { View } from 'utils/types';
import { transformRowMovies } from 'utils/helpers';
import {
  useActions,
  useAppSelector,
  useGetMovieGenresQuery,
  useGetPopularMoviesQuery,
  useLazySearchMoviesQuery,
} from 'store';

const wrapperStyle: CSS.Properties = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

const { moviesContainer, searchContainer } = styles;

const Movies: React.FC = () => {
  const { changeMovieList } = useActions();

  const { data: genres } = useGetMovieGenresQuery();

  const isAvailable = useMemo(() => !!genres, [genres]);

  const searchValue = useAppSelector((state) => state.searchValue.value);
  const hasSearchValue = useMemo(() => searchValue.length > 0, [searchValue]);

  const { data: popularMoviesData } = useGetPopularMoviesQuery(undefined, {
    skip: hasSearchValue && !isAvailable,
  });

  const [view, setView] = useState<View>('grid');
  const [searchedMovie, setSearchedMovie] = useState('');
  const moviesList = useAppSelector((state) => state.movies.list);

  const [searchMovie, { data: moviesData, originalArgs, isFetching, isError, error }] =
    useLazySearchMoviesQuery();

  useEffect(() => {
    isAvailable && onSearch();
  }, [isAvailable]);

  useEffect(() => {
    if (!hasSearchValue && popularMoviesData && genres) {
      changeMovieList(transformRowMovies(popularMoviesData, genres));
    } else if (moviesData && genres) {
      changeMovieList(transformRowMovies(moviesData, genres));
    }
  }, [moviesData, popularMoviesData]);

  const onSearch = () => {
    if (hasSearchValue && searchedMovie !== searchValue) {
      if (originalArgs === searchValue && moviesData && genres) {
        changeMovieList(transformRowMovies(moviesData, genres));
      } else {
        searchMovie(searchValue);
      }

      setSearchedMovie(searchValue);
    } else if (!hasSearchValue && popularMoviesData && genres) {
      changeMovieList(transformRowMovies(popularMoviesData, genres));
      setSearchedMovie('');
    }
  };

  return (
    <article className={moviesContainer}>
      <section className={searchContainer}>
        <Wrapper style={wrapperStyle}>
          <ViewButtons {...{ view, setView }} />

          <SearchBar
            {...{ onSearch, isAvailable }}
            isLoading={isFetching}
            errorMessage={isError && 'data' in error! && JSON.stringify(error.data)}
          />
        </Wrapper>
      </section>
      <Wrapper>
        <Catalog items={moviesList} view={view} />
      </Wrapper>
    </article>
  );
};

export default Movies;
