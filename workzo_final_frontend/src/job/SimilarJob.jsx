import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Filter, FilePlus, Mic, Calendar, MapPin, Building, ExternalLink, Sparkles, Star } from "lucide-react";
import Modal from "./Modal";
import { useUser } from "../utils/UserContext";
import Sidebar from "../SideBar";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";
const SimilarJob = ({ viewLogic, setViewLogic }) => {
	const [WishlistJobIds1, setWishlistJobIds1] = useState([]);
	const [authenticated, setAuthenticated] = useState(null);
	const [loading, setLoading] = useState(false);
	const [facets, setFacets] = useState({ job_location: [], job_position: [] });
	const [filters, setFilters] = useState({
		job_location: [],
		job_position: [],
	});
	const [searchQuery, setSearchQuery] = useState("");
	const [jobsData1, setjobsData1] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isModalOpen, setModalOpen] = useState(false);

	const token = localStorage.getItem("access_token");
	const perPage = 60;

	const { setJob } = useUser();

	const clearFilters = () => {
		setFilters({
			job_location: [],
			job_position: [],
		});
	};

	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState("");

	// Handle file selection
	const onFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	// Handle file upload
	// const onUpload = async () => {
	//   if (!file) {
	//     alert("Please select a file");
	//     return;
	//   }

	//   setUploading(true);
	//   setError(null);
	//   setMessage("");

	//   const formData = new FormData();
	//   formData.append("file", file);

	//   try {
	//     const token = localStorage.getItem("access_token"); // Or another way to get the token

	//     const response = await axios.post(
	//       `${import.meta.env.VITE_BACKEND_URL}/job_api/upload/`,
	//       formData,
	//       {
	//         headers: {
	//           "Content-Type": "multipart/form-data",
	//           Authorization: `Bearer ${token}`, // Add the Bearer token to the headers
	//         },
	//       }
	//     );

	//     setMessage(response.data.message); // Success message from backend
	//   } catch (err) {
	//     setError(err.response?.data?.detail || "An error occurred");
	//   } finally {
	//     setUploading(false);
	//   }
	// };
	const getAuthToken = () => {
		return localStorage.getItem("access_token");
	};

	const fetchJobsFromTypesense = async (query, page = 1) => {
		const searchQuery = query || "";
		const userId = "ec5b4e72-b78b-4e95-ac7c-1cabf094525a";

		setLoading(true);

		try {
			const response = await axios.post(
				`https://bckn.tensorsolution.in/api/v1/search_workzo/?collection_name=${userId}_jobs_data_workzo&query=${encodeURIComponent(searchQuery)}&k=200&distance_threshold=1&facet_by=job_location,job_position`,
				'',
				{
					headers: {
						'accept': 'application/json',
						'Authorization': 'Bearer 0V7dEN4BHuAZsN5kVvHzC68UrHzvLoq7'
					}
				}
			);

			console.log("Response from new search_workzo API:", response.data);

			// Extracting facet counts
			const facetCounts = response.data.facet_counts || [];
			const jobLocationFacet = facetCounts.find((facet) => facet.field_name === "job_location");
			const jobPositionFacet = facetCounts.find((facet) => facet.field_name === "job_position");

			// Set facets in state
			const newFacets = {
				job_location: jobLocationFacet?.counts || [],
				job_position: jobPositionFacet?.counts || [],
			};
			setFacets(newFacets);

			// Extract job documents
			const jobDocuments = response.data.response.results[0].hits?.map((item) => {
				const job = item.document;
				const vector_distance = item.vector_distance;
console.log("jobssdfvhdfhdsfhdfh:", response.data.response.results.hits);
				return {
					...job,
					vector_distance,
				};
			}) || [];

			// Extract total number of hits and calculate total pages
			const totalHits = response.data.found || 0;
			const totalPages = Math.ceil(totalHits / perPage);

			console.log("Job Documents:", jobDocuments);
			console.log("Total hits:", totalHits);

			setjobsData1(jobDocuments); // Set job documents
			setTotalPages(totalPages); // Set total pages
		} catch (error) {
			console.error("Error detected while fetching jobs from new API:", error);
		} finally {
			setLoading(false);
		}
	};

	const getFilters = () => {
		const { job_location, job_position } = filters;
		let filterQuery = "";
		if (job_location.length > 0) {
			filterQuery += `job_location:(${job_location.join(",")})`;
		}
		if (job_position.length > 0) {
			if (filterQuery) filterQuery += " && ";
			filterQuery += `job_position:(${job_position.join(",")})`;
		}
		return filterQuery || undefined;
	};

	useEffect(() => {
		fetchJobsFromTypesense(searchQuery, currentPage);
	}, [searchQuery, currentPage, filters]);

	// const handleSearchChange = (e) => {
	//   setSearchQuery(e.target.value);
	// };

	const handleFilterChange = (e, field) => {
		const { value, checked } = e.target;

		setFilters((prevFilters) => {
			const newFilters = { ...prevFilters };

			if (checked) {
				newFilters[field] = [...newFilters[field], value];
			} else {
				newFilters[field] = newFilters[field].filter((item) => item !== value);
			}

			return newFilters;
		});
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};
	const fileInputRef = useRef(null);

	const handleIconClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];

		if (file) {
			const formData = new FormData();
			formData.append("file", file);

			try {
				const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/job_api/upload-pdf`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
						accept: "application/json",
					},
				});
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		}
	};

	const handlebutton1 = async (job) => {
		const isJobBookmarked = isFilteredJob1(job); // Check if job is already in wishlist

		// Update the UI optimistically
		const updatedWishlist = isJobBookmarked
			? WishlistJobIds1.filter((id) => id !== job.job_id) // Remove job from wishlist
			: [...WishlistJobIds1, job.job_id]; // Add job to wishlist

		// Update the state to trigger a re-render
		setWishlistJobIds1(updatedWishlist);

		// Update the job data (optimistically)
		const updatedJobData = jobsData1.map((item) => (item.job_id === job.job_id ? { ...item, isBookmarked: !isJobBookmarked } : item));
		setjobsData1(updatedJobData); // Update jobsData1 to re-render UI

		// Inform the user with a toast
		toast.success(isJobBookmarked ? "Job removed from wishlist" : "Job added to wishlist");

		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				toast.error("User is not authenticated. Please log in.");
				return;
			}

			// Send the updated wishlist to the backend
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/wishlist/?job_id=${job.job_id}`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error updating wishlist in the backend:", error);

			// Rollback the UI changes if the request fails
			setWishlistJobIds1(WishlistJobIds1);
			setjobsData1(jobsData1); // Revert jobsData1 to the original state
			toast.error("Failed to update wishlist. Please try again.");
		}
	};

	const fetchWishlist = async () => {
		try {
			const token = localStorage.getItem("access_token");
			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/wishlist/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const jobIds = response.data.jobs.map((jobId) => jobId.trim()) || [];
			setWishlistJobIds1(jobIds); // Store wishlist job IDs
		} catch (error) {
			console.error("Error fetching wishlist data:", error);
		}
	};
	useEffect(() => {
		fetchWishlist();
	}, []);

	const filteredJobDocuments = jobsData1 ? jobsData1.filter((document) => WishlistJobIds1.includes(document.job_id)) : [];

	const isFilteredJob1 = (job) => {
		// Logic to determine if the job is filtered
		return filteredJobDocuments.some(
			(filteredJob) => filteredJob.id === job.id // Compare IDs or any unique identifier
		);
	};

	const [isCardView, setIsCardView] = useState(true);

	const toggleView = () => {
		setIsCardView((prevView) => !prevView);
	};

	const [resume, setResume] = useState(null);

	// Function to fetch the resume
	const fetchResume = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});

			// if (response.data.message === "No resume found for this user.") {
			//   setError("No resume found for this user.");
			// } else {
			//   // const resumeKeywords = response.data.resume.keywords.join(" ");
			//   console.log("Resume Keywords:");
			if (response.status === 200) {
				const fetchedResumeIds = response.data.map((resume) => resume.id);
				const skills = response.data[0].skills.map((skill) => skill.name).join(" ");
				console.log("Skills:", skills);

				//  console.log("Fetched resume skills:", response.data[0]);
				// Fetch preferences and combine data
				const preferencesKeywords = await fetchPreferences();
				console.log("Preferences Keywords:", preferencesKeywords);

				// Combine resume keywords and preferences
				const combinedKeywords = `${preferencesKeywords} ${skills}   `;
				console.log("Final Combined Keywords:", combinedKeywords);

				setResume(combinedKeywords);
				fetchJobsFromTypesense(combinedKeywords);
			}
		} catch (err) {
			console.error("Error fetching resume:", err);
			setError("An error occurred while fetching the resume.");
		} finally {
			setLoading(false);
		}
	};

	const fetchPreferences = async () => {
		const token = getAuthToken();
		if (token) {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/preferences/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				console.log("Full Preferences Response:", response.data);

				// Extract industry as a string
				const industry = response.data.industry ? response.data.industry : "";
				console.log("Extracted Industry:", industry);

				return industry;
			} catch (error) {
				console.error("Error fetching preferences:", error);
				return ""; // Return empty string in case of error
			}
		}
		return "";
	};

	useEffect(() => {
		fetchResume();
	}, []); // This ensures the fetch is done when the component is mounted

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='container mx-auto '>
			<div className=''>
				<Modal isOpen={isModalOpen} onClose={toggleModal} filters={filters} clearFilters={clearFilters} facets={facets} showFilters={false} handleFilterChange={handleFilterChange} />
			</div>
			{/* <h1>{resume}</h1> */}

			{/* Search bar */}
			{/* <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-xl">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              value={resume} // Bind the value of the input to the `resume` state
              onChange={(e) => setResume(e.target.value)} // Allow changes in the input
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </span>

            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleIconClick}
            >
              <FilePlus size={20} />
            </span>
            <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
              <Mic size={20} />
            </span>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>
        <button
            onClick={toggleModal}
            className=" text-black font-semibold  px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <Filter size={30} className="mr-0" />
          </button>
        <button
          onClick={toggleView}
          className=" p-2 rounded-md hover:bg-gray-300"
        >
          {isCardView ? <FaList size={24} /> : <FaTh size={24} />}
        </button>
     
      </div> */}

			{/* <h1 className="text-center text-4xl font-semibold mb-1">Jobs for you</h1> */}
			{/* Loading State */}
			{loading && <div>Loading...</div>}
			{/* <h1 className="text-center text-4xl font-semibold mb-6">Jobs for you</h1>
      <div className="flex justify-center mb-6 ">No jobs found</div> */}
			{/* Job Listings */}
			<div className='container mx-auto'>
				{/* Conditional Rendering Based on View Type */}
				{jobsData1 && jobsData1.length > 0 && (
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-center mb-8'>
						<div className='flex items-center justify-center gap-3 mb-4'>
							<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className='p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full'>
								<Star className='w-6 h-6 text-white' />
							</motion.div>
							<h1 className='text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent'>Jobs for You</h1>
						</div>
						<p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>Personalized job recommendations based on your profile and preferences</p>
					</motion.div>
				)}

				{/* Loading State */}
				{loading && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Array.from({ length: 6 }).map((_, index) => (
							<motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
								<Card className='h-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700'>
									<CardContent className='p-6'>
										<div className='flex justify-between items-start mb-4'>
											<Skeleton className='h-4 w-20' />
											<Skeleton className='h-6 w-6 rounded-full' />
										</div>
										<div className='flex justify-center mb-4'>
											<Skeleton className='h-16 w-16 rounded-full' />
										</div>
										<div className='text-center space-y-2'>
											<Skeleton className='h-6 w-full' />
											<Skeleton className='h-4 w-3/4 mx-auto' />
											<Skeleton className='h-4 w-1/2 mx-auto' />
										</div>
										<div className='mt-6'>
											<Skeleton className='h-10 w-full' />
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				)}

				{viewLogic ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{jobsData1 &&
							jobsData1
								.sort((a, b) => {
									if (isNaN(a.vector_distance)) return 1;
									if (isNaN(b.vector_distance)) return -1;
									return b.vector_distance - a.vector_distance;
								})
								.map((job, index) => (
									<motion.div key={job.job_id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} whileHover={{ y: -5 }}>
										<Card className='h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden'>
											{/* Gradient overlay */}
											<div className='absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

											<CardContent className='p-6 relative z-10'>
												{/* Header with date, match percentage, and bookmark */}
												<div className='flex justify-between items-start mb-4'>
													<div className='flex items-center gap-2'>
														<Calendar className='h-4 w-4 text-gray-500' />
														<span className='text-sm text-gray-600 dark:text-gray-300'>{formatDate(job.job_posting_date)}</span>
													</div>
													<div className='flex items-center gap-2'>
														<Badge
															variant='secondary'
															className={`${
																job.vector_distance * 100 > 75
																	? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
																	: job.vector_distance * 100 >= 50
																	? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
																	: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
															}`}>
															{isNaN(job.vector_distance) ? "50% match" : `${Math.max(0, job.vector_distance * 100).toFixed(0)}% match`}
														</Badge>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={() => handlebutton1(job)}
															className='p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200'>
															{isFilteredJob1(job) ? <FaBookmark className='h-5 w-5 text-green-500' /> : <FaRegBookmark className='h-5 w-5 text-gray-400 hover:text-green-500' />}
														</motion.button>
													</div>
												</div>

												{/* Company Logo */}
												<div className='flex justify-center mb-4'>
													<div className='relative'>
														<div className='absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
														<img
															src={job.company_logo_url}
															alt={`${job.company_name} logo`}
															className='relative w-16 h-16 object-contain rounded-full bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 p-2 shadow-md'
															onError={(e) => {
																e.target.src = "/placeholder-logo.png";
															}}
														/>
													</div>
												</div>

												{/* Job Details */}
												<div className='text-center space-y-2 mb-6'>
													<h3 className='text-xl font-semibold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 line-clamp-2'>
														{job.job_position}
													</h3>
													<div className='flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
														<Building className='h-4 w-4' />
														<span className='font-medium'>{job.company_name}</span>
													</div>
													<div className='flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
														<MapPin className='h-4 w-4' />
														<span>{job.job_location}</span>
													</div>
													{job.salary && (
														<div className='flex items-center justify-center gap-2'>
															<Badge variant='secondary' className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
																{job.salary}
															</Badge>
														</div>
													)}
												</div>

												{/* Apply Button */}
												<div className='mt-auto'>
													<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
														<Button
															asChild
															className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group'>
															<a href={job.job_link} target='_blank' rel='noopener noreferrer' className='flex items-center justify-center gap-2'>
																Apply Now
																<ExternalLink className='h-4 w-4 group-hover:translate-x-1 transition-transform duration-200' />
															</a>
														</Button>
													</motion.div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
					</div>
				) : (
					// List View
					<div className='space-y-4'>
						{jobsData1 &&
							jobsData1
								.sort((a, b) => {
									if (isNaN(a.vector_distance)) return 1;
									if (isNaN(b.vector_distance)) return -1;
									return b.vector_distance - a.vector_distance;
								})
								.map((job, index) => (
									<motion.div key={job.job_id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} whileHover={{ x: 5 }}>
										<Card className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden'>
											{/* Gradient overlay */}
											<div className='absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

											<CardContent className='p-6 relative z-10'>
												<div className='flex items-center justify-between'>
													<div className='flex items-center gap-6'>
														{/* Company Logo */}
														<div className='relative'>
															<div className='absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
															<img
																src={job.company_logo_url}
																alt={`${job.company_name} logo`}
																className='relative w-12 h-12 object-contain rounded-full bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 p-1 shadow-md'
																onError={(e) => {
																	e.target.src = "/placeholder-logo.png";
																}}
															/>
														</div>

														{/* Job Details */}
														<div className='flex-1'>
															<div className='flex items-center gap-4 mb-1'>
																<h3 className='text-lg font-semibold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300'>
																	{job.job_position}
																</h3>
																<Badge
																	variant='secondary'
																	className={`${
																		job.vector_distance * 100 > 75
																			? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
																			: job.vector_distance * 100 >= 50
																			? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
																			: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
																	}`}>
																	{isNaN(job.vector_distance) ? "50% match" : `${Math.max(0, job.vector_distance * 100).toFixed(0)}% match`}
																</Badge>
															</div>
															<div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300'>
																<div className='flex items-center gap-1'>
																	<Building className='h-4 w-4' />
																	<span className='font-medium'>{job.company_name}</span>
																</div>
																<div className='flex items-center gap-1'>
																	<MapPin className='h-4 w-4' />
																	<span>{job.job_location}</span>
																</div>
																<div className='flex items-center gap-1'>
																	<Calendar className='h-4 w-4' />
																	<span>{formatDate(job.job_posting_date)}</span>
																</div>
															</div>
															{job.salary && (
																<div className='mt-2'>
																	<Badge variant='secondary' className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
																		{job.salary}
																	</Badge>
																</div>
															)}
														</div>
													</div>

													{/* Actions */}
													<div className='flex items-center gap-3'>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={() => handlebutton1(job)}
															className='p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200'>
															{isFilteredJob1(job) ? <FaBookmark className='h-5 w-5 text-green-500' /> : <FaRegBookmark className='h-5 w-5 text-gray-400 hover:text-green-500' />}
														</motion.button>

														<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
															<Button
																asChild
																className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group'>
																<a href={job.job_link} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
																	Apply Now
																	<ExternalLink className='h-4 w-4 group-hover:translate-x-1 transition-transform duration-200' />
																</a>
															</Button>
														</motion.div>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
					</div>
				)}

				{/* Empty State */}
				{!loading && (!jobsData1 || jobsData1.length === 0) && (
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-center py-12'>
						<div className='max-w-md mx-auto'>
							<div className='w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6'>
								<Star className='w-12 h-12 text-green-500' />
							</div>
							<h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>No Personalized Jobs Yet</h3>
							<p className='text-gray-600 dark:text-gray-300 mb-6'>Upload your resume and set your preferences to get personalized job recommendations.</p>
						</div>
					</motion.div>
				)}
			</div>

			{/* Pagination Controls */}
		</div>
	);
};

export default SimilarJob;
