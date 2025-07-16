import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Sidebar from '../../components/Sidebar';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSideBar = () => setSidebarOpen((prev) => !prev);
    const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get('/employees');
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      toast.success("Employee deleted successfully");
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="bg-[#1c1c1c] text-white min-h-screen">
            {sidebarOpen && (
        <Sidebar closeSidebar={closeSidebar} />
      )}
  
      <div className="flex-1">
        <AdminNavbar toggleSideBar={toggleSideBar} />
        {/* Your main content here */}
      </div>
      <div className="p-4 md:p-8">
        <h1 className="text-center text-[#00C896] text-3xl font-semibold mb-6 uppercase">Employee List</h1>

        <div className="overflow-x-auto shadow rounded-xl border border-gray-700">
          <table className="min-w-full divide-y divide-gray-600 text-sm md:text-base">
            <thead className="bg-[#2a2a2a]">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-[#2e2e2e] transition">
                  <td className="p-3 text-center">{emp.name}</td>
                  <td className="p-3 text-center">{emp.email}</td>
                  <td className="p-3 text-center">{emp.department}</td>
                  <td className="p-3 text-center">{emp.contact}</td>
                  <td className="p-3 text-center">{emp.role}</td>
                  <td className="p-3 flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => navigate(`/edit-employee/${emp._id}`)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-black px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-5 text-gray-400">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
