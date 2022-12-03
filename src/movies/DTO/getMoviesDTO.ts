import { GetMovieDTO } from './getMovieDTO'

export interface GetMoviesDTO {
  totalElements: number
  nextPage: boolean
  movies: GetMovieDTO[]
}
