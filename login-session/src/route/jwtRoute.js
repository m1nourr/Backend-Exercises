/**
 * Routes for the JWT example.
 */
import express from 'express'
import { controller } from '../controller/jwtController.js'
import { jwtMiddleware } from '../middleware/jwt.js'

export const router = express.Router()

router.post('/jwt/init', controller.init)
router.get('/jwt/list', controller.list)
router.post('/jwt/register', controller.register)
router.post('/jwt/login', controller.login)
router.get('/jwt/token', jwtMiddleware.jwtTokenIsValid, controller.token)
