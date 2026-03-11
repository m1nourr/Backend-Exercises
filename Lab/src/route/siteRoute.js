import express from 'express'
import { controller } from '../controller/SiteController.js'

export const router = express.Router()

router.get('/', controller.home)
router.get('/friday', controller.friday)