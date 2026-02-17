import express from 'express'
import apiKeyController from '../controller/ApiKeyController.js'
import { verifyApiKey } from '../middleware/apiKeyMiddleware.js'

export const router = express.Router()

// List available keys (exercise endpoint)
router.get('/apikey/list', (req, res) => apiKeyController.list(req, res))

// Try 1: query string key (GET)
router.get('/apikey/try1', verifyApiKey, (req, res) => apiKeyController.verifyQueryString(req, res))

// Try 2: header key (POST)
router.post('/apikey/try2', verifyApiKey, (req, res) => apiKeyController.verifyHeader(req, res))

// Try 3: body key (POST)
router.post('/apikey/try3', verifyApiKey, (req, res) => apiKeyController.verifyBody(req, res))

// Try 5: middleware protection for both GET and POST
router.get('/apikey/try5', verifyApiKey, (req, res) => apiKeyController.magicAnswer(req, res))
router.post('/apikey/try5', verifyApiKey, (req, res) => apiKeyController.magicAnswer(req, res))
