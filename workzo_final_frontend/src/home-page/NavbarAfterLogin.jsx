import React from "react";
import { Link } from "react-router-dom";

const NavbarAfterLogin = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Job</Link>
        </div>
        <div className="flex space-x-8 text-white text-lg">
          <Link to="/job-match" className="hover:text-gray-300 px-4 py-2">
            Job Match
          </Link>
          <Link to="/resume-builder" className="hover:text-gray-300 px-4 py-2">
            Resume Builder
          </Link>
          <button
          
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;
