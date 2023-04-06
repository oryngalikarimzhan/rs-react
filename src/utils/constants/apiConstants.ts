const API_KEY_QUERY_KEY = 'api_key';
const API_KEY_QUERY_VALUE = 'bb58133110a66fed3c8da9053678f5b3';
const API_QUERY = `${API_KEY_QUERY_KEY}=${API_KEY_QUERY_VALUE}`;

const HOST_NAME = 'https://api.themoviedb.org/3';

const LANGUAGE_QUERY_KEY = 'language';
const LANGUAGE_RU_QUERY_VALUE = 'ru-RU';
const LANGUAGE_QUERY = `${LANGUAGE_QUERY_KEY}=${LANGUAGE_RU_QUERY_VALUE}`;

const MOVIE_SEARCH_ROUTE = '/search/movie';
const POPULAR_MOVIES_ROUTE = '/movie/popular';

const SEARCH_QUERY_KEY = 'query';

const IMAGE_HOST_URL = 'https://image.tmdb.org/t/p/w500';
const GENRES_LIST_URL = `https://api.themoviedb.org/3/genre/movie/list?${API_QUERY}&${LANGUAGE_QUERY}`;
const SEARCH_MOVIE_URL = `${HOST_NAME}${MOVIE_SEARCH_ROUTE}?${API_QUERY}&${LANGUAGE_QUERY}&${SEARCH_QUERY_KEY}=`;
const POPULAR_MOVIES_URL = `${HOST_NAME}${POPULAR_MOVIES_ROUTE}?${API_QUERY}&${LANGUAGE_QUERY}`;

export { POPULAR_MOVIES_URL, GENRES_LIST_URL, SEARCH_MOVIE_URL, IMAGE_HOST_URL };
