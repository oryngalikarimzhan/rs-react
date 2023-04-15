import { CardModel } from 'models';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieCutted extends CardModel {
  Жанры: string;
  'Дата релиза': string;
  'Средняя оценка зрителей': string;
  Описание: string;
}
