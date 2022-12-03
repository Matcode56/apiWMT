import { QueryResult } from 'pg'
import { paginatedResults, PaginatedResults } from '../../common/utils/paginatedResults'
import moviesDAO from '../DAO/moviesDAO'
import { CreateMovieDTO } from '../DTO/createMovieDTO'
import { GetMovieDTO } from '../DTO/getMovieDTO'
import { GetMoviesDTO } from '../DTO/getMoviesDTO'
import { PatchMovieDTO } from '../DTO/patchMovieDTO'
import { Movie } from '../models/movie'
import { movieCRUD } from '../types/movieCRUD'

class MoviesService implements movieCRUD {
  async create(resource: CreateMovieDTO): Promise<boolean> {
    return moviesDAO.addMovie(resource)
  }

  async getAll(size: number, page: number): Promise<GetMoviesDTO> {
    const offset: number = size * page
    const numberUsers = await moviesDAO.getNumberMovie()
    const responseDB: QueryResult = await moviesDAO.getMovies(size, offset)
    const pagination: PaginatedResults = paginatedResults(responseDB, offset, numberUsers)
    const movies: Movie[] = responseDB.rows

    const resDTO: GetMoviesDTO = {
      ...pagination,
      movies,
    }

    return resDTO
  }

  async getById(id: number): Promise<GetMovieDTO> {
    const movie: Movie = await moviesDAO.getMovieById(id)
    if (!movie) {
      return undefined
    }

    return movie
  }

  async patchById(movieId: number, resource: PatchMovieDTO) {
    return moviesDAO.patchMovieById(movieId, resource)
  }

  async deleteById(id: number) {
    return moviesDAO.removeMovieById(id)
  }
}

export default new MoviesService()
