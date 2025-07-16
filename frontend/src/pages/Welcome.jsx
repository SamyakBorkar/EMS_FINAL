import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-[#1C1C1C] flex flex-col justify-center items-center text-white px-4">
      <h1 className="text-5xl font-bold text-[#00C896] mb-6 text-center">
        Welcome to SmartHR Portal
      </h1>
      <p className="text-[#A0A0A0] text-lg mb-10 text-center max-w-[600px]">
        Manage your workforce efficiently, securely, and smartly. Get started by logging in or creating a new account.
      </p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-[#FFC857] hover:bg-[#f7b734] text-[#1C1C1C] font-semibold py-3 px-6 rounded-full text-lg transition-all"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="border border-[#00C896] text-[#00C896] hover:bg-[#00C896] hover:text-[#1C1C1C] font-semibold py-3 px-6 rounded-full text-lg transition-all"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
