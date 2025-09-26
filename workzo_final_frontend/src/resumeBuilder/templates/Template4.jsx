import React from "react";
import formatDate from "./utils/formatDate";

const Template4 = ({ resumeData }) => {
	return (
		<>
			<div className='min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-slate-100 py-6'>
				{/* Resume Container */}
				<div className='w-full max-w-4xl bg-white shadow-2xl rounded-lg p-8 border border-gray-200'>
					{/* Name and Contact Info */}
					<div className='text-center pb-8 mb-8 border-b-4 border-gray-300'>
						<h1 className='text-5xl font-bold uppercase mb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent'>{resumeData.full_name}</h1>
						<div className='flex items-center justify-center gap-8 text-sm text-gray-600 bg-gray-50 py-4 px-6 rounded-lg'>
							<div className='flex items-center gap-2'>
								<span className='w-2 h-2 bg-blue-500 rounded-full'></span>
								<span>{resumeData.address}</span>
							</div>
							<div className='flex items-center gap-2'>
								<span className='w-2 h-2 bg-green-500 rounded-full'></span>
								<span>{resumeData.phone}</span>
							</div>
							<div className='flex items-center gap-2'>
								<span className='w-2 h-2 bg-purple-500 rounded-full'></span>
								<span>{resumeData.email}</span>
							</div>
						</div>
					</div>

					{/* Two-Column Layout */}
					<div className='flex gap-8 mt-6'>
						{/* Left Column */}
						<div className='w-2/3 space-y-8'>
							{/* Summary */}
							<div className='bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg border-l-4 border-blue-500'>
								<h2 className='text-xl font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-4'>Summary</h2>
								<p className='text-sm text-gray-700 leading-relaxed'>{resumeData.summary}</p>
							</div>

							{/* Experience */}
							<div className='bg-white border border-gray-200 rounded-lg p-6 shadow-md'>
								<h2 className='text-xl font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-6'>Experience</h2>
								<div className='space-y-6'>
									{resumeData.work_experience.map((job, index) => (
										<div key={index} className='relative pl-6 border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg'>
											<div className='absolute -left-2 top-4 w-4 h-4 bg-blue-500 rounded-full'></div>
											<h3 className='font-semibold text-lg text-gray-800 mb-2'>{job.job_title}</h3>
											<p className='text-blue-600 font-medium mb-3'>
												{job.company_name} ({formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Current"})
											</p>
											{job.description && (
												<div className='space-y-2'>
													{job.description.split(". ").map((point, idx) => (
														<div key={idx} className='flex items-start gap-3'>
															<span className='w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0'></span>
															<span className='text-sm text-gray-600 leading-relaxed'>{point}</span>
														</div>
													))}
												</div>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Languages */}
							{resumeData.languages && resumeData.languages.length > 0 && (
								<div className='bg-white border border-gray-200 rounded-lg p-6 shadow-md'>
									<h2 className='text-lg font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-4'>Languages</h2>
									<div className='grid grid-cols-2 gap-3'>
										{resumeData.languages.map((language, index) => (
											<div key={index} className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
												<span className='w-3 h-3 bg-green-500 rounded-full'></span>
												<span className='text-sm font-medium text-gray-700'>{language}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Social Media */}
							{resumeData.social_media && resumeData.social_media.length > 0 && (
								<div className='bg-white border border-gray-200 rounded-lg p-6 shadow-md'>
									<h2 className='text-lg font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-4'>Social Media</h2>
									<div className='space-y-3'>
										{resumeData.social_media.map((social, index) => (
											<div key={index} className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
												<span className='w-3 h-3 bg-purple-500 rounded-full'></span>
												<a href={social.link} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors'>
													{social.platform}
												</a>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Right Column */}
						<div className='w-1/3 space-y-8'>
							{/* Skills */}
							<div className='bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-6 shadow-md'>
								<h2 className='text-lg font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-4'>Skills</h2>
								<div className='space-y-3'>
									{resumeData.skills.map((skill, index) => (
										<div key={index} className='flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm'>
											<span className='w-3 h-3 bg-blue-500 rounded-full'></span>
											<span className='text-sm font-medium text-gray-700'>{skill.name}</span>
										</div>
									))}
								</div>
							</div>

							{/* Education */}
							<div className='bg-white border border-gray-200 rounded-lg p-6 shadow-md'>
								<h2 className='text-lg font-semibold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-4'>Education & Training</h2>
								<div className='space-y-4'>
									{resumeData.education.map((edu, index) => (
										<div key={index} className='p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500'>
											<p className='font-semibold text-gray-800'>{edu.degree}</p>
											<p className='text-purple-600 font-medium'>{edu.institution}</p>
											<p className='text-sm text-gray-600 mt-1'>
												{edu.start_year} - {edu.end_year}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Buttons */}
				</div>
			</div>
		</>
	);
};

export default Template4;
