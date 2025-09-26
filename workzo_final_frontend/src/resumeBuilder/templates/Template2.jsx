import React from "react";
import formatDate from "./utils/formatDate";

const Template2 = ({ resumeData }) => {
	const getInitials = (fullName) => {
		const nameParts = fullName.split(" ");
		const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
		return initials;
	};
	return (
		<>
			<div className='min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-white py-6'>
				{/* Resume Container */}
				<div className='w-full max-w-4xl bg-white shadow-2xl rounded-lg p-8 border border-gray-100'>
					{/* Header */}
					<div className='flex justify-between items-center pb-6 mb-6 border-b-2 border-gradient-to-r from-blue-500 to-purple-500'>
						{/* Hexagon with Initials */}
						<div className='relative w-20 h-20 flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg'>
							<span className='z-10'>{getInitials(resumeData.full_name)}</span>
						</div>

						{/* Name and Contact Info */}
						<div className='text-center flex-1 px-6'>
							<h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent uppercase mb-2'>{resumeData.full_name}</h1>
							<div className='h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
						</div>

						{/* Contact Information (Right Aligned) */}
						<div className='text-right text-sm text-gray-600 space-y-1'>
							<p className='flex items-center justify-end gap-2'>
								<span className='w-2 h-2 bg-blue-500 rounded-full'></span>
								{resumeData.email}
							</p>
							<p className='flex items-center justify-end gap-2'>
								<span className='w-2 h-2 bg-purple-500 rounded-full'></span>
								{resumeData.phone}
							</p>
							<p className='flex items-center justify-end gap-2'>
								<span className='w-2 h-2 bg-green-500 rounded-full'></span>
								{resumeData.address}
							</p>
						</div>
					</div>

					{/* Two-column Layout */}
					<div className='grid grid-cols-2 gap-8 mt-6'>
						{/* Left Column */}
						<div className='space-y-6'>
							{/* Summary */}
							<div className='bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500'>
								<h2 className='text-xl font-semibold uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-200 pb-2 mb-4'>Summary</h2>
								<p className='text-sm text-gray-700 leading-relaxed'>{resumeData.summary}</p>
							</div>

							{/* Skills */}
							<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
								<h2 className='text-xl font-semibold uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-200 pb-2 mb-4'>Skills</h2>
								<div className='grid grid-cols-1 gap-2'>
									{resumeData.skills.map((skill, index) => (
										<div key={index} className='flex items-center gap-3 p-2 bg-gray-50 rounded-md'>
											<span className='w-2 h-2 bg-blue-500 rounded-full'></span>
											<span className='text-sm text-gray-700 font-medium'>{skill.name}</span>
										</div>
									))}
								</div>
							</div>

							{/* Education */}
							<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
								<h2 className='text-xl font-semibold uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-200 pb-2 mb-4'>Education & Training</h2>
								{resumeData.education.map((edu, index) => (
									<div key={index} className='mb-4 p-3 bg-gray-50 rounded-md border-l-4 border-purple-500'>
										<p className='font-semibold text-gray-800'>{edu.degree}</p>
										<p className='text-blue-600 font-medium'>{edu.institution}</p>
										<p className='text-sm text-gray-600 mt-1'>
											{edu.start_year} - {edu.end_year}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Right Column */}
						<div className='space-y-6'>
							{/* Experience */}
							<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
								<h2 className='text-xl font-semibold uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-200 pb-2 mb-4'>Experience</h2>
								{resumeData.work_experience.map((job, index) => (
									<div key={index} className='mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500'>
										<p className='font-semibold text-lg text-gray-800'>{job.job_title}</p>
										<p className='text-blue-600 font-medium mb-2'>
											{job.company_name} | {formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Current"}
										</p>
										{job.description && (
											<div className='space-y-1'>
												{job.description.split(". ").map((point, idx) => (
													<div key={idx} className='flex items-start gap-2'>
														<span className='w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0'></span>
														<span className='text-sm text-gray-600'>{point}</span>
													</div>
												))}
											</div>
										)}
									</div>
								))}
							</div>

							{/* Languages */}
							{resumeData.languages && resumeData.languages.length > 0 && (
								<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
									<h2 className='text-lg font-semibold uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-200 pb-2 mb-4'>Languages</h2>
									<div className='grid grid-cols-1 gap-2'>
										{resumeData.languages.map((language, index) => (
											<div key={index} className='flex items-center gap-3 p-2 bg-gray-50 rounded-md'>
												<span className='w-2 h-2 bg-green-500 rounded-full'></span>
												<span className='text-sm text-gray-700'>{language}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Social Media */}
							{resumeData.social_media && resumeData.social_media.length > 0 && (
								<div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
									<h2 className='text-lg font-semibold uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-blue-200 pb-2 mb-4'>Social Media</h2>
									<div className='space-y-3'>
										{resumeData.social_media.map((social, index) => (
											<div key={index} className='flex items-center gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'>
												<span className='w-2 h-2 bg-purple-500 rounded-full'></span>
												<a href={social.link} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors'>
													{social.platform}
												</a>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Buttons */}
			</div>
		</>
	);
};

export default Template2;
