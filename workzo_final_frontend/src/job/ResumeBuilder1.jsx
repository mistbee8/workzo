import React, { useState, useEffect } from "react";
import ResumeForm from "../resumeBuilder/ResumeForm";
import ResumeUpload from "../resumeBuilder/ResumeUpload";
import axios from "axios";
import Resume from "../resumeBuilder/Resume3";
import Sidebar from "../SideBar";
import { Link } from "react-router-dom";
const JobMatch1 = () => {
  const [activeTab, setActiveTab] = useState("upload"); // Default to 'upload' tab
  const [resumeIds, setResumeIds] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [isApiSuccess, setIsApiSuccess] = useState(false); // State to track API success

  // Function to toggle between tabs
  const handleTabToggle = (tab) => {
    setActiveTab(tab);
  };

  // Function to fetch all resumes
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
        setResumeIds(fetchedResumeIds);

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

  // useEffect to run fetchAllResumes only once when the component mounts
  useEffect(() => {
    fetchAllResumes();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <Sidebar>
      <div className="container mx-auto mt-4 p-4">
        {console.log("Is API Success:", isApiSuccess)}
        {isApiSuccess ? (
          <Resume />
        ) : (
          // Otherwise, show the active tabs (Upload Resume or Resume Form)
          <>
            {/* <div className="flex justify-center mb-6">
            <button
              className={`py-2 px-6 rounded-l-lg ${
                activeTab === "upload"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => handleTabToggle("upload")}
            >
              Upload Resume
            </button>
            <button
              className={`py-2 px-6 rounded-r-lg ${
                activeTab === "form"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => handleTabToggle("form")}
            >
              Resume Form
            </button>
          </div>

          {activeTab === "upload" && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ResumeUpload />
            </div>
          )}

          {activeTab === "form" && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-center">
                Fill Resume Details
              </h2>
              <ResumeForm
                setIsApiSuccess={setIsApiSuccess}
                fetchAllResumes={fetchAllResumes}
              />
            </div>
          )} */}

            <div className="text-center">
              <h1 className="text-6xl font-semibold mb-8">
                Do you have a resume?
              </h1>

              <div className="flex justify-center space-x-4">
                <Link to="/resume-upload">
                  <button className="flex-1 py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                    Yes
                  </button>
                </Link>
                <Link to="/resume-form">
                  <button className="flex-1 py-2 px-6 bg-gray-600 text-white rounded-md hover:bg-gray-500">
                    No
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Sidebar>
  );
};

export default JobMatch1;
