import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

// Reduce fingerprinting
app.disable('x-powered-by')

// Use Helmet
app.use(helmet())

// Use the morgan logger (avoid noisy logging in test/production if you want)
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev', { immediate: true }))
}

// Serve static files
app.use(express.static('public'))

// Parse JSON body
app.use(express.json())

// Routes
app.use('/', router)

// Custom 404
app.use(errorHandler.notFoundDefault)

// Custom 500
app.use(errorHandler.errorDefault)
