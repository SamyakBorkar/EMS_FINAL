const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTaskStatus } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

router.post('/create', protect, adminOnly, createTask);
router.get('/', protect, getTasks); // admin/employee dono
router.put('/:id/status', protect, updateTaskStatus);

module.exports = router;
