import express from 'express'
import { router } from './route/index.js'
import logger from 'morgan'
import { errorHandler } from '../middleware/errorHandler.js'


export const app = express()

// Use the morgan logger
app.use(logger('dev', { 
  immediate: true,
  skip: () => process.env.NODE_ENV === 'test' 
}));

// Use the public folder for static resources
app.use(express.static('public'))

app.use(express.json())

// Mount the routes
app.use('/', router)

// 404 handler
app.use(errorHandler.notFoundDefault)

// Global error handler
app.use(errorHandler.errorDefault)

