import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "../../components/Sidebar";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import API from '../../services/api'
import { toast } from "react-toastify";

const TaskPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleSideBar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      {sidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
      <AdminNavbar toggleSideBar={toggleSideBar} />

      <div className="m-5">
        <TaskForm onTaskCreated={fetchTasks} />
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskPage;
