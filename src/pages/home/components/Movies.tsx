import React, { useEffect, useState } from 'react';
import CSS from 'csstype';

import { moviesContainer, searchContainer, views, listView, gridView } from './Movies.module.scss';

import { Movie, MovieCutted, Genre } from 'models/index';
import { Wrapper, Catalog, ButtonRegular } from 'components/ui/index';
import { SearchBar } from 'components/shared/index';
import { POPULAR_MOVIES_URL, SEARCH_MOVIE_URL, IMAGE_HOST_URL, GENRES_LIST_URL } from 'utils/index';

const wrapperStyle: CSS.Properties = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

function Movies() {
  const [movies, setMovies] = useState<MovieCutted[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [genres, setGenres] = useState<Genre[]>([]);

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
        ? data.map(
            ({ genre_ids, title, release_date, poster_path, vote_average }) =>
              ({
                name: title,
                image: IMAGE_HOST_URL + poster_path,
                genres: genre_ids.map((i) => genres.find(({ id }) => id === i)?.name).join(', '),
                releaseDate: release_date,
                voteAvarege: vote_average,
              } as unknown as MovieCutted)
          )
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

const viewButtonStyle = { padding: '0 3px' };
const activeViewButtonStyle: CSS.Properties = { ...viewButtonStyle, borderColor: 'lightcyan' };

function ViewButtons({
  view,
  setView,
}: {
  view: 'grid' | 'list';
  setView: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
}) {
  return (
    <div className={views}>
      <ButtonRegular
        styles={view === 'list' ? activeViewButtonStyle : viewButtonStyle}
        onClick={() => setView('list')}
      >
        <div className={listView}></div>
      </ButtonRegular>
      <ButtonRegular
        styles={view === 'grid' ? activeViewButtonStyle : viewButtonStyle}
        onClick={() => setView('grid')}
      >
        <div className={gridView}></div>
      </ButtonRegular>
    </div>
  );
}

export default Movies;
