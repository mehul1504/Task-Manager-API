const express = require('express');
const app = express();
const port = 3000;

// import json file data
const tasksObject = require('./task.json');
const tasks = tasksObject.tasks;

//the highest ID currently used
let maxId = Math.max(...tasks.map(task => task.id));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validateTaskInput = (req,res,next)=>{
    
    const{id,title,description,completed,priority} = req.body;

    // Check if ID is a non-negative integer
    if (id !== undefined && !Number.isInteger(id) || id < 0) {
        return res.status(400).json({ error: 'ID must be a non-negative integer' });
      }

    if (!title || !description || title.trim() === '' || description.trim() === '') {
        return res.status(400).json({ error: 'Title and description are required and cannot be empty' });
      }

    // Check if completed is a boolean value
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).send({ error: 'Completed status must be a boolean value' });
    }
    // Check if title is a non-empty string
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }

  // Check if description is a non-empty string
  if (typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ error: 'Description must be a non-empty string' });
  }

  // Check if priority is a string
  if (priority && typeof priority !== 'string') {
    return res.status(400).json({ error: 'Priority must be a string' });
  }

  // Check if priority is one of the allowed values
  const allowedPriorities = ['low', 'medium', 'high'];
  if (priority && !allowedPriorities.includes(priority.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid priority level' });
  }

    next();
}

// GET /tasks: Retrieve all tasks.
app.get("/tasks",(req,res)=>{
  try{
    let filteredTasks = tasks.slice();

  // Filter tasks based on completion status
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === 'true';
    filteredTasks = filteredTasks.filter(task => task.completed === completed);
  }

  // Sort tasks by creation date
  if (req.query.sort === 'creationDate') {
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  if (filteredTasks.length === 0) {
    return res.status(404).send({ error: 'No tasks found' });
  }

    res.status(200).send(filteredTasks)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

// GET /tasks/:id: Retrieve a single task by its ID.
app.get("/tasks/:id",(req,res) => {
  try{
    const id = req.params.id
    const task = tasks.find(task => task.id === parseInt(id));
    if(!task){
        return res.status(404).send("No task with this id")

    }
    res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /tasks: Create a new task.
app.post("/tasks",validateTaskInput, (req,res) => {
  try{
    const { id,title, description, completed, priority } = req.body;

   // const newId = ++maxId;
    const newTask = { id, title, description, completed,  priority, createdAt: new Date() };
    tasks.push(newTask)
    res.status(201).send("New Task created successfully");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal server error' });
  }

});

// PUT /tasks/:id: Update an existing task by its ID.
app.put("/tasks/:id",validateTaskInput,(req,res)=>{
  try{
    const taskId = parseInt(req.params.id);
    const { title, description, completed, priority} = req.body

    const taskUpdate = tasks.find(task => task.id === taskId);
    if(!taskUpdate){
        return res.status(404).send("Task not updated");
    }
    
    taskUpdate.title = title;
    taskUpdate.description = description;
    taskUpdate.completed = completed;
    taskUpdate.priority = priority;

    res.status(200).send(taskUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
    
});

// DELETE /tasks/:id: Delete a task by its ID.
app.delete("/tasks/:id", (req, res) => {
  try{
    const taskId = parseInt(req.params.id);
  
    // Find the index of the task by ID
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
      }
    
    // Remove the task from the array
    tasks.splice(taskIndex, 1);

    res.status(200).send("Task is deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;