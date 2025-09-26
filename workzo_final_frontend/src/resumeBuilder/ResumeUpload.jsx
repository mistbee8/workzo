import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FileArrowDown } from "lucide-react"; // Importing Lucide icon
import { HiOutlineUpload } from "react-icons/hi";
import { useDropzone } from "react-dropzone"; // Import useDropzone from react-dropzone
import Sidebar from "../SideBar";

const ResumeUpload = () => {
	const [file, setFile] = useState(null);
	const [status, setStatus] = useState("");
	const navigate = useNavigate();

	// Handle file drop or selection
	const { getRootProps, getInputProps } = useDropzone({
		accept: ".pdf,.docx", // Only accept pdf and docx files
		onDrop: (acceptedFiles) => {
			if (acceptedFiles.length > 0) {
				setFile(acceptedFiles[0]); // Set the file when dropped
				setStatus("File ready for upload!");
			}
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			setStatus("Please select a file to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			setStatus("Uploading...");

			// First, upload the file to your /upload endpoint
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job_api/upload/`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Bearer token for authorization
				},
				body: formData,
			});

			if (response.status === 200) {
				const result = await response.json();
				setStatus(`Upload successful! File processed.`);

				// After the file is uploaded, now you want to upload the resume (using a different endpoint)
				const resumeFormData = new FormData();
				resumeFormData.append("file", file); // Assuming the same file is used for both

				// Now upload the resume to the second endpoint: /job_api/v1/resumes/upload/
				const resumeResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/upload/`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
					body: resumeFormData,
				});

				if (resumeResponse.status === 200) {
					const resumeResult = await resumeResponse.json();
					setStatus(`Resume uploaded successfully! Resume ID: ${resumeResult.id}`);

					// Redirect to the edit form page after a successful upload
					navigate(`/edit-resume/${resumeResult.id}`);
				} else {
					const error = await resumeResponse.json();
					setStatus(`Error uploading resume: ${error.detail || "Something went wrong"}`);
				}
			} else {
				const error = await response.json();
				setStatus(`Error uploading file: ${error.detail || "Something went wrong"}`);
			}
		} catch (error) {
			setStatus(`Error: ${error.message}`);
		}
	};

	return (
		<Sidebar>
			<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 sm:py-8'>
				<div className='max-w-2xl mx-auto px-4 sm:px-6'>
					{/* Header Section */}
					<div className='text-center mb-6 sm:mb-8'>
						<div className='w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
							<HiOutlineUpload className='text-2xl sm:text-3xl text-white' />
						</div>
						<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2'>Upload Your Resume</h1>
						<p className='text-gray-600 text-sm sm:text-base lg:text-lg'>Upload your resume in PDF or DOCX format to get started</p>
					</div>

					{/* Upload Card */}
					<div className='bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden'>
						<div className='p-4 sm:p-6 lg:p-8'>
							<form onSubmit={handleSubmit} className='space-y-6 sm:space-y-8'>
								{/* Drag-and-drop upload area */}
								<div
									{...getRootProps()}
									className='group relative flex flex-col items-center justify-center p-8 sm:p-12 border-2 sm:border-3 border-dashed border-gray-300 rounded-lg sm:rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 bg-gray-50'>
									<input {...getInputProps()} />

									{/* Upload Icon */}
									<div className='w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors'>
										<HiOutlineUpload className='text-2xl sm:text-3xl text-blue-600' />
									</div>

									{/* Upload Text */}
									<div className='text-center'>
										<h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>Drag & Drop Your Resume Here</h3>
										<p className='text-gray-500 mb-4 text-sm sm:text-base'>or click to browse files</p>

										{/* File Info */}
										<div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400'>
											<span className='flex items-center gap-1'>
												<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
												</svg>
												PDF
											</span>
											<span className='hidden sm:inline text-gray-300'>|</span>
											<span className='flex items-center gap-1'>
												<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
													/>
												</svg>
												DOCX
											</span>
										</div>
									</div>

									{/* Selected File Display */}
									{file && (
										<div className='mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg w-full max-w-md'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-3'>
													<div className='w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center'>
														<svg className='w-4 h-4 sm:w-5 sm:h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
															<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
														</svg>
													</div>
													<div>
														<p className='font-medium text-gray-800 text-xs sm:text-sm truncate'>{file.name}</p>
														<p className='text-xs text-gray-500'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>

								{/* Submit Button */}
								<div className='flex justify-center'>
									<button
										type='submit'
										disabled={!file || status === "Uploading..."}
										className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-40 sm:min-w-48 flex items-center justify-center gap-2'>
										{status === "Uploading..." ? (
											<>
												<div className='animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white'></div>
												Uploading...
											</>
										) : (
											<>
												<svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
												</svg>
												Upload Resume
											</>
										)}
									</button>
								</div>
							</form>

							{/* Status Message */}
							{status && (
								<div
									className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base ${
										status.includes("successful")
											? "bg-green-50 border border-green-200 text-green-700"
											: status.includes("Error")
											? "bg-red-50 border border-red-200 text-red-700"
											: "bg-blue-50 border border-blue-200 text-blue-700"
									}`}>
									<p className='font-medium'>{status}</p>
								</div>
							)}
						</div>

						{/* Feature Highlights */}
						<div className='bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-gray-200'>
							<h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center'>What happens next?</h3>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4'>
								<div className='text-center'>
									<div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2'>
										<span className='text-blue-600 font-bold text-sm sm:text-base'>1</span>
									</div>
									<p className='text-xs sm:text-sm text-gray-600'>File Upload & Processing</p>
								</div>
								<div className='text-center'>
									<div className='w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2'>
										<span className='text-purple-600 font-bold text-sm sm:text-base'>2</span>
									</div>
									<p className='text-xs sm:text-sm text-gray-600'>AI Content Extraction</p>
								</div>
								<div className='text-center'>
									<div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
										<span className='text-green-600 font-bold text-sm sm:text-base'>3</span>
									</div>
									<p className='text-xs sm:text-sm text-gray-600'>Ready to Edit & Customize</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Sidebar>
	);
};

export default ResumeUpload;
