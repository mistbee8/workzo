import { motion } from "framer-motion";
import { Search, FileText, Briefcase, Sparkles, ArrowRight } from "lucide-react";

export function DashboardIllustration() {
	const savedJobs = [
		{
			company: "Google",
			position: "Senior Software Engineer",
			location: "Mountain View, CA",
			logo: "G",
			matchScore: "95%",
			tags: ["React", "Node.js"],
			posted: "2 days ago",
		},
		{
			company: "Microsoft",
			position: "Frontend Developer",
			location: "Seattle, WA",
			logo: "M",
			matchScore: "89%",
			tags: ["TypeScript", "Azure"],
			posted: "5 days ago",
		},
		{
			company: "Amazon",
			position: "Full Stack Developer",
			location: "Austin, TX",
			logo: "A",
			matchScore: "92%",
			tags: ["AWS", "Python"],
			posted: "1 week ago",
		},
	];

	return (
		<div className='w-full h-[500px] md:h-[600px] p-4 bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/30 overflow-hidden relative'>
			{/* Background decorations */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-10 left-10 w-24 h-24 bg-purple-200/40 rounded-full blur-2xl animate-pulse'></div>
				<div className='absolute bottom-10 right-10 w-32 h-32 bg-indigo-200/40 rounded-full blur-2xl animate-pulse delay-1000'></div>
			</div>

			{/* Header */}
			<motion.div className='relative z-10 flex items-center justify-between mb-6' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<div className='flex items-center gap-2'>
					<div className='p-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full'>
						<Sparkles className='w-4 h-4 text-white' />
					</div>
					<h1 className='text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>Welcome, John Doe</h1>
				</div>
				<div className='flex gap-2'>
					<div className='px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md text-xs font-medium'>Create Resume</div>
					<div className='px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-md text-xs font-medium'>Apply Now</div>
				</div>
			</motion.div>

			{/* Main Feature Cards */}
			<motion.div className='relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
				{/* Job Finder Card */}
				<motion.div
					className='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 relative overflow-hidden'
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}>
					<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
					<div className='relative z-10'>
						<div className='flex items-center gap-2 mb-3'>
							<div className='p-1 bg-blue-100 dark:bg-blue-900/50 rounded-md'>
								<Search className='h-4 w-4 text-blue-600 dark:text-blue-400' />
							</div>
							<h3 className='text-sm font-semibold text-blue-700 dark:text-blue-300'>Job Finder</h3>
						</div>
						<p className='text-xs text-gray-600 dark:text-gray-300 mb-3'>Search and apply to job listings</p>
						<div className='flex items-center text-xs text-blue-600 dark:text-blue-400'>
							<span>Find Jobs</span>
							<ArrowRight className='ml-1 h-3 w-3' />
						</div>
					</div>
				</motion.div>

				{/* Resume Builder Card */}
				<motion.div
					className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 relative overflow-hidden'
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}>
					<div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
					<div className='relative z-10'>
						<div className='flex items-center gap-2 mb-3'>
							<div className='p-1 bg-green-100 dark:bg-green-900/50 rounded-md'>
								<FileText className='h-4 w-4 text-green-600 dark:text-green-400' />
							</div>
							<h3 className='text-sm font-semibold text-green-700 dark:text-green-300'>Resume Builder</h3>
						</div>
						<p className='text-xs text-gray-600 dark:text-gray-300 mb-3'>Create professional resume</p>
						<div className='flex items-center text-xs text-green-600 dark:text-green-400'>
							<span>Start Building</span>
							<ArrowRight className='ml-1 h-3 w-3' />
						</div>
					</div>
				</motion.div>

				{/* Your Applications Card */}
				<motion.div
					className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 relative overflow-hidden'
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}>
					<div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
					<div className='relative z-10'>
						<div className='flex items-center gap-2 mb-3'>
							<div className='p-1 bg-purple-100 dark:bg-purple-900/50 rounded-md'>
								<Briefcase className='h-4 w-4 text-purple-600 dark:text-purple-400' />
							</div>
							<h3 className='text-sm font-semibold text-purple-700 dark:text-purple-300'>Applications</h3>
						</div>
						<p className='text-xs text-gray-600 dark:text-gray-300 mb-3'>Track your job applications</p>
						<div className='flex items-center text-xs text-purple-600 dark:text-purple-400'>
							<span>View Applications</span>
							<ArrowRight className='ml-1 h-3 w-3' />
						</div>
					</div>
				</motion.div>
			</motion.div>

			{/* Saved Opportunities Section */}
			<motion.div className='relative z-10 h-[calc(100%-200px)]' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
				<div className='bg-white dark:bg-gray-800 rounded-lg p-4 h-full border border-gray-200 dark:border-gray-700'>
					<div className='flex justify-between items-center mb-4'>
						<h3 className='text-sm font-semibold text-gray-900 dark:text-white'>Your Saved Opportunities</h3>
						<div className='text-xs text-gray-500 dark:text-gray-400'>3 saved jobs</div>
					</div>

					{/* Saved Job Cards */}
					<div className='space-y-3 mb-4'>
						{savedJobs.map((job, i) => (
							<motion.div
								key={i}
								className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700'
								initial={{ x: 20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
								whileHover={{ scale: 1.01 }}>
								<div className='w-10 h-10 rounded-md bg-gradient-to-br from-purple-400 to-indigo-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm'>{job.logo}</div>
								<div className='flex-1 min-w-0'>
									<h4 className='text-sm font-medium text-gray-900 dark:text-white truncate'>{job.position}</h4>
									<p className='text-xs text-gray-600 dark:text-gray-400 truncate'>
										{job.company} • {job.location}
									</p>
									<div className='flex gap-1 mt-1'>
										{job.tags.slice(0, 2).map((tag, tagIndex) => (
											<div key={tagIndex} className='px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'>
												{tag}
											</div>
										))}
									</div>
								</div>
								<div className='flex flex-col items-end gap-1'>
									<div className='px-2 py-1 text-xs rounded-md bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium'>{job.matchScore}</div>
									<span className='text-xs text-gray-500 dark:text-gray-400'>{job.posted}</span>
								</div>
							</motion.div>
						))}
					</div>

					{/* View More Jobs Button */}
					<motion.div className='flex justify-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
						<div className='px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-xs font-medium flex items-center gap-2'>
							<span>View More Jobs</span>
							<ArrowRight className='h-3 w-3' />
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
