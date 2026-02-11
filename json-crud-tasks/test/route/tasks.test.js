import { app } from '../../src/express.js' 
import { expect } from 'chai'
import supertest from 'supertest'

const request = supertest(app)

describe('Tasks API Integration Tests', () => {
  
  describe('GET /api/v1/tasks', () => {
    it('should return an array of tasks', async () => {
      const res = await request.get('/api/v1/tasks')
      
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
    })
  })

  describe('POST /api/v1/tasks', () => {
    it('should create a new task and return it with an ID', async () => {
      const newTask = { title: 'Learn how to do integrationtest' }
      
      const res = await request
        .post('/api/v1/tasks')
        .send(newTask)
      
      expect(res.status).to.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body.title).to.equal(newTask.title)
      expect(res.body.id).to.be.a('number')
    })
  })

  describe('GET /api/v1/tasks/:id', () => {
    let taskId
    const taskData = { title: 'Specific Task', completed: false }

    beforeEach(async () => {
      const res = await request
        .post('/api/v1/tasks')
        .send(taskData)
      
      taskId = res.body.id
    })

    it('should return a single task object with the correct ID', async () => {
      const res = await request.get(`/api/v1/tasks/${taskId}`)

      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body.id).to.equal(taskId)
      expect(res.body.title).to.equal(taskData.title)
    })

    it('should return 404 if the task does not exist', async () => {
      const res = await request.get('/api/v1/tasks/99999')

      expect(res.status).to.equal(404)
    })
  })

  describe('PATCH /api/v1/tasks/:id', () => {
    let taskId

    beforeEach(async () => {
      const res = await request
        .post('/api/v1/tasks')
        .send({ title: 'Prep task' })
      taskId = res.body.id
    })

    it('should return 200 after successful update', async () => {
      const res = await request
        .patch(`/api/v1/tasks/${taskId}`)
        .send({ title: 'New' })
      expect(res.status).to.equal(200)
    })

    it('should return 404 if task id does not exist', async () => {
      const res = await request
        .patch('/api/v1/tasks/9999')
        .send({ title: 'New' })
      expect(res.status).to.equal(404)
    })
  })

  describe('PUT /api/v1/tasks/:id', () => {
    let existingTaskId

    // Skapa en ny task inför varje testfall
    beforeEach(async () => {
      const res = await request
        .post('/api/v1/tasks')
        .send({ title: 'Initial Task', completed: false })
      
      existingTaskId = res.body.id
    })

    it('should replace the task and return 200', async () => {
      const updatedData = { 
        title: 'Fully Updated Title', 
        completed: true 
      }

      const res = await request
        .put(`/api/v1/tasks/${existingTaskId}`)
        .send(updatedData)

      expect(res.status).to.equal(200)
      expect(res.body.id).to.equal(existingTaskId)
      expect(res.body.title).to.equal(updatedData.title)
      expect(res.body.completed).to.equal(true)
    })

    it('should return 404 if task id does not exist', async () => {
      const res = await request
        .put('/api/v1/tasks/9999')
        .send({ title: 'New' })
      expect(res.status).to.equal(404)
    })
  })

  describe('DELETE /api/v1/tasks/:id', () => {
    let taskIdToDelete

    // Create a task to delete
    beforeEach(async () => {
      const res = await request
        .post('/api/v1/tasks')
        .send({ title: 'Task to be deleted' })
      
      taskIdToDelete = res.body.id
    })

    it('should delete the task and return 204 (or 200)', async () => {
      // 1. Delete the task
      const deleteRes = await request.delete(`/api/v1/tasks/${taskIdToDelete}`)
      expect(deleteRes.status).to.equal(204)

      // 2. Verify its gone
      const getRes = await request.get(`/api/v1/tasks/${taskIdToDelete}`)
      expect(getRes.status).to.equal(404)
    })

    it('should return 404 when trying to delete a non-existent task', async () => {
      const res = await request.delete('/api/v1/tasks/99999')
      expect(res.status).to.equal(404)
    })
  })

  describe('Error Handling for non-existent routes', () => {
    it('should return 404 with JSON for non-existent routes', async () => {
      const res = await request.get('/api/v1/completely-wrong')
      
      expect(res.status).to.equal(404)
      expect(res.body).to.have.property('message')
    })
  })
})