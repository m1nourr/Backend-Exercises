import express from 'express'
import { controller } from '../controller/jwtController.js'
import { jwtMiddleware } from '../middleware/jwt.js'

export const router = express.Router()

router.get('/jwt/user', controller.user)
router.post('/jwt/login', controller.login)
router.get('/jwt/protected', jwtMiddleware.jwtTokenIsValid, controller.protected)