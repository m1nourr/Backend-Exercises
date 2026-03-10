import express from 'express'
import { router as guessRoute } from './guessRoute.js'
import { router as jwtRoute } from './jwtRoute.js'
import { router as utilsRoute } from './utilsRoute.js'

export const router = express.Router()

router.use('/guess', guessRoute)
router.use('/utils', utilsRoute)
router.use('/api/v1', jwtRoute)