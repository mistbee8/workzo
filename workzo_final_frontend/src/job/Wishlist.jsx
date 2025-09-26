import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Filter } from "lucide-react";
import { FilePlus } from "lucide-react";
import Modal from "./Modal";
import { Mic } from "lucide-react";

const Wishlist = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facets, setFacets] = useState({ job_location: [], job_position: [] });
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
  const perPage = 3;

  const clearFilters = () => {
    setFilters({
      job_location: [],
      job_position: [],
    });
  };

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
    console.log("Saving job data to Typesense:", job);

    // Prepare job data to send to Typesense
    const jobData = {
      job_id: job.job_id, // Use the job's unique ID (if available)
      job_position: job.job_position,
      company_name: job.company_name,
      job_location: job.job_location,
      salary: job.salary,
      job_link: job.job_link,
      company_logo_url: job.company_logo_url,
      job_posting_date: job.job_posting_date,
    };

    try {
      // Send a POST request to Typesense to add the job data to the "jobs" collection
      const response = await axios.post(
        `
${
  import.meta.env.VITE_TYPESENSE_URL
}/collections/wishlist/documents?x-typesense-api-key=${
          import.meta.env.VITE_TYPESENSE_API_KEY
        }`,
        {
          documents: [jobData], // Typesense expects an array of documents
        }
      );

      console.log("Job data saved to Typesense:", response.data);
    } catch (error) {
      console.error("Error saving job data to Typesense:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-lg">Loading...</div>
        </div>
      )}
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8">
        Your Saved Jobs
      </h1>
      {/* <div className="flex justify-center mb-6 "></div> */}
      {/* Job Listings */}
      <div className="w-full">
        {!jobsData || jobsData.length === 0 ? (
          <div className="text-center text-lg sm:text-xl font-semibold text-gray-600 py-8 sm:py-12">
            You have not saved any jobs yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {jobsData.map((job, index) => (
              <div
                key={index}
                className="mb-6 p-4 bg-white border rounded-lg shadow-md flex flex-col justify-between relative"
              >
                <div>
                  {/* Format and display job posting date */}
                  <p className="text-gray-600 sticky top-0 right-0 z-10 bg-white p-2">
                    {formatDate(job.job_posting_date)}
                  </p>

                  <div className="flex justify-center mt-2">
                    <img
                      src={job.company_logo_url}
                      alt="Company Logo"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4 mb-4">
                    <h3 className="text-xl font-semibold">
                      {job.job_position}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {job.company_name} | {job.job_location}
                  </p>
                  <p className="text-green-600 font-bold">{job.salary}</p>
                </div>

                {/* Apply Now button aligned to the bottom */}
                <div className="mt-auto flex justify-center pt-4">
                  <a
                    href={job.job_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">
                      Apply Now
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
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
      </div>
    </div>
  );
};

export default Wishlist;
