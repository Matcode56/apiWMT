import { QueryResult } from 'pg'
import { createPatchRequest } from '../../common/utils/createPatchRequest'
import { getPool } from '../../config/db'
import { CreateMovieDTO } from '../DTO/createMovieDTO'
import { Movie } from '../models/movie'

require('dotenv').config()

class MoviesDao {
  users: User[] = []
  poolPostgres = getPool()

  async addMovie(movie: CreateMovieDTO): Promise<boolean> {
    const request =
      'INSERT INTO movie (title, tmdb_posterpath, overview, vote_count, vote_average) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const values = [movie.title, movie.tmdb_posterpath, movie.overview, movie.vote_count, movie.vote_average]

    try {
      await this.poolPostgres.query(request, values)
      return true
    } catch (err) {
      console.log(err)

      throw new Error()
    }
  }

  async getNumberMovie(): Promise<number> {
    const request = 'SELECT count(*) FROM movie'
    try {
      const queryResult: QueryResult = await this.poolPostgres.query(request)
      const numberUsers: number = Number(queryResult.rows[0].count)
      return numberUsers
    } catch (err) {
      throw new Error()
    }
  }

  async getMovies(size: number, offset: number): Promise<QueryResult> {
    const request = 'SELECT * FROM movie ORDER BY id LIMIT $1 OFFSET $2'
    const values = [size, offset]
    try {
      const responseDB: QueryResult = await this.poolPostgres.query(request, values)
      return responseDB
    } catch (err) {
      throw new Error()
    }
  }

  async getMovieById(movieId: number): Promise<Movie> {
    const request = 'SELECT * FROM movie WHERE id=$1'
    const value = [movieId]
    try {
      const responseDB: QueryResult = await this.poolPostgres.query(request, value)
      const movie: Movie = responseDB.rows[0]
      return movie
    } catch (err) {
      throw new Error('unfound')
    }
  }

  async patchMovieById(movieId: number, movie: Partial<Movie>): Promise<boolean> {
    const request = createPatchRequest('movie', movie, movieId)

    try {
      await this.poolPostgres.query(request)

      return true
    } catch (err) {
      throw new Error(err)
    }
  }

  async removeMovieById(movieId: number): Promise<boolean> {
    const query = 'DELETE FROM movie WHERE id=$1'
    const value = [movieId]
    try {
      await this.poolPostgres.query(query, value)
      return true
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new MoviesDao()
