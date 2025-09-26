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
import SavedSimilarJob from "../saved/SavedSimilarJob";
import Saved from "./Saved";
const Wishlist1 = () => {
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
    // console.log("Saving job to wishlist in the backend:", job);
    alert("Job added to wishlist successfully");

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("access_token");

      // Check if the token exists
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      // Send a POST request to the backend to update the wishlist
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/wishlist/?job_id=${
          job.job_id
        }`, // Use the job_id as a query parameter
        null, // No body is required based on the cURL request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token to the header
            "Content-Type": "application/json", // Set the content type
          },
        }
      );

      console.log("Wishlist updated in the backend:", response.data);
    } catch (error) {
      console.error("Error updating wishlist in the backend:", error);
    }
  };
  const isFilteredJob = (job) => {
    // Logic to determine if the job is filtered
    return filteredJobDocuments.some(
      (filteredJob) => filteredJob.id === job.id // Compare IDs or any unique identifier
    );
  };

  return (
    <Sidebar>
      <div className="container mx-auto mt-10 p-4">
        <div className="">
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

        <h1 className="text-center text-4xl font-semibold my-5">
          Your saved jobs
        </h1>

        {/* Search bar */}
        {/* <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
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
            className=" text-black font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <Filter size={30} className="mr-0" />
          </button>
        </div> */}

        {/* Loading State */}
        {loading && <div>Loading...</div>}
        {/* <h1 className="text-center text-4xl font-semibold mb-6">Jobs for you</h1>
      <div className="flex justify-center mb-6 ">No jobs found</div> */}
        {/* Job Listings */}

        <div>
          {filteredJobDocuments && filteredJobDocuments.length > 0 ? (
            <div>
              <Saved />
              <SavedSimilarJob />
            </div>
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              <SavedSimilarJob />
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {/* <div className="flex justify-center mt-6">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-l-md hover:bg-gray-400"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-white border">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-r-md hover:bg-gray-400"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div> */}
      </div>
    </Sidebar>
  );
};

export default Wishlist1;
