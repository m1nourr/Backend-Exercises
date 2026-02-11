export const controller = {}

const tasks = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Pay bills', completed: true },
  { id: 3, title: 'Walk the dog', completed: false },
];

controller.getTasks = (req, res) => {
  res.json(tasks)
}

controller.getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id)
  const task = tasks.find(t => t.id === taskId)
  if (task) {
    res.json(task)
  } else {
    res.status(404).json({ error: 'Task not found' })
  }
}

controller.createTask = (req, res) => {
const newTask = req.body

  // Generate a new ID based on the highest existing ID
  const newId = tasks.length > 0 
    ? Math.max(...tasks.map(t => t.id)) + 1 
    : 1

  // Attach the ID to the task object
  newTask.id = newId

  tasks.push(newTask)
  res.status(201).json(newTask)
}

controller.updateTask = (req, res) => {
  const taskId = parseInt(req.params.id)
  const updatedData = req.body
  const task = tasks.find(t => t.id === taskId)
  if (task) {
    Object.assign(task, updatedData)
    res.json(task)
  } else {
    res.status(404).json({ error: 'Task not found' })
  }
}

controller.replaceTask = (req, res) => {
  const taskId = parseInt(req.params.id)
  const newTaskData = req.body
  const taskIndex = tasks.findIndex(t => t.id === taskId)
  if (taskIndex !== -1) {
    newTaskData.id = taskId // Ensure the ID remains the same
    tasks[taskIndex] = newTaskData
    res.json(newTaskData)
  } else {
    res.status(404).json({ error: 'Task not found' })
  }
}

controller.deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex(t => t.id === taskId)
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1)
    res.status(204).json()
  } else {
    res.status(404).json({ error: 'Task not found' })
  }
}

