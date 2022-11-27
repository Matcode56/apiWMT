// const pool= require('../config/db')
// const fs= require('fs')
// const emailValidator= require('email-validator');

import { Handler, Request, RequestHandler, Response } from 'express'
import { Movie } from '../entities/Movie'

//GET DATA

export class MovieController {}

export const getMovies = (req, res): any => {
  const request = 'SELECT id, title, tmdb_posterpath, overview, vote_count, vote_count FROM movie WHERE id=$1'
}

export const getMovie = (req: Request, res: Response): any => {
  const id: string = req.params?.id
  const request = 'SELECT id, title, tmdb_posterpath, overview, vote_count, vote_count FROM movie WHERE id=$1'

  return res.status(400).send(id)
}

export const postMovie = (req: Request, res: any): any => {
  return res.json()
}

export const putMovie = (req: Request, res: any): any => {
  return res.json()
}

export const deleteMovie = (req: Request, res: any): any => {
  return res.json()
}
