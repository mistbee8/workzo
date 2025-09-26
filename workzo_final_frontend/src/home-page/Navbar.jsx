import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Wishlist from "../job/Wishlist";
import { CgProfile } from "react-icons/cg";
import ShiningButton from "../utils/Shining";
// import { useUser } from "../utils/UserContext";
const Navbar = ({ toggleSidebar }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [userid, setUserId] = useState("");
	const [showChild, setShowChild] = useState(false);
	const token = localStorage.getItem("access_token");
	// const { setUser } = useUser();
	useEffect(() => {
		if (token) {
			const decodedToken = jwtDecode(token);
			//  console.log("Decoded Token:", decodedToken.user_id);
			// // const res= setUser(decodedToken.user_id);
			// // console.log("User ID:", res);
			axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					// console.log("Authenticated user:", response.data);
					setAuthenticated(true);
					setShowChild(true);
				})
				.catch(() => {
					setAuthenticated(false);
					setShowChild(false);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setAuthenticated(false);
			setLoading(false);
		}
	}, [token]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		setAuthenticated(false);
		window.location.href = "/";
	};

	if (loading) {
		return <div></div>;
	}
	const handleBrandClick = () => {
		if (authenticated) {
			window.location.href = "/dashboard";
		} else {
			window.location.href = "/";
		}
	};
	return (
		<nav className='bg-gray-800 p-4 shadow-md fixed w-full z-50 top-0 left-0 '>
			<div className='container mx-auto flex justify-between items-center'>
				{/* Left Side: Hamburger Icon */}
				{authenticated ? (
					<div className=' md:hidden'>
						<button onClick={toggleSidebar} className=' rounded bg-gray-800 text-white'>
							<svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
							</svg>
						</button>
					</div>
				) : (
					""
				)}

				{/* Center: Brand Name */}
				<div className='text-white text-4xl font-bold cursor-pointer font-mono' onClick={handleBrandClick}>
					<Link to='/'>
						<span>Work</span>
						<span className='text-green-500'>zo</span>
					</Link>
				</div>

				{/* Right Side: Desktop Menu */}
				<div className='hidden md:flex space-x-8 text-white text-lg'>
					<Link to='/job-match' className='hover:text-gray-400 mt-2'>
						Job Match
					</Link>
					<Link to='/resume-builder' className='hover:text-gray-400 mt-2'>
						Resume Builder
					</Link>
					<Link to='/wishlist' className='hover:text-gray-400 mt-2'>
						Wishlist
					</Link>

					{authenticated ? (
						<>
							<button onClick={handleLogout} className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to='/sign-in' className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
								Login
							</Link>
							<Link to='/sign-up' className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'>
								Sign Up
							</Link>
						</>
					)}
				</div>

				{/* Mobile Menu Button (Hamburger Icon) */}
				<div className='md:hidden'>
					<button onClick={toggleMobileMenu} className='text-white'>
						{isMobileMenuOpen ? (
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
							</svg>
						) : (
							<CgProfile size={30} />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu Items */}
			{isMobileMenuOpen && (
				<div className='md:hidden bg-gray-800 text-white p-4 space-y-4'>
					<Link to='/resume-builder' className='block'>
						Resume Builder
					</Link>
					<Link to='/job-match' className='block'>
						Job Match
					</Link>
					{authenticated ? (
						<>
							<button onClick={handleLogout} className='block w-full text-left bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700'>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to='/sign-in' className='block px-4 py-2 text-white hover:bg-blue-600'>
								Login
							</Link>
							<Link to='/sign-up' className='block px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700'>
								Sign Up
							</Link>
						</>
					)}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
