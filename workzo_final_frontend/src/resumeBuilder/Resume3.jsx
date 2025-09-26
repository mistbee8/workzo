import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";

const Resume = () => {
	const [resumeData, setResumeData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [resumeIds, setResumeIds] = useState([]);
	const [selectedResumeId, setSelectedResumeId] = useState(null);
	const [selectedTemplate, setSelectedTemplate] = useState(1); // Default to Template 1
	const resumeRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		fetchAllResumes();
	}, []);

	useEffect(() => {
		if (selectedResumeId) {
			fetchResumeData(selectedResumeId);
		}
	}, [selectedResumeId]);

	const fetchAllResumes = async () => {
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

	const fetchResumeData = async (resumeId) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/${resumeId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			setResumeData(response.data);
		} catch (err) {
			console.error("Failed to fetch resume data:", err);
		}
	};

	const formatDate = (date) => {
		const options = { year: "numeric", month: "long" };
		return new Date(date).toLocaleDateString(undefined, options);
	};

	const downloadPDF = async () => {
		const element = resumeRef.current;

		// Create a canvas with a higher scale for better quality and ensure the full content is captured
		const canvas = await html2canvas(element, {
			scale: 2,
			backgroundColor: "#f3f4f6", // Ensure the background is captured (adjust as needed)
		});

		const imgData = canvas.toDataURL("image/png");

		const pdf = new jsPDF("p", "mm", "a4");

		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

		// Adjust the PDF height to match the content dynamically
		const marginBottom = 10; // Add a small margin at the bottom
		const pageHeight = pdf.internal.pageSize.height;
		const offset = pdfHeight < pageHeight ? 0 : pdfHeight - pageHeight;

		// Ensure we add the content correctly without white space
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight - offset);

		// Add another page if the content exceeds the first page
		if (pdfHeight > pageHeight) {
			pdf.addPage();
			pdf.addImage(imgData, "PNG", 0, -pdfHeight + offset, pdfWidth, pdfHeight);
		}

		// Save the PDF
		pdf.save("resume.pdf");
	};

	const printResume = () => {
		const content = resumeRef.current; // Get the content inside resumeRef
		const printWindow = window.open("", "", "height=600,width=800");

		printWindow.document.write("<html><head><title>Resume</title></head><body>");
		printWindow.document.write(content.innerHTML); // Insert only the inner HTML of the div
		printWindow.document.write("</body></html>");
		printWindow.document.close();
		printWindow.print(); // Trigger print dialog
	};

	// Handle editing the resume
	const editResume = () => {
		navigate(`/edit-resume/${selectedResumeId}`); // Redirect to the edit page
	};
	const deleteResume = async () => {
		const token = localStorage.getItem("access_token"); // Retrieve auth token

		if (!token) {
			console.error("No authentication token found");
			return;
		}

		try {
			await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/${selectedResumeId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log("Resume deleted successfully");

			await fetchAllResumes();

			if (resumeIds.length > 1) {
				setSelectedResumeId(resumeIds[0]);
			} else {
				setSelectedResumeId(null);
				setResumeData(null);
			}
		} catch (error) {
			console.error("Error deleting resume:", error.response?.data || error.message);
			alert(error.response?.data?.detail || "Failed to delete resume");
		}
	};

	if (!resumeData) {
		return <div className='text-center mt-10'>You have not submitted any resume yet.</div>;
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			<div className='container mx-auto px-3 sm:px-4 lg:px-6'>
				{/* Header Section */}
				<div className='text-center mb-8 sm:mb-12'>
					<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4'>Your Resume</h1>
					<p className='text-gray-600 text-sm sm:text-base lg:text-lg'>Choose a template and customize your professional resume</p>
				</div>

				{/* Resume Selection */}
				{resumeIds.length > 1 && (
					<div className='mb-6 sm:mb-8 text-center'>
						<label className='block text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4'>Select Resume Version</label>
						<select
							value={selectedResumeId}
							onChange={(e) => setSelectedResumeId(e.target.value)}
							className='px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base lg:text-lg'>
							{resumeIds.map((id, index) => (
								<option key={id} value={id}>
									Resume Version {index + 1}
								</option>
							))}
						</select>
					</div>
				)}
				{/* Resume Preview */}
				<div className='flex justify-center mb-6 sm:mb-8'>
					<div className='bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl p-3 sm:p-6 lg:p-8 max-w-5xl w-full'>
						<div ref={resumeRef} className='resume-container'>
							{selectedTemplate === 1 && <Template1 resumeData={resumeData} />}
							{selectedTemplate === 2 && <Template2 resumeData={resumeData} />}
							{selectedTemplate === 3 && <Template3 resumeData={resumeData} />}
							{selectedTemplate === 4 && <Template4 resumeData={resumeData} />}
						</div>
					</div>
				</div>

				{/* Template Selection */}
				<div className='mb-6 sm:mb-8'>
					<h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center'>Choose Template</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6'>
						{[1, 2, 3, 4].map((template) => (
							<div
								key={template}
								className={`group cursor-pointer transition-all duration-300 ${selectedTemplate === template ? "ring-2 sm:ring-4 ring-blue-500 shadow-lg sm:shadow-2xl scale-105" : "hover:shadow-lg hover:scale-102"}`}
								onClick={() => setSelectedTemplate(template)}>
								<div className='relative overflow-hidden rounded-lg sm:rounded-xl bg-white shadow-md sm:shadow-lg'>
									<img src={`/assets/templates/template${template}.jpg`} alt={`Template ${template}`} className='w-full h-32 sm:h-48 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-110' />
									<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent'></div>
									<div className='absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white'>
										<p className='font-semibold text-center text-xs sm:text-sm'>Template {template}</p>
									</div>
									{selectedTemplate === template && (
										<div className='absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center'>
											<svg className='w-3 h-3 sm:w-5 sm:h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
											</svg>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8'>
					<button
						onClick={() => downloadPDF()}
						className='bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg flex items-center justify-center gap-2'>
						<svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
						</svg>
						Download PDF
					</button>

					<button
						onClick={editResume}
						className='bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg flex items-center justify-center gap-2'>
						<svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
						</svg>
						Edit Resume
					</button>

					<button
						onClick={deleteResume}
						className='bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:from-red-700 hover:to-red-800 focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 shadow-lg flex items-center justify-center gap-2'>
						<svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
						</svg>
						Delete Resume
					</button>
				</div>
			</div>
		</div>
	);
};

export default Resume;
