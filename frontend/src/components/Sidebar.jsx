import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaUserPlus, FaTasks, FaTimes } from 'react-icons/fa'
import { MdLibraryAdd, MdOutlineModeEdit } from "react-icons/md";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin-dashboard' },
    { name: 'Add Employees', icon: <FaUserPlus />, path: '/add-employee' },
    { name: 'Update Employees', icon: <MdOutlineModeEdit />, path: '/employee-list' },
    { name: 'Tasks', icon: <FaTasks />, path: '/assign-tasks' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick ={closeSidebar}
        aria-label="Close sidebar backdrop"
      />
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-[70vw] max-w-xs bg-[#00C896] text-black flex flex-col justify-between shadow-lg z-50 transition-transform duration-300">
        {/* Close icon */}
        <button
          className="absolute top-4 right-4 text-2xl text-black hover:text-red-600"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>
        <div className="p-5 mt-8">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-colors duration-200 hover:bg-[#009e77] ${
                    location.pathname === item.path ? 'bg-[#009e77] text-white' : ''
                  }`}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-bold text-2xl text-center p-3 uppercase tracking-widest border-t border-[#009e77]">
          Smart HR
        </div>
      </div>
    </>
  )
}

export default Sidebar