import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Resume = () => {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem("access_token");
	useEffect(() => {
		if (token) {
			axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					// console.log("Authenticated user:", response.data);
					setAuthenticated(true);
				})
				.catch((error) => {
					console.log("Authorization error:", error);
					setAuthenticated(false);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, [token]);

	const [resumeData, setResumeData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		objective: "",
		education: [],
		workExperience: [],
		skills: "",
	});

	const [showEducationFields, setShowEducationFields] = useState(false);
	const [showWorkExperienceFields, setShowWorkExperienceFields] = useState(false);

	const handleChange = (e, section, index) => {
		const { name, value } = e.target;
		if (section) {
			const updatedSection = [...resumeData[section]];
			updatedSection[index][name] = value;
			setResumeData({ ...resumeData, [section]: updatedSection });
		} else {
			setResumeData({ ...resumeData, [name]: value });
		}
	};

	const addSectionField = (section) => {
		if (section === "education") {
			setResumeData({
				...resumeData,
				education: [...resumeData.education, { degree: "", school: "", year: "" }],
			});
		} else if (section === "workExperience") {
			setResumeData({
				...resumeData,
				workExperience: [...resumeData.workExperience, { jobTitle: "", company: "", year: "" }],
			});
		}
	};

	const removeSectionField = (section, index) => {
		const updatedSection = [...resumeData[section]];
		updatedSection.splice(index, 1);
		setResumeData({ ...resumeData, [section]: updatedSection });
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!authenticated) {
		return <Navigate to='/sign-in' />;
	}
	return (
		<div className='bg-gray-100 min-h-screen pt-[60px] px-4 sm:px-0'>
			<header className='text-black p-4'>
				<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'>Resume Builder</h1>
				</div>
			</header>

			<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
					<div className='bg-white p-4 sm:p-6 rounded-lg shadow-md order-2 lg:order-1'>
						<h2 className='text-lg sm:text-xl font-semibold mb-4'>Fill Out Your Details</h2>

						<div className='mb-4'>
							<label className='block text-gray-700 text-sm sm:text-base mb-2'>Name</label>
							<input
								type='text'
								name='name'
								value={resumeData.name}
								onChange={(e) => handleChange(e)}
								className='w-full p-3 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 text-sm sm:text-base mb-2'>Email</label>
							<input
								type='email'
								name='email'
								value={resumeData.email}
								onChange={(e) => handleChange(e)}
								className='w-full p-3 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 text-sm sm:text-base mb-2'>Phone</label>
							<input
								type='text'
								name='phone'
								value={resumeData.phone}
								onChange={(e) => handleChange(e)}
								className='w-full p-3 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 text-sm sm:text-base mb-2'>Address</label>
							<input
								type='text'
								name='address'
								value={resumeData.address}
								onChange={(e) => handleChange(e)}
								className='w-full p-3 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 text-sm sm:text-base mb-2'>Objective</label>
							<textarea
								name='objective'
								value={resumeData.objective}
								onChange={(e) => handleChange(e)}
								rows='4'
								className='w-full p-3 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
							/>
						</div>

						<div className='mb-6'>
							<h3 className='text-base sm:text-lg font-semibold mb-2'>Education</h3>
							{resumeData.education.length === 0 && !showEducationFields && <p className='text-sm sm:text-base text-gray-500'>No education information added yet.</p>}
							{showEducationFields &&
								resumeData.education.map((edu, index) => (
									<div key={index} className='mb-4 p-3 bg-gray-50 rounded-lg border'>
										<div className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
											<input
												type='text'
												name='degree'
												value={edu.degree}
												onChange={(e) => handleChange(e, "education", index)}
												placeholder='Degree'
												className='w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
											/>
											<input
												type='text'
												name='school'
												value={edu.school}
												onChange={(e) => handleChange(e, "education", index)}
												placeholder='School'
												className='w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
											/>
											<input
												type='text'
												name='year'
												value={edu.year}
												onChange={(e) => handleChange(e, "education", index)}
												placeholder='Year'
												className='w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base sm:col-span-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
											/>
										</div>
										<button type='button' onClick={() => removeSectionField("education", index)} className='mt-3 text-red-600 text-sm sm:text-base hover:underline hover:text-red-700 transition-colors'>
											Remove Education
										</button>
									</div>
								))}
							{!showEducationFields && (
								<button
									onClick={() => {
										setShowEducationFields(true);
										addSectionField("education");
									}}
									className='w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition-colors duration-200 font-medium'>
									Add Education
								</button>
							)}
						</div>

						<div className='mb-6'>
							<h3 className='text-base sm:text-lg font-semibold mb-2'>Work Experience</h3>
							{resumeData.workExperience.length === 0 && !showWorkExperienceFields && <p className='text-sm sm:text-base text-gray-500'>No work experience added yet.</p>}
							{showWorkExperienceFields &&
								resumeData.workExperience.map((work, index) => (
									<div key={index} className='mb-4 p-3 bg-gray-50 rounded-lg border'>
										<div className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
											<input
												type='text'
												name='jobTitle'
												value={work.jobTitle}
												onChange={(e) => handleChange(e, "workExperience", index)}
												placeholder='Job Title'
												className='w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
											/>
											<input
												type='text'
												name='company'
												value={work.company}
												onChange={(e) => handleChange(e, "workExperience", index)}
												placeholder='Company'
												className='w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
											/>
											<input
												type='text'
												name='year'
												value={work.year}
												onChange={(e) => handleChange(e, "workExperience", index)}
												placeholder='Year'
												className='w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base sm:col-span-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
											/>
										</div>
										<button type='button' onClick={() => removeSectionField("workExperience", index)} className='mt-3 text-red-600 text-sm sm:text-base hover:underline hover:text-red-700 transition-colors'>
											Remove Experience
										</button>
									</div>
								))}
							{!showWorkExperienceFields && (
								<button
									onClick={() => {
										setShowWorkExperienceFields(true);
										addSectionField("workExperience");
									}}
									className='bg-blue-600 text-white py-2 px-4 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition-colors duration-200'>
									Add Work Experience
								</button>
							)}
						</div>

						<div className='mt-6'>
							<label className='block text-gray-700 text-sm sm:text-base mb-2'>Skills</label>
							<input type='text' name='skills' value={resumeData.skills} onChange={(e) => handleChange(e)} className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base' />
						</div>
					</div>

					<div className='bg-white p-4 sm:p-6 rounded-lg shadow-md'>
						<h2 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-4'>Resume Preview</h2>

						<div>
							<h3 className='text-lg sm:text-xl font-semibold break-words'>{resumeData.name || "Your Name"}</h3>
							<p className='text-sm sm:text-base break-words'>
								{resumeData.email} {resumeData.email && resumeData.phone && "|"} {resumeData.phone} {(resumeData.email || resumeData.phone) && resumeData.address && "|"} {resumeData.address}
							</p>
							<p className='italic mt-2 text-sm sm:text-base'>{resumeData.objective}</p>
						</div>

						<div className='mt-6'>
							<h4 className='font-semibold text-sm sm:text-base'>Education</h4>
							{resumeData.education.length === 0 ? (
								<p className='text-sm sm:text-base text-gray-500'>No education information added yet.</p>
							) : (
								resumeData.education.map((edu, index) => (
									<div key={index} className='mt-2'>
										<p className='text-sm sm:text-base break-words'>
											{edu.degree} at {edu.school} ({edu.year})
										</p>
									</div>
								))
							)}
						</div>

						<div className='mt-6'>
							<h4 className='font-semibold text-sm sm:text-base'>Work Experience</h4>
							{resumeData.workExperience.length === 0 ? (
								<p className='text-sm sm:text-base text-gray-500'>No work experience added yet.</p>
							) : (
								resumeData.workExperience.map((work, index) => (
									<div key={index} className='mt-2'>
										<p className='text-sm sm:text-base break-words'>
											{work.jobTitle} at {work.company} ({work.year})
										</p>
									</div>
								))
							)}
						</div>

						<div className='mt-6'>
							<h4 className='font-semibold text-sm sm:text-base'>Skills</h4>
							<p className='text-sm sm:text-base break-words'>{resumeData.skills || "No skills added yet."}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Resume;
