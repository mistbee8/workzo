import React from "react";
import { Briefcase, Star } from "lucide-react"; // Import icons
import Card from "./Card"; // Assuming you've created the Card component
import { Search, Zap, FileText } from "lucide-react"; 
const New = () => {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero Section */}
      <main className="flex items-center justify-center min-h-screen px-4 py-16 md:py-24">
        {/* Main Content Center */}
        <div className="flex flex-col justify-center items-center space-y-8 text-center max-w-2xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Your entire job search.
            <br />
            <span className="relative inline-block">
              Powered by one profile.
              <div className="absolute bottom-1 left-0 w-full h-2 bg-[#00A6C1] opacity-20"></div>
            </span>
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Get personalized job recommendations, craft tailored resumes,
            autofill and track your job applications. We're here for every step
            of the process.
          </p>

          <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-full px-8 py-4 mt-8 transition-all duration-300 transform hover:scale-105">
            Sign Up – It's Free!
          </button>

          <div className="flex items-center gap-2 justify-center mt-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-gray-600 ml-2">
              Over half a million job seekers are one step closer to their dream
              job.
            </span>
          </div>
        </div>
      </main>

      {/* Floating Cards */}
      <div className="absolute top-32 left-8 w-64 bg-white shadow-lg p-6 rounded-xl animate-float hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl">92%</span>
          </div>
          <div>
            <p className="font-medium">Resume Matching</p>
            <p className="text-sm text-gray-500">Perfect match found</p>
          </div>
        </div>
      </div>

      <div className="absolute top-24 right-8 w-72 bg-white shadow-lg p-6 rounded-xl animate-float-delayed hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="font-medium"> Perks</p>
            <p className="text-sm text-gray-500">Remote work available</p>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          <button className="rounded-full text-lg px-6 py-4 border-2 hover:bg-gray-100 flex items-center gap-2 transition-all duration-300">
            <Search className="w-5 h-5" />
            Job Matches
          </button>
          <button className="rounded-full text-lg px-6 py-4 border-2 hover:bg-gray-100 flex items-center gap-2 transition-all duration-300">
            <Zap className="w-5 h-5" />
            Copilot Extension
          </button>
          <button className="rounded-full text-lg px-6 py-4 border-2 hover:bg-gray-100 flex items-center gap-2 transition-all duration-300">
            <FileText className="w-5 h-5" />
            AI Resume Builder
          </button>
          <button className="rounded-full text-lg px-6 py-4 border-2 hover:bg-gray-100 flex items-center gap-2 transition-all duration-300">
            <Briefcase className="w-5 h-5" />
            Job Tracker
          </button>
        </div>
      </div>
    </div>
  );
};

export default New;
