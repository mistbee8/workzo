import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "framer-motion";
import { ResumeIllustration } from "./resume-illustration";
import { TrackingIllustration } from "./tracking-illustration";
import { JobMatchIllustration } from "./job-match-illustration";

export function DemoSection() {
	return (
		<section id='demo-section' className='w-full py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#0d1117] dark:to-[#161b22]'>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center mb-10'>
					<motion.div className='space-y-2 max-w-[800px]' initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400'>See Workzo in action</h2>
						<p className='text-gray-600 md:text-xl/relaxed dark:text-gray-400'>Explore our platform's key features and see how they can transform your job search experience.</p>
					</motion.div>
				</div>

				<Tabs defaultValue='resume' className='w-full'>
					<TabsList className='grid w-full max-w-md mx-auto grid-cols-3 mb-8'>
						<TabsTrigger value='resume'>Resume</TabsTrigger>
						<TabsTrigger value='dashboard'>Job Match</TabsTrigger>
						<TabsTrigger value='tracking'>Tracking</TabsTrigger>
					</TabsList>

					<TabsContent value='dashboard'>
						<div className='grid lg:grid-cols-2 gap-8 items-center'>
							<motion.div className='space-y-4' initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
								<h3 className='text-2xl font-bold dark:text-white'>Smart Job Matching</h3>
								<ul className='space-y-2'>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>1</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>AI-powered job matching based on your skills and preferences</p>
									</li>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>2</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>See match percentages and save your favorite opportunities</p>
									</li>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>3</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>Apply directly through the platform with one-click applications</p>
									</li>
								</ul>
								<Button asChild className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 mt-4'>
									<a href='/sign-in'>Find Your Perfect Job</a>
								</Button>
							</motion.div>
							<motion.div
								className='relative rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.2 }}>
								<JobMatchIllustration />
							</motion.div>
						</div>
					</TabsContent>

					<TabsContent value='resume'>
						<div className='grid lg:grid-cols-2 gap-8 items-center'>
							<motion.div className='space-y-4' initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
								<h3 className='text-2xl font-bold dark:text-white'>Smart Resume Builder</h3>
								<ul className='space-y-2'>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>1</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>Choose from professionally designed templates</p>
									</li>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>2</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>AI-powered content suggestions tailored to job descriptions</p>
									</li>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>3</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>Export your resume in multiple formats (PDF, DOCX, plain text)</p>
									</li>
								</ul>
								<Button asChild className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 mt-4'>
									<a href='/sign-in'>Build Your Resume</a>
								</Button>
							</motion.div>
							<motion.div
								className='relative rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.2 }}>
								<ResumeIllustration />
							</motion.div>
						</div>
					</TabsContent>

					<TabsContent value='tracking'>
						<div className='grid lg:grid-cols-2 gap-8 items-center'>
							<motion.div className='space-y-4' initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
								<h3 className='text-2xl font-bold dark:text-white'>Application Tracking System</h3>
								<ul className='space-y-2'>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>1</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>Track all your applications in one organized system</p>
									</li>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>2</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>Set reminders for follow-ups and interviews</p>
									</li>
									<li className='flex items-start gap-2'>
										<div className='h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 dark:bg-purple-900'>
											<span className='text-purple-700 text-sm font-medium dark:text-purple-300'>3</span>
										</div>
										<p className='text-gray-600 dark:text-gray-400'>Analyze your application success rates and optimize your strategy</p>
									</li>
								</ul>
								<Button asChild className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 mt-4'>
									<a href='/sign-in'>Explore Tracking Features</a>
								</Button>
							</motion.div>
							<motion.div
								className='relative rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.2 }}>
								<TrackingIllustration />
							</motion.div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
