import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { use } from "react";
import Sidebar from "../SideBar";
import Saved from "../job/Saved";
import { useNavigate } from "react-router-dom";
import SavedSimilarJob from "../saved/SavedSimilarJob";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";
import { Briefcase, FileText, Search, PlusCircle, Sparkles, ArrowRight, Zap } from "lucide-react";
const DashboardPage = () => {
	const [data, setData] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			// Get the access token from localStorage
			const token = localStorage.getItem("access_token");

			if (!token) {
				// alert("Authorization token is missing.");
				setLoading(false);
				return;
			}

			// GET request to fetch data with Authorization header
			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/full_name/`, {
				headers: {
					Authorization: `Bearer ${token}`, // Add the token in the Authorization header
				},
			});

			setFirstName(response.data?.first_name);
			setLastName(response.data?.last_name);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleViewMoreJobs = () => {
		navigate("/job-match");
	};
	return (
		<Sidebar>
			<div className='min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/30 relative overflow-hidden'>
				{/* Background decorations */}
				<div className='absolute inset-0 overflow-hidden pointer-events-none'>
					<div className='absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200/40 rounded-full blur-3xl animate-pulse'></div>
					<div className='absolute bottom-20 right-10 w-60 h-60 sm:w-96 sm:h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000'></div>
					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000'></div>
				</div>

				<div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8'>
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
						className='flex flex-col space-y-4 sm:space-y-6 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 lg:gap-6'>
						<div className='space-y-3 sm:space-y-4'>
							<div className='flex items-center gap-2 sm:gap-3'>
								<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className='p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full'>
									<Sparkles className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
								</motion.div>
								<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent leading-tight pb-1'>
									{loading ? <Skeleton className='h-8 sm:h-10 lg:h-12 w-60 sm:w-80' /> : `Welcome, ${firstName} ${lastName}`}
								</h1>
							</div>
							<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className='text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl'>
								Ready to take the next step in your career journey? Your success story starts here.
							</motion.p>
						</div>
						<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto'>
							<Button
								asChild
								size='sm'
								className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group text-sm sm:text-base'
								disabled={loading}>
								<Link to='/resume-builder' className='flex items-center justify-center'>
									<PlusCircle className='mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300' />
									Create Resume
								</Link>
							</Button>
							<Button
								asChild
								size='sm'
								className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group text-sm sm:text-base'
								disabled={loading}>
								<Link to='/job-match' className='flex items-center justify-center'>
									<Search className='mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300' />
									Apply Now
								</Link>
							</Button>
						</motion.div>
					</motion.div>

					{/* Dashboard Overview - Enhanced Cards */}
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
						{/* Job Finder Card */}
						<motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
							<Card className='relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 hover:shadow-2xl transition-all duration-500 overflow-hidden group'>
								<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
								<CardHeader className='relative z-10'>
									<CardTitle className='text-xl flex items-center gap-3 text-blue-700 dark:text-blue-300'>
										<div className='p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-300'>
											<Search className='h-5 w-5 text-blue-600 dark:text-blue-400' />
										</div>
										Job Finder
									</CardTitle>
								</CardHeader>
								<CardContent className='relative z-10'>
									<CardDescription className='mb-6 text-gray-600 dark:text-gray-300'>Search and apply to job listings that match your profile perfectly.</CardDescription>
									<Button
										asChild
										className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group'>
										<Link to='/job-match'>
											<span>Find Jobs</span>
											<ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
										</Link>
									</Button>
								</CardContent>
							</Card>
						</motion.div>

						{/* Resume Builder Card */}
						<motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
							<Card className='relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 hover:shadow-2xl transition-all duration-500 overflow-hidden group'>
								<div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
								<CardHeader className='relative z-10'>
									<CardTitle className='text-xl flex items-center gap-3 text-green-700 dark:text-green-300'>
										<div className='p-2 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors duration-300'>
											<FileText className='h-5 w-5 text-green-600 dark:text-green-400' />
										</div>
										Resume Builder
									</CardTitle>
								</CardHeader>
								<CardContent className='relative z-10'>
									<CardDescription className='mb-6 text-gray-600 dark:text-gray-300'>Create or edit your professional resume to stand out from the crowd.</CardDescription>
									<Button
										asChild
										className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group'>
										<Link to='/resume-builder'>
											<span>Start Building</span>
											<ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
										</Link>
									</Button>
								</CardContent>
							</Card>
						</motion.div>

						{/* Applied Jobs Card */}
						<motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
							<Card className='relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:shadow-2xl transition-all duration-500 overflow-hidden group'>
								<div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
								<CardHeader className='relative z-10'>
									<CardTitle className='text-xl flex items-center gap-3 text-purple-700 dark:text-purple-300'>
										<div className='p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors duration-300'>
											<Briefcase className='h-5 w-5 text-purple-600 dark:text-purple-400' />
										</div>
										Your Applications
									</CardTitle>
								</CardHeader>
								<CardContent className='relative z-10'>
									<CardDescription className='mb-6 text-gray-600 dark:text-gray-300'>Keep track of your job applications and monitor their status.</CardDescription>
									<Button
										asChild
										className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group'>
										<Link to='/wishlist'>
											<span>View Applications</span>
											<ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
										</Link>
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>

					{/* Saved Jobs Section */}
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className='space-y-8'>
						<div className='text-center'>
							<motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
								Your Saved Opportunities
							</motion.h2>
							<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className='text-gray-600 dark:text-gray-400'>
								Discover and track the jobs that match your career goals
							</motion.p>
						</div>

						<div className='space-y-6'>
							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
								<Saved />
							</motion.div>
							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
								<SavedSimilarJob />
							</motion.div>
						</div>

						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className='flex justify-center mt-8'>
							<Button
								onClick={handleViewMoreJobs}
								className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group'>
								<Zap className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300' />
								View More Jobs
								<ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300' />
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</Sidebar>
	);
};

export default DashboardPage;
