import express from 'express'
import { router as usersRouter } from './usersRoute.js'
import { router as apiKeyRouter } from './apiKeyRoute.js'

export const router = express.Router()

router.use('/api/v1', usersRouter)
router.use('/api/v1', apiKeyRouter)
