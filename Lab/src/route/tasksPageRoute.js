import express from 'express'
import controller from '../controller/TasksPageController.js'

export const router = express.Router()

router.param('id', controller.verifyTaskId)

router.get('/', controller.getAllTasks)
router.get('/create', controller.createTask)
router.post('/create', controller.createTaskPost)
router.get('/:id', controller.getTask)
router.get('/:id/update', controller.updateTask)
router.post('/:id/update', controller.updateTaskPost)
router.get('/:id/delete', controller.deleteTask)
router.post('/:id/delete', controller.deleteTaskPost)