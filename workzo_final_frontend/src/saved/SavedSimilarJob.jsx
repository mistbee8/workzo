import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Filter } from "lucide-react";
import { FilePlus } from "lucide-react";

import { Mic } from "lucide-react";
import { useUser } from "../utils/UserContext";
import Sidebar from "../SideBar";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaList, FaTh } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavedSimilarJob = () => {
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

      console.log("Response from search_workzo API:", response.data);

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
      const jobDocuments = response.data.hits?.map((item) => {
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
      console.error(
        "Error detected while fetching jobs from new API:",
        error
      );
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

  const handlebutton1 = async (job) => {
    const isJobBookmarked = isFilteredJob1(job); // Check if job is already in wishlist

    // Update the UI optimistically
    const updatedWishlist = isJobBookmarked
      ? WishlistJobIds1.filter((id) => id !== job.job_id) // Remove job from wishlist
      : [...WishlistJobIds1, job.job_id]; // Add job to wishlist

    // Update the state to trigger a re-render
    setWishlistJobIds1(updatedWishlist);

    // Update the job data (optimistically)
    const updatedJobData = jobsData1.map((item) =>
      item.job_id === job.job_id
        ? { ...item, isBookmarked: !isJobBookmarked }
        : item
    );
    setjobsData1(updatedJobData); // Update jobsData1 to re-render UI

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
      setWishlistJobIds1(WishlistJobIds1);
      setjobsData1(jobsData1); // Revert jobsData1 to the original state
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
      setWishlistJobIds1(jobIds); // Store wishlist job IDs
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  const filteredJobDocuments = jobsData1
    ? jobsData1.filter((document) => WishlistJobIds1.includes(document.job_id))
    : [];
    console.log("Filtered Job Documents:", filteredJobDocuments);

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
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/resumes/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // if (response.data.message === "No resume found for this user.") {
      //   setError("No resume found for this user.");
      // } else {
      //   // const resumeKeywords = response.data.resume.keywords.join(" ");
      //   console.log("Resume Keywords:");
      if (response.status === 200) {
        const fetchedResumeIds = response.data.map((resume) => resume.id);
        const skills = response.data[0].skills
          .map((skill) => skill.name)
          .join(" ");
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

  useEffect(() => {
    fetchResume();
  }, []); // This ensures the fetch is done when the component is mounted

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto ">
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
      <div className="container mx-auto px-6">
        {/* Toggle Button for View */}
        <div className="flex justify-between items-center "></div>

        {/* Conditional Rendering Based on View Type */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobDocuments &&
            filteredJobDocuments
              .sort((a, b) => {
                // Handle NaN values and sort them to the end
                if (isNaN(a.vector_distance)) return 1;
                if (isNaN(b.vector_distance)) return -1;
                return b.vector_distance - a.vector_distance; // Sort in descending order by vector_distance
              })
              .map((job, index) => (
                <div
                  key={index}
                  className="mb-6 p-6 bg-white border rounded-lg shadow-lg flex flex-col justify-between relative"
                >
                  {/* Job Posting Date */}
                  <p className="text-gray-600 absolute top-2 left-2">
                    {formatDate(job.job_posting_date)}
                  </p>
                  <h3
                    className={`absolute top-2 right-2 bg-transparent font-semibold ${
                      job.vector_distance * 100 > 75
                        ? "text-green-500"
                        : job.vector_distance * 100 >= 50
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {isNaN(job.vector_distance)
                      ? "50% match"
                      : `${Math.max(0, job.vector_distance * 100).toFixed(
                          2
                        )}% match`}
                  </h3>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => {
                      handlebutton1(job);
                    }}
                    className="absolute top-10 right-2 bg-transparent text-blue-500"
                  >
                    {isFilteredJob1(job) ? (
                      <FaBookmark color="blue" size={24} />
                    ) : (
                      <FaRegBookmark color="blue" size={24} />
                    )}
                  </button>

                  {/* Job Details */}
                  <div className="flex justify-center ">
                    <img
                      src={job.company_logo_url}
                      alt="Company Logo"
                      className="w-24 h-24 object-contain rounded-full border p-2 bg-gray-100"
                    />
                  </div>
                  <div className="mt-4 mb-4 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {job.job_position}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {job.company_name} | {job.job_location}
                    </p>
                    <p className="text-green-600 font-bold mt-2">
                      {job.salary}
                    </p>
                  </div>

                  {/* Apply Now Button */}
                  <div className="flex justify-center mt-auto">
                    <a
                      href={job.job_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 w-full text-center">
                        Apply Now
                      </button>
                    </a>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Pagination Controls */}
    </div>
  );
};

export default SavedSimilarJob;
