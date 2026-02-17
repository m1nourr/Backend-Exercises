import express from 'express'
import { router as apikeyRoute } from './apikeyRoute.js'
import { router as jwtRoute } from './jwtRoute.js'
import { router as usersRoute } from './usersRoute.js'

export const router = express.Router()

router.use('/api/v1', apikeyRoute)
router.use('/api/v1', jwtRoute)
router.use('/api/v1', usersRoute)
