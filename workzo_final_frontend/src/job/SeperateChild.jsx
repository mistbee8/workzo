import React from "react";
import { FaList, FaTh } from "react-icons/fa";

const SeperateChild = ({ isCard2, toggle2 }) => {
  return (
    <>
      <button onClick={toggle2} className="p-2 rounded-md hover:bg-gray-300">
        {/* Show different icons based on the isCard2 value */}
        {!isCard2 ? <FaList size={24} /> : <FaTh size={24} />}
      </button>
      <h1>hgjgjhfjg</h1>
    </>
  );
};

export default SeperateChild;
