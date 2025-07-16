const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')


const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email, role:user.role },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
    );
};

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        // Create new user
        const user = await User.create({ name, email, password, role });

        const token = generateToken(user);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllEmployeeUsers = asyncHandler(async (req, res) => {
  const employees = await User.find({ role: 'employee' }).select('name _id email');
  res.json(employees);
});

module.exports = { registerUser, loginUser, getAllEmployeeUsers };