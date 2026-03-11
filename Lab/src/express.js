import express from 'express'
import logger from 'morgan'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

// Use the morgan logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev', { immediate: true }))
}

// Middleware to parse JSON data as part of the body
app.use(express.json())

// Mount the routes
app.use('/', router)

// 404 handler
app.use(errorHandler.notFoundDefault)

// Global error handler
app.use(errorHandler.errorDefault)