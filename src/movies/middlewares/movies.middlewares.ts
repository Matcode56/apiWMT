import express from 'express'
import { TokenJwt } from '../../auth/types/jwt'
import { verifyIsAdmin } from '../../auth/utils/verifyIsAdmin'
import movieService from '../services/movie.service'

class MoviesMiddleware {
  extractMovieId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = Number(req.params.movieId)
    next()
  }

  validateRequiredMovieBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    const requiredField = ['title', 'tmdb_posterpath', 'overview', 'vote_count', 'vote_average']
    const fields = Object.keys(req.body)
    const isEqual = fields.every(val => requiredField.find(field => field === val))
    if (isEqual) {
      next()
    } else {
      res.status(400).send({
        error: `Missing required fields`,
      })
    }
  }

  validateIsAuthorized(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token: TokenJwt = res.locals.token
    const isAdmin: boolean = verifyIsAdmin(token)
    if (!isAdmin) {
      return res.status(401).send({ error: 'Unauthorized' })
    }
    next()
  }

  validatePatchMovieField(req: express.Request, res: express.Response, next: express.NextFunction) {
    const allowedFields = ['title', 'tmdb_posterpath', 'overview', 'vote_count', 'vote_average']
    const fields = Object.keys(req.body)
    const isValidFields = fields.some(elt => allowedFields.find(field => field === elt))
    if (!isValidFields) {
      return res.status(400).send({ error: 'Invalid field' })
    }
    next()
  }

  async validateMovieExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const movie = await movieService.getById(Number(req.params.movieId))
    if (movie) {
      next()
    } else {
      res.status(404).send({
        error: `Movie ${req.params.movieId} not found`,
      })
    }
  }
}
export default new MoviesMiddleware()
