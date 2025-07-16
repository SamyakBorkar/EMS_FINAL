import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login Successful!');

      const token = localStorage.getItem('token')
      const decode = jwtDecode(token)
      if(decode.role == 'admin'){
        navigate('/admin-dashboard');
      }
      else{
        navigate('/employee-dashboard')
      }
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1C1C1C] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2A2A2A] w-[25vw] h-[45vh] rounded-xl p-8 shadow-lg flex flex-col border border-[#3C3C3C]"
      >
        <h1 className="text-3xl text-center font-bold text-[#00C896] uppercase mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-3 bg-transparent text-white placeholder-[#A0A0A0] border border-[#3C3C3C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 p-3 bg-transparent text-white placeholder-[#A0A0A0] border border-[#3C3C3C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]"
        />

        <button
          type="submit"
          className="bg-[#FFC857] hover:bg-[#f7b734] text-[#1C1C1C] font-semibold py-2 rounded-full text-lg transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
