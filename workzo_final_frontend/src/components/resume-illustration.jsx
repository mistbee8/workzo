import { motion } from "framer-motion";
import { FileText, Plus, X } from "lucide-react";

export function ResumeIllustration() {
	const formSections = [
		{ title: "Personal Information", fields: ["Name", "Email", "Phone", "Address"] },
		{ title: "Objective", fields: ["Objective Statement"] },
		{ title: "Education", fields: ["Degree", "School", "Year"] },
		{ title: "Work Experience", fields: ["Job Title", "Company", "Year"] },
		{ title: "Skills", fields: ["Technical Skills"] },
	];

	const previewData = {
		name: "John Smith",
		email: "john.smith@email.com",
		phone: "(555) 123-4567",
		address: "San Francisco, CA",
		objective: "Experienced software developer with 5+ years in web development...",
		education: [{ degree: "Computer Science", school: "MIT", year: "2018" }],
		experience: [{ title: "Senior Developer", company: "Tech Corp", year: "2019-2024" }],
		skills: "React, TypeScript, Node.js, Python, AWS",
	};

	return (
		<div className='w-full h-[500px] md:h-[600px] p-2 md:p-4 bg-gray-100 dark:bg-gray-900 overflow-hidden'>
			{/* Header */}
			<motion.div className='flex items-center justify-between mb-3 md:mb-4' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<div className='flex items-center gap-2'>
					<FileText className='w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300' />
					<h1 className='text-sm md:text-lg font-semibold text-gray-800 dark:text-white'>Resume Builder</h1>
				</div>
				<div className='text-xs text-gray-500 dark:text-gray-400 hidden sm:block'>Split View</div>
			</motion.div>

			<div className='flex flex-col lg:flex-row h-[calc(100%-40px)] md:h-[calc(100%-40px)] gap-2 md:gap-4'>
				{/* Left side - Form */}
				<motion.div className='w-full lg:w-1/2 h-1/2 lg:h-full bg-white dark:bg-gray-800 rounded-lg p-2 md:p-4 overflow-y-auto' initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
					<h2 className='text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-4'>Fill Out Your Details</h2>

					{/* Personal Information */}
					<div className='space-y-2 md:space-y-3'>
						<motion.div className='space-y-1 md:space-y-2' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
							<label className='block text-xs font-medium text-gray-600 dark:text-gray-400'>Name</label>
							<div className='w-full h-6 md:h-8 border border-gray-300 dark:border-gray-600 rounded-md px-2 flex items-center bg-white dark:bg-gray-700'>
								<span className='text-xs text-gray-800 dark:text-gray-200 truncate'>John Smith</span>
							</div>
						</motion.div>

						<motion.div className='space-y-1 md:space-y-2' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.3 }}>
							<label className='block text-xs font-medium text-gray-600 dark:text-gray-400'>Email</label>
							<div className='w-full h-6 md:h-8 border border-gray-300 dark:border-gray-600 rounded-md px-2 flex items-center bg-white dark:bg-gray-700'>
								<span className='text-xs text-gray-800 dark:text-gray-200 truncate'>john.smith@email.com</span>
							</div>
						</motion.div>

						<motion.div className='space-y-1 md:space-y-2' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.4 }}>
							<label className='block text-xs font-medium text-gray-600 dark:text-gray-400'>Phone</label>
							<div className='w-full h-6 md:h-8 border border-gray-300 dark:border-gray-600 rounded-md px-2 flex items-center bg-white dark:bg-gray-700'>
								<span className='text-xs text-gray-800 dark:text-gray-200 truncate'>(555) 123-4567</span>
							</div>
						</motion.div>

						<motion.div className='space-y-1 md:space-y-2' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.5 }}>
							<label className='block text-xs font-medium text-gray-600 dark:text-gray-400'>Objective</label>
							<div className='w-full h-12 md:h-16 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-2 bg-white dark:bg-gray-700'>
								<span className='text-xs text-gray-800 dark:text-gray-200 line-clamp-2'>Experienced software developer...</span>
							</div>
						</motion.div>

						{/* Education Section */}
						<motion.div className='mt-3 md:mt-4' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.6 }}>
							<div className='flex items-center justify-between mb-2'>
								<h3 className='text-xs font-semibold text-gray-700 dark:text-gray-300'>Education</h3>
								<button className='p-1 text-blue-600 hover:text-blue-700'>
									<Plus className='w-3 h-3' />
								</button>
							</div>
							<div className='space-y-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md'>
								<div className='text-xs text-gray-600 dark:text-gray-400 truncate'>Computer Science at MIT (2018)</div>
							</div>
						</motion.div>

						{/* Work Experience Section */}
						<motion.div className='mt-3 md:mt-4' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.7 }}>
							<div className='flex items-center justify-between mb-2'>
								<h3 className='text-xs font-semibold text-gray-700 dark:text-gray-300'>Work Experience</h3>
								<button className='p-1 text-blue-600 hover:text-blue-700'>
									<Plus className='w-3 h-3' />
								</button>
							</div>
							<div className='space-y-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md'>
								<div className='text-xs text-gray-600 dark:text-gray-400 truncate'>Senior Developer at Tech Corp (2019-2024)</div>
							</div>
						</motion.div>

						{/* Skills Section */}
						<motion.div className='mt-3 md:mt-4' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.8 }}>
							<label className='block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2'>Skills</label>
							<div className='w-full h-6 md:h-8 border border-gray-300 dark:border-gray-600 rounded-md px-2 flex items-center bg-white dark:bg-gray-700'>
								<span className='text-xs text-gray-800 dark:text-gray-200 truncate'>React, TypeScript, Node.js</span>
							</div>
						</motion.div>
					</div>
				</motion.div>

				{/* Right side - Preview */}
				<motion.div className='w-full lg:w-1/2 h-1/2 lg:h-full bg-white dark:bg-gray-800 rounded-lg p-2 md:p-4 overflow-y-auto' initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
					<h2 className='text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-4'>Resume Preview</h2>

					{/* Preview Content */}
					<motion.div className='space-y-3 md:space-y-4' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
						{/* Header */}
						<div className='text-center border-b border-gray-200 dark:border-gray-600 pb-2 md:pb-3'>
							<h3 className='text-sm md:text-lg font-bold text-gray-900 dark:text-white truncate'>{previewData.name}</h3>
							<p className='text-xs text-gray-600 dark:text-gray-400 truncate'>
								{previewData.email} | {previewData.phone} | {previewData.address}
							</p>
						</div>

						{/* Objective */}
						<div>
							<h4 className='text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1'>Objective</h4>
							<p className='text-xs text-gray-600 dark:text-gray-400 line-clamp-2'>{previewData.objective}</p>
						</div>

						{/* Education */}
						<div>
							<h4 className='text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1'>Education</h4>
							{previewData.education.map((edu, index) => (
								<div key={index} className='mb-2'>
									<p className='text-xs text-gray-600 dark:text-gray-400 truncate'>
										{edu.degree} at {edu.school} ({edu.year})
									</p>
								</div>
							))}
						</div>

						{/* Work Experience */}
						<div>
							<h4 className='text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1'>Work Experience</h4>
							{previewData.experience.map((exp, index) => (
								<div key={index} className='mb-2'>
									<p className='text-xs text-gray-600 dark:text-gray-400 truncate'>
										{exp.title} at {exp.company} ({exp.year})
									</p>
								</div>
							))}
						</div>

						{/* Skills */}
						<div>
							<h4 className='text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1'>Skills</h4>
							<p className='text-xs text-gray-600 dark:text-gray-400 truncate'>{previewData.skills}</p>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
