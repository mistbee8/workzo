import React, { useState } from "react";
import Sidebar from "../SideBar";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import ProjectForm from "./ProjectForm";
import SocialMediaForm from "./SocialForm";
import Preference from "./Preference";
import { FaUsers, FaProjectDiagram } from "react-icons/fa";
import { GraduationCap, Briefcase, Settings, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Projects1 = () => {
	const [activeTab, setActiveTab] = useState("Experience");

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const tabs = [
		{ id: "Experience", label: "Experience", icon: Briefcase },
		{ id: "Education", label: "Education", icon: GraduationCap },
		{ id: "Projects", label: "Projects", icon: FaProjectDiagram },
		{ id: "SocialMedia", label: "Social", icon: FaUsers },
		{ id: "Preference", label: "Preference", icon: Settings },
	];

	const tabVariants = {
		active: {
			scale: 1.05,
			backgroundColor: "rgb(59, 130, 246)",
			color: "white",
			boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
		},
		inactive: {
			scale: 1,
			backgroundColor: "white",
			color: "rgb(75, 85, 99)",
			boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
		},
	};

	return (
		<Sidebar>
			<div className='w-full flex justify-center'>
				<div className='w-full max-w-6xl mx-auto py-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl'>
					{/* Header */}
					<div className='text-center mb-8 px-4'>
						<div className='flex justify-center mb-4'>
							<div className='bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-full'>
								<Sparkles className='w-10 h-10 text-purple-600' />
							</div>
						</div>
						<h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-2'>Profile Builder</h1>
						<p className='text-gray-600 max-w-2xl mx-auto'>Build your comprehensive professional profile with detailed information about your experience, education, and projects</p>
					</div>
					{/* Enhanced Tab Navigation */}
					<div className='flex justify-center mb-8 px-4'>
						<div className='bg-white rounded-2xl p-2 shadow-lg border border-gray-200 w-full max-w-4xl'>
							<div className='flex flex-wrap justify-center gap-2'>
								{tabs.map((tab) => (
									<motion.button
										key={tab.id}
										variants={tabVariants}
										animate={activeTab === tab.id ? "active" : "inactive"}
										onClick={() => handleTabChange(tab.id)}
										className='flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base'
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}>
										<tab.icon className='mr-1 sm:mr-2' size={16} />
										<span className='hidden xs:inline'>{tab.label}</span>
									</motion.button>
								))}
							</div>
						</div>
					</div>{" "}
					{/* Enhanced Content Display */}
					<div className='px-4'>
						<motion.div className='bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
							{activeTab === "Experience" && (
								<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
									<ExperienceForm />
								</motion.div>
							)}
							{activeTab === "Education" && (
								<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
									<EducationForm />
								</motion.div>
							)}
							{activeTab === "Projects" && (
								<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
									<ProjectForm />
								</motion.div>
							)}
							{activeTab === "SocialMedia" && (
								<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
									<SocialMediaForm />
								</motion.div>
							)}
							{activeTab === "Preference" && (
								<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
									<Preference />
								</motion.div>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</Sidebar>
	);
};

export default Projects1;
