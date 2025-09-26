import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Filter } from "lucide-react";
import { FilePlus } from "lucide-react";
import Modal from "./Modal";
import Modal1 from "./Modal1";
import { Mic } from "lucide-react";
import { useUser } from "../utils/UserContext";
import Sidebar from "../SideBar";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaList, FaTh } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimilarJob from "./SimilarJob";
import Modal2 from "./Modal2";
import Preference from "../settings/Preference";
import { MdSettings } from "react-icons/md";
import SeperateChild from "./SeperateChild";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Building,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Settings,
  Sparkles,
} from "lucide-react";
const JobMatch2 = () => {
  const [wishlistJobIds, setWishlistJobIds] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [WishlistJobIds1, setWishlistJobIds1] = useState([]);
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facets, setFacets] = useState({ job_location: [], job_position: [] });
  const [filters, setFilters] = useState({
    job_location: [],
    job_position: [],
  });
  const [resume, setResume] = useState(null);
  const [isApiSuccess, setIsApiSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobsData, setJobsData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal1Open, setModal1Open] = useState(false);
  const [viewLogic, setViewLogic] = useState(true);
  const token = localStorage.getItem("access_token");
  const perPage = 10;

  const { setJob } = useUser();
  const [error, setError] = useState(null);
  const [jobsData1, setjobsData1] = useState(null);
  const clearFilters = () => {
    setFilters({
      job_location: [],
      job_position: [],
    });
  };
  const getAuthToken = () => {
    return localStorage.getItem("access_token");
  };

  const fetchjobsTensorSearch = async (query, page = 1) => {
    const searchQuery = query || "";
    const userId = "ec5b4e72-b78b-4e95-ac7c-1cabf094525a"; // User ID from the provided parameters

    setLoading(true);

    try {
      const response = await axios.post(
        `https://bckn.tensorsolution.in/api/v1/search?collection_name=${userId}_jobs_data_workzo&query_by=company_name,company_profile,job_position,job_location&query_type=keyword&query=${encodeURIComponent(
          searchQuery
        )}&per_page=10&page=${page}&facet_by=company_name,job_position,job_location&filter_by=${encodeURIComponent(
          getFilters() || ""
        )}&user_id=${userId}`,
        {},
        {
          headers: {
            Authorization: "Bearer 0V7dEN4BHuAZsN5kVvHzC68UrHzvLoq7",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from Typesense:", response.data);
      const facetCounts = response.data.response.facet_counts || [];
      const jobLocationFacet = facetCounts.find(
        (facet) => facet.field_name === "job_location"
      );
      const jobPositionFacet = facetCounts.find(
        (facet) => facet.field_name === "job_position"
      );

      if (jobLocationFacet?.counts) {
        setJob(jobLocationFacet.counts);
      }

      const newFacets = {
        job_location: jobLocationFacet?.counts || [],
        job_position: jobPositionFacet?.counts || [],
      };

      setFacets(newFacets);

      const jobDocuments =
        response.data.response.hits?.map((item) => item.document) || [];
      const totalHits = response.data.response.found || 0;
      const totalPages = Math.ceil(totalHits / 10); // Using 10 as per_page from API
      console.log("Job Documents:", response.data.response);
      setJobsData(jobDocuments);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error detected while fetching jobs from Typesense", error);
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
    fetchjobsTensorSearch(searchQuery, currentPage);
  }, [searchQuery, currentPage, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
  const toggleModal1 = () => {
    setModal1Open(!isModal1Open);
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
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/job_api/upload-pdf`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handlebutton = async (job) => {
    const isJobBookmarked = isFilteredJob(job); // Check if job is already in wishlist

    // Update the UI optimistically
    const updatedWishlist = isJobBookmarked
      ? wishlistJobIds.filter((id) => id !== job.job_id) // Remove job from wishlist
      : [...wishlistJobIds, job.job_id]; // Add job to wishlist

    // Update the state to trigger a re-render
    setWishlistJobIds(updatedWishlist);

    // Update the job data (optimistically)
    const updatedJobData = jobsData.map((item) =>
      item.job_id === job.job_id
        ? { ...item, isBookmarked: !isJobBookmarked }
        : item
    );
    setJobsData(updatedJobData); // Update jobsData to re-render UI

    // Inform the user with a toast
    toast.success(
      isJobBookmarked ? "Job removed from wishlist" : "Job added to wishlist"
    );

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        toast.error("User is not authenticated. Please log in.");
        return;
      }

      // Send the updated wishlist to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/wishlist/?job_id=${
          job.job_id
        }`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating wishlist in the backend:", error);

      // Rollback the UI changes if the request fails
      setWishlistJobIds(wishlistJobIds);
      setJobsData(jobsData); // Revert jobsData to the original state
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/wishlist/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const jobIds = response.data.jobs.map((jobId) => jobId.trim()) || [];
      setWishlistJobIds(jobIds); // Store wishlist job IDs
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  const filteredJobDocuments = jobsData
    ? jobsData.filter((document) => wishlistJobIds.includes(document.job_id))
    : [];

  const isFilteredJob = (job) => {
    // Logic to determine if the job is filtered
    console.log("hello filtersss");
    return filteredJobDocuments.some(
      (filteredJob) => filteredJob.id === job.id // Compare IDs or any unique identifier
    );
  };

  const [isCardView, setIsCardView] = useState(true);

  const toggleView = () => {
    setViewLogic((prevView) => !prevView); // Toggle between Card and List view
  };

  const fetchJobsFromTypesense = async (query, page = 1) => {
    const searchQuery = query || "";
    const userId = "ec5b4e72-b78b-4e95-ac7c-1cabf094525a";

    setLoading(true);

    try {
      const response = await axios.post(
        `https://bckn.tensorsolution.in/api/v1/search_workzo/?collection_name=${userId}_jobs_data_workzo&query=${encodeURIComponent(
          searchQuery
        )}&k=200&distance_threshold=1&facet_by=job_location,job_position`,
        "",
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer 0V7dEN4BHuAZsN5kVvHzC68UrHzvLoq7",
          },
        }
      );

      console.log("Response from new API:", response.data);

      // Extracting facet counts
      const facetCounts = response.data.facet_counts || [];
      const jobLocationFacet = facetCounts.find(
        (facet) => facet.field_name === "job_location"
      );
      const jobPositionFacet = facetCounts.find(
        (facet) => facet.field_name === "job_position"
      );

      // Set facets in state
      const newFacets = {
        job_location: jobLocationFacet?.counts || [],
        job_position: jobPositionFacet?.counts || [],
      };
      setFacets(newFacets);

      // Extract job documents
      const jobDocuments =
        response.data.hits?.map((item) => {
          const job = item.document;
          const vector_distance = item.vector_distance;

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

  const fetchResume = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/allresumes/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.data.message === "No resume found for this user.") {
        setError("No resume found for this user.");
      } else {
        const resumeKeywords = response.data.resume.keywords.join(" ");
        console.log("Resume Keywords:", resumeKeywords);

        // Fetch preferences and combine data
        const preferencesKeywords = await fetchPreferences();
        console.log("Preferences Keywords:", preferencesKeywords);

        // Combine resume keywords and preferences
        const combinedKeywords =
          `${preferencesKeywords} ${resumeKeywords} `.trim();
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

  useEffect(() => {
    fetchResume();
  }, []); //
  const fetchPreferences = async () => {
    const token = getAuthToken();
    if (token) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/preferences/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const fetchAllResumes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Check if the response status is 200
      if (response.status === 200) {
        setIsApiSuccess(true); // API call was successful, set to true
        const fetchedResumeIds = response.data.map((resume) => resume.id);
        console.log("Fetched resume IDs:", fetchedResumeIds);
        //  setResumeIds(fetchedResumeIds);

        // If there's at least one resume, set the first one as the selected resume
        if (fetchedResumeIds.length > 0) {
          setSelectedResumeId(fetchedResumeIds[0]);
        }
      } else {
        setIsApiSuccess(false); // API call failed, set to false
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setIsApiSuccess(false); // If an error occurs, set to false
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <Sidebar>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 sm:w-96 sm:h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 sm:space-y-4"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              {/* <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className='p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full'>
								<Sparkles className='w-4 h-4 sm:w-6 sm:h-6 text-white' />
							</motion.div> */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Find Your Dream Job
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Discover thousands of opportunities that match your skills and
              preferences
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center justify-center"
          >
            {/* Search Bar */}
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <Input
                  type="text"
                  className="w-full h-12 sm:h-14 pl-12 sm:pl-14 pr-4 sm:pr-6 bg-transparent border-0 text-base sm:text-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none rounded-2xl"
                  placeholder="Search jobs, companies..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 w-full lg:w-auto justify-center">
              {(searchQuery.trim() || !isApiSuccess) && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 lg:flex-none"
                >
                  <Button
                    onClick={toggleModal}
                    variant="outline"
                    size="lg"
                    className="h-12 sm:h-14 px-3 sm:px-6 w-full lg:w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group text-sm sm:text-base"
                  >
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 group-hover:text-blue-600 transition-colors duration-300" />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 lg:flex-none"
              >
                <Button
                  onClick={toggleModal1}
                  variant="outline"
                  size="lg"
                  className="h-12 sm:h-14 px-3 sm:px-6 w-full lg:w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 group text-sm sm:text-base"
                >
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 group-hover:text-indigo-600 transition-colors duration-300" />
                  <span className="hidden sm:inline">Preferences</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={toggleView}
                  variant="outline"
                  size="lg"
                  className="h-12 sm:h-14 px-3 sm:px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 group"
                >
                  {viewLogic ? (
                    <List className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-purple-600 transition-colors duration-300" />
                  ) : (
                    <Grid3X3 className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-purple-600 transition-colors duration-300" />
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Job Results Section */}
        <div className="relative px-4 sm:px-6">
          {searchQuery.trim() || !isApiSuccess ? (
            <>
              {/* Results Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                    {jobsData
                      ? `${jobsData.length} Jobs Found`
                      : "Searching..."}
                  </h2>
                  {jobsData && jobsData.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs sm:text-sm"
                    >
                      Page {currentPage} of {totalPages}
                    </Badge>
                  )}
                </div>
              </motion.div>

              {/* Loading State */}
              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-64 sm:h-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex justify-between items-start mb-3 sm:mb-4">
                            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
                            <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 rounded-full" />
                          </div>
                          <div className="flex justify-center mb-3 sm:mb-4">
                            <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-full" />
                          </div>
                          <div className="text-center space-y-2">
                            <Skeleton className="h-4 sm:h-6 w-full" />
                            <Skeleton className="h-3 sm:h-4 w-3/4 mx-auto" />
                            <Skeleton className="h-3 sm:h-4 w-1/2 mx-auto" />
                          </div>
                          <div className="mt-4 sm:mt-6">
                            <Skeleton className="h-8 sm:h-10 w-full" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Job Results */}
              {!loading && jobsData && jobsData.length > 0 && (
                <>
                  {viewLogic ? (
                    // Grid View
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {jobsData.map((job, index) => (
                        <motion.div
                          key={job.job_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <CardContent className="p-6 relative z-10">
                              {/* Header with date and bookmark */}
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {formatDate(job.job_posting_date)}
                                  </span>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handlebutton(job)}
                                  className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                                >
                                  {isFilteredJob(job) ? (
                                    <FaBookmark className="h-5 w-5 text-blue-500" />
                                  ) : (
                                    <FaRegBookmark className="h-5 w-5 text-gray-400 hover:text-blue-500" />
                                  )}
                                </motion.button>
                              </div>

                              {/* Company Logo */}
                              <div className="flex justify-center mb-4">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                  <img
                                    src={job.company_logo_url}
                                    alt={`${job.company_name} logo`}
                                    className="relative w-16 h-16 object-contain rounded-full bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 p-2 shadow-md"
                                    onError={(e) => {
                                      e.target.src = "/placeholder-logo.png";
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Job Details */}
                              <div className="text-center space-y-2 mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                  {job.job_position}
                                </h3>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <Building className="h-4 w-4" />
                                  <span className="font-medium">
                                    {job.company_name}
                                  </span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <MapPin className="h-4 w-4" />
                                  <span>{job.job_location}</span>
                                </div>
                                {job.salary && (
                                  <div className="flex items-center justify-center gap-2">
                                    <Badge
                                      variant="secondary"
                                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    >
                                      {job.salary}
                                    </Badge>
                                  </div>
                                )}
                              </div>

                              {/* Apply Button */}
                              <div className="mt-auto">
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Button
                                    asChild
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                                  >
                                    <a
                                      href={job.job_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-2"
                                    >
                                      Apply Now
                                      <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
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
                    <div className="space-y-4">
                      {jobsData.map((job, index) => (
                        <motion.div
                          key={job.job_id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <CardContent className="p-6 relative z-10">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                  {/* Company Logo */}
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    <img
                                      src={job.company_logo_url}
                                      alt={`${job.company_name} logo`}
                                      className="relative w-12 h-12 object-contain rounded-full bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 p-1 shadow-md"
                                      onError={(e) => {
                                        e.target.src = "/placeholder-logo.png";
                                      }}
                                    />
                                  </div>

                                  {/* Job Details */}
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-1">
                                      {job.job_position}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                      <div className="flex items-center gap-1">
                                        <Building className="h-4 w-4" />
                                        <span className="font-medium">
                                          {job.company_name}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{job.job_location}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                          {formatDate(job.job_posting_date)}
                                        </span>
                                      </div>
                                    </div>
                                    {job.salary && (
                                      <div className="mt-2">
                                        <Badge
                                          variant="secondary"
                                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                        >
                                          {job.salary}
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handlebutton(job)}
                                    className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                                  >
                                    {isFilteredJob(job) ? (
                                      <FaBookmark className="h-5 w-5 text-blue-500" />
                                    ) : (
                                      <FaRegBookmark className="h-5 w-5 text-gray-400 hover:text-blue-500" />
                                    )}
                                  </motion.button>

                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Button
                                      asChild
                                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    >
                                      <a
                                        href={job.job_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                      >
                                        Apply Now
                                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
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

                  {/* Pagination */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center items-center gap-2 mt-8"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={handlePrevPage}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          const pageNum =
                            Math.max(
                              1,
                              Math.min(totalPages - 4, currentPage - 2)
                            ) + i;
                          return (
                            <Button
                              key={pageNum}
                              variant={
                                pageNum === currentPage ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className={
                                pageNum === currentPage
                                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                                  : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              }
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={handleNextPage}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </motion.div>
                </>
              )}

              {/* Empty State */}
              {!loading && jobsData && jobsData.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-12"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-12 h-12 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      No Jobs Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Try adjusting your search criteria or filters to find more
                      opportunities.
                    </p>
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <SimilarJob viewLogic={viewLogic} setViewLogic={setViewLogic} />
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        filters={filters}
        clearFilters={clearFilters}
        facets={facets}
        showFilters={false}
        handleFilterChange={handleFilterChange}
      />

      <Modal2 isOpen1={isModal1Open} onClose1={toggleModal1}>
        <Preference />
      </Modal2>
    </Sidebar>
  );
};

export default JobMatch2;
