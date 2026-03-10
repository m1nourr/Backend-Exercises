import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import helmet from 'helmet'
import logger from 'morgan'
import path from 'path'
import session from 'express-session'
import { sessionOptions } from './config/sessionOptions.js'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'
import { localsMiddleware } from './middleware/injectLocals.js'

export const app = express()

// Use the morgan logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev', { immediate: true }))
}

// Use helmet as a basic protection layer
app.use(helmet())

// Be more silent
app.disable('x-powered-by')

// Enable session
app.use(session(sessionOptions))

// Use the public folder for static resources
app.use(express.static('public'))

// EJS view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join('src', 'views'))

// EJS layout setup
app.use(expressLayouts)
app.set('layout', path.join('layouts', 'default'))

// Middleware to inject into response.locals
app.use(localsMiddleware.injectBaseUrl)
app.use(localsMiddleware.flashMessage)

// Middleware to parse JSON data
app.use(express.json())

// Parse HTML form data
app.use(express.urlencoded({ extended: false }))

// Mount the routes
app.use('/', router)

// 404 handler
app.use(errorHandler.notFoundDefault)

// Global error handler
app.use(errorHandler.errorDefault)