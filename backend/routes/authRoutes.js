const express = require('express')
const { registerUser, loginUser, getAllEmployeeUsers } = require('../controllers/authController')
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get('/employees', protect, adminOnly, getAllEmployeeUsers);


module.exports = router