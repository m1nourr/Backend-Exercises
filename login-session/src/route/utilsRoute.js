import express from 'express'
import { controller } from '../controller/utilsController.js'

export const router = express.Router()

router.get('/session', controller.session)
router.get('/session/destroy', controller.sessionDestroy)
router.get('/locals', controller.locals)
