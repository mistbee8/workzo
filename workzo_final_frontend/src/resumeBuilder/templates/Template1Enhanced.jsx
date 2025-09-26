import React from "react";
import formatDate from "./utils/formatDate";

const Template1 = ({ resumeData }) => {
	return (
		<div className='w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden'>
			{/* Header Section */}
			<div className='relative bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8'>
				<div className='absolute top-8 left-8 z-10'>
					<h1 className='text-4xl font-bold uppercase text-white mb-2'>{resumeData.full_name}</h1>
					<div className='w-20 h-1 bg-blue-400 rounded-full'></div>
				</div>

				<div className='absolute top-0 right-0 text-blue-400 opacity-30 text-9xl font-bold leading-none'>"</div>

				<div className='absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 opacity-10 rounded-full'></div>
				<div className='absolute -top-4 -left-4 w-24 h-24 bg-blue-400 opacity-10 rounded-full'></div>
			</div>

			<div className='flex min-h-screen'>
				{/* Left Sidebar */}
				<div className='w-1/3 bg-gradient-to-b from-gray-100 to-gray-200 p-6 border-r border-gray-300'>
					{/* Contact Section */}
					<div className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
							<div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
							CONTACT
						</h2>
						<div className='space-y-3'>
							{resumeData.email && (
								<div className='flex items-center text-gray-700'>
									<svg className='w-4 h-4 mr-3 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
									</svg>
									<span className='text-sm'>{resumeData.email}</span>
								</div>
							)}
							{resumeData.phone && (
								<div className='flex items-center text-gray-700'>
									<svg className='w-4 h-4 mr-3 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
										/>
									</svg>
									<span className='text-sm'>{resumeData.phone}</span>
								</div>
							)}
							{resumeData.address && (
								<div className='flex items-center text-gray-700'>
									<svg className='w-4 h-4 mr-3 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
									</svg>
									<span className='text-sm'>{resumeData.address}</span>
								</div>
							)}
						</div>
					</div>

					{/* Education Section */}
					<div className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
							<div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
							EDUCATION
						</h2>
						<div className='space-y-4'>
							{resumeData.education.map((edu, index) => (
								<div key={index} className='bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400'>
									<p className='font-semibold text-gray-800 text-sm'>{edu.degree}</p>
									<p className='text-gray-600 text-sm'>{edu.institution}</p>
									<p className='text-gray-500 text-xs mt-1'>
										{edu.start_year} - {edu.end_year}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Skills Section */}
					<div className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
							<div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
							SKILLS
						</h2>
						<div className='space-y-2'>
							{resumeData.skills.map((skill, index) => (
								<div key={index} className='bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-400'>
									<div className='flex justify-between items-center'>
										<span className='text-sm font-medium text-gray-800'>{skill.name}</span>
										<span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>{skill.proficiency}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Languages Section */}
					{resumeData.languages && resumeData.languages.length > 0 && (
						<div className='mb-8'>
							<h2 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
								<div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
								LANGUAGES
							</h2>
							<div className='flex flex-wrap gap-2'>
								{resumeData.languages.map((language, index) => (
									<span key={index} className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium'>
										{language}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Certificates Section */}
					{resumeData.certificates && resumeData.certificates.length > 0 && (
						<div className='mb-8'>
							<h2 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
								<div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
								CERTIFICATES
							</h2>
							<div className='space-y-3'>
								{resumeData.certificates.map((cert, index) => (
									<div key={index} className='bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-400'>
										<p className='font-semibold text-gray-800 text-sm'>{cert.name}</p>
										<p className='text-gray-600 text-xs'>{cert.issuer}</p>
										<p className='text-gray-500 text-xs'>{formatDate(cert.date)}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Right Main Content */}
				<div className='w-2/3 p-8 bg-white'>
					{/* Summary Section */}
					<div className='mb-8'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
							<div className='w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4'></div>
							SUMMARY
						</h2>
						<div className='bg-gray-50 p-6 rounded-lg border-l-4 border-blue-400'>
							<p className='text-gray-700 leading-relaxed'>{resumeData.summary}</p>
						</div>
					</div>

					{/* Experience Section */}
					<div className='mb-8'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
							<div className='w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4'></div>
							EXPERIENCE
						</h2>
						<div className='space-y-6'>
							{resumeData.work_experience.map((job, index) => (
								<div key={index} className='bg-gray-50 p-6 rounded-lg border-l-4 border-blue-400'>
									<div className='flex justify-between items-start mb-3'>
										<div>
											<h3 className='text-lg font-semibold text-gray-800'>{job.job_title}</h3>
											<p className='text-blue-600 font-medium'>{job.company_name}</p>
										</div>
										<span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
											{formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Current"}
										</span>
									</div>
									{job.description && (
										<div className='text-gray-600 text-sm leading-relaxed'>
											{job.description.split(". ").map((point, idx) => (
												<div key={idx} className='flex items-start mb-2'>
													<div className='w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0'></div>
													<span>{point}</span>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Social Media Links */}
					{resumeData.social_media && resumeData.social_media.length > 0 && (
						<div className='mb-8'>
							<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
								<div className='w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4'></div>
								SOCIAL MEDIA
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{resumeData.social_media.map((social, index) => (
									<div key={index} className='bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400'>
										<div className='flex items-center'>
											<div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
												<svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
													/>
												</svg>
											</div>
											<div>
												<p className='font-semibold text-gray-800 text-sm'>{social.platform}</p>
												<a href={social.link} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 text-xs transition-colors'>
													{social.link}
												</a>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Template1;
