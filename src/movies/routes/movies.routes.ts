import { CommonRoutesConfig } from '../../common/common.routes.config'
import express from 'express'
import authMiddleware from '../../auth/middlewares/auth.middleware'
import bodyValidationMiddleware from '../../common/middlewares/body.validation.middleware'
import { addMovieFromTMDB } from '../../tmdb/addMovieFromTMDB'
import moviesMiddlewares from '../middlewares/movies.middlewares'
import moviesController from '../controllers/movies.controller'

export class MoviesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MoviesRoutes')
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/movies`)
      .get(authMiddleware.extractTokenHeader, authMiddleware.verifyAndDecryptToken, moviesController.getMovies)

    this.app.post('/importTMDB', addMovieFromTMDB)
    this.app
      .route(`/movie`)
      .post(
        authMiddleware.extractTokenHeader,
        authMiddleware.verifyAndDecryptToken,
        bodyValidationMiddleware.validateNotEmptyBody,
        moviesMiddlewares.validateIsAuthorized,
        moviesMiddlewares.validateRequiredMovieBodyFields,
        moviesController.createMovie
      )
    this.app
      .route(`/movie/:movieId`)
      .get(
        moviesMiddlewares.extractMovieId,
        authMiddleware.extractTokenHeader,
        authMiddleware.verifyAndDecryptToken,
        moviesMiddlewares.validateMovieExists,
        moviesController.getMovieById
      )
      .delete(
        authMiddleware.extractTokenHeader,
        authMiddleware.verifyAndDecryptToken,
        moviesMiddlewares.validateIsAuthorized,
        moviesMiddlewares.validateMovieExists,
        moviesController.removeMovie
      )
      .patch([
        bodyValidationMiddleware.validateNotEmptyBody,
        authMiddleware.extractTokenHeader,
        authMiddleware.verifyAndDecryptToken,
        moviesMiddlewares.extractMovieId,
        moviesMiddlewares.validateIsAuthorized,
        moviesMiddlewares.validateMovieExists,
        moviesMiddlewares.validatePatchMovieField,
        moviesController.updateMovie,
      ])

    return this.app
  }
}
