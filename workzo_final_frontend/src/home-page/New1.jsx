import React from 'react'
import { User, Search, CheckCircle } from "lucide-react";
const New1 = () => {
  return (
    <div className=''>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">How It Works</h2>
          <p className="text-lg text-gray-600 mt-2 mb-8">
            It's simple! Just follow these 3 easy steps to get started with your
            job search.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Create Your Profile
              </h3>
              <p className="text-gray-500">
                Fill in your professional details, education, and skills to
                build your profile.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Explore Jobs</h3>
              <p className="text-gray-500">
                Browse through a variety of job openings tailored to your skills
                and preferences.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Apply and Land Your Job
              </h3>
              <p className="text-gray-500">
                Once you find the right job, apply instantly and track your
                progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New1