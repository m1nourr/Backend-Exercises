import express from 'express'
import { controller } from '../controller/apiKeyController.js'
import { verifyApiKey } from '../middleware/apiKey.js'

export const router = express.Router()

router.get('/apikey/list', controller.list)
router.get('/apikey/protected', verifyApiKey, controller.protected)