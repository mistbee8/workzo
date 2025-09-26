import { motion } from "framer-motion";

export function CompanyLogos() {
	const companies = [
		{ name: "Google", logo: "/google.jpg" },
		{ name: "Amazon", logo: "amazon-logo.png" },
		{ name: "Microsoft", logo: "/images.png" },
		{ name: "Apple", logo: "/apple.png" },
		{ name: "Meta", logo: "/meta.png" },
		{ name: "Netflix", logo: "/netflix.png" },
		{ name: "Airbnb", logo: "/airbnb.png" },
	];

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 10 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
			},
		},
	};

	return (
		<section className='w-full py-8 md:py-12'>
			<div className='container px-4 md:px-6'>
				<motion.div className='text-center mb-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
					<p className='text-sm text-gray-500 dark:text-gray-400'>Trusted by professionals from top companies</p>
				</motion.div>

				<motion.div className='flex flex-wrap justify-center items-center gap-8 md:gap-12' variants={container} initial='hidden' animate='show'>
					{companies.map((company, i) => (
						<motion.div key={i} className='flex items-center gap-3 text-gray-400 font-medium dark:text-gray-500' variants={item} whileHover={{ scale: 1.05, color: "#8b5cf6" }}>
							<div className='w-8 h-8 relative'>
								<img src={company.logo} alt={`${company.name} logo`} width={32} height={32} className='object-contain grayscale hover:grayscale-0 transition-all duration-300' />
							</div>
							<span className='text-sm md:text-base'>{company.name}</span>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
