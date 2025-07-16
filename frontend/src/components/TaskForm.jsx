import React, { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/auth/employees"); // fetch all employees
        setEmployees(res.data);
      } catch (err) {
        toast.error("Failed to load employees",err);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks/create", formData);
      toast.success("Task Created!");
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        deadline: "",
      });
      if (onTaskCreated) onTaskCreated(); // refresh task list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="bg-[#2a2a2a] p-5 rounded-lg shadow-lg max-w-xl w-full mx-auto mt-5">
      <h2 className="text-xl font-bold mb-4 text-center text-[#00C896] uppercase">
        Assign a Task
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 text-sm">Assign To</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            required
          >
            <option value="">Select an employee</option>
            {employees.map((emp) => (
              <option className="text-black" key={emp._id} value={emp._id}>
                {emp.name} - {emp.email}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00C896]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#00C896] text-black py-2 rounded font-bold hover:bg-[#009e77] transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
