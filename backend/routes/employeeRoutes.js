const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees, deleteEmployee, updateEmployee, getEmployeeById } = require('../controllers/employeeController.js');
const  protect = require('../middleware/authMiddleware.js');
const adminOnly  = require('../middleware/adminMiddleware.js');

router.route('/')
  .post(protect, adminOnly, addEmployee)
  .get(protect, adminOnly, getEmployees);

router.get('/:id', protect, adminOnly, getEmployeeById);

router.route('/:id')
  .delete(protect, adminOnly, deleteEmployee)
  .put(protect, adminOnly, updateEmployee)
module.exports = router;
