import React, { useEffect, useState } from 'react';
import CSS from 'csstype';

import { moviesContainer, searchContainer, views, listView, gridView } from './Movies.module.scss';

import { Movie, MovieCutted, Genre } from 'models';
import { Wrapper, Catalog, ButtonRounded } from 'components/ui';
import { SearchBar } from 'components/shared';
import {
  POPULAR_MOVIES_URL,
  SEARCH_MOVIE_URL,
  IMAGE_HOST_URL,
  GENRES_LIST_URL,
} from 'utils/constants';
import { View } from 'utils/types';

const wrapperStyle: CSS.Properties = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

function Movies() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<MovieCutted[]>([]);
  const [view, setView] = useState<View>('grid');

  useEffect(() => {
    fetch(GENRES_LIST_URL)
      .then((response) => response.json())
      .then((data) => data.genres)
      .then((genresResult) => {
        setGenres(genresResult);
      });
  }, []);

  const onSearch = (data: Movie[]) => {
    const movies =
      genres && genres.length > 0
        ? data.map(({ genre_ids, title, release_date, poster_path, vote_average, overview }) => ({
            name: title,
            image: poster_path !== null ? IMAGE_HOST_URL + poster_path : '',
            Жанры: genre_ids.map((i) => genres.find(({ id }) => id === i)?.name).join(', '),
            'Дата релиза': release_date,
            'Средняя оценка зрителей': vote_average + ' из 10',
            Описание: overview || 'Отсутствует',
          }))
        : [];
    setMovies(movies);
  };

  return (
    <article className={moviesContainer}>
      <section className={searchContainer}>
        <Wrapper style={wrapperStyle}>
          <ViewButtons {...{ view, setView }} />

          <SearchBar
            {...{
              onSearch,
              isReady: genres.length !== 0,
              fetchResultField: 'results',
              searchUrl: SEARCH_MOVIE_URL,
              defaultUrl: POPULAR_MOVIES_URL,
            }}
          />
        </Wrapper>
      </section>
      <Wrapper>
        <Catalog items={movies} view={view} />
      </Wrapper>
    </article>
  );
}

function ViewButtons({
  view,
  setView,
}: {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}) {
  return (
    <div className={views}>
      <ButtonRounded isActive={view === 'list'} onClick={() => setView('list')}>
        <div className={listView} />
      </ButtonRounded>
      <ButtonRounded isActive={view === 'grid'} onClick={() => setView('grid')}>
        <div className={gridView} />
      </ButtonRounded>
    </div>
  );
}

export default Movies;
