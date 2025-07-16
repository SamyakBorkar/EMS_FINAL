import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const AdminNavbar = ({toggleSideBar}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  let name = '';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      name = decoded.name || 'User';
    } catch (err) {
      console.error('Invalid token', err);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-[#1c1c1c] text-white flex justify-between items-center p-4 shadow-md">
      <div className="flex items-center gap-4 px-4">
<button onClick={toggleSideBar} className="text-2xl cursor-pointer">
  <GiHamburgerMenu />
</button>
        <div>
          <h1 className="font-medium text-xl sm:text-3xl">Hey Admin 👋</h1>
          <h2 className="font-medium text-[#00C896] text-base sm:text-lg">{name}</h2>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-2xl font-semibold transition duration-300"
      >
        LOGOUT
      </button>
    </nav>
  );
};

export default AdminNavbar;
