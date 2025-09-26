import React, { useState } from "react";
import { User, Settings, MapPin, Sparkles } from "lucide-react";
import Location from "./Location";
import Profile from "./Profile";
import Preference from "./Preference";
import { RiAuctionFill } from "react-icons/ri";
import { FaMagic } from "react-icons/fa";
import AutoFillJobFinderForm from "./Autofill";
import Sidebar from "../SideBar";
import { JobLocationProvider } from "../utils/JobLocationContext";
import { motion } from "framer-motion";

const Setting = () => {
	const [activeTab, setActiveTab] = useState("profile");

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const tabVariants = {
		active: {
			scale: 1.05,
			backgroundColor: "rgb(59, 130, 246)",
			color: "white",
			boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
		},
		inactive: {
			scale: 1,
			backgroundColor: "white",
			color: "rgb(75, 85, 99)",
			boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
		},
	};

	return (
		<Sidebar>
			<div className='w-full max-w-5xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl'>
				{/* Header */}
				<div className='text-center mb-6 sm:mb-8'>
					<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2'>Settings</h1>
					<p className='text-sm sm:text-base text-gray-600'>Manage your profile and preferences</p>
				</div>

				{/* Enhanced Toggle Bar */}
				<div className='flex justify-center mb-8 overflow-x-auto'>
					<div className='bg-white rounded-2xl p-2 shadow-lg border border-gray-200 min-w-max'>
						<div className='flex space-x-2'>
							<motion.button
								variants={tabVariants}
								animate={activeTab === "profile" ? "active" : "inactive"}
								onClick={() => handleTabChange("profile")}
								className='flex items-center px-3 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<User className='mr-1 sm:mr-2' size={18} />
								<span>Profile</span>
							</motion.button>
							<motion.button
								variants={tabVariants}
								animate={activeTab === "preferences" ? "active" : "inactive"}
								onClick={() => handleTabChange("preferences")}
								className='flex items-center px-3 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Settings className='mr-1 sm:mr-2' size={18} />
								<span>Preferences</span>
							</motion.button>
							<motion.button
								variants={tabVariants}
								animate={activeTab === "autofill" ? "active" : "inactive"}
								onClick={() => handleTabChange("autofill")}
								className='flex items-center px-3 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Sparkles className='mr-1 sm:mr-2' size={18} />
								<span>Autofill</span>
							</motion.button>
						</div>
					</div>
				</div>

				{/* Enhanced Content Display */}
				<motion.div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					{activeTab === "profile" && (
						<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
							<Profile />
						</motion.div>
					)}
					{activeTab === "preferences" && (
						<JobLocationProvider>
							<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
								<Preference />
							</motion.div>
						</JobLocationProvider>
					)}
					{activeTab === "autofill" && (
						<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
							<AutoFillJobFinderForm />
						</motion.div>
					)}
				</motion.div>
			</div>
		</Sidebar>
	);
};

export default Setting;
