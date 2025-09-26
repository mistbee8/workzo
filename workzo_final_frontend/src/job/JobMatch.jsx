import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Search, Filter, Briefcase, MapPin, Building, ExternalLink } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";

const JobMatch = () => {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilters, setSelectedFilters] = useState([]);

	const token = localStorage.getItem("access_token");

	useEffect(() => {
		if (token) {
			axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					setAuthenticated(true);
				})
				.catch((error) => {
					console.log("Authorization error:", error);
					setAuthenticated(false);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, [token]);

	// Sample job listings (replace with real data from API)
	const jobListings = [
		{
			id: 1,
			title: "Software Engineer",
			company: "Tech Corp",
			location: "Remote",
			salary: "₹6L - 8L",
			type: "Full-time",
			logo: "/placeholder-logo.png",
			description: "Join our team to build innovative software solutions.",
		},
		{
			id: 2,
			title: "Product Manager",
			company: "Business Inc",
			location: "Pune",
			salary: "₹12L - 15L",
			type: "Full-time",
			logo: "/placeholder-logo.png",
			description: "Lead product development and strategy initiatives.",
		},
		{
			id: 3,
			title: "Data Scientist",
			company: "AI Solutions",
			location: "Delhi",
			salary: "₹10L - 12L",
			type: "Full-time",
			logo: "/placeholder-logo.png",
			description: "Analyze data and build predictive models.",
		},
		{
			id: 4,
			title: "Frontend Developer",
			company: "Web Studio",
			location: "Mumbai",
			salary: "₹5L - 7L",
			type: "Part-time",
			logo: "/placeholder-logo.png",
			description: "Create beautiful and responsive web interfaces.",
		},
		{
			id: 5,
			title: "DevOps Engineer",
			company: "Cloud Systems",
			location: "Remote",
			salary: "₹8L - 10L",
			type: "Full-time",
			logo: "/placeholder-logo.png",
			description: "Manage cloud infrastructure and deployment pipelines.",
		},
	];

	const jobTypes = ["Full-time", "Part-time", "Remote", "On-site"];

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const toggleFilter = (filter) => {
		setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
	};

	const filteredJobs = jobListings.filter((job) => {
		const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesFilters =
			selectedFilters.length === 0 ||
			selectedFilters.includes(job.type) ||
			(selectedFilters.includes("Remote") && job.location.toLowerCase().includes("remote")) ||
			(selectedFilters.includes("On-site") && !job.location.toLowerCase().includes("remote"));

		return matchesSearch && matchesFilters;
	});

	if (loading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
					<p className='text-gray-600 dark:text-gray-300'>Loading...</p>
				</div>
			</div>
		);
	}

	if (!authenticated) {
		return <Navigate to='/sign-in' />;
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30'>
			{/* Background decorations */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000'></div>
			</div>

			<div className='relative z-10 container mx-auto p-6 space-y-8'>
				{/* Header */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-center space-y-4'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className='p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full'>
							<Briefcase className='w-6 h-6 text-white' />
						</motion.div>
						<h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>All Jobs</h1>
					</div>
					<p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>Discover amazing opportunities from top companies around the world</p>
				</motion.div>

				{/* Search and Filters */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className='space-y-6'>
					{/* Search Bar */}
					<div className='flex justify-center'>
						<div className='relative w-full max-w-2xl'>
							<div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
							<div className='relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
								<Input
									type='text'
									className='w-full h-14 pl-14 pr-6 bg-transparent border-0 text-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none rounded-2xl'
									placeholder='Search for jobs, companies, or locations...'
									value={searchQuery}
									onChange={handleSearch}
								/>
								<Search className='absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300' />
							</div>
						</div>
					</div>

					{/* Filter Buttons */}
					<div className='flex justify-center'>
						<div className='flex flex-wrap gap-3'>
							{jobTypes.map((type) => (
								<motion.div key={type} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button
										variant={selectedFilters.includes(type) ? "default" : "outline"}
										size='sm'
										onClick={() => toggleFilter(type)}
										className={
											selectedFilters.includes(type)
												? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
												: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
										}>
										{type}
									</Button>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Job Listings */}
				<div className='space-y-6'>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className='flex items-center justify-between'>
						<h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{filteredJobs.length === 0 ? "No Jobs Found" : `${filteredJobs.length} Jobs Available`}</h2>
						{selectedFilters.length > 0 && (
							<Button variant='outline' size='sm' onClick={() => setSelectedFilters([])} className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20'>
								Clear Filters
							</Button>
						)}
					</motion.div>

					{filteredJobs.length === 0 ? (
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-center py-12'>
							<div className='max-w-md mx-auto'>
								<div className='w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6'>
									<Search className='w-12 h-12 text-blue-500' />
								</div>
								<h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>No Jobs Found</h3>
								<p className='text-gray-600 dark:text-gray-300 mb-6'>Try adjusting your search criteria or filters to find more opportunities.</p>
								<Button
									onClick={() => {
										setSearchQuery("");
										setSelectedFilters([]);
									}}
									variant='outline'
									className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20'>
									Clear Search
								</Button>
							</div>
						</motion.div>
					) : (
						<div className='grid gap-6'>
							{filteredJobs.map((job, index) => (
								<motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} whileHover={{ y: -2 }}>
									<Card className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden'>
										<div className='absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

										<CardContent className='p-6 relative z-10'>
											<div className='flex items-start justify-between'>
												<div className='flex items-start gap-4 flex-1'>
													{/* Company Logo */}
													<div className='relative'>
														<div className='absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
														<img
															src={job.logo}
															alt={`${job.company} logo`}
															className='relative w-12 h-12 object-contain rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 p-2 shadow-md'
															onError={(e) => {
																e.target.src = "/placeholder-logo.png";
															}}
														/>
													</div>

													{/* Job Details */}
													<div className='flex-1 min-w-0'>
														<div className='flex items-start justify-between mb-2'>
															<h3 className='text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>{job.title}</h3>
															<Badge variant='secondary' className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ml-2'>
																{job.type}
															</Badge>
														</div>

														<div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3'>
															<div className='flex items-center gap-1'>
																<Building className='h-4 w-4' />
																<span className='font-medium'>{job.company}</span>
															</div>
															<div className='flex items-center gap-1'>
																<MapPin className='h-4 w-4' />
																<span>{job.location}</span>
															</div>
														</div>

														<p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-2'>{job.description}</p>

														<div className='flex items-center justify-between'>
															<Badge variant='secondary' className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
																{job.salary}
															</Badge>

															<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
																<Button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group'>
																	Apply Now
																	<ExternalLink className='h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200' />
																</Button>
															</motion.div>
														</div>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default JobMatch;
