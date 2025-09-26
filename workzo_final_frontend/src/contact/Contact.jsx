import React from "react";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
const Contact = () => {
	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col lg:flex-row justify-center items-start gap-6 p-4'>
				<div className='w-full lg:w-1/2'>
					<ContactForm />
				</div>
				<div className='w-full lg:w-1/2'>
					<ContactMap />
				</div>
			</div>
			<div className='container mx-auto px-4 py-8 lg:py-12'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
					{/* Contact Phone Number */}
					<div className='bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-2xl shadow-lg flex items-center space-x-3 lg:space-x-4 hover:shadow-xl transition-shadow duration-300'>
						<FiPhone className='h-8 w-8 lg:h-10 lg:w-10 text-blue-600 flex-shrink-0' />
						<div className='min-w-0'>
							<h4 className='text-sm lg:text-lg font-semibold text-gray-900 dark:text-white'>Contact Phone Number</h4>
							<p className='text-xs lg:text-sm'>
								<Link href='tel:+3346016373' className='text-blue-500 hover:underline break-all'>
									+91 33 4601 6373
								</Link>
							</p>
						</div>
					</div>

					{/* Email Address */}
					<div className='bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-2xl shadow-lg flex items-center space-x-3 lg:space-x-4 hover:shadow-xl transition-shadow duration-300'>
						<FiMail className='h-8 w-8 lg:h-10 lg:w-10 text-green-600 flex-shrink-0' />
						<div className='min-w-0'>
							<h4 className='text-sm lg:text-lg font-semibold text-gray-900 dark:text-white'>Our Email Address</h4>
							<p className='text-xs lg:text-sm'>
								<Link href='mailto:workzo@gmail.com' className='text-blue-500 hover:underline break-all'>
									workzo@gmail.com
								</Link>
							</p>
						</div>
					</div>

					{/* Location */}
					<div className='bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-2xl shadow-lg flex items-center space-x-3 lg:space-x-4 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1'>
						<FiMapPin className='h-8 w-8 lg:h-10 lg:w-10 text-red-600 flex-shrink-0' />
						<div className='min-w-0'>
							<h4 className='text-sm lg:text-lg font-semibold text-gray-900 dark:text-white'>Our Location</h4>
							<p className='text-xs lg:text-sm text-gray-700 dark:text-gray-300'>
								63 B, Indra Vihar, Airport Road <br className='hidden sm:block' />
								<span className='sm:hidden'> </span>Bhopal, MP 462030
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
