import { Genre, Movie } from 'models';
import { IMAGE_HOST_URL } from 'store';

export const transformRowMovies = (moviesData: Movie[], genres: Genre[]) => {
  return moviesData?.map(
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
