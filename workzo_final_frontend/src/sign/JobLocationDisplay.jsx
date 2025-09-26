import React, { useEffect } from "react";
import { useJobLocation } from "../utils/JobLocationContext";

const JobLocationDisplay = () => {
  const { jobLocation, jobPosition, loading, fetchJobData } = useJobLocation();

  useEffect(() => {

    fetchJobData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Job Location:</h3>
      {/* {console.log("Job Location:", jobLocation)}{" "} */}
     
      <h3>Job Position:</h3>
      <pre>{JSON.stringify(jobLocation, null, 2)}</pre>
      {Array.isArray(jobLocation) && jobLocation.length > 0 ? (
        <ul>
          {/* Map through jobLocation array */}
          {jobLocation.map((item, index) => (
            <li key={index}>
              {item.value} - Count: {item.count} {/* Display value and count */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No job locations available</p>
      )}
      <h3>Job Position:</h3>
      <pre>{JSON.stringify(jobPosition, null, 2)}</pre>
      {/* Display job position */}
    </div>
  );
};

export default JobLocationDisplay;
