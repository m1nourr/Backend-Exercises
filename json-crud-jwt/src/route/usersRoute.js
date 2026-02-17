import express from 'express'
import controller from '../controller/UsersController.js'

export const router = express.Router()

router.param('id', (req, res, next, id) => controller.verifyUserId(req, res, next, id))
router.get('/users', (req, res, next) => controller.getAllUsers(req, res, next))
router.get('/users/:id', (req, res, next) => controller.getUserById(req, res, next))
router.post('/users', (req, res, next) => controller.addUser(req, res, next))
router.put('/users/:id', (req, res, next) => controller.updateUser(req, res, next))
router.delete('/users', (req, res, next) => controller.deleteAllUsers(req, res, next))
router.delete('/users/:id', (req, res, next) => controller.deleteUser(req, res, next))
