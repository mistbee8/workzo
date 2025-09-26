import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { FaMagic } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import Sidebar from "../SideBar";
function ResumeForm() {
	const [file, setFile] = useState(null);
	const [status, setStatus] = useState("");
	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState("");
	const [error, setError] = useState("");
	const [resumeIds, setResumeIds] = useState([]);
	const [selectedResumeId, setSelectedResumeId] = useState(null);

	const navigate = useNavigate();
	const [isApiSuccess, setIsApiSuccess] = useState(false);
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const [formData, setFormData] = useState({
		full_name: "",
		phone: "",
		email: "",
		address: "",
		summary: "",
		skills: [{ name: "", proficiency: "" }],
		work_experience: [
			{
				job_title: "",
				company_name: "",
				start_date: "",
				end_date: "",
				responsibilities: [""],
			},
		],
		education: [
			{
				degree: "",
				institution: "",
				start_year: 0,
				end_year: 0,
				gpa: null,
			},
		],
		certifications: [""],
		languages: [""],
		social_media: [
			{
				platform: "",
				url: "",
			},
		],
	});

	const [responseMessage, setResponseMessage] = useState("");
	const [showWorkExperience, setShowWorkExperience] = useState(false);
	const [showEducation, setShowEducation] = useState(false);
	const [showSkills, setShowSkills] = useState(false);
	const [showCertifications, setShowCertifications] = useState(false);
	const [showLanguages, setShowLanguages] = useState(false);
	const [showSocialMedia, setShowSocialMedia] = useState(false);
	const [step, setStep] = useState(1); // Track current step
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleChange1 = (e) => {
		const { name, value } = e.target;

		// Update formData state without using prevData
		setFormData({ ...formData, [name]: value });

		// If the changed field is "summary", also update the summary state
		if (name === "summary") {
			setSummary(value); // Allow manual typing for summary
		}
	};

	// Skills
	const handleSkillChange = (index, field, value) => {
		const updatedSkills = [...formData.skills];
		updatedSkills[index][field] = value;
		setFormData({ ...formData, skills: updatedSkills });
	};

	const addSkill = () => {
		setFormData({
			...formData,
			skills: [
				...formData.skills,
				{
					name: "",
					proficiency: "",
				},
			],
		});
	};

	const removeSkill = (index) => {
		const updatedSkills = formData.skills.filter((_, i) => i !== index);
		setFormData({ ...formData, skills: updatedSkills });
	};

	const handleExperienceChange = (index, field, value) => {
		const updatedExperience = [...formData.work_experience];
		updatedExperience[index][field] = value;
		setFormData({ ...formData, work_experience: updatedExperience });
	};

	const addExperience = () => {
		setFormData((prev) => ({
			...prev,
			work_experience: [
				...prev.work_experience,
				{
					job_title: "",
					company_name: "",
					start_date: "",
					end_date: "",
					description: "",
				},
			],
		}));
	};

	const removeExperience = (index) => {
		setFormData((prevData) => ({
			...prevData,
			work_experience: prevData.work_experience.filter((_, i) => i !== index),
		}));
	};

	const handleEducationChange = (index, field, value) => {
		setFormData((prevData) => {
			const updatedEducation = [...prevData.education];

			updatedEducation[index][field] =
				field === "start_year" || field === "end_year"
					? parseInt(value, 10) || "" // Convert to number or keep it empty
					: value;

			return { ...prevData, education: updatedEducation };
		});
	};

	const removeEducation = (index) => {
		const updatedEducation = formData.education.filter((_, i) => i !== index);
		setFormData({ ...formData, education: updatedEducation });
	};
	const addEducation = () => {
		setFormData({
			...formData,
			education: [
				...formData.education,
				{
					degree: "",
					institution: "",
					start_year: "",
					end_year: "",
					achievements: [""],
				}, // Added achievements
			],
		});
	};

	// const removeEducation = (index) => {
	//   setFormData((prevData) => ({
	//     ...prevData,
	//     education: prevData.education.filter((_, i) => i !== index),
	//   }));
	// };

	// Certifications
	const handleCertificationsChange = (index, value) => {
		const updatedCertifications = formData.certifications.map((certification, i) => (i === index ? value : certification));
		setFormData({ ...formData, certifications: updatedCertifications });
	};

	const addCertification = () => {
		setFormData({
			...formData,
			certifications: [...formData.certifications, ""],
		});
	};

	const removeCertification = (index) => {
		setFormData((prevData) => ({
			...prevData,
			certifications: prevData.certifications.filter((_, i) => i !== index),
		}));
	};

	// Languages
	const handleLanguageChange = (index, value) => {
		const updatedLanguages = formData.languages.map((language, i) => (i === index ? value : language));
		setFormData({ ...formData, languages: updatedLanguages });
	};

	const addLanguage = () => {
		setFormData({
			...formData,
			languages: [...formData.languages, ""],
		});
	};

	const removeLanguage = (index) => {
		setFormData((prevData) => ({
			...prevData,
			languages: prevData.languages.filter((_, i) => i !== index),
		}));
	};

	// Social Media
	const handleSocialMediaChange = (index, field, value) => {
		const updatedSocialMedia = formData.social_media.map((platform, i) => (i === index ? { ...platform, [field]: value } : platform));
		setFormData({ ...formData, social_media: updatedSocialMedia });
	};

	const addSocialMedia = () => {
		setFormData({
			...formData,
			social_media: [...formData.social_media, { platform: "", url: "" }],
		});
	};

	const removeSocialMedia = (index) => {
		setFormData((prevData) => ({
			...prevData,
			social_media: prevData.social_media.filter((_, i) => i !== index),
		}));
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const parsedData = JSON.parse(event.target.result);
					setFormData(parsedData); // Populate fields with uploaded data
				} catch (error) {
					console.error("Invalid JSON file:", error);
					setResponseMessage("Invalid file format. Please upload a valid JSON file.");
				}
			};
			reader.readAsText(file);
		}
	};

	const handleSubmitEducation = async () => {
		try {
			const token = localStorage.getItem("access_token");
			if (!token) {
				alert("Authorization token is missing.");
				return;
			}

			console.log("📢 Calling Education API...");

			// ✅ Validate education data
			if (!formData.education || !Array.isArray(formData.education) || formData.education.length === 0) {
				console.log("⚠️ No education data found!", formData.education);
				alert("Please add at least one education entry before submitting.");
				return;
			}

			// ✅ Ensure all fields are filled
			const isValid = formData.education.every((edu) => edu.degree && edu.institution && edu.start_year && edu.end_year);
			if (!isValid) {
				alert("Please fill in all education fields before submitting.");
				return;
			}

			console.log("✅ Education Data:", formData.education);

			// ✅ Call API
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/education/`,
				formData.education, // ✅ Always an array
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			console.log("🎉 Education API Response:", response.data);

			// ✅ Handle success
			if (response.data && response.data.success) {
				fetchData(); // ✅ Refresh education data
				setStatus("Education details saved successfully!");
				return true; // ✅ Return true if successful
			} else {
				setStatus(`Error: ${response.data.detail || "Something went wrong"}`);
				return false; // ❌ Return false if error
			}
		} catch (error) {
			console.error("❌ Education API Error:", error.response?.data || error.message);
			setResponseMessage("Failed to upload education details. Please try again.");
			return false; // ❌ Return false if an error occurs
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("access_token");
		try {
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/auth/upload_resume`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setIsApiSuccess(true);
			setResponseMessage("Resume uploaded successfully!");

			if (response.status === 200) {
				const result = response.data;
				setStatus(`Upload successful! Resume ID: ${result.id}`);

				navigate(`/resume-builder`); // Use navigate to go to the next page
			} else {
				setStatus(`Error: ${response.data.detail || "Something went wrong"}`);
			}
		} catch (error) {
			console.error("Error uploading resume:", error);
			setResponseMessage("Failed to upload resume. Please try again.");
		}
	};

	//  const removeExperience = (index) => {
	//    setFormData((prevData) => ({
	//      ...prevData,
	//      work_experience: prevData.work_experience.filter((_, i) => i !== index),
	//    }));
	//  };
	const formatDate = (dateStr) => {
		if (!dateStr) return "";

		const date = new Date(dateStr);

		// Check if the date is valid
		if (isNaN(date.getTime())) return "Invalid Date";

		const month = `0${date.getMonth() + 1}`.slice(-2);
		const day = `0${date.getDate()}`.slice(-2);
		const year = date.getFullYear();

		return `${month}/${day}/${year}`;
	};
	const removeQuestion = (summary) => {
		const regex = /^(.*?\?)\s*/;
		return summary.replace(regex, "").trim();
	};

	const generateSummary = async () => {
		setLoading(true); // Start summary generation process
		setError(""); // Clear previous errors

		// Construct the prompt from the form data
		const prompt = `
Act as a professional resume writer. Based on the following details, generate a **concise** and **engaging** 250-word professional summary in paragraph form, avoiding direct repetition of the provided data.

Only include key achievements, skills, and professional qualities in a fluent, narrative style. **Avoid using my name—write in first-person perspective (using "I," "me," or "my").**

**Candidate Details:**
- Skills: ${formData.skills.map((skill) => `${skill.name} (${skill.proficiency})`).join(", ")}
- Work Experience: ${formData.work_experience.map((exp) => `${exp.job_title} at ${exp.company_name}`).join(", ")}
- Education: ${formData.education.map((edu) => `${edu.degree} from ${edu.institution}`).join(", ")}
- Certifications: ${formData.certifications.join(", ")}

**Output Format:** A short, professional summary in paragraph form, written in first person without including my name.
`.trim();
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job_api/process_prompt/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ prompt }), // Send the formatted string as the prompt
			});

			if (response.ok) {
				const result = await response.json();
				const resultsummary = result?.summary?.split("name.")[1]?.trim();
				// Clean summary from unnecessary questions

				setSummary(resultsummary); // Set cleaned summary
				setFormData((prevData) => ({
					...prevData,
					summary: resultsummary, // Update the summary with AI-generated one
				}));
			} else {
				setSummary("Error generating summary");
			}
		} catch (error) {
			setError("Error connecting to the backend.");
			console.error("Error:", error);
		}

		setLoading(false); // End summary generation process
	};

	// Function to remove unnecessary questions from the summary

	console.log("Resume IDs:", removeQuestion);
	const fetchAllResumes = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});

			// Check if the response status is 200
			if (response.status === 200) {
				setIsApiSuccess(true); // API call was successful, set to true
				const fetchedResumeIds = response.data.map((resume) => resume.id);
				console.log("Fetched resume IDs:", fetchedResumeIds);
				setResumeIds(fetchedResumeIds);

				// If there's at least one resume, set the first one as the selected resume
				if (fetchedResumeIds.length > 0) {
					setSelectedResumeId(fetchedResumeIds[0]);
				}
			} else {
				setIsApiSuccess(false); // API call failed, set to false
			}
		} catch (error) {
			console.error("Error fetching resumes:", error);
			setIsApiSuccess(false); // If an error occurs, set to false
		}
	};

	// useEffect to run fetchAllResumes only once when the component mounts
	useEffect(() => {
		fetchAllResumes();
	}, []); // Empty dependency array ensures it runs only once

	const progress = (step - 1) * (100 / 8); // Total steps: 8

	return (
		<>
			<Sidebar>
				<div className='mt-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-6'>
					<div className='max-w-6xl mx-auto'>
						{/* Header */}
						<div className='text-center mb-6 sm:mb-8 px-2'>
							<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2'>Create Your Resume</h1>
							<p className='text-sm sm:text-base text-gray-600'>Build a professional resume in 8 easy steps</p>
						</div>

						{/* Progress Bar */}
						<div className='mb-6 sm:mb-8 px-2'>
							<div className='flex justify-between items-center mb-3 sm:mb-4'>
								<span className='text-xs sm:text-sm text-gray-600'>Step {step} of 8</span>
								<span className='text-xs sm:text-sm text-blue-600 font-medium'>{Math.round(progress)}% Complete</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2 sm:h-3'>
								<div className='bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-300' style={{ width: `${progress}%` }}></div>
							</div>
						</div>

						{/* Main Content */}
						<div className='bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100'>
							<form className='space-y-4 sm:space-y-6' onSubmit={handleSubmit}>
								{/* Step 1: Basic Information */}
								{step === 1 && (
									<div className='space-y-4 sm:space-y-6'>
										<div className='text-center mb-6 sm:mb-8'>
											<h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-2'>Basic Information</h2>
											<p className='text-sm sm:text-base text-gray-600'>Let's start with your contact details</p>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
											<div>
												<label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
												<input
													type='text'
													name='full_name'
													placeholder='Enter your full name'
													value={formData.full_name}
													onChange={handleChange}
													className='w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
													required
												/>
											</div>
											<div>
												<label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
												<input
													type='tel'
													name='phone'
													placeholder='Enter your phone number'
													value={formData.phone}
													onChange={handleChange}
													className='w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
													required
												/>
											</div>
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
											<input
												type='email'
												name='email'
												placeholder='Enter your email address'
												value={formData.email}
												onChange={handleChange}
												className='w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
												required
											/>
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
											<textarea
												name='address'
												placeholder='Enter your full address'
												value={formData.address}
												onChange={handleChange}
												className='w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
												rows={3}
												required></textarea>
										</div>
									</div>
								)}

								{/* Step 2: Skills */}
								{step === 2 && (
									<div className='space-y-4 sm:space-y-6'>
										<div className='text-center mb-6 sm:mb-8'>
											<h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-2'>Skills & Expertise</h2>
											<p className='text-sm sm:text-base text-gray-600'>Add your professional skills and proficiency levels</p>
										</div>

										<div className='space-y-3 sm:space-y-4'>
											{formData.skills.map((skill, index) => (
												<div key={index} className='bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200'>
													<div className='flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 sm:items-end'>
														<div className='flex-1'>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Skill Name</label>
															<input
																type='text'
																placeholder='e.g., JavaScript, Project Management'
																value={skill.name}
																onChange={(e) => handleSkillChange(index, "name", e.target.value)}
																className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
															/>
														</div>
														<div className='flex-1'>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Proficiency Level</label>
															<select
																value={skill.proficiency}
																onChange={(e) => handleSkillChange(index, "proficiency", e.target.value)}
																className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'>
																<option value=''>Select Level</option>
																<option value='Beginner'>Beginner</option>
																<option value='Intermediate'>Intermediate</option>
																<option value='Advanced'>Advanced</option>
															</select>
														</div>
														<button
															type='button'
															onClick={() => removeSkill(index)}
															className='w-full sm:w-auto px-3 sm:px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors text-sm sm:text-base'>
															Remove
														</button>
													</div>
												</div>
											))}
										</div>

										<button
											type='button'
											onClick={() =>
												setFormData((prevData) => ({
													...prevData,
													skills: [...prevData.skills, { name: "", proficiency: "" }],
												}))
											}
											className='w-full p-3 sm:p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm sm:text-base'>
											+ Add Another Skill
										</button>
									</div>
								)}

								{/* Step 3: Work Experience */}
								{step === 3 && (
									<div className='space-y-4 sm:space-y-6'>
										<div className='text-center mb-6 sm:mb-8'>
											<h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-2'>Work Experience</h2>
											<p className='text-sm sm:text-base text-gray-600'>Tell us about your professional experience</p>
										</div>

										<div className='space-y-4 sm:space-y-6'>
											{formData.work_experience.map((experience, index) => (
												<div key={index} className='bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200'>
													<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0'>
														<h3 className='font-medium text-gray-800 text-sm sm:text-base'>Experience #{index + 1}</h3>
														<button
															type='button'
															onClick={() => removeExperience(index)}
															className='self-start sm:self-auto text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors text-sm'>
															Remove
														</button>
													</div>

													<div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4'>
														<div>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Job Title</label>
															<input
																type='text'
																placeholder='e.g., Software Engineer'
																value={experience.job_title}
																onChange={(e) => handleExperienceChange(index, "job_title", e.target.value)}
																className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
															/>
														</div>
														<div>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Company Name</label>
															<input
																type='text'
																placeholder='e.g., Tech Solutions Inc.'
																value={experience.company_name}
																onChange={(e) => handleExperienceChange(index, "company_name", e.target.value)}
																className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
															/>
														</div>
													</div>

													<div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4'>
														<div>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Start Date</label>
															<input
																type='date'
																value={experience.start_date}
																onChange={(e) => handleExperienceChange(index, "start_date", e.target.value)}
																className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
															/>
														</div>
														<div>
															<label className='block text-sm font-medium text-gray-700 mb-2'>End Date</label>
															<input
																type='date'
																value={experience.end_date}
																onChange={(e) => handleExperienceChange(index, "end_date", e.target.value)}
																className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
															/>
														</div>
													</div>

													<div>
														<label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
														<textarea
															placeholder='Describe your role and achievements...'
															value={experience.description}
															onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
															className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
															rows={4}></textarea>
													</div>
												</div>
											))}
										</div>

										<button
											type='button'
											onClick={() =>
												setFormData((prevData) => ({
													...prevData,
													work_experience: [
														...prevData.work_experience,
														{
															job_title: "",
															company_name: "",
															start_date: "",
															end_date: "",
															description: "",
														},
													],
												}))
											}
											className='w-full p-3 sm:p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm sm:text-base'>
											+ Add Another Experience
										</button>
									</div>
								)}

								{/* Step 4: Education */}
								{step === 4 && (
									<div className='space-y-6'>
										<div className='text-center mb-8'>
											<h2 className='text-2xl font-semibold text-gray-800 mb-2'>Education</h2>
											<p className='text-gray-600'>Add your educational background</p>
										</div>

										<div className='space-y-6'>
											{formData.education.map((education, index) => (
												<div key={index} className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
													<div className='flex justify-between items-center mb-4'>
														<h3 className='font-medium text-gray-800'>Education #{index + 1}</h3>
														<button type='button' onClick={() => removeEducation(index)} className='text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors'>
															Remove
														</button>
													</div>

													<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
														<div>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Degree</label>
															<input
																type='text'
																placeholder='e.g., Bachelor of Science'
																value={education.degree}
																onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
																className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
															/>
														</div>
														<div>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Institution</label>
															<input
																type='text'
																placeholder='e.g., University of Technology'
																value={education.institution}
																onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
																className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
															/>
														</div>
													</div>

													<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
														<div>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Start Year</label>
															<input
																type='number'
																placeholder='e.g., 2018'
																value={education.start_year}
																onChange={(e) => handleEducationChange(index, "start_year", parseInt(e.target.value, 10) || "")}
																className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
															/>
														</div>
														<div>
															<label className='block text-sm font-medium text-gray-700 mb-2'>End Year</label>
															<input
																type='number'
																placeholder='e.g., 2022'
																value={education.end_year}
																onChange={(e) => handleEducationChange(index, "end_year", parseInt(e.target.value, 10) || "")}
																className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
															/>
														</div>
													</div>
												</div>
											))}
										</div>

										<button
											type='button'
											onClick={() =>
												setFormData((prevData) => ({
													...prevData,
													education: [
														...prevData.education,
														{
															degree: "",
															institution: "",
															start_year: 0,
															end_year: 0,
														},
													],
												}))
											}
											className='w-full p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors'>
											+ Add Another Education
										</button>

										<div className='flex justify-end pt-4'>
											<button
												type='button'
												onClick={async () => {
													await handleSubmitEducation();
													setStep(5);
												}}
												className='px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg'>
												Save & Continue
											</button>
										</div>
									</div>
								)}

								{/* Step 5: Certifications */}
								{step === 5 && (
									<div className='space-y-6'>
										<div className='text-center mb-8'>
											<h2 className='text-2xl font-semibold text-gray-800 mb-2'>Certifications</h2>
											<p className='text-gray-600'>Add your professional certifications</p>
										</div>

										<div className='space-y-4'>
											{formData.certifications.map((certification, index) => (
												<div key={index} className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
													<div className='flex space-x-4 items-center'>
														<div className='flex-1'>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Certification Name</label>
															<input
																type='text'
																placeholder='e.g., AWS Certified Solutions Architect'
																value={certification}
																onChange={(e) => handleCertificationsChange(index, e.target.value)}
																className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
															/>
														</div>
														<button type='button' onClick={() => removeCertification(index)} className='px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors mt-6'>
															Remove
														</button>
													</div>
												</div>
											))}
										</div>

										<button
											type='button'
											onClick={() =>
												setFormData((prevData) => ({
													...prevData,
													certifications: [...prevData.certifications, ""],
												}))
											}
											className='w-full p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors'>
											+ Add Another Certification
										</button>
									</div>
								)}

								{/* Step 6: Languages */}
								{step === 6 && (
									<div className='space-y-6'>
										<div className='text-center mb-8'>
											<h2 className='text-2xl font-semibold text-gray-800 mb-2'>Languages</h2>
											<p className='text-gray-600'>What languages do you speak?</p>
										</div>

										<div className='space-y-4'>
											{formData.languages.map((language, index) => (
												<div key={index} className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
													<div className='flex space-x-4 items-center'>
														<div className='flex-1'>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Language</label>
															<input
																type='text'
																placeholder='e.g., English, Spanish, French'
																value={language}
																onChange={(e) => handleLanguageChange(index, e.target.value)}
																className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
															/>
														</div>
														<button type='button' onClick={() => removeLanguage(index)} className='px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors mt-6'>
															Remove
														</button>
													</div>
												</div>
											))}
										</div>

										<button
											type='button'
											onClick={() =>
												setFormData((prevData) => ({
													...prevData,
													languages: [...prevData.languages, ""],
												}))
											}
											className='w-full p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors'>
											+ Add Another Language
										</button>
									</div>
								)}

								{/* Step 7: Social Media */}
								{step === 7 && (
									<div className='space-y-6'>
										<div className='text-center mb-8'>
											<h2 className='text-2xl font-semibold text-gray-800 mb-2'>Social Media Links</h2>
											<p className='text-gray-600'>Add your professional social media profiles</p>
										</div>

										<div className='space-y-4'>
											{formData.social_media.map((platform, index) => (
												<div key={index} className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
													<div className='flex space-x-4 items-end'>
														<div className='flex-1'>
															<label className='block text-sm font-medium text-gray-700 mb-2'>Platform</label>
															<input
																type='text'
																placeholder='e.g., LinkedIn, GitHub, Twitter'
																value={platform.platform}
																onChange={(e) => handleSocialMediaChange(index, "platform", e.target.value)}
																className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
															/>
														</div>
														<div className='flex-1'>
															<label className='block text-sm font-medium text-gray-700 mb-2'>URL</label>
															<input
																type='url'
																placeholder='https://linkedin.com/in/yourprofile'
																value={platform.url}
																onChange={(e) => handleSocialMediaChange(index, "url", e.target.value)}
																className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
															/>
														</div>
														<button type='button' onClick={() => removeSocialMedia(index)} className='px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors'>
															Remove
														</button>
													</div>
												</div>
											))}
										</div>

										<button
											type='button'
											onClick={() =>
												setFormData((prevData) => ({
													...prevData,
													social_media: [...prevData.social_media, { platform: "", url: "" }],
												}))
											}
											className='w-full p-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors'>
											+ Add Another Social Media
										</button>
									</div>
								)}

								{/* Step 8: Summary */}
								{step === 8 && (
									<div className='space-y-4 sm:space-y-6'>
										<div className='text-center mb-6 sm:mb-8'>
											<h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-2'>Professional Summary</h2>
											<p className='text-sm sm:text-base text-gray-600'>Write a compelling summary or let AI help you</p>
										</div>

										<div className='bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-lg border border-gray-200'>
											<div className='flex flex-col lg:flex-row gap-4 sm:gap-6'>
												<div className='flex-1'>
													<label className='block text-sm font-medium text-gray-700 mb-2'>Your Professional Summary</label>
													<textarea
														name='summary'
														placeholder='Write your professional summary here... or use the AI generator!'
														value={formData.summary}
														onChange={handleChange}
														className='w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base'
														rows={8}></textarea>
												</div>

												<div className='lg:w-48 flex flex-col items-center justify-center'>
													<div className='text-center mb-4'>
														<h3 className='font-medium text-gray-800 mb-2 text-sm sm:text-base'>AI Summary Generator</h3>
														<p className='text-xs sm:text-sm text-gray-600'>Let AI create a professional summary based on your information</p>
													</div>
													<button
														type='button'
														onClick={generateSummary}
														disabled={loading}
														className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base'>
														{loading ? (
															<>
																<BeatLoader size={8} color='white' />
																<span>Generating...</span>
															</>
														) : (
															<>
																<FaMagic size={16} className='sm:w-5 sm:h-5' />
																<span>Generate with AI</span>
															</>
														)}
													</button>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Navigation Buttons */}
								<div className='flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-200 space-y-3 sm:space-y-0'>
									{step > 1 ? (
										<button
											type='button'
											onClick={() => setStep(step - 1)}
											className='w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base'>
											← Previous
										</button>
									) : (
										<div></div>
									)}

									{step < 8 ? (
										<button
											type='button'
											onClick={() => setStep(step + 1)}
											className='w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg text-sm sm:text-base'>
											Next →
										</button>
									) : (
										<button
											type='button'
											onClick={handleSubmit}
											className='w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all shadow-lg font-semibold text-sm sm:text-base'>
											Submit Resume
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</Sidebar>
		</>
	);
}

export default ResumeForm;
