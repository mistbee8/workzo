import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import Modal1 from "../job/Modal1";
import { motion } from "framer-motion";
import { GraduationCap, School, Calendar, Award, Plus, Edit3, Trash2, AlertCircle } from "lucide-react";

const EducationForm = () => {
	const [educationData, setEducationData] = useState([]);
	const [errors, setErrors] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		degree: "",
		institution: "",
		start_year: 0,
		end_year: 0,
		gpa: null,
	});

	// Handle form input changes for the modal form
	const handleModalChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Open the modal for adding or editing education
	const openModal = (index = null) => {
		if (index !== null) {
			// Edit existing data
			setSelectedEducationIndex(index);
			setFormData({ ...educationData[index] });
		} else {
			// Add new data
			setFormData({
				degree: "",
				institution: "",
				start_year: 0,
				end_year: 0,
				gpa: 0,
			});
		}
		fetchData();
		setIsModalOpen(true);
	};

	// Close the modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedEducationIndex(null);
	};

	// Validate form inputs
	const validateForm = () => {
		let formErrors = {};
		if (!formData.degree) {
			formErrors.degree = "Degree is required";
		}
		if (!formData.institution) {
			formErrors.institution = "Institution is required";
		}
		if (!formData.start_year) {
			formErrors.start_year = "Start year is required";
		}
		if (!formData.end_year) {
			formErrors.end_year = "End year is required";
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
				if (selectedEducationIndex !== null) {
					const updatedData = [...educationData];
					updatedData[selectedEducationIndex] = formData;
					setEducationData(updatedData);

					// Call your backend to update the education data
					const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/education/${educationData[selectedEducationIndex]._id}`, formData, {
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					});

					alert("Education information updated successfully!");
				} else {
					// If adding, append new data
					const response = await axios.post(
						`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/education/`,
						[formData], // Send an array as required by the backend
						{
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						}
					);

					setEducationData((prev) => [...prev, ...response.data.ids]);
					alert("Education information added successfully!");
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

			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/education/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Directly set the education data
			// console.log("response.data",response.data)
			setEducationData(Array.isArray(response.data) ? response.data : []);
		} catch (error) {
			console.error("Error fetching data:", error);
			alert("Error fetching education data.");
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

			// Call your backend API to delete the education entry
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/education/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// If the deletion is successful, update the state
			if (response.status === 200) {
				// Remove the deleted item from the state
				setEducationData((prevData) => {
					const updatedData = prevData.filter((edu) => edu._id !== id);
					// Check if the data is empty and handle accordingly
					if (updatedData.length === 0) {
						return []; // Return empty array if no data is left
					}
					return updatedData;
				});

				alert("Education entry deleted successfully");
			}
		} catch (error) {
			console.error("Error deleting education:", error);
			alert("Failed to delete the education entry. Please try again.");
		}
	};

	const getStartYears = () => {
		const years = [];
		const currentYear = new Date().getFullYear();
		for (let year = 1980; year <= currentYear; year++) {
			years.push(year);
		}
		return years;
	};

	const getEndYears = () => {
		const years = [];
		const currentYear = new Date().getFullYear();
		for (let year = 1980; year <= currentYear + 20; year++) {
			years.push(year);
		}
		return years;
	};

	// Fetch data on component mount
	useEffect(() => {
		fetchData(); // Fetch data when the component mounts
	}, []);

	return (
		<motion.div className='w-full mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center'>
					<div className='bg-green-100 p-3 rounded-full mr-4'>
						<GraduationCap className='w-6 h-6 text-green-600' />
					</div>
					<div>
						<h3 className='text-2xl font-bold text-gray-800'>Education</h3>
						<p className='text-gray-600'>Manage your educational background</p>
					</div>
				</div>
				<motion.button
					onClick={() => openModal()}
					className='flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					<Plus className='mr-2' size={18} />
					Add Education
				</motion.button>
			</div>

			{/* Education List */}
			<div className='space-y-6'>
				{educationData.length === 0 ? (
					<motion.div className='text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
						<div className='bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
							<GraduationCap className='w-8 h-8 text-gray-400' />
						</div>
						<p className='text-gray-500 text-lg'>No education records added yet</p>
						<p className='text-gray-400 text-sm mt-2'>Click "Add Education" to get started</p>
					</motion.div>
				) : (
					educationData.map((edu, index) => (
						<motion.div
							key={edu._id}
							className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}>
							<div className='flex items-start gap-4'>
								{/* Education Icon */}
								<div className='flex-shrink-0'>
									<div className='w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center'>
										<img
											src={"/assets/image.webp"}
											alt='Institution logo'
											className='w-12 h-12 object-contain'
											onError={(e) => {
												e.target.style.display = "none";
												e.target.nextSibling.style.display = "flex";
											}}
										/>
										<div className='w-12 h-12 bg-green-600 rounded-lg items-center justify-center' style={{ display: "none" }}>
											<School className='w-6 h-6 text-white' />
										</div>
									</div>
								</div>

								{/* Content */}
								<div className='flex-1'>
									<div className='flex items-start justify-between'>
										<div className='flex-1'>
											<h4 className='text-xl font-semibold text-gray-800 mb-1'>{edu.degree}</h4>
											<div className='flex items-center text-gray-600 mb-2'>
												<School className='w-4 h-4 mr-2' />
												<span className='font-medium'>{edu.institution}</span>
											</div>
											<div className='flex items-center text-gray-500 mb-2'>
												<Calendar className='w-4 h-4 mr-2' />
												<span>
													{edu.start_year} - {edu.end_year}
												</span>
											</div>
											{edu.gpa && (
												<div className='flex items-center text-gray-500'>
													<Award className='w-4 h-4 mr-2' />
													<span>GPA: {edu.gpa}</span>
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
												onClick={() => handleDelete(edu._id)}
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
			</div>
			{/* Enhanced Modal */}
			<Modal1 isOpen={isModalOpen} onClose={closeModal} fetchData={fetchData}>
				<div className='max-w-4xl mx-auto p-6'>
					<div className='border-b border-gray-200 pb-6'>
						<h2 className='text-2xl font-bold text-gray-800 flex items-center'>
							<GraduationCap className='mr-3 text-green-600' size={24} />
							{selectedEducationIndex !== null ? "Edit Education" : "Add New Education"}
						</h2>
					</div>

					<form onSubmit={handleSubmit} className='p-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Degree */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Award className='mr-2 text-green-500' size={16} />
									Degree
								</label>
								<input
									type='text'
									name='degree'
									value={formData.degree}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
									placeholder='e.g., Bachelor of Science'
								/>
								{errors.degree && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.degree}
									</p>
								)}
							</motion.div>

							{/* Institution */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<School className='mr-2 text-green-500' size={16} />
									Institution
								</label>
								<input
									type='text'
									name='institution'
									value={formData.institution}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
									placeholder='e.g., Harvard University'
								/>
								{errors.institution && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.institution}
									</p>
								)}
							</motion.div>

							{/* Start Year */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Calendar className='mr-2 text-blue-500' size={16} />
									Start Year
								</label>
								<select
									name='start_year'
									value={formData.start_year}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'>
									<option value=''>Select year</option>
									{getStartYears().map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
								{errors.start_year && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.start_year}
									</p>
								)}
							</motion.div>

							{/* End Year */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Calendar className='mr-2 text-blue-500' size={16} />
									End Year
								</label>
								<select
									name='end_year'
									value={formData.end_year}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'>
									<option value=''>Select year</option>
									{getEndYears().map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
								{errors.end_year && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.end_year}
									</p>
								)}
							</motion.div>

							{/* GPA */}
							<motion.div className='space-y-2 md:col-span-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Award className='mr-2 text-orange-500' size={16} />
									GPA (Optional)
								</label>
								<input
									type='number'
									name='gpa'
									value={formData.gpa || ""}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
									placeholder='e.g., 3.8'
									step='0.1'
									min='0'
									max='4'
								/>
								{errors.gpa && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.gpa}
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
								className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								{isLoading ? <div className='animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full'></div> : <GraduationCap className='mr-2' size={16} />}
								{isLoading ? "Saving..." : selectedEducationIndex !== null ? "Update" : "Add"} Education
							</motion.button>
						</div>
					</form>
				</div>
			</Modal1>
		</motion.div>
	);
};

export default EducationForm;
