import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Modal1 from "../job/Modal1";
import { motion } from "framer-motion";
import { User, Edit3, CheckCircle, UserCircle, Loader } from "lucide-react";

const NameIcon = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
	const [isUpdating, setIsUpdating] = useState(false);

	const token = localStorage.getItem("access_token");

	// Fetch user's full name
	useEffect(() => {
		const fetchFullName = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/full_name/`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const { first_name, last_name } = response.data;
				setFirstName(first_name);
				setLastName(last_name);
			} catch (err) {
				setError(err.response?.data?.detail || "Error fetching full name");
			} finally {
				setLoading(false);
			}
		};

		fetchFullName();
	}, [token]);

	// Update user's full name
	const updateFullName = async () => {
		try {
			setIsUpdating(true);
			const response = await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/full_name/`,
				{ first_name: firstName, last_name: lastName },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			alert("Name updated successfully");
		} catch (err) {
			setError(err.response?.data?.detail || "Error updating full name");
		} finally {
			setIsUpdating(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "firstName") {
			setFirstName(value);
		} else if (name === "lastName") {
			setLastName(value);
		}
	};

	const initials = firstName && lastName ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}` : "";

	if (loading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='flex items-center space-x-2'>
					<Loader className='animate-spin' size={24} />
					<span className='text-gray-600'>Loading profile...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='text-center py-8'>
				<div className='text-red-500 font-medium'>{error}</div>
				<button onClick={() => window.location.reload()} className='mt-2 text-blue-600 hover:text-blue-800'>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<motion.div className='w-full mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Profile Card */}
			<div className='relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 shadow-lg border border-blue-200'>
				{/* Edit Button */}
				<motion.button
					onClick={() => setIsModalOpen(true)}
					className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 text-blue-600 hover:text-blue-800'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}>
					<Edit3 size={20} />
				</motion.button>

				{/* Profile Content */}
				<div className='flex flex-col items-center text-center'>
					{/* Avatar */}
					<motion.div className='relative mb-6' initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
						<div className='w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-lg'>{initials || <UserCircle size={64} />}</div>
						<div className='absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
							<CheckCircle className='text-white' size={20} />
						</div>
					</motion.div>

					{/* Greeting */}
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
						<h1 className='text-3xl font-bold text-gray-800 mb-2'>
							Hello, {firstName} {lastName}!
						</h1>
						<p className='text-gray-600'>Welcome to your profile</p>
					</motion.div>
				</div>
			</div>

			{/* Enhanced Modal */}
			<Modal1 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fetchData={() => {}}>
				<div className='bg-white rounded-xl max-w-md mx-auto'>
					<div className='border-b border-gray-200 p-6'>
						<h3 className='text-2xl font-bold text-gray-800 flex items-center'>
							<User className='mr-3 text-blue-600' size={24} />
							Edit Profile
						</h3>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							updateFullName();
							setIsModalOpen(false);
						}}
						className='p-6'>
						<div className='space-y-6'>
							{/* First Name */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
								<input
									type='text'
									name='firstName'
									value={firstName}
									onChange={handleInputChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
									placeholder='Enter your first name'
									required
								/>
							</div>

							{/* Last Name */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
								<input
									type='text'
									name='lastName'
									value={lastName}
									onChange={handleInputChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
									placeholder='Enter your last name'
									required
								/>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6'>
							<button type='button' onClick={() => setIsModalOpen(false)} className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
								Cancel
							</button>
							<motion.button
								type='submit'
								disabled={isUpdating}
								className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								{isUpdating ? <div className='animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full'></div> : <CheckCircle className='mr-2' size={16} />}
								{isUpdating ? "Updating..." : "Update Name"}
							</motion.button>
						</div>
					</form>
				</div>
			</Modal1>
		</motion.div>
	);
};

export default NameIcon;
