import express from 'express'
import { router as jwtRoute } from './jwtRoute.js'

export const router = express.Router()

router.use('/api/v1', jwtRoute)
