import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { toast } from "react-toastify";
import { FaTasks, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskRes = await API.get("/tasks");
        setTasks(taskRes.data);
      } catch (err) {
        toast.error("Failed to load dashboard data");
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id) => {
    try {
      await API.put(`/tasks/${id}/status`, { status: "Completed" });
      toast.success("Task marked as completed");
      setTasks(tasks.map(task => task._id === id ? { ...task, status: "Completed" } : task));
    } catch (err) {
      toast.error("Unable to update task status");
    }
  };

  // Calculate completed and pending tasks
  const completed = tasks.filter(task => task.status === "Completed").length;
  const pending = tasks.filter(task => task.status !== "Completed").length;

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      <Navbar />
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#2a2a2a] p-4 rounded shadow flex items-center gap-4">
            <FaTasks size={28} className="text-[#FFC857]" />
            <div>
              <h2 className="text-xl font-bold">{tasks.length}</h2>
              <p>Total Assigned Tasks</p>
            </div>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded shadow flex items-center gap-4">
            <FaCheckCircle size={28} className="text-[#00C896]" />
            <div>
              <h2 className="text-xl font-bold">{completed}</h2>
              <p>Completed Tasks</p>
            </div>
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded shadow flex items-center gap-4">
            <FaHourglassHalf size={28} className="text-[#c8002b]" />
            <div>
              <h2 className="text-xl font-bold">{pending}</h2>
              <p>Pending Tasks</p>
            </div>
          </div>
        </div>
        {/* Tasks Section */}
        <div className="bg-[#2a2a2a] p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-[#FFC857]">Your Assigned Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks assigned yet.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-[#3a3a3a] p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                    <p className="text-sm text-gray-400">Deadline: {new Date(task.deadline).toDateString()}</p>
                    <p className={`text-sm mt-1 font-semibold ${task.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
                      Status: {task.status}
                    </p>
                  </div>
                  {task.status !== "Completed" && (
                    <button
                      className="bg-[#00C896] px-4 py-1 rounded font-bold text-black"
                      onClick={() => handleStatusUpdate(task._id)}
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmployeeDashboard;