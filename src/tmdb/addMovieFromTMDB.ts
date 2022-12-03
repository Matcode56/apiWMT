import express from 'express'
import { CreateMovieDTO } from '../movies/DTO/createMovieDTO'
import movieService from '../movies/services/movie.service'

require('dotenv').config()

export const addMovieFromTMDB = async (req: express.Request, res: express.Response) => {
  try {
    const moviesResult: MovieResult[] = req.body

    const moviesDTO: CreateMovieDTO[] = mapToMovieModel(moviesResult)

    await addAllMovie(moviesDTO)

    return res.status(200).send(moviesDTO)
  } catch (err) {
    return res.status(500).send(err)
  }
}

export const addAllMovie = async (movies: CreateMovieDTO[]) => {
  try {
    movies.forEach(async movie => {
      console.log(movie.title)

      await movieService.create(movie)
    })
  } catch (err) {
    throw new Error(err)
  }
}

export const mapToMovieModel = (moviesResult: MovieResult[]): CreateMovieDTO[] => {
  const movies = moviesResult.map(movieResult => {
    const movie: CreateMovieDTO = {
      title: movieResult.title,
      tmdb_posterpath: movieResult.poster_path,
      overview: movieResult.overview ? movieResult.overview : '',
      vote_count: movieResult.vote_count,
      vote_average: movieResult.vote_average,
    }
    return movie
  })
  return movies
}

export interface MovieResponseApi {
  page: number
  results: MovieResult[]
  total_pages: number
  total_results: number
}

interface MovieResult {
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}
