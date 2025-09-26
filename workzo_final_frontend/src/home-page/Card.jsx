import React from "react";

const Card = ({ className, children }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden ${className} transition-transform duration-300`}
    >
      {children}
    </div>
  );
};

export default Card;
