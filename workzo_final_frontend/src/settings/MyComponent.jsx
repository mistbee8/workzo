import React, { useEffect, useState } from "react";
import { useUser } from "../utils/UserContext";
import { Sidebar } from "lucide-react";
import Sidebar from "../SideBar";
const MyComponent = () => {
  const { setJob, job_location1 } = useUser(); // Get setJob and job_location from context

  const handleSetJobLocation = () => {
    setJob(["reshma", "mallu", "kannadiga"]); // Set hardcoded job locations
  };

  useEffect(() => {
    // console.log("Updated job_location:", job_location1); // Logs whenever job_location updates
  }, [job_location1]); // Watch for changes in job_location

  return (
    <Sidebar>
      <div>
        <button onClick={handleSetJobLocation}>Set Job Location</button>
        <div>
          <h3>Current Job Locations:</h3>
          <pre>{JSON.stringify(job_location1, null, 2)}</pre>{" "}
          {/* Display the updated job_location */}
        </div>
      </div>
    </Sidebar>
  );
};

export default MyComponent;
