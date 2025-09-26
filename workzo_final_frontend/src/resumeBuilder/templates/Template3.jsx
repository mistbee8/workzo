import React from "react";
import formatDate from "./utils/formatDate";

const Template3 = ({ resumeData }) => {
	return (
		<>
			<div className='min-h-screen flex flex-col items-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-6'>
				{/* Resume Container */}
				<div className='w-full max-w-4xl bg-white shadow-2xl rounded-lg p-8 border border-gray-100'>
					{/* Name and Contact Info */}
					<div className='text-center border-b-4 border-gradient-to-r from-teal-500 to-cyan-500 pb-6 mb-8'>
						<h1 className='text-5xl font-bold uppercase bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4'>{resumeData.full_name}</h1>
						<div className='flex items-center justify-center gap-6 text-sm text-gray-600'>
							<div className='flex items-center gap-2'>
								<span className='w-2 h-2 bg-teal-500 rounded-full'></span>
								<span>{resumeData.address}</span>
							</div>
							<div className='flex items-center gap-2'>
								<span className='w-2 h-2 bg-cyan-500 rounded-full'></span>
								<span>{resumeData.phone}</span>
							</div>
							<div className='flex items-center gap-2'>
								<span className='w-2 h-2 bg-green-500 rounded-full'></span>
								<span>{resumeData.email}</span>
							</div>
						</div>
					</div>

					{/* Summary Section */}
					<div className='mb-8'>
						<h2 className='text-2xl font-semibold uppercase bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent border-b-3 border-teal-300 pb-3 mb-4'>Summary</h2>
						<div className='bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border-l-4 border-teal-500'>
							<p className='text-sm text-gray-700 leading-relaxed'>{resumeData.summary}</p>
						</div>
					</div>

					{/* Skills Section - Enhanced Grid */}
					<div className='mb-8'>
						<h2 className='text-2xl font-semibold uppercase bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent border-b-3 border-teal-300 pb-3 mb-4'>Skills</h2>
						<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
							<div className='grid grid-cols-2 gap-4'>
								{resumeData.skills.map((skill, index) => (
									<div key={index} className='flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border-l-4 border-teal-400'>
										<span className='w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full'></span>
										<span className='text-sm font-medium text-gray-700'>{skill.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Experience Section */}
					<div className='mb-8'>
						<h2 className='text-2xl font-semibold uppercase bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent border-b-3 border-teal-300 pb-3 mb-4'>Experience</h2>
						<div className='space-y-6'>
							{resumeData.work_experience.map((job, index) => (
								<div key={index} className='bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow'>
									<div className='border-l-4 border-teal-500 pl-4'>
										<h3 className='font-semibold text-xl text-gray-800 mb-2'>{job.job_title}</h3>
										<p className='text-teal-600 font-medium mb-3'>
											{job.company_name} | {formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Current"}
										</p>
										{job.description && (
											<div className='space-y-2'>
												{job.description.split(". ").map((point, idx) => (
													<div key={idx} className='flex items-start gap-3'>
														<span className='w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0'></span>
														<span className='text-sm text-gray-600 leading-relaxed'>{point}</span>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Education Section */}
					<div className='mb-8'>
						<h2 className='text-2xl font-semibold uppercase bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent border-b-3 border-teal-300 pb-3 mb-4'>Education & Training</h2>
						<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
							<div className='space-y-4'>
								{resumeData.education.map((edu, index) => (
									<div key={index} className='p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border-l-4 border-teal-500'>
										<p className='font-semibold text-gray-800 text-lg'>{edu.degree}</p>
										<p className='text-teal-600 font-medium'>{edu.institution}</p>
										<p className='text-sm text-gray-600 mt-1'>
											{edu.start_year} - {edu.end_year}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Additional Information Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Social Media */}
						{resumeData.social_media && resumeData.social_media.length > 0 && (
							<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
								<h2 className='text-lg font-semibold uppercase bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent border-b-2 border-teal-300 pb-2 mb-4'>Social Media</h2>
								<div className='space-y-3'>
									{resumeData.social_media.map((social, index) => (
										<div key={index} className='flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg hover:shadow-md transition-shadow'>
											<span className='w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full'></span>
											<a href={social.link} target='_blank' rel='noopener noreferrer' className='text-teal-600 hover:text-teal-800 font-medium text-sm transition-colors'>
												{social.platform}
											</a>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Languages */}
						{resumeData.languages && resumeData.languages.length > 0 && (
							<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
								<h2 className='text-lg font-semibold uppercase bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent border-b-2 border-teal-300 pb-2 mb-4'>Languages</h2>
								<div className='space-y-3'>
									{resumeData.languages.map((language, index) => (
										<div key={index} className='flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg'>
											<span className='w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full'></span>
											<span className='text-sm font-medium text-gray-700'>{language}</span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Buttons */}
			</div>
		</>
	);
};

export default Template3;
