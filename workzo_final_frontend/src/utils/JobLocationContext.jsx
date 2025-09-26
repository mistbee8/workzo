import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create Context for Job Location
const JobLocationContext = createContext();

// Custom hook to use JobLocationContext
export const useJobLocation = () => {
  return useContext(JobLocationContext);
};

// JobLocationProvider to provide context
export const JobLocationProvider = ({ children }) => {
  const [jobLocation, setJobLocation] = useState([]); // To hold job location data
  const [jobPosition, setJobPosition] = useState([]); // To hold job position data
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    job_location: [],
    job_position: [],
  });
  // Function to fetch the job data from Typesense API
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
  const fetchJobData = async (query = "") => {
    setLoading(true);
    const userId = "ec5b4e72-b78b-4e95-ac7c-1cabf094525a";

    try {
      const response = await axios.post(
        `https://bckn.tensorsolution.in/api/v1/search_workzo/?collection_name=${userId}_jobs_data_workzo&query=${encodeURIComponent(query)}&k=200&distance_threshold=1&facet_by=job_location,job_position`,
        '',
        {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer 0V7dEN4BHuAZsN5kVvHzC68UrHzvLoq7'
          }
        }
      );

      console.log("Response from search_workzo:", response.data);
      const facetCounts = response.data.facet_counts || [];
      const jobLocationFacet = facetCounts.find(
        (facet) => facet.field_name === "job_location"
      );
      const jobPositionFacet = facetCounts.find(
        (facet) => facet.field_name === "job_position"
      );
if (jobLocationFacet) {
  console.log(
    "Facet Countsssssssssssssssssssssssssssssssssssssssss:",
    jobLocationFacet.counts
  );

  // Use an array to store all the job location values
  const locations = [];
  jobLocationFacet.counts.forEach((item) => {
    // console.log("Job Location Value:", item.value); // Log each individual value
    locations.push(item.value); // Add each location value to the locations array
  });

  // After collecting all job locations, update the state with the full array
  setJobLocation(locations);

  // console.log("All Job Locations:", locations); // Log the array with all locations
}

      if (jobPositionFacet) {
        setJobPosition(jobPositionFacet.counts); 
      }

      // console.log("Job Location:", jobLocationFacet?.counts);
      // console.log("Job Position:", jobPositionFacet?.counts);

    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount (useEffect)
  useEffect(() => {
    // fetchJobData(); // Initial fetch
  }, []); // Empty dependency array ensures this runs only once

  return (
    <JobLocationContext.Provider
      value={{ jobLocation, jobPosition, loading, fetchJobData }}
    >
      {children}
    </JobLocationContext.Provider>
  );
};
