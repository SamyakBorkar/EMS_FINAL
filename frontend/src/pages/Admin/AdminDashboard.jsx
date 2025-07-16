import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";
import { FaUsers, FaTasks, FaCheck, FaHourglassHalf } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28EFF",
    "#FF4444",
  ];

  const toggleSideBar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const employees = await API.get("/employees");
        const tasks = await API.get("/tasks");

        setEmployeeCount(employees.data.length);
        setTaskCount(tasks.data.length);
        setPendingTasks(
          tasks.data.filter((task) => task.status === "Pending").length
        );
        setCompletedTasks(
          tasks.data.filter((task) => task.status === "Completed").length
        );

        // Department data for chart
        const deptCount = {};
        employees.data.forEach((emp) => {
          deptCount[emp.department] =
            (deptCount[emp.department] || 0) + 1;
        });

        const deptChartData = Object.entries(deptCount).map(
          ([name, value]) => ({ name, value })
        );
        setDepartmentData(deptChartData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex">
      {sidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
      <div className="flex-1">
        <AdminNavbar toggleSideBar={toggleSideBar} />

        {/* Dashboard Cards */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0050c8] rounded-lg p-4 flex items-center gap-3 shadow">
            <FaUsers size={30} />
            <div>
              <h2 className="text-lg font-bold">{employeeCount}</h2>
              <p>Total Employees</p>
            </div>
          </div>
          <div className="bg-[#FFC857] rounded-lg p-4 flex items-center gap-3 shadow">
            <FaTasks size={30} />
            <div>
              <h2 className="text-lg font-bold">{taskCount}</h2>
              <p>Total Tasks</p>
            </div>
          </div>
          <div className="bg-[#c8002b] rounded-lg p-4 flex items-center gap-3 shadow">
            <FaHourglassHalf size={30} />
            <div>
              <h2 className="text-lg font-bold">{pendingTasks}</h2>
              <p>Pending Tasks</p>
            </div>
          </div>
          <div className="bg-[#00C896] rounded-lg p-4 flex items-center gap-3 shadow">
            <FaCheck size={30} />
            <div>
              <h2 className="text-lg font-bold">{completedTasks}</h2>
              <p>Completed Tasks</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="p-5">
          <h2 className="text-2xl mb-4 text-center">Employees by Department</h2>
          <div className="bg-[#2a2a2a] rounded-lg p-5">
            {departmentData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center">No employee data available</p>
            )}
          </div>
        </div>

        {/* Future - Recent Activities */}
        <div className="p-5">
          <h2 className="text-2xl mb-4 text-center">Recent Activities</h2>
          <div className="bg-[#2a2a2a] rounded-lg p-4 text-center">
            <p className="text-gray-400">Coming soon: Recent employee & task logs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
