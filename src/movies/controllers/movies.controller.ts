import express from 'express'
import { ResponseSucessUpdateCreate } from '../../common/types/responseSucessUpdateCreate'
import { CreateMovieDTO } from '../DTO/createMovieDTO'
import { GetMovieDTO } from '../DTO/getMovieDTO'
import { GetMoviesDTO } from '../DTO/getMoviesDTO'
import { PatchMovieDTO } from '../DTO/patchMovieDTO'
import movieService from '../services/movie.service'

class MoviesController {
  async getMovies(req: express.Request, res: express.Response): Promise<express.Response<GetMoviesDTO[]>> {
    try {
      const size: number = req.query.size ? Number(req.query.size) : 20
      const page: number = req.query.page ? Number(req.query.page) : 0

      const movies: GetMoviesDTO = await movieService.getAll(size, page)
      return res.status(200).send(movies)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async getMovieById(req: express.Request, res: express.Response): Promise<express.Response<GetMovieDTO>> {
    try {
      const id: number = Number(req.params.userId)
      const movie: GetMovieDTO = await movieService.getById(id)
      if (!movie) {
        return res.status(404).send('Movie unfound')
      }
      return res.status(200).send(movie)
    } catch (error) {
      res.status(500).send({ error })
    }
  }

  async createMovie(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<ResponseSucessUpdateCreate>> {
    try {
      const movie: CreateMovieDTO = req.body
      await movieService.create(movie)
      return res.status(201).send({ message: 'Movie created' })
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  async updateMovie(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<ResponseSucessUpdateCreate>> {
    try {
      const movie: PatchMovieDTO = req.body
      await movieService.patchById(movie.id, movie)
      res.status(204).send({ message: 'user Updated' })
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  async removeMovie(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<ResponseSucessUpdateCreate>> {
    try {
      await movieService.deleteById(req.body.id)
      res.status(204).send({ message: 'Movie deleted' })
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}

export default new MoviesController()
