import React, { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to provide context values
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // The user ID
  const [job_location1, setJobLocation1] = useState([
  ]); // Initially empty array for job locations

  // Function to set the user ID
  const setUser = (userId) => setUserId(userId);

  // Function to set the job location
  const setJob = (job_location1) => setJobLocation1(job_location1);

  return (
    <UserContext.Provider value={{ userId, setUser, job_location1, setJob }}>
      {children}
    </UserContext.Provider>
  );
};
