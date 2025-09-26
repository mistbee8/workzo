import React from "react";

const Resume2 = ({ data }) => {
	const { firstname, lastname, email, phone, website, github, linkedin, profile, education, experience, skills, projects } = data;

	return (
		<div className='max-w-screen-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden'>
			{/* Header Section */}
			<header className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden'>
				<div className='relative z-10'>
					<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-2'>
						{firstname} {lastname}
					</h1>
					<div className='w-16 sm:w-20 lg:w-24 h-1 bg-yellow-400 rounded-full mb-3 sm:mb-4'></div>
					<p className='text-sm sm:text-base lg:text-xl text-indigo-100 leading-relaxed'>{profile}</p>
				</div>
				<div className='absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-20 h-20 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full'></div>
				<div className='absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 bg-white opacity-10 rounded-full'></div>
			</header>

			<div className='p-4 sm:p-6 lg:p-8'>
				{/* Contact Section */}
				<section className='mb-6 sm:mb-8'>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center'>
						<div className='w-1 h-6 sm:h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3 sm:mr-4'></div>
						Contact
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4'>
						<div className='bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-400'>
							<div className='flex items-center mb-2'>
								<svg className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
								</svg>
								<span className='font-semibold text-gray-700 text-sm sm:text-base'>Email</span>
							</div>
							<p className='text-gray-600 text-xs sm:text-sm break-all'>{email}</p>
						</div>
						<div className='bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-400'>
							<div className='flex items-center mb-2'>
								<svg className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
									/>
								</svg>
								<span className='font-semibold text-gray-700 text-sm sm:text-base'>Phone</span>
							</div>
							<p className='text-gray-600 text-xs sm:text-sm'>{phone}</p>
						</div>
						<div className='bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-400'>
							<div className='flex items-center mb-2'>
								<svg className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9' />
								</svg>
								<span className='font-semibold text-gray-700 text-sm sm:text-base'>Website</span>
							</div>
							<p className='text-gray-600 break-all text-xs sm:text-sm'>{website}</p>
						</div>
						<div className='bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-400'>
							<div className='flex items-center mb-2'>
								<svg className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-2' fill='currentColor' viewBox='0 0 24 24'>
									<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
								</svg>
								<span className='font-semibold text-gray-700 text-sm sm:text-base'>GitHub</span>
							</div>
							<a href={github} className='text-indigo-600 hover:text-indigo-800 transition-colors break-all text-xs sm:text-sm'>
								{github}
							</a>
						</div>
						<div className='bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-400 md:col-span-2'>
							<div className='flex items-center mb-2'>
								<svg className='w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-2' fill='currentColor' viewBox='0 0 24 24'>
									<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
								</svg>
								<span className='font-semibold text-gray-700 text-sm sm:text-base'>LinkedIn</span>
							</div>
							<a href={linkedin} className='text-indigo-600 hover:text-indigo-800 transition-colors break-all text-xs sm:text-sm'>
								{linkedin}
							</a>
						</div>
					</div>
				</section>

				{/* Education Section */}
				<section className='mb-6 sm:mb-8'>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center'>
						<div className='w-1 h-6 sm:h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3 sm:mr-4'></div>
						Education
					</h2>
					<div className='space-y-3 sm:space-y-4'>
						{education.map((edu, index) => (
							<div key={index} className='bg-gray-50 p-4 sm:p-6 rounded-lg border-l-4 border-indigo-400'>
								<div className='flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3'>
									<div>
										<h3 className='text-base sm:text-lg font-semibold text-gray-800'>{edu.degree}</h3>
										<p className='text-indigo-600 font-medium text-sm sm:text-base'>{edu.institution}</p>
									</div>
									<span className='bg-indigo-100 text-indigo-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0 self-start'>
										{edu.startDate} - {edu.endDate}
									</span>
								</div>
								<p className='text-gray-600 leading-relaxed'>{edu.description}</p>
							</div>
						))}
					</div>
				</section>

				{/* Experience Section */}
				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800 flex items-center'>
						<div className='w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-4'></div>
						Experience
					</h2>
					<div className='space-y-4'>
						{experience.map((exp, index) => (
							<div key={index} className='bg-gray-50 p-6 rounded-lg border-l-4 border-indigo-400'>
								<div className='flex justify-between items-start mb-3'>
									<div>
										<h3 className='text-lg font-semibold text-gray-800'>{exp.role}</h3>
										<p className='text-indigo-600 font-medium'>{exp.company}</p>
									</div>
									<span className='bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium'>
										{exp.startDate} - {exp.endDate}
									</span>
								</div>
								<p className='text-gray-600 leading-relaxed'>{exp.description}</p>
							</div>
						))}
					</div>
				</section>

				{/* Skills Section */}
				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800 flex items-center'>
						<div className='w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-4'></div>
						Skills
					</h2>
					<div className='flex flex-wrap gap-3'>
						{skills.map((skill, index) => (
							<span key={index} className='bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg'>
								{skill}
							</span>
						))}
					</div>
				</section>

				{/* Projects Section */}
				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800 flex items-center'>
						<div className='w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-4'></div>
						Projects
					</h2>
					<div className='space-y-4'>
						{projects.map((project, index) => (
							<div key={index} className='bg-gray-50 p-6 rounded-lg border-l-4 border-indigo-400'>
								<div className='flex justify-between items-start mb-3'>
									<h3 className='text-lg font-semibold text-gray-800'>{project.title}</h3>
									<a href={project.link} className='text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium flex items-center gap-1'>
										<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
										</svg>
										View Project
									</a>
								</div>
								<p className='text-gray-600 leading-relaxed'>{project.description}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default Resume2;
