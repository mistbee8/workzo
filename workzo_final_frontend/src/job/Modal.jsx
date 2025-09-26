import React,{useEffect} from "react";
import Preference from "../settings/Preference";
import { useUser } from "../utils/UserContext";
const Modal = ({
  isOpen,
  onClose,
  filters,
  clearFilters,
  facets,
  showFilters,
  handleFilterChange,
}) => {
  if (!isOpen) return null;
  const { setJob, job_location } = useUser(); // Get the setJob function and the current job_location from context

  // Update the job_location in context when the modal is opened
  useEffect(() => {
    if (facets.job_location) {
      setJob(facets.job_location); // Update job_location in context
    }
  }, [facets.job_location, setJob]); // Only run this effect when facets.job_location changes

  // Optionally, log the updated job_location from context
  // console.log("The current job location is", job_location);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-center font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

    

        <div className="flex flex-col mb-4 max-h-96 overflow-y-auto">
          <div className="mr-6 mb-6">
            <h3 className="text-xl"> Location</h3>
            {facets.job_location.map((facet) => (
              <div key={facet.value} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleFilterChange(e, "job_location")}
                  value={facet.value}
                  checked={filters.job_location.includes(facet.value)}
                  id={facet.value}
                  className="mr-2"
                />
                <label htmlFor={facet.value}>
                  {facet.value} 
                </label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl"> Job Position</h3>
            {facets.job_position.map((facet) => (
              <div key={facet.value} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleFilterChange(e, "job_position")}
                  value={facet.value}
                  checked={filters.job_position.includes(facet.value)}
                  id={facet.value}
                  className="mr-2"
                />
                <label htmlFor={facet.value}>
                  {facet.value} 
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={clearFilters}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Clear Filters
          </button>
          {/* <button
            onClick={onClose}
            className="w-full bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition duration-300 mt-2"
          >
            Close
          </button> */}
        </div>
      </div>

    </div>
  );
};

export default Modal;
