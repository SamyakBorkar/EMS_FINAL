import React from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  let name ='';

  if(token){
    try{
      const decode = jwtDecode(token);
      name = decode.name || 'User';
    }
    catch(err){
      console.error('Invalid token', err);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/login');
  }
  return (
    <nav className='bg-[#1c1c1c] text-white flex justify-between p-2 items-center shadow-md'>
      <div className='px-10'>
        <h1 className='font-medium text-3xl'>Hey 👋</h1>
        <h2 className='font-medium text-2xl text-[#00C896] '>
          {name}
        </h2>
      </div>
      <div className='px-10'>
        <button onClick={handleLogout} className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded-2xl font-semibold transition duration-300'>LOGOUT</button>
      </div>
    </nav>
  )
}

export default Navbar