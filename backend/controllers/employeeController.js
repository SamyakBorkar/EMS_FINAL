const Employee = require("../models/Employee.js");
const User = require("../models/User.js"); // Import User model
const asyncHandler = require("express-async-handler");

const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, designation, department, salary, contact, role } = req.body;

  // 1. Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("A user with this email already exists");
  }

  // 2. Create new user with default password
  const defaultPassword = "123456"; // can be improved later
  const user = await User.create({
    name,
    email,
    password: defaultPassword,
    role: role || "employee",
  });

  // 3. Create employee record
  const employee = await Employee.create({
    name,
    email,
    designation,
    department,
    salary,
    contact,
    role: role || "employee",
    createdBy: req.user._id,
  });

  res.status(201).json({ employee, userCreated: true });
});

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ createdBy: req.user._id });
  res.json(employees);
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // Also delete user with the same email (optional)
  await User.deleteOne({ email: employee.email });

  await employee.deleteOne();
  res.status(200).json({ message: "Employee and user account removed successfully" });
});

const updateEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) {
    res.status(404);
    throw new Error("Employee not found");
  }

  emp.name = req.body.name || emp.name;
  emp.email = req.body.email || emp.email;
  emp.department = req.body.department || emp.department;
  emp.contact = req.body.contact || emp.contact;
  emp.role = req.body.role || emp.role;

  const updatedEmployee = await emp.save();

  // Optionally update the User record also
  await User.updateOne(
    { email: emp.email },
    {
      $set: {
        name: emp.name,
        role: emp.role,
      },
    }
  );

  res.json(updatedEmployee);
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  res.json(employee);
});

module.exports = {
  addEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeeById,
};
