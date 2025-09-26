import React from 'react'
import { User } from "lucide-react";
const Testimonial = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          What Job Seekers Are Saying
        </h2>
        <p className="text-lg text-gray-600 mt-2 mb-8">
          Hear from the people who have successfully found their dream jobs.
        </p>
        <div className="flex justify-center space-x-8">
          <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <p className="text-gray-600">
              "I found my dream job within a week. The process was smooth and
              easy to follow."
            </p>
            <div className="mt-4 flex items-center justify-start">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-gray-500 text-sm">Software Engineer</p>
              </div>
            </div>
          </div>
          <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <p className="text-gray-600">
              "Thanks to this platform, I found a role that suits my skills
              perfectly!"
            </p>
            <div className="mt-4 flex items-center justify-start">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Sarah Lee</h3>
                <p className="text-gray-500 text-sm">Product Manager</p>
              </div>
            </div>
          </div>
          <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <p className="text-gray-600">
              "I loved how easy it was to apply and track my applications all in
              one place!"
            </p>
            <div className="mt-4 flex items-center justify-start">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Michael Ross</h3>
                <p className="text-gray-500 text-sm">Data Scientist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial