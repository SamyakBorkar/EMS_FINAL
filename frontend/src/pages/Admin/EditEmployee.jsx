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
        toast.error('Failed to load employee',err);
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
      toast.error('Update failed',err);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2A2A2A] w-[25vw] rounded-xl p-8 shadow-lg flex flex-col border border-[#3C3C3C]"
      >
        <h1 className="text-2xl text-center font-bold mb-6">Edit Employee</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-2 rounded"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="mb-4 p-2 rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          className="mb-4 p-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mb-4 p-2 rounded text-black"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-[#00C896] text-black font-semibold rounded py-2"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
