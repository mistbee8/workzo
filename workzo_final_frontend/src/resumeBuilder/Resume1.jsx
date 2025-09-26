import React from "react";

const Resume1 = ({ data }) => {
	const {
		firstname,
		lastname,
		email,
		phone,
		website,
		github,
		linkedin,
		twitter,
		facebook,
		instagram,
		college,
		fromyear1,
		toyear1,
		qualification1,
		description1,
		school,
		fromyear2,
		toyear2,
		qualification2,
		description2,
		title1,
		link1,
		projectDescription1,
		title2,
		link2,
		projectDescription2,
		title3,
		link3,
		projectDescription3,
		institute1,
		position1,
		duration1,
		experienceDescription1,
		institute2,
		position2,
		duration2,
		experienceDescription2,
		skill1,
		skill2,
		skill3,
		skill4,
		skill5,
		skill6,
		interest1,
		interest2,
		interest3,
		interest4,
		interest5,
		interest6,
	} = data;

	return (
		<div className='bg-white w-full max-w-screen-lg mx-auto shadow-2xl rounded-lg overflow-hidden'>
			{/* Header Section */}
			<div className='bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden'>
				<div className='relative z-10'>
					<div className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-2'>
						{firstname} {lastname}
					</div>
					<div className='w-20 h-1 bg-yellow-400 rounded-full'></div>
				</div>
				<div className='absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white opacity-5 rounded-full transform translate-x-8 sm:translate-x-16 -translate-y-8 sm:-translate-y-16'></div>
				<div className='absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white opacity-5 rounded-full transform -translate-x-8 sm:-translate-x-12 translate-y-8 sm:translate-y-12'></div>
			</div>

			<div className='flex flex-col lg:flex-row'>
				{/* Left Sidebar */}
				<div className='w-full lg:w-1/3 bg-gradient-to-b from-yellow-50 to-yellow-100 p-4 sm:p-6 lg:border-r border-yellow-200'>
					{/* Contact Info */}
					<div className='mb-6 sm:mb-8'>
						<div className='text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800 flex items-center'>
							<div className='w-2 h-2 bg-yellow-500 rounded-full mr-3'></div>
							Contact Info
						</div>
						<div className='space-y-2 sm:space-y-3'>
							<div className='flex items-center text-gray-700'>
								<svg className='w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
								</svg>
								<span className='text-xs sm:text-sm break-all'>{email}</span>
							</div>
							{phone && (
								<div className='flex items-center text-gray-700'>
									<svg className='w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
										/>
									</svg>
									<span className='text-xs sm:text-sm'>{phone}</span>
								</div>
							)}
							{website && (
								<div className='flex items-center text-gray-700'>
									<svg className='w-4 h-4 mr-3 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9' />
									</svg>
									<span className='text-sm break-all'>{website}</span>
								</div>
							)}
							{github && (
								<div className='flex items-center text-gray-700'>
									<svg className='w-4 h-4 mr-3 text-yellow-600' fill='currentColor' viewBox='0 0 24 24'>
										<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
									</svg>
									<span className='text-sm break-all'>{github}</span>
								</div>
							)}
							{linkedin && (
								<div className='flex items-center text-gray-700'>
									<svg className='w-4 h-4 mr-3 text-yellow-600' fill='currentColor' viewBox='0 0 24 24'>
										<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
									</svg>
									<span className='text-sm break-all'>{linkedin}</span>
								</div>
							)}
						</div>
					</div>

					{/* Skills */}
					{(skill1 || skill2 || skill3 || skill4 || skill5 || skill6) && (
						<div className='mb-8'>
							<div className='text-lg font-bold mb-4 text-gray-800 flex items-center'>
								<div className='w-2 h-2 bg-yellow-500 rounded-full mr-3'></div>
								Skills
							</div>
							<div className='space-y-2'>
								{skill1 && <div className='bg-white px-3 py-2 rounded-lg shadow-sm border border-yellow-200 text-sm font-medium text-gray-700'>{skill1}</div>}
								{skill2 && <div className='bg-white px-3 py-2 rounded-lg shadow-sm border border-yellow-200 text-sm font-medium text-gray-700'>{skill2}</div>}
								{skill3 && <div className='bg-white px-3 py-2 rounded-lg shadow-sm border border-yellow-200 text-sm font-medium text-gray-700'>{skill3}</div>}
								{skill4 && <div className='bg-white px-3 py-2 rounded-lg shadow-sm border border-yellow-200 text-sm font-medium text-gray-700'>{skill4}</div>}
								{skill5 && <div className='bg-white px-3 py-2 rounded-lg shadow-sm border border-yellow-200 text-sm font-medium text-gray-700'>{skill5}</div>}
								{skill6 && <div className='bg-white px-3 py-2 rounded-lg shadow-sm border border-yellow-200 text-sm font-medium text-gray-700'>{skill6}</div>}
							</div>
						</div>
					)}

					{/* Interests */}
					{(interest1 || interest2 || interest3 || interest4 || interest5 || interest6) && (
						<div className='mb-8'>
							<div className='text-lg font-bold mb-4 text-gray-800 flex items-center'>
								<div className='w-2 h-2 bg-yellow-500 rounded-full mr-3'></div>
								Interests
							</div>
							<div className='flex flex-wrap gap-2'>
								{interest1 && <span className='bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium'>{interest1}</span>}
								{interest2 && <span className='bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium'>{interest2}</span>}
								{interest3 && <span className='bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium'>{interest3}</span>}
								{interest4 && <span className='bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium'>{interest4}</span>}
								{interest5 && <span className='bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium'>{interest5}</span>}
								{interest6 && <span className='bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium'>{interest6}</span>}
							</div>
						</div>
					)}
				</div>

				{/* Right Content */}
				<div className='w-full lg:w-2/3 p-4 sm:p-6 lg:p-8'>
					{/* Profile */}
					<div className='mb-6 sm:mb-8'>
						<div className='text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center'>
							<div className='w-1 h-6 sm:h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full mr-3 sm:mr-4'></div>
							Profile
						</div>
						<div className='text-gray-600 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-yellow-400 text-sm sm:text-base'>
							<p>Write your profile here.</p>
						</div>
					</div>

					{/* Education */}
					{(college || school) && (
						<div className='mb-6 sm:mb-8'>
							<div className='text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center'>
								<div className='w-1 h-6 sm:h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full mr-3 sm:mr-4'></div>
								Education
							</div>
							<div className='space-y-4 sm:space-y-6'>
								{college && (
									<div className='bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-yellow-400'>
										<div className='text-base sm:text-lg font-semibold text-gray-800'>{college}</div>
										<div className='text-xs sm:text-sm text-yellow-600 font-medium mb-2'>
											{fromyear1} - {toyear1}
										</div>
										<div className='text-gray-700 font-medium text-sm sm:text-base'>{qualification1}</div>
										<div className='text-gray-600 text-xs sm:text-sm mt-2'>{description1}</div>
									</div>
								)}
								{school && (
									<div className='bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-yellow-400'>
										<div className='text-base sm:text-lg font-semibold text-gray-800'>{school}</div>
										<div className='text-xs sm:text-sm text-yellow-600 font-medium mb-2'>
											{fromyear2} - {toyear2}
										</div>
										<div className='text-gray-700 font-medium text-sm sm:text-base'>{qualification2}</div>
										<div className='text-gray-600 text-sm mt-2'>{description2}</div>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Experience */}
					{(institute1 || institute2) && (
						<div className='mb-8'>
							<div className='text-2xl font-bold mb-4 text-gray-800 flex items-center'>
								<div className='w-1 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full mr-4'></div>
								Experience
							</div>
							<div className='space-y-6'>
								{institute1 && (
									<div className='bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400'>
										<div className='text-lg font-semibold text-gray-800'>{institute1}</div>
										<div className='text-sm text-yellow-600 font-medium mb-2'>
											{position1} | {duration1}
										</div>
										<div className='text-gray-600 text-sm leading-relaxed'>{experienceDescription1}</div>
									</div>
								)}
								{institute2 && (
									<div className='bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400'>
										<div className='text-lg font-semibold text-gray-800'>{institute2}</div>
										<div className='text-sm text-yellow-600 font-medium mb-2'>
											{position2} | {duration2}
										</div>
										<div className='text-gray-600 text-sm leading-relaxed'>{experienceDescription2}</div>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Projects */}
					{(title1 || title2 || title3) && (
						<div className='mb-8'>
							<div className='text-2xl font-bold mb-4 text-gray-800 flex items-center'>
								<div className='w-1 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full mr-4'></div>
								Projects
							</div>
							<div className='space-y-6'>
								{title1 && (
									<div className='bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400'>
										<div className='text-lg font-semibold text-gray-800'>{title1}</div>
										{link1 && <div className='text-sm text-yellow-600 font-medium mb-2'>{link1}</div>}
										<div className='text-gray-600 text-sm leading-relaxed'>{projectDescription1}</div>
									</div>
								)}
								{title2 && (
									<div className='bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400'>
										<div className='text-lg font-semibold text-gray-800'>{title2}</div>
										{link2 && <div className='text-sm text-yellow-600 font-medium mb-2'>{link2}</div>}
										<div className='text-gray-600 text-sm leading-relaxed'>{projectDescription2}</div>
									</div>
								)}
								{title3 && (
									<div className='bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400'>
										<div className='text-lg font-semibold text-gray-800'>{title3}</div>
										{link3 && <div className='text-sm text-yellow-600 font-medium mb-2'>{link3}</div>}
										<div className='text-gray-600 text-sm leading-relaxed'>{projectDescription3}</div>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Resume1;
