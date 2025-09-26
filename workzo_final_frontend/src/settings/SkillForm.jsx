import React, { useState, useEffect } from "react";
import Modal1 from "../job/Modal1";
import axios from "axios";
import { motion } from "framer-motion";
import { Brain, Plus, Edit3, Trash2, CheckCircle, Star, Award, Target, AlertCircle } from "lucide-react";

const DynamicSkillForm = () => {
	const [skills, setSkills] = useState([]); // Ensure skills is initialized as an array
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentSkill, setCurrentSkill] = useState({
		name: "",
		proficiency: "",
	});
	const [editingIndex, setEditingIndex] = useState(null);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const proficiencyLevels = [
		{ value: "Beginner", label: "Beginner", color: "bg-red-100 text-red-700", icon: Target },
		{ value: "Intermediate", label: "Intermediate", color: "bg-yellow-100 text-yellow-700", icon: Star },
		{ value: "Advanced", label: "Advanced", color: "bg-green-100 text-green-700", icon: Award },
		{ value: "Expert", label: "Expert", color: "bg-blue-100 text-blue-700", icon: Brain },
	];

	// Fetch skills data on initial load
	useEffect(() => {
		fetchData();
	}, []);

	// Open the modal for adding or editing a skill
	const openModal = (index = null) => {
		if (index !== null) {
			setCurrentSkill(skills[index]);
			setEditingIndex(index);
		} else {
			setCurrentSkill({ name: "", proficiency: "" });
			setEditingIndex(null);
		}
		setIsModalOpen(true);
	};

	// Close the modal
	const closeModal = () => {
		setIsModalOpen(false);
		setEditingIndex(null);
	};

	// Handle skill input changes inside the modal
	const handleInputChange = (field, value) => {
		setCurrentSkill((prev) => ({ ...prev, [field]: value }));
	};

	// Validate skill input
	const validateSkill = () => {
		const errors = {};
		if (!currentSkill.name) errors.name = "Skill name is required";
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	// Save the skill (add new or update existing)
	const saveSkill = async () => {
		if (!validateSkill()) return;

		setIsLoading(true);
		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				alert("Authorization token is missing.");
				return;
			}

			// Prepare the skill data
			const skillData = [
				{
					name: currentSkill.name,
					proficiency: currentSkill.proficiency,
				},
			];

			const endpoint = `${import.meta.env.VITE_BACKEND_URL}/job_api/skills/`;

			let response;

			if (editingIndex !== null) {
				// Update existing skill
				response = await axios.put(
					`${endpoint}${skills[editingIndex]._id}`, // assuming each skill has an _id
					skillData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);
			} else {
				// Add new skill
				response = await axios.post(endpoint, skillData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
			}

			if (response.status === 200) {
				if (editingIndex !== null) {
					// Update the skill in the state
					const updatedSkills = [...skills];
					updatedSkills[editingIndex] = {
						...currentSkill,
						_id: skills[editingIndex]._id,
					};
					setSkills(updatedSkills);
				} else {
					// Add the new skill to the state
					setSkills([...skills, { ...currentSkill, _id: response.data[0]._id }]);
				}
				closeModal();
				alert("Skill saved successfully!");
			}
		} catch (error) {
			console.error("Error saving skill:", error);
			alert("Failed to save skill. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// Fetch skills data from the backend
	const fetchData = async () => {
		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				alert("Authorization token is missing.");
				return;
			}

			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/skills/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Check if response.data.skills is an array
			if (Array.isArray(response.data.skills)) {
				setSkills(response.data.skills);
			} else {
				console.error("Fetched data is not an array:", response.data);
				alert("Error fetching skills data. Please try again.");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			alert("Error fetching skills data. Please try again.");
		}
	};

	// Remove a skill
	const removeSkill = async (index) => {
		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				alert("Authorization token is missing.");
				return;
			}

			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/job_api/skills/${skills[index]._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				const updatedSkills = skills.filter((_, i) => i !== index);
				setSkills(updatedSkills);
				alert("Skill removed successfully!");
			}
		} catch (error) {
			console.error("Error removing skill:", error);
			alert("Failed to remove skill. Please try again.");
		}
	};

	return (
		<motion.div className='w-full mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center'>
					<div className='bg-purple-100 p-3 rounded-full mr-4'>
						<Brain className='w-6 h-6 text-purple-600' />
					</div>
					<div>
						<h2 className='text-2xl font-bold text-gray-800'>Skills</h2>
						<p className='text-gray-600'>Showcase your technical abilities</p>
					</div>
				</div>
				<motion.button
					onClick={() => openModal()}
					className='flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					<Plus className='mr-2' size={18} />
					Add Skill
				</motion.button>
			</div>

			{/* Skills List */}
			<div className='space-y-4'>
				{skills.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{skills.map((skill, index) => {
							const proficiencyData = proficiencyLevels.find((p) => p.value === skill.proficiency);
							const ProficiencyIcon = proficiencyData?.icon || Target;

							return (
								<motion.div
									key={skill._id || index}
									className='bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}>
									<div className='flex items-center justify-between'>
										<div className='flex items-center flex-1'>
											<div className='bg-purple-100 p-2 rounded-lg mr-3'>
												<Brain className='text-purple-600 text-lg' size={20} />
											</div>
											<div className='flex-1'>
												<h3 className='font-semibold text-gray-800'>{skill.name}</h3>
												{skill.proficiency && (
													<div className='flex items-center mt-1'>
														<ProficiencyIcon size={14} className='mr-1' />
														<span className={`px-2 py-1 rounded-full text-xs font-medium ${proficiencyData?.color || "bg-gray-100 text-gray-700"}`}>{skill.proficiency}</span>
													</div>
												)}
											</div>
										</div>
										<div className='flex space-x-2'>
											<motion.button
												onClick={() => openModal(index)}
												className='p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200'
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}>
												<Edit3 size={16} />
											</motion.button>
											<motion.button
												onClick={() => removeSkill(index)}
												className='p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200'
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}>
												<Trash2 size={16} />
											</motion.button>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>
				) : (
					<motion.div className='text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
						<div className='bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
							<Brain className='w-8 h-8 text-purple-400' />
						</div>
						<p className='text-gray-500 text-lg'>No skills added yet</p>
						<p className='text-gray-400 text-sm mt-2'>Click "Add Skill" to showcase your abilities</p>
					</motion.div>
				)}
			</div>
			{/* Enhanced Modal */}
			<Modal1 isOpen={isModalOpen} onClose={closeModal} fetchData={fetchData}>
				<div className='max-w-lg mx-auto p-6'>
					<div className='border-b border-gray-200 pb-6'>
						<h3 className='text-2xl font-bold text-gray-800 flex items-center'>
							<Brain className='mr-3 text-purple-600' size={24} />
							{editingIndex !== null ? "Edit Skill" : "Add Skill"}
						</h3>
					</div>

					<div className='p-6'>
						<div className='space-y-6'>
							{/* Skill Name */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>Skill Name *</label>
								<input
									type='text'
									value={currentSkill.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.name ? "border-red-500" : "border-gray-300"}`}
									placeholder='e.g., JavaScript, Python, React'
								/>
								{errors.name && (
									<p className='text-red-500 text-sm mt-1 flex items-center'>
										<AlertCircle size={14} className='mr-1' />
										{errors.name}
									</p>
								)}
							</div>

							{/* Proficiency Level */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>Proficiency Level</label>
								<div className='grid grid-cols-2 gap-3'>
									{proficiencyLevels.map((level) => {
										const IconComponent = level.icon;
										return (
											<motion.button
												key={level.value}
												type='button'
												onClick={() => handleInputChange("proficiency", level.value)}
												className={`p-3 rounded-lg border-2 transition-all duration-200 ${currentSkill.proficiency === level.value ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"}`}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}>
												<div className='flex items-center'>
													<IconComponent size={16} className='mr-2' />
													<span className='text-sm font-medium'>{level.label}</span>
												</div>
											</motion.button>
										);
									})}
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6'>
							<button type='button' onClick={closeModal} className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
								Cancel
							</button>
							<motion.button
								type='button'
								onClick={saveSkill}
								disabled={isLoading}
								className='px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								{isLoading ? <div className='animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full'></div> : <CheckCircle className='mr-2' size={16} />}
								{isLoading ? "Saving..." : "Save Skill"}
							</motion.button>
						</div>
					</div>
				</div>
			</Modal1>
		</motion.div>
	);
};

export default DynamicSkillForm;
