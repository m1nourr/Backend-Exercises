import express from 'express'
import { router as tasksRoute } from './tasksRoute.js'
import { router as apiKeyRoute } from './apiKeyRoute.js'
import { router as jwtRoute } from './jwtRoute.js'

export const router = express.Router()

router.use('/api/v1', tasksRoute)
router.use('/api/v1', apiKeyRoute)
router.use('/api/v1', jwtRoute)