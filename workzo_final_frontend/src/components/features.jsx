import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, FileText, BarChart, Zap, Briefcase, Award, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 50,
				damping: 15,
			},
		},
	};

	return (
		<section className='w-full pt-10'>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center mb-10'>
					<motion.div className='space-y-2 max-w-[800px]' initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl leading-tight sm:leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 pb-2'>
							Streamline your job search process
						</h2>
						<p className='text-gray-600 md:text-xl/relaxed dark:text-gray-400'>
							Our platform helps you manage every aspect of your job search journey with powerful tools designed to save you time and increase your chances of success.
						</p>
					</motion.div>
				</div>

				<Tabs defaultValue='resume' className='w-full'>
					<TabsList className='grid w-full grid-cols-2 md:grid-cols-4 mb-8'>
						<TabsTrigger value='resume'>Resume Builder</TabsTrigger>
						<TabsTrigger value='job-search'>Job Search</TabsTrigger>
						<TabsTrigger value='tracking'>Application Tracking</TabsTrigger>
						<TabsTrigger value='career'>Career Growth</TabsTrigger>
					</TabsList>

					<TabsContent value='job-search'>
						<motion.div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6' variants={container} initial='hidden' whileInView='show' viewport={{ once: true }}>
							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<Search className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Smart Job Matching</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Our AI-powered system matches your skills and preferences with the perfect job opportunities.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<Briefcase className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Job Recommendations</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Get personalized job recommendations based on your experience, skills, and career goals.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<Users className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Company Insights</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Access detailed company profiles, culture information, and employee reviews.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					</TabsContent>

					<TabsContent value='resume'>
						<motion.div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6' variants={container} initial='hidden' whileInView='show' viewport={{ once: true }}>
							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<FileText className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>ATS-Friendly Templates</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Create professional, ATS-friendly resumes tailored to each job application.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<Award className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Skills Highlighting</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Automatically highlight relevant skills and experiences based on job descriptions.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<TrendingUp className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Performance Analytics</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Track how your resume performs and get suggestions for improvements.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					</TabsContent>

					<TabsContent value='tracking'>
						<motion.div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6' variants={container} initial='hidden' whileInView='show' viewport={{ once: true }}>
							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<BarChart className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Application Dashboard</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Keep track of all your applications, interviews, and follow-ups in one organized dashboard.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<Zap className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>One-Click Apply</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Apply to multiple jobs quickly with your saved profile information and customized materials.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<Users className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Interview Preparation</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Get company-specific interview tips and practice questions to help you prepare.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					</TabsContent>

					<TabsContent value='career'>
						<motion.div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6' variants={container} initial='hidden' whileInView='show' viewport={{ once: true }}>
							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<TrendingUp className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Skill Development</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Identify skill gaps and get recommendations for courses and resources to improve.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<Award className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Career Path Planning</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Explore potential career paths and get guidance on how to achieve your long-term goals.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={item}>
								<Card className='h-full border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900/50'>
									<CardHeader className='flex flex-row items-center gap-4'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500'>
											<Briefcase className='h-6 w-6 text-white' />
										</div>
										<div>
											<CardTitle className='dark:text-white'>Salary Insights</CardTitle>
										</div>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-base dark:text-gray-400'>Access detailed salary information and negotiation tips to maximize your compensation.</CardDescription>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
