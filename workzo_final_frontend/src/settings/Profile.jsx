import React from "react";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { User, UserCheck, Settings, Shield, Bell, Globe, Edit3, Camera, MapPin, Mail, Phone, Calendar, Star, Award, Target, ChevronRight } from "lucide-react";

const Profile = () => {
	// Remove mock data - no hardcoded statistics
	const profileStats = [];

	return (
		<motion.div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Hero Section */}
			<div className='relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white overflow-hidden'>
				<div className='absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16'></div>
				<div className='absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full translate-y-8 sm:translate-y-16 -translate-x-8 sm:-translate-x-16'></div>

				<div className='relative z-10'>
					<div className='flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6'>
						<div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left'>
							<div className='relative mb-3 sm:mb-0'>
								<div className='w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto sm:mx-0'>
									<User className='w-8 h-8 sm:w-10 sm:h-10 text-white' />
								</div>
								<div className='absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center'>
									<UserCheck className='w-2 h-2 sm:w-3 sm:h-3 text-white' />
								</div>
							</div>
							<div>
								<h1 className='text-2xl sm:text-3xl font-bold mb-1'>Profile Overview</h1>
								<p className='text-white/80 text-base sm:text-lg'>Manage your account and preferences</p>
							</div>
						</div>
					</div>

					{/* Removed Profile Stats section - no mock data */}
				</div>
			</div>

			{/* Main Content - Contact Form */}
			<motion.div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
				<div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 border-b border-gray-200'>
					<div className='flex flex-col sm:flex-row items-center sm:items-start sm:justify-between space-y-3 sm:space-y-0'>
						<div className='flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 text-center sm:text-left'>
							<div className='bg-blue-100 p-2 sm:p-3 rounded-full'>
								<User className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
							</div>
							<div>
								<h2 className='text-xl sm:text-2xl font-bold text-gray-800'>Personal Information</h2>
								<p className='text-sm sm:text-base text-gray-600'>Update your contact details and preferences</p>
							</div>
						</div>
						<div className='flex items-center space-x-2 text-sm text-gray-500'>
							<Shield className='w-4 h-4' />
							<span>Secure & Private</span>
						</div>
					</div>
				</div>

				<div className='p-6'>
					<ContactForm />
				</div>
			</motion.div>

			{/* Bottom Section - Recent Activity removed - no mock data */}
		</motion.div>
	);
};

export default Profile;
