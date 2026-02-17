import express from 'express'
import { router as usersRoute } from './usersRoute.js'

export const router = express.Router()

router.use('/api/v1', usersRoute)
