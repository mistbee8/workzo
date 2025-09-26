import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import Modal1 from "../job/Modal1";
import { motion } from "framer-motion";
import { FolderOpen, ExternalLink, Calendar, MapPin, FileText, Plus, Edit3, Trash2, AlertCircle, Link } from "lucide-react";

const ProjectForm = () => {
	const [projectData, setProjectData] = useState([]);
	const [errors, setErrors] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		project_title: "",
		project_name: "",
		start_month: "",
		end_month: "",
		start_year: "",
		end_year: "",
		description: "",
		location: "",
		link: "",
	});

	// Handle form input changes for the modal form
	const handleModalChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Open the modal for adding or editing a project
	const openModal = (index = null) => {
		if (index !== null) {
			// Edit existing data
			setSelectedProjectIndex(index);
			setFormData({ ...projectData[index] });
		} else {
			// Add new data
			setFormData({
				project_title: "",
				project_name: "",
				start_month: "",
				end_month: "",
				start_year: "",
				end_year: "",
				description: "",
				location: "",
				link: "",
			});
		}
		fetchData();
		setIsModalOpen(true);
	};

	// Close the modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedProjectIndex(null);
	};

	// Validate form inputs
	const validateForm = () => {
		let formErrors = {};
		if (!formData.project_name) {
			formErrors.project_name = "Project name is required";
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
				if (selectedProjectIndex !== null) {
					const updatedData = [...projectData];
					updatedData[selectedProjectIndex] = formData;
					setProjectData(updatedData);

					// Call your backend to update the project data
					const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/project/${projectData[selectedProjectIndex]._id}`, formData, {
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					});

					alert("Project information updated successfully!");
				} else {
					// If adding, append new data
					const response = await axios.post(
						`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/project/`,
						[formData], // Send an array as required by the backend
						{
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						}
					);

					setProjectData((prev) => [...prev, ...response.data.ids]);
					alert("Project information added successfully!");
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

			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/project/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Directly set the project data
			// console.log("msbkdd",response.data)
			setProjectData(Array.isArray(response.data) ? response.data : []);
		} catch (error) {
			console.error("Error fetching data:", error);
			alert("Error fetching project data.");
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

			// Call your backend API to delete the project entry
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/project/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// If the deletion is successful, update the state
			if (response.status === 200) {
				// Remove the deleted item from the state
				setProjectData((prevData) => {
					const updatedData = prevData.filter((proj) => proj._id !== id);
					// Check if the data is empty and handle accordingly
					if (updatedData.length === 0) {
						return []; // Return empty array if no data is left
					}
					return updatedData;
				});

				alert("Project entry deleted successfully");
			}
		} catch (error) {
			console.error("Error deleting project:", error);
			alert("Failed to delete the project entry. Please try again.");
		}
	};

	// Fetch data on component mount
	useEffect(() => {
		fetchData(); // Fetch data when the component mounts
	}, []);

	// Function to generate years (1980 to present)
	const getYears = () => {
		const years = [];
		const currentYear = new Date().getFullYear();
		for (let year = 2000; year <= currentYear; year++) {
			years.push(year);
		}
		return years;
	};

	// Predefined months list
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return (
		<motion.div className='w-full mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center'>
					<div className='bg-purple-100 p-3 rounded-full mr-4'>
						<FolderOpen className='w-6 h-6 text-purple-600' />
					</div>
					<div>
						<h3 className='text-2xl font-bold text-gray-800'>Projects</h3>
						<p className='text-gray-600'>Showcase your project portfolio</p>
					</div>
				</div>
				<motion.button
					onClick={() => openModal()}
					className='flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					<Plus className='mr-2' size={18} />
					Add Project
				</motion.button>
			</div>

			{/* Projects List */}
			<div className='space-y-6'>
				{projectData.length === 0 ? (
					<motion.div className='text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
						<div className='bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
							<FolderOpen className='w-8 h-8 text-gray-400' />
						</div>
						<p className='text-gray-500 text-lg'>No projects added yet</p>
						<p className='text-gray-400 text-sm mt-2'>Click "Add Project" to showcase your work</p>
					</motion.div>
				) : (
					projectData.map((proj, index) => (
						<motion.div
							key={proj._id}
							className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}>
							<div className='flex items-start gap-4'>
								{/* Project Icon */}
								<div className='flex-shrink-0'>
									<div className='w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center'>
										<img
											src={"/assets/portfolio.svg"}
											alt='Project icon'
											className='w-12 h-12 object-contain'
											onError={(e) => {
												e.target.style.display = "none";
												e.target.nextSibling.style.display = "flex";
											}}
										/>
										<div className='w-12 h-12 bg-purple-600 rounded-lg items-center justify-center' style={{ display: "none" }}>
											<FolderOpen className='w-6 h-6 text-white' />
										</div>
									</div>
								</div>

								{/* Content */}
								<div className='flex-1'>
									<div className='flex items-start justify-between'>
										<div className='flex-1'>
											<h4 className='text-xl font-semibold text-gray-800 mb-1'>{proj.project_title}</h4>
											<p className='text-lg text-gray-600 mb-2'>{proj.project_name}</p>
											<div className='flex items-center text-gray-500 mb-2'>
												<Calendar className='w-4 h-4 mr-2' />
												<span>
													{proj.start_month} {proj.start_year} - {proj.end_month} {proj.end_year}
												</span>
											</div>
											{proj.location && (
												<div className='flex items-center text-gray-500 mb-3'>
													<MapPin className='w-4 h-4 mr-2' />
													<span>{proj.location}</span>
												</div>
											)}
											{proj.description && (
												<div className='bg-gray-50 p-3 rounded-lg mb-3'>
													<div className='flex items-start'>
														<FileText className='w-4 h-4 mr-2 text-gray-400 mt-0.5' />
														<p className='text-gray-700 text-sm leading-relaxed'>{proj.description}</p>
													</div>
												</div>
											)}
											{proj.link && (
												<div className='flex items-center'>
													<Link className='w-4 h-4 mr-2 text-blue-500' />
													<a href={proj.link} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:text-blue-700 text-sm hover:underline'>
														View Project
													</a>
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
												onClick={() => handleDelete(proj._id)}
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
							<FolderOpen className='mr-3 text-purple-600' size={24} />
							{selectedProjectIndex !== null ? "Edit Project" : "Add New Project"}
						</h2>
					</div>

					<form onSubmit={handleSubmit} className='p-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Project Title */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<FolderOpen className='mr-2 text-purple-500' size={16} />
									Project Title
								</label>
								<input
									type='text'
									name='project_title'
									value={formData.project_title}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
									placeholder='Enter project title'
								/>
							</motion.div>

							{/* Project Name */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<FileText className='mr-2 text-purple-500' size={16} />
									Project Name
								</label>
								<input
									type='text'
									name='project_name'
									value={formData.project_name}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
									placeholder='Enter project name'
								/>
								{errors.project_name && (
									<p className='text-red-500 text-sm flex items-center'>
										<AlertCircle className='mr-1' size={14} />
										{errors.project_name}
									</p>
								)}
							</motion.div>

							{/* Start Month */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Calendar className='mr-2 text-blue-500' size={16} />
									Start Month
								</label>
								<select
									name='start_month'
									value={formData.start_month}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'>
									<option value=''>Select month</option>
									{months.map((month, index) => (
										<option key={index} value={month}>
											{month}
										</option>
									))}
								</select>
							</motion.div>

							{/* Start Year */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Calendar className='mr-2 text-blue-500' size={16} />
									Start Year
								</label>
								<select
									name='start_year'
									value={formData.start_year}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'>
									<option value=''>Select year</option>
									{getYears().map((year) => (
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

							{/* End Month */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Calendar className='mr-2 text-blue-500' size={16} />
									End Month
								</label>
								<select
									name='end_month'
									value={formData.end_month}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'>
									<option value=''>Select month</option>
									{months.map((month, index) => (
										<option key={index} value={month}>
											{month}
										</option>
									))}
								</select>
							</motion.div>

							{/* End Year */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<Calendar className='mr-2 text-blue-500' size={16} />
									End Year
								</label>
								<select
									name='end_year'
									value={formData.end_year}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'>
									<option value=''>Select year</option>
									{getYears().map((year) => (
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

							{/* Location */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<MapPin className='mr-2 text-green-500' size={16} />
									Location
								</label>
								<input
									type='text'
									name='location'
									value={formData.location}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
									placeholder='Enter location'
								/>
							</motion.div>

							{/* Link */}
							<motion.div className='space-y-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<ExternalLink className='mr-2 text-blue-500' size={16} />
									Project Link
								</label>
								<input
									type='url'
									name='link'
									value={formData.link}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
									placeholder='https://example.com'
								/>
							</motion.div>

							{/* Description */}
							<motion.div className='space-y-2 md:col-span-2' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
								<label className='flex items-center text-sm font-medium text-gray-700'>
									<FileText className='mr-2 text-orange-500' size={16} />
									Description
								</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleModalChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none'
									placeholder='Describe your project, technologies used, and key achievements'
									rows='4'
								/>
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
								className='px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								{isLoading ? <div className='animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full'></div> : <FolderOpen className='mr-2' size={16} />}
								{isLoading ? "Saving..." : selectedProjectIndex !== null ? "Update" : "Add"} Project
							</motion.button>
						</div>
					</form>
				</div>
			</Modal1>
		</motion.div>
	);
};

export default ProjectForm;
