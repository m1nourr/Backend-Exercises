import express from 'express'
import controller from '../controller/UsersController.js'

export const router = express.Router()

// Verify the parameter
router.param('id', controller.verifyUserId)

// C to create a new user in the database
router.get('/users/create', controller.createUser)
router.post('/users/create', controller.createUserPost)

// Search users in the database
router.get('/users/search', controller.searchUser)

// R read from database, list all/one item(s)
router.get('/users', controller.getAllUsers)
router.get('/users/:id', controller.getUser)

// U update details of the user
router.get('/users/:id/update', controller.updateUser)
router.post('/users/:id/update', controller.updateUserPost)

// D delete users from database
router.get('/users/:id/delete', controller.deleteUser)
router.post('/users/:id/delete', controller.deleteUserPost)