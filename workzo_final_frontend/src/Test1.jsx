import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./utils/Auth";
import { motion } from "framer-motion";
import { ArrowLeft, User, Briefcase, GraduationCap, Code, Users, Settings, Bell, Shield, Eye, Calendar, MapPin, Mail, Phone, Globe, Award, Target, Star, ChevronRight, Home, Menu, X } from "lucide-react";
import ContactForm from "./settings/ContactForm";
import NameIcon from "./settings/Nameicon";
import EducationForm from "./settings/EducationForm";
import ExperienceForm from "./settings/ExperienceForm";
import ProjectForm from "./settings/ProjectForm";
import SocialMediaForm from "./settings/SocialForm";

const Test1 = () => {
	const [isAuth, setIsAuth] = useState(null);
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState("overview");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navigationItems = [
		{ id: "overview", label: "Overview", icon: User },
		{ id: "contact", label: "Contact Info", icon: Mail },
		{ id: "experience", label: "Experience", icon: Briefcase },
		{ id: "education", label: "Education", icon: GraduationCap },
		{ id: "projects", label: "Projects", icon: Code },
		{ id: "social", label: "Social Links", icon: Users },
	];

	// Remove mock data - no hardcoded statistics
	const profileStats = [];

	useEffect(() => {
		const checkAuth = () => {
			if (isAuthenticated()) {
				setIsAuth(true);
			} else {
				setIsAuth(false);
			}
		};
		checkAuth();
	}, []);

	useEffect(() => {
		if (isAuth === false) {
			navigate("/sign-in");
		}
	}, [isAuth, navigate]);

	if (isAuth === null) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='flex items-center space-x-2'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
					<span className='text-gray-600'>Loading profile...</span>
				</div>
			</div>
		);
	}

	const handleBackToDashboard = () => {
		navigate("/dashboard");
	};

	const renderSectionContent = () => {
		switch (activeSection) {
			case "overview":
				return (
					<div className='space-y-6'>
						<NameIcon />
					</div>
				);
			case "contact":
				return <ContactForm />;
			case "experience":
				return <ExperienceForm />;
			case "education":
				return <EducationForm />;
			case "projects":
				return <ProjectForm />;
			case "social":
				return <SocialMediaForm />;
			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 pt-20'>
			{/* Mobile Menu Button */}
			<div className='lg:hidden fixed top-20 left-4 z-50'>
				<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='bg-white rounded-lg p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors'>
					{mobileMenuOpen ? <X className='w-6 h-6 text-gray-600' /> : <Menu className='w-6 h-6 text-gray-600' />}
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			{mobileMenuOpen && (
				<div className='lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50' onClick={() => setMobileMenuOpen(false)}>
					<div className='fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out'>
						<div className='p-6 pt-24'>
							<h3 className='text-lg font-semibold text-gray-800 mb-4'>Profile Sections</h3>
							<div className='space-y-2'>
								{navigationItems.map((item) => (
									<motion.button
										key={item.id}
										onClick={() => {
											setActiveSection(item.id);
											setMobileMenuOpen(false);
										}}
										className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
											activeSection === item.id ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
										}`}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}>
										<item.icon className='w-5 h-5' />
										<span className='font-medium'>{item.label}</span>
										{activeSection === item.id && <ChevronRight className='w-4 h-4 ml-auto' />}
									</motion.button>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Desktop Sidebar Navigation */}
					<div className='hidden lg:block lg:col-span-1'>
						<div className='bg-white rounded-2xl shadow-lg p-6 sticky top-24'>
							<div className='mb-6'>
								<h3 className='text-lg font-semibold text-gray-800 mb-4'>Profile Sections</h3>
								<div className='space-y-2'>
									{navigationItems.map((item) => (
										<motion.button
											key={item.id}
											onClick={() => setActiveSection(item.id)}
											className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
												activeSection === item.id ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
											}`}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}>
											<item.icon className='w-5 h-5' />
											<span className='font-medium'>{item.label}</span>
											{activeSection === item.id && <ChevronRight className='w-4 h-4 ml-auto' />}
										</motion.button>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Main Content Area */}
					<div className='lg:col-span-3 mt-4 lg:mt-0'>
						<motion.div key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
							{renderSectionContent()}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Test1;
