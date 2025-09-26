import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaInstagram, FaLinkedin, FaGithub, FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
import Modal1 from "../job/Modal1";
import { motion } from "framer-motion";
import { Users, ExternalLink, Edit3, Plus, CheckCircle, AlertCircle } from "lucide-react";

const SocialMediaForm = () => {
	const [socialMediaData, setSocialMediaData] = useState([]);
	const [formData, setFormData] = useState({
		instaUrl: "",
		linkedinUrl: "",
		githubUrl: "",
		facebookUrl: "",
		xUrl: "",
		url: "",
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const socialPlatforms = [
		{ name: "Instagram", key: "instaUrl", icon: FaInstagram, color: "text-pink-500", bg: "bg-pink-100" },
		{ name: "LinkedIn", key: "linkedinUrl", icon: FaLinkedin, color: "text-blue-600", bg: "bg-blue-100" },
		{ name: "GitHub", key: "githubUrl", icon: FaGithub, color: "text-gray-800", bg: "bg-gray-100" },
		{ name: "Facebook", key: "facebookUrl", icon: FaFacebook, color: "text-blue-500", bg: "bg-blue-100" },
		{ name: "Twitter/X", key: "xUrl", icon: FaTwitter, color: "text-blue-400", bg: "bg-blue-100" },
		{ name: "Other", key: "url", icon: FaLink, color: "text-green-500", bg: "bg-green-100" },
	];

	// Fetch data from API
	const fetchData = async () => {
		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				alert("Authorization token is missing.");
				return;
			}

			const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/socialmedia/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Assuming the response has social_media_links
			setSocialMediaData(response.data.social_media_links);
			setFormData({
				instaUrl: response.data.social_media_links.find((link) => link.platform === "Instagram")?.url || "",
				linkedinUrl: response.data.social_media_links.find((link) => link.platform === "Linkedin")?.url || "",
				githubUrl: response.data.social_media_links.find((link) => link.platform === "Github")?.url || "",
				facebookUrl: response.data.social_media_links.find((link) => link.platform === "Facebook")?.url || "",
				xUrl: response.data.social_media_links.find((link) => link.platform === "X")?.url || "",
				url: response.data.social_media_links.find((link) => link.platform === "Other")?.url || "",
			});
		} catch (error) {
			console.error("Error fetching data:", error);
			alert("Error fetching social media links.");
		}
	};

	// Open modal to show all links
	const openModal = () => {
		setIsModalOpen(true);
	};

	// Close modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	// Handle form data change
	const handleModalChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle form submission (Add or Update all links)
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const socialMediaLinks = [
			{ platform: "Instagram", url: formData.instaUrl },
			{ platform: "Linkedin", url: formData.linkedinUrl },
			{ platform: "Github", url: formData.githubUrl },
			{ platform: "Facebook", url: formData.facebookUrl },
			{ platform: "X", url: formData.xUrl },
			{ platform: "Other", url: formData.url },
		].filter((link) => link.url.trim() !== ""); // Only include non-empty URLs

		try {
			const token = localStorage.getItem("access_token");

			if (!token) {
				alert("Authorization token is missing.");
				return;
			}

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/socialmedia/`,
				{ social_media_links: socialMediaLinks },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200 || response.status === 201) {
				alert("Social media links saved successfully!");
				fetchData(); // Refresh data
				closeModal();
			}
		} catch (error) {
			console.error("Error saving social media links:", error);
			alert("Failed to save social media links. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// Fetch data on page load
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<motion.div className='w-full mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center'>
					<div className='bg-blue-100 p-3 rounded-full mr-4'>
						<Users className='w-6 h-6 text-blue-600' />
					</div>
					<div>
						<h3 className='text-2xl font-bold text-gray-800'>Social Media</h3>
						<p className='text-gray-600'>Connect your social profiles</p>
					</div>
				</div>
				<motion.button onClick={openModal} className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					<Plus className='mr-2' size={18} />
					Manage Links
				</motion.button>
			</div>

			{/* Social Media Links Display */}
			<div className='space-y-4'>
				{socialMediaData.length === 0 ? (
					<motion.div className='text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
						<div className='bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
							<Users className='w-8 h-8 text-gray-400' />
						</div>
						<p className='text-gray-500 text-lg'>No social media links added yet</p>
						<p className='text-gray-400 text-sm mt-2'>Click "Manage Links" to add your profiles</p>
					</motion.div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{socialMediaData.map((link, index) => {
							const platform = socialPlatforms.find(
								(p) => p.name === link.platform || (p.name === "Twitter/X" && link.platform === "X") || (p.name === "LinkedIn" && link.platform === "Linkedin") || (p.name === "GitHub" && link.platform === "Github")
							);

							const IconComponent = platform?.icon || FaLink;

							return (
								<motion.div
									key={link._id}
									className='bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}>
									<div className='flex items-center justify-between'>
										<div className='flex items-center flex-1'>
											<div className={`${platform?.bg || "bg-gray-100"} p-2 rounded-lg mr-3`}>
												<IconComponent className={`${platform?.color || "text-gray-600"} text-lg`} />
											</div>
											<div className='flex-1 min-w-0'>
												<h4 className='font-semibold text-gray-800'>{link.platform}</h4>
												<p className='text-sm text-gray-500 truncate'>{link.url}</p>
											</div>
										</div>
										<a href={link.url} target='_blank' rel='noopener noreferrer' className='p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200'>
											<ExternalLink size={16} />
										</a>
									</div>
								</motion.div>
							);
						})}
					</div>
				)}
			</div>
			{/* Enhanced Modal */}
			<Modal1 isOpen={isModalOpen} onClose={closeModal} fetchData={fetchData}>
				<div className='max-w-2xl mx-auto p-6'>
					<div className='border-b border-gray-200 pb-6'>
						<h2 className='text-2xl font-bold text-gray-800 flex items-center'>
							<Users className='mr-3 text-blue-600' size={24} />
							Manage Social Media Links
						</h2>
					</div>

					<form onSubmit={handleSubmit} className='p-6'>
						<div className='space-y-6'>
							{socialPlatforms.map((platform, index) => (
								<motion.div key={platform.key} className='space-y-2' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
									<label className='flex items-center text-sm font-medium text-gray-700'>
										<platform.icon className={`mr-2 ${platform.color}`} size={16} />
										{platform.name}
									</label>
									<input
										type='url'
										name={platform.key}
										value={formData[platform.key]}
										onChange={handleModalChange}
										className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
										placeholder={`Enter your ${platform.name} URL`}
									/>
								</motion.div>
							))}
						</div>

						{/* Action Buttons */}
						<div className='flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6'>
							<button type='button' onClick={closeModal} className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
								Cancel
							</button>
							<motion.button
								type='submit'
								disabled={isLoading}
								className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								{isLoading ? <div className='animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full'></div> : <CheckCircle className='mr-2' size={16} />}
								{isLoading ? "Saving..." : "Save Links"}
							</motion.button>
						</div>
					</form>
				</div>
			</Modal1>
		</motion.div>
	);
};

export default SocialMediaForm;
