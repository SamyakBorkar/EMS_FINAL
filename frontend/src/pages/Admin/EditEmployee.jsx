import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    contact: '',
    role: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await API.get(`/employees/${id}`);
        setFormData(res.data);
      } catch (err) {
        toast.error('Failed to load employee');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put(`/employees/${id}`, formData);
      toast.success('Employee updated successfully');
      navigate('/employee-list');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2A2A2A] w-full max-w-md rounded-xl p-6 md:p-8 shadow-lg flex flex-col border border-[#3C3C3C]"
      >
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-6">Edit Employee</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 p-3 rounded bg-transparent border border-[#3C3C3C] text-white placeholder-[#A0A0A0] focus:ring-2 focus:ring-[#00C896]"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-3 rounded bg-transparent border border-[#3C3C3C] text-white placeholder-[#A0A0A0] focus:ring-2 focus:ring-[#00C896]"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="mb-4 p-3 rounded bg-transparent border border-[#3C3C3C] text-white placeholder-[#A0A0A0] focus:ring-2 focus:ring-[#00C896]"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          className="mb-4 p-3 rounded bg-transparent border border-[#3C3C3C] text-white placeholder-[#A0A0A0] focus:ring-2 focus:ring-[#00C896]"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mb-6 p-3 rounded bg-transparent border border-[#3C3C3C] text-white focus:ring-2 focus:ring-[#00C896]"
        >
          <option className="text-black" value="employee">Employee</option>
          <option className="text-black" value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-[#00C896] hover:bg-[#00b080] text-black font-semibold rounded py-2 text-lg transition-all"
        >
          Update
        </button>
      </form>
    </div>
  );
};
export default EditEmployee;