import { Router } from 'express'
import movieRouter from './movie.routes'
import userRoutes from './user.routes'

const router = Router()

router.use('', movieRouter, userRoutes)

export default router
