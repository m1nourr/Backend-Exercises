import express from 'express'
import controller from '../controller/TasksController.js'

export const router = express.Router()

router.param('id', (req, res, next, id) => controller.verifyTaskId(req, res, next, id))

router.get('/tasks', (req, res, next) => controller.getTasks(req, res, next))
router.get('/tasks/:id', (req, res, next) => controller.getTaskById(req, res, next))
router.post('/tasks', (req, res, next) => controller.createTask(req, res, next))
router.patch('/tasks/:id', (req, res, next) => controller.updateTask(req, res, next))
router.put('/tasks/:id', (req, res, next) => controller.replaceTask(req, res, next))
router.delete('/tasks/:id', (req, res, next) => controller.deleteTask(req, res, next))