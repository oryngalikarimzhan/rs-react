/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import CSS from 'csstype';

import { moviesContainer, searchContainer } from './Movies.module.scss';
import { ViewButtons } from './components/ViewButtons';

import { Wrapper, Catalog } from 'components/ui';
import { SearchBar } from 'components/shared';
import { View } from 'utils/types';
import {
  IMAGE_HOST_URL,
  useAppSelector,
  useGetMovieGenresQuery,
  useGetPopularMoviesQuery,
  useLazySearchMoviesQuery,
} from 'store';
import { Genre, Movie, MovieCut } from 'models';

const wrapperStyle: CSS.Properties = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

const transformRowMovies = (moviesData: Movie[], genres: Genre[]) => {
  return moviesData.map(
    ({ genre_ids, title, release_date, poster_path, vote_average, overview }: Movie) => ({
      name: title,
      image: poster_path !== null ? IMAGE_HOST_URL + poster_path : '',
      Жанры: genre_ids.map((i) => genres.find(({ id }: Genre) => id === i)?.name).join(', '),
      'Дата релиза': release_date,
      'Средняя оценка зрителей': vote_average !== 0 ? vote_average + ' из 10' : 'Отсутствует',
      Описание: overview || 'Отсутствует',
    })
  );
};

const Movies: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const { data: genresData } = useGetMovieGenresQuery(undefined, { skip: genres.length > 0 });
  const searchValue = useAppSelector((state) => state.searchValue.value);

  const isAvailable = useMemo(() => genres.length > 0, [genres]);
  const hasSearchValue = useMemo(() => searchValue.length > 0, [searchValue]);

  const { data: popularMoviesData } = useGetPopularMoviesQuery(undefined, {
    skip: hasSearchValue && !isAvailable,
  });

  const [view, setView] = useState<View>('grid');
  const [searchedMovie, setSearchedMovie] = useState('');
  const [moviesList, setMoviesList] = useState<MovieCut[]>([]);

  const [searchMovie, { data: moviesData, originalArgs, isFetching, isError, error }] =
    useLazySearchMoviesQuery();

  useEffect(() => {
    genresData && setGenres(genresData);
  }, [genresData]);

  useEffect(() => {
    isAvailable && searchData();
  }, [isAvailable]);

  useEffect(() => {
    if (!hasSearchValue && popularMoviesData) {
      setMoviesList(transformRowMovies(popularMoviesData, genres));
    } else if (moviesData) {
      setMoviesList(transformRowMovies(moviesData, genres));
    }
  }, [moviesData, popularMoviesData]);

  const searchData = () => {
    if (hasSearchValue && searchedMovie !== searchValue) {
      if (originalArgs === searchValue && moviesData) {
        setMoviesList(transformRowMovies(moviesData, genres));
      } else {
        searchMovie(searchValue);
      }

      setSearchedMovie(searchValue);
    } else if (!hasSearchValue && popularMoviesData) {
      setMoviesList(transformRowMovies(popularMoviesData, genres));
      setSearchedMovie('');
    }
  };

  return (
    <article className={moviesContainer}>
      <section className={searchContainer}>
        <Wrapper style={wrapperStyle}>
          <ViewButtons {...{ view, setView }} />

          <SearchBar
            {...{ searchData, isAvailable }}
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
