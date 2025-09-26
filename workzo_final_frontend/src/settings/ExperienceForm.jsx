import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import Modal1 from "../job/Modal1";
import { motion } from "framer-motion";
import { Briefcase, Building, MapPin, Calendar, FileText, Plus, Edit3, Trash2, AlertCircle } from "lucide-react";

const ExperienceForm = () => {
	const [experienceData, setExperienceData] = useState([]);
	const [errors, setErrors] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		job_title: "",
		company_name: "",
		start_date: "",
		end_date: "",
		description: "",
		location: "",
	});

	// Handle form input changes for the modal form
	const handleModalChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Open the modal for adding or editing experience
	const openModal = (index = null) => {
		if (index !== null) {
			// Edit existing data
			setSelectedExperienceIndex(index);
			setFormData({ ...experienceData[index] });
		} else {
			// Add new data
			setFormData({
				job_title: "",
				company_name: "",
				start_date: "",
				end_date: "",
				description: "",
				location: "",
			});
		}
		fetchData();
		setIsModalOpen(true);
	};

	// Close the modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedExperienceIndex(null);
	};

	// Validate form inputs
	const validateForm = () => {
		let formErrors = {};
		if (!formData.job_title) {
			formErrors.job_title = "Job title is required";
		}
		if (!formData.company_name) {
			formErrors.company_name = "Company name is required";
		}
		if (!formData.start_date) {
			formErrors.start_date = "Start date is required";
		}
		if (!formData.end_date) {
			formErrors.end_date = "End date is required";
		}
		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	// Handle form submit (POST request or PUT request)
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			setIsLoading(true);
			try {
				const token = localStorage.getItem("access_token");

				if (!token) {
					alert("Authorization token is missing.");
					return;
				}

				// If editing, update the data
				if (selectedExperienceIndex !== null) {
					const updatedData = [...experienceData];
					updatedData[selectedExperienceIndex] = formData;
					setExperienceData(updatedData);

					// Call your backend to update the experience data
					const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/experience/${experienceData[selectedExperienceIndex]._id}`, formData, {
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					});

					alert("Experience information updated successfully!");
				} else {
					// If adding, append new data
					const response = await axios.post(
						`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/experience/`,
						[formData], // Send an array as required by the backend
						{
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						}
					);

					setExperienceData((prev) => [...prev, ...response.data.ids]);
					alert("Experience information added successfully!");
				}
				fetchData(); // Fetch data after submission
				closeModal(); // Close the modal after submission
			} catch (error) {
				console.error("Error submitting form:", error);
				alert("Failed to submit form. Please try again.");
			} finally {
				setIsLoading(false);
			}
		}
	};

	// Fetch data from the server
	const fetchData = async () => {
		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				alert("Authorization token is missing.");
				return;
			}

			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/experience/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Ensure the response data is an array before updating
			//  console.log("bloody expis",response.data)
			setExperienceData(Array.isArray(response.data) ? response.data : []);
		} catch (error) {
			console.error("Error fetching data:", error);
			alert("Error fetching experience data.");
		}
	};

	// Handle delete (DELETE request)
	const handleDelete = async (id) => {
		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				alert("Authorization token is missing.");
				return;
			}

			// Call your backend API to delete the experience entry
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/experience/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// If the deletion is successful, update the state
			if (response.status === 200) {
				// Remove the deleted item from the state
				setExperienceData((prevData) => {
					const updatedData = prevData.filter((exp) => exp._id !== id);
					// Check if the data is empty and handle accordingly
					if (updatedData.length === 0) {
						return []; // Return empty array if no data is left
					}
					return updatedData;
				});

				alert("Experience entry deleted successfully");
			}
		} catch (error) {
			console.error("Error deleting experience:", error);
			alert("Failed to delete the experience entry. Please try again.");
		}
	};

	// Fetch data on component mount
	useEffect(() => {
		fetchData();
	}, []);

	const formatDate = (date) => {
		const parsedDate = new Date(date);
		if (isNaN(parsedDate)) {
			return ""; // Return an empty string if the date is invalid
		}
		return new Intl.DateTimeFormat("en-US", {
			month: "long",
			year: "numeric",
		}).format(parsedDate);
	};

	const formatDateForInput = (date) => {
		if (!date) return ""; // Handle null or undefined date
		return new Date(date).toISOString().split("T")[0]; // Returns YYYY-MM-DD
	};
	return (
		<motion.div className='w-full mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center'>
					<div className='bg-blue-100 p-3 rounded-full mr-4'>
						<Briefcase className='w-6 h-6 text-blue-600' />
					</div>
					<div>
						<h3 className='text-2xl font-bold text-gray-800'>Work Experience</h3>
						<p className='text-gray-600'>Manage your professional experience</p>
					</div>
				</div>
				<motion.button
					onClick={() => openModal()}
					className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					<Plus className='mr-2' size={18} />
					Add <span className='hidden md:inline'>Experience</span>
				</motion.button>
			</div>
			{/* Experience List */}
			<div className='space-y-6'>
				{experienceData.length === 0 ? (
					<motion.div className='text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
						<div className='bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
							<Briefcase className='w-8 h-8 text-gray-400' />
						</div>
						<p className='text-gray-500 text-lg'>No work experience added yet</p>
						<p className='text-gray-400 text-sm mt-2'>Click "Add Experience" to get started</p>
					</motion.div>
				) : (
					experienceData.map((exp, index) => (
						<motion.div
							key={exp._id}
							className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}>
							<div className='flex items-start gap-4'>
								{/* Company Logo */}
								<div className='flex-shrink-0'>
									<div className='w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center'>
										<img
											src={"/assets/company.png"}
											alt={`${exp.company_name} logo`}
											className='w-12 h-12 object-contain'
											onError={(e) => {
												e.target.style.display = "none";
												e.target.nextSibling.style.display = "flex";
											}}
										/>
										<div className='w-12 h-12 bg-blue-600 rounded-lg items-center justify-center' style={{ display: "none" }}>
											<Building className='w-6 h-6 text-white' />
										</div>
									</div>
								</div>

								{/* Content */}
								<div className='flex-1'>
									<div className='flex items-start justify-between'>
										<div className='flex-1'>
											<h4 className='text-xl font-semibold text-gray-800 mb-1'>{exp.job_title}</h4>
											<div className='flex items-center text-gray-600 mb-2'>
												<Building className='w-4 h-4 mr-2' />
												<span className='font-medium'>{exp.company_name}</span>
											</div>
											<div className='flex items-center text-gray-500 mb-2'>
												<Calendar className='w-4 h-4 mr-2' />
												<span>
													{formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : "Present"}
												</span>
											</div>
											<div className='flex items-center text-gray-500 mb-3'>
												<MapPin className='w-4 h-4 mr-2' />
												<span>{exp.location}</span>
											</div>
											{exp.description && (
												<div className='bg-gray-50 p-3 rounded-lg'>
													<div className='flex items-start'>
														<FileText className='w-4 h-4 mr-2 text-gray-400 mt-0.5' />
														<p className='text-gray-700 text-sm leading-relaxed'>{exp.description}</p>
													</div>
												</div>
											)}
										</div>

										{/* Action Buttons */}
										<div className='flex items-center space-x-2 ml-4'>
											<motion.button
												onClick={() => openModal(index)}
												className='p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200'
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}>
												<Edit3 size={16} />
											</motion.button>
											<motion.button
												onClick={() => handleDelete(exp._id)}
												className='p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200'
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}>
												<Trash2 size={16} />
											</motion.button>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					))
				)}
			</div>{" "}
			{/* Enhanced Modal */}
			<Modal1 isOpen={isModalOpen} onClose={closeModal} fetchData={fetchData}>
				<div className='max-w-4xl mx-auto p-6'>
					<div className='border-b border-gray-200 pb-6'>
						<h2 className='text-2xl font-bold text-gray-800 flex items-center'>
							<Briefcase className='mr-3 text-blue-600' size={24} />
							{selectedExperienceIndex !== null ? "Edit Experience" : "Add New Experience"}
						</h2>
					</div>

					<form onSubmit={handleSubmit} className='p-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Job Title */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Briefcase className='mr-2 text-blue-500' size={16} />
									Job Title
								</label>
								<input
									type='text'
									name='job_title'
									value={formData.job_title}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
									placeholder='Enter job title'
								/>
								{errors.job_title && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.job_title}
									</p>
								)}
							</motion.div>

							{/* Company Name */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Building className='mr-2 text-blue-500' size={16} />
									Company Name
								</label>
								<input
									type='text'
									name='company_name'
									value={formData.company_name}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
									placeholder='Enter company name'
								/>
								{errors.company_name && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.company_name}
									</p>
								)}
							</motion.div>

							{/* Start Date */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Calendar className='mr-2 text-green-500' size={16} />
									Start Date
								</label>
								<input
									type='date'
									name='start_date'
									value={formData.start_date}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
								/>
								{errors.start_date && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.start_date}
									</p>
								)}
							</motion.div>

							{/* End Date */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Calendar className='mr-2 text-green-500' size={16} />
									End Date
								</label>
								<input
									type='date'
									name='end_date'
									value={formData.end_date}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
								/>
								{errors.end_date && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.end_date}
									</p>
								)}
							</motion.div>

							{/* Location */}
							<motion.div className='space-y-2 md:col-span-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<MapPin className='mr-2 text-purple-500' size={16} />
									Location
								</label>
								<input
									type='text'
									name='location'
									value={formData.location}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
									placeholder='Enter location'
								/>
								{errors.location && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.location}
									</p>
								)}
							</motion.div>

							{/* Description */}
							<motion.div className='space-y-2 md:col-span-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<FileText className='mr-2 text-orange-500' size={16} />
									Description
								</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
									placeholder='Describe your role and responsibilities'
									rows='4'
								/>
								{errors.description && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.description}
									</p>
								)}
							</motion.div>
						</div>

						{/* Action Buttons */}
						<div className='flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6'>
							<button type='button' onClick={closeModal} className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
								Cancel
							</button>
							<motion.button
								type='submit'
								disabled={isLoading}
								className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								{isLoading ? <div className='animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full'></div> : <Briefcase className='mr-2' size={16} />}
								{isLoading ? "Saving..." : selectedExperienceIndex !== null ? "Update" : "Add"} Experience
							</motion.button>
						</div>
					</form>
				</div>
			</Modal1>
		</motion.div>
	);
};

export default ExperienceForm;
