import React from "react";
import { Link } from "react-router-dom";
import New from "./New";
import New1 from "./New1";
import Testimonial from "./Testimonial";
import Job_category from "./Job_category";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
	const navigate = useNavigate();

	const handleApplyNowClick = () => {
		navigate("/sign-in"); // Navigate to /sign-in when the button is clicked
	};
	return (
		<>
			<div className='min-h-screen pt-[60px]'>
				<New />
				<New1 />
				{/* <Testimonial /> */}
				<section id='jobs' className='py-8 sm:py-12 lg:py-16'>
					<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8'>Featured Job Listings</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
							<div className='bg-white p-4 sm:p-6 rounded-lg shadow-lg'>
								<h3 className='text-lg sm:text-xl font-semibold'>Software Engineer</h3>
								<p className='text-gray-600 mt-2 text-sm sm:text-base'>Company: Microsoft</p>
								<p className='text-gray-600 mt-1 text-sm sm:text-base'>Location: Bengaluru</p>
								<button className='mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto text-sm sm:text-base hover:bg-blue-700 transition-colors' onClick={handleApplyNowClick}>
									Apply Now
								</button>
							</div>
							<div className='bg-white p-4 sm:p-6 rounded-lg shadow-lg'>
								<h3 className='text-lg sm:text-xl font-semibold'>Product Manager</h3>
								<p className='text-gray-600 mt-2 text-sm sm:text-base'>Company: Google</p>
								<p className='text-gray-600 mt-1 text-sm sm:text-base'>Location: Gurgaon</p>
								<button className='mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto text-sm sm:text-base hover:bg-blue-700 transition-colors' onClick={handleApplyNowClick}>
									Apply Now
								</button>
							</div>
							<div className='bg-white p-4 sm:p-6 rounded-lg shadow-lg'>
								<h3 className='text-lg sm:text-xl font-semibold'>Data Analyst</h3>
								<p className='text-gray-600 mt-2 text-sm sm:text-base'>Company: Siemens</p>
								<p className='text-gray-600 mt-1 text-sm sm:text-base'>Location: Pune</p>
								<button className='mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto text-sm sm:text-base hover:bg-blue-700 transition-colors' onClick={handleApplyNowClick}>
									Apply Now
								</button>
							</div>
						</div>
					</div>
				</section>
				<Job_category />
			</div>
		</>
	);
};

export default HomePage;
