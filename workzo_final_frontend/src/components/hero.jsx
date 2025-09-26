import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardIllustration } from "./dashboard-illustration";

export function Hero() {
	const scrollToDemo = () => {
		const demoSection = document.getElementById("demo-section");
		if (demoSection) {
			demoSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};
	return (
		<section className='w-full py-12 md:py-24 lg:py-32 overflow-hidden relative'>
			<div className='container px-4 md:px-6 relative z-10'>
				<div className='text-center mb-10 relative'>
					{/* Background images positioned like Simplify website - 100% visible with bounce */}
					<div className='absolute inset-0 z-0 pointer-events-none hidden md:block'>
						{/* Left side background element - bouncing animation */}
						<motion.div
							className='absolute top-0 -left-8 w-80 h-80 bg-contain bg-no-repeat opacity-100'
							style={{ backgroundImage: "url(/back_1.webp)" }}
							animate={{
								y: [0, -10, 0],
								scale: [1, 1.05, 1],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}></motion.div>
						{/* Right side background element - bouncing animation */}
						<motion.div
							className='absolute top-0 -right-8 w-96 h-96 bg-contain bg-no-repeat opacity-100'
							style={{ backgroundImage: "url(/back_2.webp)" }}
							animate={{
								y: [0, -15, 0],
								scale: [1, 1.03, 1],
							}}
							transition={{
								duration: 3.5,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 0.5,
							}}></motion.div>
					</div>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className='mt-10 text-5xl font-bold tracking-tighter lg:text-5xl xl:text-6xl/none max-w-3xl mx-auto'>
							Your entire job search.
							<span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 leading-snug'>Powered by one profile.</span>
						</h1>
						<p className='mt-4 font-semibold max-w-[600px] text-2xl sm:text-base md:text-lg lg:text-xl mx-auto text-gray-600 dark:text-gray-400 px-4'>
							Get personalized job recommendations, craft tailored resumes, autofill and track your job applications. We're here for every step of the process.
						</p>
					</motion.div>

					<motion.div className='flex flex-col sm:flex-row gap-4 justify-center mt-8' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
						<Button size='lg' className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0' onClick={() => (window.location.href = "/sign-up")}>
							Sign Up — It's Free!
						</Button>
						<Button size='lg' variant='outline' className='border-purple-200 text-purple-700 hover:bg-purple-100/50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20' onClick={scrollToDemo}>
							See how it works
						</Button>
					</motion.div>

					<motion.div className='flex items-center justify-center gap-1 mt-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
						{[...Array(5)].map((_, i) => (
							<Star key={i} className='h-5 w-5 fill-yellow-400 text-yellow-400' />
						))}
						<span className='text-sm text-gray-600 ml-2 dark:text-gray-400'>Join 5000+ job seekers who use Workzo</span>
					</motion.div>
				</div>

				<motion.div
					className='mt-12 relative max-w-5xl mx-auto'
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						type: "spring",
						stiffness: 50,
						damping: 20,
						delay: 0.3,
					}}>
					<div className='absolute -top-6 -left-6 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 dark:bg-purple-900 dark:opacity-20'></div>
					<div className='absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-30 dark:bg-indigo-900 dark:opacity-20'></div>

					<div className='relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl dark:border-gray-800 bg-white dark:bg-gray-900'>
						<DashboardIllustration />
					</div>
				</motion.div>
			</div>
		</section>
	);
}
