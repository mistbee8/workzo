import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal1 from "../job/Modal1";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const ContactForm = () => {
	const [personalInfo, setPersonalInfo] = useState({
		email: "",
		mobile: "",
		location: "",
		birthdate: "",
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState("");
	const [id, setId] = useState("");

	// Fetch user data on component mount
	useEffect(() => {
		fetchData();
	}, []);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setPersonalInfo({ ...personalInfo, [name]: value });
	};

	// Fetch personal information (GET)
	const fetchData = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("access_token"); // Retrieve the token from localStorage or other secure storage

			if (!token) {
				throw new Error("Authorization token is missing.");
			}

			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/personal/`, {
				headers: {
					Authorization: `Bearer ${token}`, // Include the Bearer token
				},
			});
			// console.log("man", response.data.personal._id);
			setId(response.data.personal._id); // Set the ID from fetched data

			const data = response.data.personal || {}; // Ensure `personal` exists in the response
			setPersonalInfo({
				email: data.email || "",
				mobile: data.mobile || "",
				location: data.location || "",
				birthdate: data.birthdate || "",
			});

			// console.log("Fetched Data:", data);
			setMessage(response.data.message || "Personal information retrieved successfully.");
		} catch (err) {
			console.error("Error fetching personal information:", err);
			setError("Failed to fetch personal information.");
		} finally {
			setLoading(false);
		}
	};

	// Save personal information (POST or PUT)
	const saveOrUpdatePersonalInfo = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("access_token"); // Retrieve the token from localStorage or other secure storage

			if (!token) {
				throw new Error("Authorization token is missing or invalid.");
			}

			const url = `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/personal/`;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`, // Include the Bearer token
				},
			};

			let response;

			if (id) {
				// Update existing data (since id exists)
				response = await axios.put(url, personalInfo, config);
				// console.log("PUT Response:", response.data); // Log the response to debug
			} else {
				// Save new data (id does not exist)
				response = await axios.post(url, personalInfo, config);
				// console.log("POST Response:", response.data); // Log the response to debug
			}

			// Handle success
			setMessage(response.data.message);
			setError(null);
			fetchData(); // Refresh the data after saving/updating
			setIsModalOpen(false); // Close the modal after success
		} catch (err) {
			console.error("Error saving or updating personal information:", err);
			if (err.response) {
				console.log("Error Response:", err.response.data);
			}
			setError("Failed to save/update personal information.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-full flex justify-center'>
			<motion.div className='w-full max-w-4xl mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				{/* Status Messages */}
				{loading && (
					<motion.div className='flex items-center justify-center p-4 mb-4 bg-blue-50 rounded-lg border border-blue-200' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
						<Loader2 className='animate-spin mr-2 text-blue-600' size={20} />
						<span className='text-blue-600'>Loading...</span>
					</motion.div>
				)}
				{message && (
					<motion.div className='flex items-center p-4 mb-4 bg-green-50 rounded-lg border border-green-200' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
						<CheckCircle className='mr-2 text-green-600' size={20} />
						<span className='text-green-600'>{message}</span>
					</motion.div>
				)}
				{error && (
					<motion.div className='flex items-center p-4 mb-4 bg-red-50 rounded-lg border border-red-200' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
						<AlertCircle className='mr-2 text-red-600' size={20} />
						<span className='text-red-600'>{error}</span>
					</motion.div>
				)}
				{/* Personal Information Display */}
				<motion.div className='mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-lg relative overflow-hidden mx-auto' whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
					<div className='absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full opacity-20 transform translate-x-6 -translate-y-6'></div>
					<div className='absolute bottom-0 left-0 w-16 h-16 bg-indigo-200 rounded-full opacity-20 transform -translate-x-4 translate-y-4'></div>

					<motion.button
						onClick={() => setIsModalOpen(true)}
						className='absolute top-4 right-4 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}>
						<MdOutlineModeEditOutline size={20} />
					</motion.button>

					<h3 className='text-xl font-semibold text-gray-800 mb-6'>Personal Information</h3>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
						<motion.div className='flex items-center p-3 bg-white rounded-lg shadow-sm' whileHover={{ scale: 1.02 }}>
							<div className='bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0'>
								<MdOutlineEmail className='text-blue-600' size={20} />
							</div>
							<div className='min-w-0'>
								<p className='text-sm text-gray-500'>Email</p>
								<p className='text-gray-800 font-medium break-all'>{personalInfo.email || "Not provided"}</p>
							</div>
						</motion.div>

						<motion.div className='flex items-center p-3 bg-white rounded-lg shadow-sm' whileHover={{ scale: 1.02 }}>
							<div className='bg-green-100 p-2 rounded-full mr-4 flex-shrink-0'>
								<FaPhoneAlt className='text-green-600' size={20} />
							</div>
							<div className='min-w-0'>
								<p className='text-sm text-gray-500'>Mobile</p>
								<p className='text-gray-800 font-medium break-all'>{personalInfo.mobile || "Not provided"}</p>
							</div>
						</motion.div>

						<motion.div className='flex items-center p-3 bg-white rounded-lg shadow-sm' whileHover={{ scale: 1.02 }}>
							<div className='bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0'>
								<GiPositionMarker className='text-purple-600' size={20} />
							</div>
							<div className='min-w-0'>
								<p className='text-sm text-gray-500'>Location</p>
								<p className='text-gray-800 font-medium break-words'>{personalInfo.location || "Not provided"}</p>
							</div>
						</motion.div>

						<motion.div className='flex items-center p-3 bg-white rounded-lg shadow-sm' whileHover={{ scale: 1.02 }}>
							<div className='bg-orange-100 p-2 rounded-full mr-4 flex-shrink-0'>
								<LiaBirthdayCakeSolid className='text-orange-600' size={20} />
							</div>
							<div className='min-w-0'>
								<p className='text-sm text-gray-500'>Birthdate</p>
								<p className='text-gray-800 font-medium'>{personalInfo.birthdate || "Not provided"}</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
				{/* Modal for editing/adding personal info */}
				<Modal1 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fetchData={fetchData}>
					<div className='max-w-2xl mx-auto p-6'>
						<div className='border-b border-gray-200 pb-6'>
							<h2 className='text-2xl font-bold text-gray-800'>{id ? "Edit Personal Information" : "Add Personal Information"}</h2>
						</div>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								saveOrUpdatePersonalInfo();
							}}
							className='p-6 space-y-6'>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
								<motion.div className='space-y-2' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
									<label className='flex items-center text-sm font-medium text-gray-700'>
										<MdOutlineEmail className='mr-2 text-blue-500' size={20} />
										Email
									</label>
									<input
										type='email'
										name='email'
										value={personalInfo.email}
										onChange={handleChange}
										className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
										placeholder='Enter your email'
									/>
								</motion.div>

								<motion.div className='space-y-2' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
									<label className='flex items-center text-sm font-medium text-gray-700'>
										<FaPhoneAlt className='mr-2 text-green-500' size={20} />
										Mobile
									</label>
									<input
										type='text'
										name='mobile'
										value={personalInfo.mobile}
										onChange={handleChange}
										className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
										placeholder='Enter your mobile number'
									/>
								</motion.div>

								<motion.div className='space-y-2' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
									<label className='flex items-center text-sm font-medium text-gray-700'>
										<GiPositionMarker className='mr-2 text-purple-500' size={20} />
										Location
									</label>
									<input
										type='text'
										name='location'
										value={personalInfo.location}
										onChange={handleChange}
										className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
										placeholder='Enter your location'
									/>
								</motion.div>

								<motion.div className='space-y-2' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
									<label className='flex items-center text-sm font-medium text-gray-700'>
										<LiaBirthdayCakeSolid className='mr-2 text-orange-500' size={20} />
										Birthdate
									</label>
									<input
										type='date'
										name='birthdate'
										value={personalInfo.birthdate}
										onChange={handleChange}
										className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
									/>
								</motion.div>
							</div>

							<div className='flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200'>
								<button type='button' onClick={() => setIsModalOpen(false)} className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
									Cancel
								</button>
								<motion.button
									type='submit'
									className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									disabled={loading}>
									{loading ? <Loader2 className='animate-spin mr-2' size={16} /> : null}
									{id ? "Update" : "Save"}
								</motion.button>
							</div>
						</form>
					</div>
				</Modal1>
			</motion.div>
		</div>
	);
};

export default ContactForm;
