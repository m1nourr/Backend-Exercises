import express from 'express'
import { router as crudRoute } from './crudRoute.js'

export const router = express.Router()

router.use('/crud', crudRoute)