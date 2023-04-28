import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { Response } from 'express';
import serialize from 'serialize-javascript';

import App from './App';
import { routes } from 'utils/constants';
import { createStore, theMovieDbApi, movieActions, type Store } from 'store';
import { Genre, Movie } from 'models';
import { transformRowMovies } from 'utils/helpers';

const apiRequest = async (store: Store) => {
  store.dispatch(theMovieDbApi.endpoints.getPopularMovies.initiate());
  store.dispatch(theMovieDbApi.endpoints.getMovieGenres.initiate());

  return await Promise.all(store.dispatch(theMovieDbApi.util.getRunningQueriesThunk()));
};

export async function serverSideRenderer(
  url: string | Partial<Location>,
  template: string,
  res: Response
) {
  const store = createStore();

  const activePath = routes.find((route) => route.path === url)?.path || '/*';

  if (url === '/') {
    await apiRequest(store);

    const apiQueries = store.getState()['themoviedb/api'].queries;

    const movies = apiQueries['getPopularMovies(undefined)']?.data as Movie[];
    const genres = apiQueries['getMovieGenres(undefined)']?.data as Genre[];

    store.dispatch(movieActions.changeMovieList(transformRowMovies(movies, genres)));
  }

  const preloadedState = { ...store.getState() };

  const html = template.replace(
    `<!--app-state-->`,
    `<script>window.__PRELOADED_STATE__ = ${serialize(preloadedState)}</script>`
  );

  const placeholder = '<!--app-html-->';

  const head = html.slice(0, html.lastIndexOf(placeholder));
  const tail = html.slice(html.lastIndexOf(placeholder) + placeholder.length);

  const appJSX = (
    <Provider store={store}>
      <StaticRouter location={activePath}>
        <App />
      </StaticRouter>
    </Provider>
  );

  res.setHeader('content-type', 'text/html');
  res.write(head);

  const statusCode = activePath === '/*' ? 404 : 200;
  let didError = false;

  const stream = renderToPipeableStream(appJSX, {
    onShellReady() {
      res.statusCode = didError ? 500 : statusCode;
      stream.pipe(res);
    },
    onAllReady() {
      res.end(tail);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  });
}
