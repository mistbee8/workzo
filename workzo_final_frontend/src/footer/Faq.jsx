import React, { useState } from "react";

const FAQPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleToggle = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index); 
  };

  const faqs = [
    {
      question: "What is Workzo?",
      answer:
        "Workzo is an online platform that helps job seekers find relevant job opportunities, create professional resumes, and match their skills with the best-fit jobs.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, simply click on the 'Sign Up' button at the top right of the page, enter your details, and you'll have access to all the features Workzo has to offer.",
    },
    {
      question: "How do I apply for jobs?",
      answer:
        "Once you have created an account and completed your profile, you can browse job listings and apply to jobs that match your skills and experience directly through the platform.",
    },
    {
      question: "Can I get job recommendations?",
      answer:
        "Yes! Workzo provides personalized job recommendations based on your profile, skills, and job preferences. You'll receive tailored suggestions that match your career goals.",
    },
    {
      question: "Is Workzo free to use?",
      answer:
        "Yes, Workzo is completely free to use for job seekers. You can search for jobs, apply to listings, and create your resume without any charges. However, we also offer premium features for job seekers and employers at a cost.",
    },
    {
      question: "How can I build my resume on Workzo?",
      answer:
        "You can easily create a professional resume using our Resume Builder tool. Just log in to your account, click on 'Resume Builder', and follow the step-by-step guide to customize your resume for your job applications.",
    },
    {
      question: "What should I do if I can't find the right job?",
      answer:
        "If you're not finding the right job, try updating your profile, adding more skills or experience, and adjusting your job preferences. You can also set up job alerts to be notified when new jobs that fit your profile are posted.",
    },
    {
      question: "How do I get noticed by employers?",
      answer:
        "Ensure your profile is complete and up-to-date with all your skills, qualifications, and work experience. You can also make your profile public, which increases the chances of employers finding you directly.",
    },
    {
      question: "Can I apply to multiple jobs at once?",
      answer:
        "Yes, you can apply to as many jobs as you like. Simply click 'Apply' on any job listing and follow the application instructions. We recommend personalizing your application for each role to increase your chances.",
    },
    {
      question: "How do I track the status of my job applications?",
      answer:
        "You can track the status of your job applications by visiting the 'My Applications' section in your profile. It will show you the status of each application, including whether it's been viewed, shortlisted, or rejected.",
    },
    {
      question: "What if I forget my password?",
      answer:
        "If you forget your password, go to the 'Sign In' page and click on 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password and regain access to your account.",
    },
    {
      question: "Can I change my email address?",
      answer:
        "Yes, you can update your email address by going to your account settings. Simply navigate to 'Account Settings', click 'Edit', and change your email to a new one. Don't forget to save your changes.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Frequently Asked Questions (FAQ)
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div
              onClick={() => handleToggle(index)}
              className="cursor-pointer flex justify-between items-center"
            >
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <svg
                className={`w-6 h-6 transition-transform ${
                  activeQuestion === index ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {activeQuestion === index && (
              <p className="mt-4 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
