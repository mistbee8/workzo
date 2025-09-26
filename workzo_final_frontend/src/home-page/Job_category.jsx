import React from 'react'
import { Code, Briefcase, BarChart, Compass } from "lucide-react";
const Job_category = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Explore Job Categories
        </h2>
        <p className="text-lg text-gray-600 mt-2 mb-8">
          Find jobs in the category that matches your skill set.
        </p>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:bg-gray-100 transition-all">
            <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              Software Engineering
            </h3>
            <p className="text-gray-500 mt-2">
              Explore hundreds of software engineering jobs.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:bg-gray-100 transition-all">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              Marketing
            </h3>
            <p className="text-gray-500 mt-2">
              Browse through the latest marketing job openings.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:bg-gray-100 transition-all">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto">
              <BarChart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              Data Analysis
            </h3>
            <p className="text-gray-500 mt-2">
              Find job opportunities for data analysts and scientists.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 text-center hover:bg-gray-100 transition-all">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Sales</h3>
            <p className="text-gray-500 mt-2">
              Explore sales and business development jobs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job_category