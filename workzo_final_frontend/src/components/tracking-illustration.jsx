import { motion } from "framer-motion";
import img5 from "../../public/5.jpg";

export function TrackingIllustration() {
	const applications = [
		{
			company: "Google",
			role: "Senior Software Engineer",
			status: "Interview",
			days: 2,
			color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
			logo: "G",
			salary: "$180k - $220k",
		},
		{
			company: "Meta",
			role: "Frontend Developer",
			status: "Applied",
			days: 5,
			color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
			logo: "M",
			salary: "$160k - $190k",
		},
		{
			company: "Netflix",
			role: "Full Stack Developer",
			status: "Applied",
			days: 7,
			color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
			logo: "N",
			salary: "$170k - $200k",
		},
		{
			company: "Apple",
			role: "iOS Developer",
			status: "Offer",
			days: 14,
			color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
			logo: "A",
			salary: "$175k - $210k",
		},
	];
	return (
		<div className='w-full h-[500px] md:h-[600px] p-4 bg-white dark:bg-gray-900 overflow-hidden'>
			{/* Header with tabs */}
			<motion.div className='flex border-b border-gray-200 dark:border-gray-800 pb-4 mb-4' initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
				<div className='flex gap-4'>
					{["Applied", "Interviewing", "Offers", "Rejected"].map((tab, i) => (
						<motion.div
							key={i}
							className={`px-4 py-2 rounded-md ${i === 0 ? "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300" : "text-gray-500 dark:text-gray-400"}`}
							initial={{ y: -10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
							whileHover={{ y: -2 }}>
							{tab}
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Stats row */}
			<motion.div className='grid grid-cols-4 gap-4 mb-6' initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
				{[
					{ label: "Total", value: "24", color: "bg-gray-100 dark:bg-gray-800" },
					{ label: "Active", value: "12", color: "bg-blue-100 dark:bg-blue-900/30" },
					{ label: "Interviews", value: "5", color: "bg-purple-100 dark:bg-purple-900/30" },
					{ label: "Offers", value: "2", color: "bg-green-100 dark:bg-green-900/30" },
				].map((stat, i) => (
					<motion.div key={i} className={`${stat.color} p-4 rounded-lg`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }} whileHover={{ y: -2 }}>
						<div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>{stat.label}</div>
						<div className='text-2xl font-bold text-gray-900 dark:text-white'>{stat.value}</div>
					</motion.div>
				))}
			</motion.div>

			{/* Application cards */}
			<div className='space-y-4 overflow-y-auto h-[calc(100%-140px)]'>
				{applications.map((app, i) => (
					<motion.div
						key={i}
						className='p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-between'
						initial={{ x: 20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
						whileHover={{ x: 5 }}>
						<div className='flex items-center gap-4'>
							<div className='w-12 h-12 rounded-md bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold'>{app.logo}</div>
							<div>
								<div className='font-medium text-gray-900 dark:text-white'>{app.company}</div>
								<div className='text-sm text-gray-600 dark:text-gray-400'>{app.role}</div>
								<div className='text-xs text-gray-500 dark:text-gray-500'>{app.salary}</div>
							</div>
						</div>
						<div className='flex items-center gap-4'>
							<div className={`px-3 py-1 rounded-full text-sm ${app.color}`}>{app.status}</div>
							<div className='text-sm text-gray-500 dark:text-gray-400'>{app.days}d ago</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
