import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false); // Handle sidebar open/close for mobile view
	const [isSidebarVisible, setIsSidebarVisible] = useState(false); // To control the sidebar visibility

	const navigate = useNavigate();

	const toggleSidebar = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	const removeTokenFromLocalStorage = () => {
		localStorage.removeItem("access_token");
	};

	const removeToken = () => {
		removeTokenFromLocalStorage();
		navigate("/");
	};

	const handleLogout = () => {
		localStorage.removeItem("access_token"); // Remove token from localStorage
		setAuthenticated(false); // Update authentication state
		window.location.href = "/"; // Redirect to the home page
	};

	return (
		<div className='flex min-h-screen pt-[70px] bg-gray-50'>
			{/* Mobile menu button */}
			<button onClick={toggleSidebar} className='fixed top-4 left-4 z-50 p-1 bg-gray-800 text-white rounded-md lg:hidden' aria-label='Toggle sidebar'>
				<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
				</svg>
			</button>

			{/* Overlay for mobile */}
			{isSidebarVisible && <div className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden' onClick={toggleSidebar}></div>}

			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-screen w-64 bg-white z-40 transform ${
					isSidebarVisible ? "translate-x-0" : "-translate-x-64"
				} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 flex-shrink-0 shadow-lg`}>
				{/* Navigation Links */}
				<div className='w-full px-2 mt-20 md:mt-0'>
					<div className='flex flex-col items-center w-full mt-3 border-t border-gray-300'>
						<a className='flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300' href='/dashboard' onClick={toggleSidebar}>
							<svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
								/>
							</svg>
							<span className='ml-2 text-sm font-medium'>Dashboard</span>
						</a>
						<a className='flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300' href='/job-match' onClick={toggleSidebar}>
							<svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
							</svg>
							<span className='ml-2 text-sm font-medium'>Job match</span>
						</a>
						<a className='flex items-center w-full h-12 px-3 mt-2 hover:bg-gray-300 rounded' href='/resume-builder' onClick={toggleSidebar}>
							<svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
							</svg>
							<span className='ml-2 text-sm font-medium'>Resume Builder</span>
						</a>
						<a className='flex items-center w-full h-12 px-3 mt-2 hover:bg-gray-300 rounded' href='/wishlist' onClick={toggleSidebar}>
							<svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 10h14M5 6h14M5 14h14M9 21l3 3 3-3' />
							</svg>
							<span className='ml-2 text-sm font-medium'>Wishlist</span>
						</a>
					</div>

					<div className='flex flex-col items-center w-full border-t border-gray-300 mt-4 '>
						{/* <a
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="/settings"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">Settings</span>
            </a> */}

						<a className='relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300' href='/autofill' onClick={toggleSidebar}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' width='24' height='24'>
								<path d='M14 2a1 1 0 00-1 1v3h-2V3a1 1 0 00-2 0v3H7V3a1 1 0 00-2 0v3H3a1 1 0 000 2h3v2H3a1 1 0 000 2h3v2H3a1 1 0 000 2h3v3a1 1 0 002 0v-3h2v3a1 1 0 002 0v-3h2v3a1 1 0 002 0v-3h3a1 1 0 000-2h-3v-2h3a1 1 0 000-2h-3V8h3a1 1 0 000-2h-3V3a1 1 0 00-2 0v3h-2V3a1 1 0 00-1-1z' />

								<path d='M14 8h2l-1 2 1 2h-2l-1-2 1-2zM6 12l1.5 3h3L9 12l1.5-3h-3L6 12zM18 16l.75 1.5h1.5L19.5 16l.75-1.5h-1.5L18 16z' />
							</svg>
							<span className='ml-2 text-sm font-medium'>Autofill</span>
						</a>
						<a className='relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300' href='/profile' onClick={toggleSidebar}>
							<svg className='w-6 h-6 stroke-current' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
							</svg>
							<span className='ml-2 text-sm font-medium'>Profile</span>
						</a>
						{/* <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 md:hidden"
            >
              Logout
            </button> */}
					</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className='flex-1 flex justify-center items-start min-h-screen overflow-x-hidden bg-gray-50'>
				<div className='w-full max-w-none px-4 lg:px-8 py-4 lg:py-6 flex justify-center'>
					<div className='w-full max-w-7xl'>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
