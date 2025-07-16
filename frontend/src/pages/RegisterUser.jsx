import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      navigate('/login');
      toast.success("Registration Succesful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };


  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex justify-center items-center">
      <form
        action=""
        onSubmit={handleRegister}
        className="bg-[#2A2A2A] w-[25vw] h-[55vh] rounded-xl p-8 shadow-lg flex flex-col border border-[#3C3C3C]"
      >
        <h1 className="font-bold text-[#00C896] text-center uppercase text-3xl mb-8">
          Register Here
        </h1>
        <input
          className="mb-4 p-3 bg-transparent text-white placeholder-[#A0A0A0] border border-[#3C3C3C] rounded-lg focus:ring-2 focus:ring-[#00C896]"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your Name"
          required
        />
        <input
          className="mb-4 p-3 bg-transparent text-white placeholder-[#A0A0A0] border border-[#3C3C3C] rounded-lg focus:ring-2 focus:ring-[#00C896]"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
          required
        />
        <input
          className="mb-4 p-3 bg-transparent text-white placeholder-[#A0A0A0] border border-[#3C3C3C] rounded-lg focus:ring-2 focus:ring-[#00C896]"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your Password"
          required
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
          <button className="bg-[#FFC857] hover:bg-[#f7b734] text-[#1C1C1C] font-semibold py-2 rounded-full text-lg transition-all">
            Register
            </button>

      </form>
    </div>
  );
};

export default RegisterUser;
