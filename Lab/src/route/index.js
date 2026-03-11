import express from 'express'
import { router as tasksRoute } from './tasksRoute.js'

export const router = express.Router()

router.use('/api/v1', tasksRoute)