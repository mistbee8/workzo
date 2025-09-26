import React, { useState } from "react";
import Sidebar from "../SideBar";
import SimilarJob from "../job/SimilarJob";
function Test() {
	// Mock data for the form
	const [formData, setFormData] = useState({
		full_name: "John Doe",
		phone: "+1234567890",
		email: "john.doe@example.com",
		address: "123 Main St, Anytown, USA",
		summary: "Experienced full-stack developer with a passion for building scalable applications.",
		skills: [
			{ name: "JavaScript", proficiency: "Advanced" },
			{ name: "React", proficiency: "Advanced" },
			{ name: "Node.js", proficiency: "Intermediate" },
			{ name: "Python", proficiency: "Intermediate" },
		],
		work_experience: [
			{
				job_title: "Software Engineer",
				company_name: "Tech Solutions Inc.",
				start_date: "2021-06-01",
				end_date: "Present",
				responsibilities: ["Developing and maintaining web applications", "Collaborating with cross-functional teams", "Writing unit and integration tests"],
			},
			{
				job_title: "Junior Developer",
				company_name: "WebDev LLC",
				start_date: "2019-03-01",
				end_date: "2021-05-31",
				responsibilities: ["Building responsive websites", "Implementing APIs"],
			},
		],
		education: [
			{
				degree: "Bachelor's in Computer Science",
				institution: "University of Anytown",
				start_year: "2015",
				end_year: "2019",
				achievements: ["Graduated with honors", "Dean's List for 3 consecutive years"],
			},
		],
		certifications: ["Certified JavaScript Developer", "AWS Certified Solutions Architect"],
		languages: ["English", "Spanish"],
		social_media: [
			{ platform: "LinkedIn", url: "https://www.linkedin.com/in/johndoe" },
			{ platform: "GitHub", url: "https://github.com/johndoe" },
		],
	});

	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState(""); // For storing generated summary
	const [error, setError] = useState(""); // For storing error message if API fails

	// Function to send form data to the API and get the summary
	const generateSummary = async () => {
		setLoading(true); // Show loading state while generating the summary
		setError(""); // Clear previous errors

		// Construct the prompt from the form data
		const prompt = ` Can you generate a summary for the following resume details?
    Name: ${formData.full_name}
    Phone: ${formData.phone}
    Email: ${formData.email}
    Address: ${formData.address}
    Summary: ${formData.summary}

    Skills: ${formData.skills.map((skill) => `${skill.name} (${skill.proficiency})`).join(", ")}
    
    Work Experience: ${formData.work_experience.map((exp) => `${exp.job_title} at ${exp.company_name} from ${exp.start_date} to ${exp.end_date}`).join(", ")}
    
    Education: ${formData.education.map((edu) => `${edu.degree} from ${edu.institution}, ${edu.start_year} to ${edu.end_year}`).join(", ")}
    
    Certifications: ${formData.certifications.join(", ")}
    
    Languages: ${formData.languages.join(", ")}
    
    Social Media: ${formData.social_media.map((sm) => `${sm.platform}: ${sm.url}`).join(", ")}
  `.trim(); // Remove extra whitespace

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
				setSummary(result.summary); // Assuming the backend sends a 'summary' in the response
			} else {
				setSummary("Error generating summary");
			}
		} catch (error) {
			setError("Error connecting to the backend.");
			console.error("Error:", error);
		}

		setLoading(false); // Hide loading state after the request is finished
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
			<div className='container mx-auto px-4 py-8'>
				{/* Header Section */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold text-gray-800 mb-4'>Resume Builder Test</h1>
					<p className='text-gray-600 text-lg'>Test your resume data and generate AI-powered summaries</p>
				</div>

				{/* Main Content Card */}
				<div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8'>
					{/* AI Summary Generation Section */}
					<div className='mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-gray-200'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
							<span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
							AI Summary Generator
						</h2>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							{/* Form Data Display */}
							<div className='space-y-4'>
								<div className='bg-white p-4 rounded-lg shadow-sm'>
									<h3 className='font-semibold text-gray-700 mb-2'>Personal Information</h3>
									<div className='text-sm space-y-1'>
										<p>
											<span className='font-medium'>Name:</span> {formData.full_name}
										</p>
										<p>
											<span className='font-medium'>Email:</span> {formData.email}
										</p>
										<p>
											<span className='font-medium'>Phone:</span> {formData.phone}
										</p>
									</div>
								</div>

								<div className='bg-white p-4 rounded-lg shadow-sm'>
									<h3 className='font-semibold text-gray-700 mb-2'>Skills</h3>
									<div className='flex flex-wrap gap-2'>
										{formData.skills.map((skill, index) => (
											<span key={index} className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'>
												{skill.name} - {skill.proficiency}
											</span>
										))}
									</div>
								</div>
							</div>

							{/* AI Summary Section */}
							<div className='space-y-4'>
								<button
									onClick={generateSummary}
									disabled={loading}
									className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
									{loading ? (
										<>
											<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
											Generating...
										</>
									) : (
										<>
											<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
											</svg>
											Generate AI Summary
										</>
									)}
								</button>

								{summary && (
									<div className='bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500'>
										<h3 className='font-semibold text-gray-700 mb-2'>Generated Summary</h3>
										<p className='text-sm text-gray-600 leading-relaxed'>{summary}</p>
									</div>
								)}

								{error && (
									<div className='bg-red-50 border border-red-200 p-4 rounded-lg'>
										<p className='text-red-600 text-sm'>{error}</p>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Similar Jobs Section */}
					<div className='mt-8'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-6 flex items-center'>
							<span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
							Similar Jobs
						</h2>
						<div className='bg-gray-50 rounded-xl p-6'>
							<SimilarJob />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Test;
