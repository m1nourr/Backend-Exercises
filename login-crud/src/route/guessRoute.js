import express from 'express'
import { controller } from '../controller/guessController.js'

export const router = express.Router()

router.get('/', controller.home)
router.post('/init', controller.init)

router.get('/guess', controller.guess)
router.post('/guess', controller.guessCheck)

router.get('/cheat', controller.cheat)