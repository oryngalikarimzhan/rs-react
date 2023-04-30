export interface Genre {
  id: number;
  name: string;
}

export interface TheMovieDbApiGenresResponse {
  genres: Genre[];
}
