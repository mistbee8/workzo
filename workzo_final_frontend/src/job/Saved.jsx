import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Filter } from "lucide-react";
import { FilePlus } from "lucide-react";
import Modal from "./Modal";
import { Mic } from "lucide-react";
import { useUser } from "../utils/UserContext";
import Sidebar from "../SideBar";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SavedSimilarJob from "../saved/SavedSimilarJob";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Building,
  ExternalLink,
  Heart,
  Star,
} from "lucide-react";
const Saved = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facets, setFacets] = useState({ job_location: [], job_position: [] });
  const [wishlistJobIds, setWishlistJobIds] = useState([]);
  const [filters, setFilters] = useState({
    job_location: [],
    job_position: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [jobsData, setJobsData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const token = localStorage.getItem("access_token");
  const perPage = 250;

  const { setJob } = useUser();

  const clearFilters = () => {
    setFilters({
      job_location: [],
      job_position: [],
    });
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

  const fetchjobsTensorSearch = async (query, page = 1) => {
    const searchQuery = query || "";
    const userId = "ec5b4e72-b78b-4e95-ac7c-1cabf094525a"; // User ID from the provided parameters

    setLoading(true);

    try {
      const response = await axios.post(
        `https://bckn.tensorsolution.in/api/v1/search?collection_name=${userId}_jobs_data&query_by=company_name,company_profile,job_position,job_location&query_type=keyword&query=${encodeURIComponent(
          searchQuery
        )}&per_page=10&page=${page}&facet_by=company_name,company_profile,job_position,job_location&filter_by=${encodeURIComponent(
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

  const filteredJobDocuments = jobsData
    ? jobsData.filter((document) => wishlistJobIds.includes(document.job_id))
    : [];
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

      // console.log("Wishlist updated in the backend:", response.data);
    } catch (error) {
      console.error("Error updating wishlist in the backend:", error);

      // Rollback the UI changes if the request fails
      setWishlistJobIds(wishlistJobIds);
      setJobsData(jobsData); // Revert jobsData to the original state
      toast.error("Failed to update wishlist. Please try again.");
    }
  };
  const isFilteredJob = (job) => {
    // Logic to determine if the job is filtered
    return filteredJobDocuments.some(
      (filteredJob) => filteredJob.id === job.id // Compare IDs or any unique identifier
    );
  };
  const handleViewMoreJobs = () => {
    navigate("/job-match");
  };
  return (
    <div className="space-y-6">
      <div className="hidden">
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          filters={filters}
          clearFilters={clearFilters}
          facets={facets}
          showFilters={false}
          handleFilterChange={handleFilterChange}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Skeleton className="h-20 w-20 rounded-lg" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="">
        {filteredJobDocuments && filteredJobDocuments.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredJobDocuments.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                    {/* Background gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Header with date and bookmark */}
                    <CardHeader className="relative z-10 pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {formatDate(job.job_posting_date)}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handlebutton(job)}
                          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30"
                        >
                          {isFilteredJob(job) ? (
                            <FaBookmark className="text-blue-500 h-5 w-5" />
                          ) : (
                            <FaRegBookmark className="text-blue-500 h-5 w-5" />
                          )}
                        </motion.button>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10 flex flex-col h-full">
                      {/* Company Logo */}
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <img
                            src={job.company_logo_url}
                            alt="Company Logo"
                            className="relative w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                          />
                        </div>
                      </div>

                      {/* Job Title */}
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {job.job_position}
                      </CardTitle>

                      {/* Company and Location */}
                      <div className="space-y-3 mb-6 flex-grow">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Building className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">
                            {job.company_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 text-green-500" />
                          <span>{job.job_location}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-semibold">
                              {job.salary}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Apply Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-auto"
                      >
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                          <a
                            href={job.job_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <span>Apply Now</span>
                            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </a>
                        </Button>
                      </motion.div>
                    </CardContent>

                    {/* Hover effect border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-700 rounded-lg transition-colors duration-300"></div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="mb-4">
                    <Heart className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No Saved Jobs Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start exploring jobs and save the ones that interest you!
                  </p>
                  <Button
                    onClick={handleViewMoreJobs}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Explore Jobs
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default Saved;
