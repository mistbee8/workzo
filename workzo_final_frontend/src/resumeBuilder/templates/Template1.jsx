import React from "react";
import formatDate from "./utils/formatDate";

const Template1 = ({ resumeData }) => {
	return (
		<>
			<div className='min-h-screen flex flex-col items-center py-4 sm:py-6 bg-gray-100 px-4 sm:px-6 lg:px-8'>
				{/* Resume Container */}
				<div className='w-full max-w-4xl bg-white shadow-lg relative'>
					{/* Full-Width Name Section */}
					<div className='absolute top-4 sm:top-8 left-4 sm:left-8 z-10 right-4 sm:right-24'>
						<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-gray-800 leading-tight'>{resumeData.full_name}</h1>
					</div>

					{/* Decorative Quote */}
					<div className='absolute top-0 right-0 text-blue-400 opacity-10 leading-none pointer-events-none hidden sm:block'>
						<span style={{ fontSize: "120px" }} className='sm:text-[200px]'>
							"
						</span>
					</div>

					<div className='flex flex-col lg:flex-row min-h-[800px]'>
						{/* Left Sidebar */}
						<div className='w-full lg:w-1/3 bg-gray-300 p-4 sm:p-6 pt-16 sm:pt-20 lg:pt-24 order-2 lg:order-1'>
							{/* Contact Section */}
							<div className='mb-4 sm:mb-6'>
								<h2 className='text-base sm:text-lg font-semibold border-b border-gray-500 pb-1'>CONTACT</h2>
								<ul className='mt-2 text-xs sm:text-sm text-gray-700 space-y-1'>
									{resumeData.email && <li className='break-all'>📧 {resumeData.email}</li>}
									{resumeData.phone && <li>📞 {resumeData.phone}</li>}
									{resumeData.address && <li>📍 {resumeData.address}</li>}
								</ul>
							</div>

							{/* Education Section */}
							<div className='mb-4 sm:mb-6'>
								<h2 className='text-base sm:text-lg font-semibold border-b border-gray-500 pb-1'>EDUCATION AND TRAINING</h2>
								{resumeData.education.map((edu, index) => (
									<div key={index} className='mt-2 text-xs sm:text-sm text-gray-700'>
										<p className='font-semibold'>{edu.degree}</p>
										<p className='break-words'>{edu.institution}</p>
										<p>
											{edu.start_year} - {edu.end_year}
										</p>
									</div>
								))}
							</div>

							{/* Certificates Section */}
							{resumeData.certificates && resumeData.certificates.length > 0 && (
								<div className='mb-4 sm:mb-6'>
									<h2 className='text-base sm:text-lg font-semibold border-b border-gray-500 pb-1'>CERTIFICATES</h2>
									{resumeData.certificates.map((cert, index) => (
										<div key={index} className='mt-2 text-xs sm:text-sm text-gray-700'>
											<p className='font-semibold break-words'>{cert.name}</p>
											<p className='break-words'>{cert.issuer}</p>
											<p>{formatDate(cert.date)}</p>
										</div>
									))}
								</div>
							)}

							{/* Social Media Links */}
							{resumeData.social_media && resumeData.social_media.length > 0 && (
								<div className='mb-4 sm:mb-6'>
									<h2 className='text-base sm:text-lg font-semibold border-b border-gray-500 pb-1'>SOCIAL MEDIA</h2>
									<ul className='mt-2 text-xs sm:text-sm text-gray-700 space-y-1'>
										{resumeData.social_media.map((social, index) => (
											<li key={index}>
												<a href={social.link} target='_blank' rel='noopener noreferrer' className='text-gray-600 underline break-all hover:text-gray-800'>
													{social.platform}
												</a>
											</li>
										))}
									</ul>
								</div>
							)}

							{/* Languages Section */}
							{resumeData.languages && resumeData.languages.length > 0 && (
								<div className='mb-4 sm:mb-6'>
									<h2 className='text-base sm:text-lg font-semibold border-b border-gray-500 pb-1'>LANGUAGES</h2>
									<ul className='mt-2 text-xs sm:text-sm text-gray-700 space-y-1'>
										{resumeData.languages.map((language, index) => (
											<li key={index} className='break-words'>
												{language}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						{/* Right Main Content */}
						<div className='w-full lg:w-2/3 p-4 sm:p-6 bg-white pt-16 sm:pt-20 lg:pt-24 order-1 lg:order-2'>
							{/* Summary Section */}
							<div className='mb-4 sm:mb-6'>
								<h2 className='text-base sm:text-lg font-semibold border-b border-gray-400 pb-1'>SUMMARY</h2>
								<p className='text-xs sm:text-sm text-gray-700 mt-2 leading-relaxed'>{resumeData.summary}</p>
							</div>

							{/* Skills Section */}
							<div className='mb-4 sm:mb-6'>
								<h2 className='text-base sm:text-lg font-semibold border-b border-gray-400 pb-1'>SKILLS</h2>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 mt-2'>
									{resumeData.skills.map((skill, index) => (
										<p key={index} className='break-words'>
											• {skill.name}
										</p>
									))}
								</div>
							</div>

							{/* Experience Section */}
							<div className='mb-4 sm:mb-6'>
								<h2 className='text-base sm:text-lg font-semibold border-b border-gray-400 pb-1'>EXPERIENCE</h2>
								{resumeData.work_experience.map((job, index) => (
									<div key={index} className='mt-3 sm:mt-4 text-xs sm:text-sm text-gray-700'>
										<h3 className='font-semibold break-words'>{job.job_title}</h3>
										<p className='italic break-words'>
											{job.company_name} ({formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Current"})
										</p>
										{job.description && (
											<ul className='list-disc list-inside mt-2 text-gray-600 space-y-1'>
												{job.description.split(". ").map((point, idx) => (
													<li key={idx} className='break-words'>
														{point}
													</li>
												))}
											</ul>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Template1;
