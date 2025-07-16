import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import RegisterUser from "./pages/RegisterUser";
import RoleBasedRoute from "./components/RoleBasedRoute";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddEmployee from "./pages/Admin/AddEmployee";
import EmployeeList from "./pages/Admin/EmployeeList";
import EditEmployee from "./pages/Admin/EditEmployee";
import TaskPage from "./pages/Admin/TaskPage";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route
          path="/admin-dashboard"
          element={
            <RoleBasedRoute role="admin">
              <AdminDashboard />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/employee-dashboard"
          element={
            <RoleBasedRoute role="employee">
              <EmployeeDashboard />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/add-employee"
          element={
            <RoleBasedRoute role="admin">
              <AddEmployee />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/employee-list"
          element={
            <RoleBasedRoute role="admin">
              <EmployeeList />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/edit-employee/:id"
          element={
            <RoleBasedRoute role="admin">
              <EditEmployee />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/assign-tasks"
          element={
            <RoleBasedRoute role="admin">
              <TaskPage />
            </RoleBasedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
