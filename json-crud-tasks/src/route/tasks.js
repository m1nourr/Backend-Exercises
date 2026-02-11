import express from 'express'
import { controller as taskController } from '../controllers/taskController.js'

export const router = express.Router()

router.get('/tasks', taskController.getTasks)
router.get('/tasks/:id', taskController.getTaskById)
router.post('/tasks', taskController.createTask)
router.patch('/tasks/:id', taskController.updateTask)
router.put('/tasks/:id', taskController.replaceTask)
router.delete('/tasks/:id', taskController.deleteTask)


