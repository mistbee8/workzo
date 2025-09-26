import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaMagic } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
const EditResume = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const { id } = useParams();
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
				start_year: "",
				end_year: "",
				achievements: [""],
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
	const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [summary, setSummary] = useState("");

	const [resumeIds, setResumeIds] = useState([]);
	const [selectedResumeId, setSelectedResumeId] = useState("");

	const fetchAllResume = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});

			const fetchedResumeIds = response.data.map((resume) => resume.id);
			setResumeIds(fetchedResumeIds);

			if (fetchedResumeIds.length > 0) {
				setSelectedResumeId(fetchedResumeIds[0]);
			}
		} catch (error) {
			console.error("Error fetching resumes:", error);
		}
	};

	useEffect(() => {
		if (id) {
			const fetchResumeData = async () => {
				try {
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/${id}`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("access_token")}`,
						},
					});
					setFormData(response.data);
				} catch (err) {
					setError("Failed to fetch resume data.");
				}
			};

			fetchResumeData();
		}
	}, [id]);

	useEffect(() => {
		fetchAllResume();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleChange1 = (e) => {
		const { name, value } = e.target;

		// If the field is "summary", update the summary state as well
		if (name === "summary") {
			setSummary(value); // Update the 'summary' directly when it's being edited
		}

		// Update other formData fields normally
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSkillChange = (index, field, value) => {
		setFormData((prevData) => ({
			...prevData,
			skills: prevData.skills.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill)),
		}));
	};

	const addSkill = () => {
		setFormData((prevData) => ({
			...prevData,
			skills: [...prevData.skills, { name: "", proficiency: "" }],
		}));
	};

	const removeSkill = (index) => {
		setFormData((prevData) => ({
			...prevData,
			skills: prevData.skills.filter((_, i) => i !== index),
		}));
	};

	// Work Experience
	const handleExperienceChange = (index, field, value) => {
		setFormData((prevData) => ({
			...prevData,
			work_experience: prevData.work_experience.map((experience, i) => (i === index ? { ...experience, [field]: value } : experience)),
		}));
	};

	const addExperience = () => {
		setFormData((prevData) => ({
			...prevData,
			work_experience: [
				...prevData.work_experience,
				{
					job_title: "",
					company_name: "",
					start_date: "",
					end_date: "",
					responsibilities: [""],
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

	// Education
	const handleEducationChange = (index, field, value) => {
		setFormData((prevData) => ({
			...prevData,
			education: prevData.education.map((education, i) => (i === index ? { ...education, [field]: value } : education)),
		}));
	};

	const addEducation = () => {
		setFormData((prevData) => ({
			...prevData,
			education: [
				...prevData.education,
				{
					degree: "",
					institution: "",
					start_year: "",
					end_year: "",
					achievements: [""],
				},
			],
		}));
	};

	const removeEducation = (index) => {
		setFormData((prevData) => ({
			...prevData,
			education: prevData.education.filter((_, i) => i !== index),
		}));
	};

	// Certifications
	const handleCertificationsChange = (index, value) => {
		setFormData((prevData) => ({
			...prevData,
			certifications: prevData.certifications.map((certification, i) => (i === index ? value : certification)),
		}));
	};

	const addCertification = () => {
		setFormData((prevData) => ({
			...prevData,
			certifications: [...prevData.certifications, ""],
		}));
	};

	const removeCertification = (index) => {
		setFormData((prevData) => ({
			...prevData,
			certifications: prevData.certifications.filter((_, i) => i !== index),
		}));
	};

	// Languages
	const handleLanguageChange = (index, value) => {
		setFormData((prevData) => ({
			...prevData,
			languages: prevData.languages.map((language, i) => (i === index ? value : language)),
		}));
	};

	const addLanguage = () => {
		setFormData((prevData) => ({
			...prevData,
			languages: [...prevData.languages, ""],
		}));
	};

	const removeLanguage = (index) => {
		setFormData((prevData) => ({
			...prevData,
			languages: prevData.languages.filter((_, i) => i !== index),
		}));
	};

	// Social Media
	const handleSocialMediaChange = (index, field, value) => {
		setFormData((prevData) => ({
			...prevData,
			social_media: prevData.social_media.map((platform, i) => (i === index ? { ...platform, [field]: value } : platform)),
		}));
	};

	const addSocialMedia = () => {
		setFormData((prevData) => ({
			...prevData,
			social_media: [...prevData.social_media, { platform: "", url: "" }],
		}));
	};

	const removeSocialMedia = (index) => {
		setFormData((prevData) => ({
			...prevData,
			social_media: prevData.social_media.filter((_, i) => i !== index),
		}));
	};

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

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	// Track current step
	const progress = (step - 1) * (100 / 8); // Total steps: 8

	const generateSummary = async (e) => {
		e.preventDefault(); // Prevent form submission when generating summary

		setIsGeneratingSummary(true);
		setError("");

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
				body: JSON.stringify({ prompt }),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}

			const result = await response.json();
			const resultsummary = result?.summary?.split("name.")[1]?.trim();

			setSummary(resultsummary); // Set the summary in state
			setFormData((prevData) => ({
				...prevData,
				summary: resultsummary, // Update the form data with the generated summary
			}));
		} catch (error) {
			setError(error.message || "Error connecting to the backend.");
			console.error("Error:", error);
		}

		setIsGeneratingSummary(false); // End loading state when done
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent form submission

		if (step === 8 && formData.summary.trim() === "") {
			alert("Please fill out the summary section.");
			return; // Don't proceed if summary is empty
		}

		if (step === 8 && formData.summary.trim() !== "") {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/${id}/edit`, formData, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				});
				alert("Resume updated successfully!");
				navigate("/resume-builder"); // Navigate after successful update
			} catch (err) {
				setError("Failed to update resume.");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
			<div className='container mx-auto px-4 py-8'>
				{/* Header Section */}
				<div className='text-center mb-8'>
					<h1 className='text-4xl font-bold text-gray-800 mb-2'>Edit Resume</h1>
					<p className='text-gray-600 text-lg'>Update your professional information</p>
				</div>

				{/* Progress Bar */}
				<div className='max-w-4xl mx-auto mb-8'>
					<div className='bg-white rounded-2xl shadow-lg p-6'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-lg font-semibold text-gray-700'>Progress</h3>
							<span className='text-sm font-medium text-gray-600'>{Math.round(progress)}% Complete</span>
						</div>
						<div className='w-full bg-gray-200 rounded-full h-3'>
							<div className='bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-in-out' style={{ width: `${progress}%` }}></div>
						</div>
						<div className='flex justify-between mt-2 text-xs text-gray-500'>
							<span>Basic Info</span>
							<span>Skills</span>
							<span>Experience</span>
							<span>Education</span>
							<span>Complete</span>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='max-w-4xl mx-auto'>
					<div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
						<div className='p-8'>
							<form onSubmit={handleSubmit} className='space-y-8'>
								{/* Step Content */}
								<div className='min-h-96'>
									{/* Step 1: Basic Information */}
									{step === 1 && (
										<div className='space-y-6 animate-fade-in'>
											<div className='text-center mb-8'>
												<div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
													<svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
														<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
													</svg>
												</div>
												<h2 className='text-2xl font-bold text-gray-800 mb-2'>Personal Information</h2>
												<p className='text-gray-600'>Let's start with your basic details</p>
											</div>

											<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
												<div className='space-y-2'>
													<label className='block text-sm font-medium text-gray-700'>Full Name</label>
													<input
														type='text'
														name='full_name'
														value={formData.full_name}
														onChange={handleChange}
														className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
														placeholder='Enter your full name'
														required
													/>
												</div>

												<div className='space-y-2'>
													<label className='block text-sm font-medium text-gray-700'>Phone Number</label>
													<input
														type='tel'
														name='phone'
														value={formData.phone}
														onChange={handleChange}
														className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
														placeholder='Enter your phone number'
														required
													/>
												</div>

												<div className='space-y-2'>
													<label className='block text-sm font-medium text-gray-700'>Email Address</label>
													<input
														type='email'
														name='email'
														value={formData.email}
														onChange={handleChange}
														className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
														placeholder='Enter your email address'
														required
													/>
												</div>

												<div className='space-y-2'>
													<label className='block text-sm font-medium text-gray-700'>Address</label>
													<textarea
														name='address'
														value={formData.address}
														onChange={handleChange}
														rows='3'
														className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
														placeholder='Enter your address'
														required></textarea>
												</div>
											</div>
										</div>
									)}

									{/* Step 2: Skills */}
									{step === 2 && (
										<div className='space-y-6 animate-fade-in'>
											<div className='text-center mb-8'>
												<div className='w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4'>
													<svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2'
															d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
														/>
													</svg>
												</div>
												<h2 className='text-2xl font-bold text-gray-800 mb-2'>Skills & Expertise</h2>
												<p className='text-gray-600'>Showcase your technical and professional skills</p>
											</div>

											<div className='space-y-4'>
												{formData.skills.map((skill, index) => (
													<div key={index} className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
														<div className='flex gap-4 items-end'>
															<div className='flex-1'>
																<label className='block text-sm font-medium text-gray-700 mb-2'>Skill Name</label>
																<input
																	type='text'
																	value={skill.name}
																	onChange={(e) => handleSkillChange(index, "name", e.target.value)}
																	className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
																	placeholder='e.g., JavaScript, Project Management'
																/>
															</div>
															<div className='flex-1'>
																<label className='block text-sm font-medium text-gray-700 mb-2'>Proficiency Level</label>
																<select
																	value={skill.proficiency}
																	onChange={(e) => handleSkillChange(index, "proficiency", e.target.value)}
																	className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'>
																	<option value=''>Select Level</option>
																	<option value='Beginner'>Beginner</option>
																	<option value='Intermediate'>Intermediate</option>
																	<option value='Advanced'>Advanced</option>
																	<option value='Expert'>Expert</option>
																</select>
															</div>
															<button type='button' onClick={() => removeSkill(index)} className='bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors'>
																<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		strokeWidth='2'
																		d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
																	/>
																</svg>
															</button>
														</div>
													</div>
												))}
											</div>

											<button
												type='button'
												onClick={addSkill}
												className='w-full bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg py-4 px-6 text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2'>
												<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
												</svg>
												Add New Skill
											</button>
										</div>
									)}

									{step === 3 && (
										<div>
											{/* Step 3: Work Experience */}
											<h4 className='font-semibold'>Work Experience</h4>

											{formData.work_experience.map((experience, index) => (
												<div key={index} className='space-y-6 mb-6'>
													{/* Job Title */}
													<input
														type='text'
														placeholder='Job Title'
														value={experience.job_title}
														onChange={(e) => handleExperienceChange(index, "job_title", e.target.value)}
														className='w-full p-3 border rounded-md'
													/>

													{/* Company Name */}
													<input
														type='text'
														placeholder='Company Name'
														value={experience.company_name}
														onChange={(e) => handleExperienceChange(index, "company_name", e.target.value)}
														className='w-full p-3 border rounded-md'
													/>

													{/* Start and End Date */}
													<div className='grid grid-cols-2 gap-4'>
														<input
															type='date'
															placeholder='Start Date'
															value={experience.start_date}
															onChange={(e) => handleExperienceChange(index, "start_date", e.target.value)}
															className='w-full p-3 border rounded-md'
														/>
														<input
															type='date'
															placeholder='End Date'
															value={experience.end_date}
															onChange={(e) => handleExperienceChange(index, "end_date", e.target.value)}
															className='w-full p-3 border rounded-md'
														/>
													</div>

													{/* Description */}
													<textarea
														placeholder='Description'
														value={experience.description}
														onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
														className='w-full p-3 border rounded-md'></textarea>

													{/* Remove Experience Button */}
													<div className='flex justify-end items-center mt-2'>
														<button type='button' onClick={() => removeExperience(index)} className='text-red-500'>
															Remove Experience
														</button>
													</div>
												</div>
											))}

											{/* Add Experience Button */}
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
												className='text-blue-500 underline mt-4'>
												Add Experience
											</button>
										</div>
									)}

									{step === 4 && (
										<div>
											{/* Step 4: Education */}
											<h4 className='font-semibold'>Education</h4>
											{formData.education.map((education, index) => (
												<div key={index} className='space-y-4 mb-4'>
													<input type='text' placeholder='Degree' value={education.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} className='w-full p-3 border rounded-md' />
													<input
														type='text'
														placeholder='Institution'
														value={education.institution}
														onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
														className='w-full p-3 border rounded-md'
													/>
													<input
														type='number'
														placeholder='Start Year'
														value={education.start_year}
														onChange={(e) => handleEducationChange(index, "start_year", e.target.value)}
														className='w-full p-3 border rounded-md'
													/>
													<input
														type='number'
														placeholder='End Year'
														value={education.end_year}
														onChange={(e) => handleEducationChange(index, "end_year", e.target.value)}
														className='w-full p-3 border rounded-md'
													/>
													<div className='flex justify-end items-center mt-2'>
														<button type='button' onClick={() => removeEducation(index)} className='text-red-500'>
															Remove Education
														</button>
													</div>
												</div>
											))}
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
																start_year: "",
																end_year: "",
															},
														],
													}))
												}
												className='text-blue-500 underline'>
												Add Education
											</button>
										</div>
									)}

									{step === 5 && (
										<div>
											{/* Step 5: Certifications */}
											<h2 className='font-semibold'>Certifications</h2>
											{formData.certifications.map((certification, index) => (
												<div key={index} className='flex items-center space-x-2 mb-4'>
													<input type='text' placeholder='Certification Name' value={certification} onChange={(e) => handleCertificationsChange(index, e.target.value)} className='w-full p-2 border rounded' />
													<button type='button' onClick={() => removeCertification(index)} className='text-red-500'>
														Remove
													</button>
												</div>
											))}
											<button
												type='button'
												onClick={() =>
													setFormData((prevData) => ({
														...prevData,
														certifications: [...prevData.certifications, ""],
													}))
												}
												className='text-blue-500 underline mt-2'>
												Add Certification
											</button>
										</div>
									)}

									{step === 6 && (
										<div>
											{/* Step 6: Languages */}
											<h2 className='font-semibold'>Languages</h2>
											{formData.languages.map((language, index) => (
												<div key={index} className='flex items-center space-x-2 mb-4'>
													<input type='text' placeholder='Language' value={language} onChange={(e) => handleLanguageChange(index, e.target.value)} className='w-full p-2 border rounded' />
													<button type='button' onClick={() => removeLanguage(index)} className='text-red-500'>
														Remove
													</button>
												</div>
											))}
											<button
												type='button'
												onClick={() =>
													setFormData((prevData) => ({
														...prevData,
														languages: [...prevData.languages, ""],
													}))
												}
												className='text-blue-500 underline mt-2'>
												Add Language
											</button>
										</div>
									)}

									{step === 7 && (
										<div>
											{/* Step 7: Social Media Links */}
											<h2 className='font-semibold'>Social Media Links</h2>
											{formData.social_media.map((platform, index) => (
												<div key={index} className='flex items-center space-x-2 mb-4'>
													<input
														type='text'
														placeholder='Platform (e.g., Linkedin, Github)'
														value={platform.platform}
														onChange={(e) => handleSocialMediaChange(index, "platform", e.target.value)}
														className='w-1/2 p-2 border rounded'
													/>
													<input type='url' placeholder='URL' value={platform.url} onChange={(e) => handleSocialMediaChange(index, "url", e.target.value)} className='w-1/2 p-2 border rounded' />
													<button type='button' onClick={() => removeSocialMedia(index)} className='text-red-500'>
														Remove
													</button>
												</div>
											))}
											<button
												type='button'
												onClick={() =>
													setFormData((prevData) => ({
														...prevData,
														social_media: [...prevData.social_media, { platform: "", url: "" }],
													}))
												}
												className='text-blue-500 underline mt-2'>
												Add Social Media
											</button>
										</div>
									)}

									{step === 8 && (
										<div>
											{/* Step 8: Summary */}
											<h4 className='font-semibold'>Your Summary</h4>

											<div className='flex justify-between items-center space-x-4'>
												{/* Textarea */}
												<div className='flex-1 h-full'>
													<textarea name='summary' placeholder='Write your summary here...' value={formData.summary} onChange={handleChange} className='w-full p-3 border rounded-md h-96'></textarea>
												</div>

												{/* Magic Button */}
												<div>
													<button
														type='button' // Prevent form submission
														onClick={generateSummary}
														className='text-4xl p-2'
														disabled={isGeneratingSummary} // Disable button while generating summary
													>
														{isGeneratingSummary ? (
															<BeatLoader size={30} /> // Show loading indicator
														) : (
															<FaMagic size={30} /> // Show magic icon when ready
														)}
													</button>
												</div>
											</div>
										</div>
									)}
								</div>

								{/* Navigation Buttons */}
								<div className='flex justify-center gap-4'>
									{step > 1 && (
										<button type='button' onClick={() => setStep(step - 1)} className='p-2 bg-gray-500 text-white rounded-3xl px-4 '>
											Previous
										</button>
									)}
									{step < 8 ? (
										<button type='button' onClick={() => setStep(step + 1)} className='p-2 bg-blue-500 text-white rounded-3xl px-6 '>
											Next
										</button>
									) : (
										<button
											type='button' // Prevent auto-submit here, only on explicit click
											onClick={handleSubmit} // Only submit when clicked
											className='p-1 bg-blue-500 text-white rounded-3xl px-4'>
											Submit
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditResume;
