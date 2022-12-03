import { CommonRoutesConfig } from '../../common/common.routes.config'
import express from 'express'
import authMiddleware from '../../auth/middlewares/auth.middleware'

export class FavoriteMovies extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'FavoriteMoviesRoutes')
  }

  configureRoutes(): express.Application {
    this.app.get('/favorite-movies', authMiddleware.extractTokenHeader, authMiddleware.verifyAndDecryptToken)
    this.app.patch('/add-favorite-movies', authMiddleware.extractTokenHeader, authMiddleware.verifyAndDecryptToken)
    this.app.patch('/remove-favorite-movies', authMiddleware.extractTokenHeader, authMiddleware.verifyAndDecryptToken)
    return this.app
  }
}
