import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import logger from 'morgan'
import helmet from 'helmet'
import path from 'path'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'
import { sessionOptions } from './config/sessionOptions.js'
import { localsMiddleware } from './middleware/injectLocals.js'

export const app = express()

// Reduce fingerprinting
app.disable('x-powered-by')

// Use Helmet
app.use(helmet())

// Use the morgan logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev', { immediate: true }))
}

// Enable session
app.use(session(sessionOptions))

// Serve static files
app.use(express.static('public'))

// EJS view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join('src', 'views'))

// EJS layout setup
app.use(expressLayouts)
app.set('layout', path.join('layouts', 'default'))

// Inject values into res.locals
app.use(localsMiddleware.injectBaseUrl)
app.use(localsMiddleware.flashMessage)
app.use(localsMiddleware.authenticatedUser)

// Parse request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', router)

// Custom 404
app.use(errorHandler.notFoundDefault)

// Custom 500
app.use(errorHandler.errorDefault)