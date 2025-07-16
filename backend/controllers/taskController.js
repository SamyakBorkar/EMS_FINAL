const Task = require('../models/Task');
const asyncHandler = require('express-async-handler');

// 1. Create Task (Admin Only)
const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo } = req.body;

  if (!title || !description || !assignedTo) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const task = await Task.create({
    title,
    description,
    assignedTo,
    assignedBy: req.user._id,
  });

  res.status(201).json(task);
});

// 2. Get Tasks (Admin sees all, employee sees assigned)
const getTasks = asyncHandler(async (req, res) => {
  let tasks;

  if (req.user.role === 'admin') {
    tasks = await Task.find().populate('assignedTo', 'name email');
  } else {
    tasks = await Task.find({ assignedTo: req.user._id });
  }

  res.status(200).json(tasks);
});

// 3. Update Task Status (employee)
const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Only employee assigned can update
  if (task.assignedTo.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You are not authorized to update this task');
  }

  task.status = req.body.status || task.status;
  await task.save();

  res.status(200).json(task);
});

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus
};
