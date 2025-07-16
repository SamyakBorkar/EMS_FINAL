import React, { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    contact: "",
    role: "employee",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/employees", formData);
      toast.success("Employee Added");
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something Went wrong...");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2A2A2A] w-[90vw] max-w-md rounded-xl p-8 shadow-lg flex flex-col border border-[#3C3C3C]"
      >
        <h1 className="text-2xl uppercase font-semibold text-center text-[#00C896] mb-4">
          Add Employee
        </h1>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 p-3 bg-transparent text-white placeholder-[#A0A0A0] border border-[#3C3C3C] rounded-lg focus:ring-2 focus:ring-[#00C896]"
          placeholder="Enter Employee Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-3 bg-transparent text-white placeholder-[#A0A0A0] border border-[#3C3C3C] rounded-lg focus:ring-2 focus:ring-[#00C896]"
          placeholder="Enter Employee Email"
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="mb-4 p-3 bg-transparent text-white border border-[#3C3C3C] rounded-lg focus:ring-2 focus:ring-[#00C896]"
        >
          <option className="text-black" value="">
            Select Department
          </option>
          <option className="text-black" value="Development">Development / Engineering</option>
          <option className="text-black" value="QA">QA / Testing</option>
          <option className="text-black" value="Product Management">Product Management</option>
          <option className="text-black" value="UI/UX">UI/UX Design</option>
          <option className="text-black" value="DevOps">DevOps / Infrastructure</option>
          <option className="text-black" value="IT Support">IT Support</option>
          <option className="text-black" value="Sales & Marketing">Sales & Marketing</option>
          <option className="text-black" value="HR">Human Resources</option>
          <option className="text-black" value="Finance">Finance & Accounts</option>
          <option className="text-black" value="Customer Support">Customer Support</option>
          <option className="text-black" value="Business Analysis">Business Analysis</option>
          <option className="text-black" value="Project Management">Project Management</option>
          <option className="text-black" value="Security">Security & Compliance</option>
          <option className="text-black" value="R&D">Research & Development</option>
        </select>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="mb-4 p-3 bg-transparent text-white placeholder-[#A0A0A0] border border-[#3C3C3C] rounded-lg focus:ring-2 focus:ring-[#00C896]"
          placeholder="Enter Employee Contact Number"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mb-6 p-3 bg-transparent text-white border border-[#3C3C3C] rounded-lg focus:ring-2 focus:ring-[#00C896]"
        >
          <option className="text-black" value="employee">Employee</option>
          <option className="text-black" value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-[#FFC857] hover:bg-[#f7b734] text-[#1c1c1c] font-semibold py-2 rounded-full text-lg transition-all"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
