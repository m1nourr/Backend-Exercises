import express from 'express'
import apiKeyController from '../controller/apikeyController.js'
import { verifyApiKey } from '../middleware/apiKey.js'

export const router = express.Router()

// List available keys (exercise endpoint)
router.get('/apikey/list', (req, res) => apiKeyController.list(req, res))
router.get('/apikey/try1', verifyApiKey, (req, res) => apiKeyController.verifyQueryString(req, res))
router.post('/apikey/try2', verifyApiKey, (req, res) => apiKeyController.verifyHeader(req, res))
router.post('/apikey/try3', verifyApiKey, (req, res) => apiKeyController.verifyBody(req, res))
router.get('/apikey/try5', verifyApiKey, (req, res) => apiKeyController.magicAnswer(req, res))
router.post('/apikey/try5', verifyApiKey, (req, res) => apiKeyController.magicAnswer(req, res))
