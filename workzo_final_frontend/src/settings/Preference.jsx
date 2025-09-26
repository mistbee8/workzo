import React, { useState, useEffect } from "react";
import axios from "axios";
import { useJobLocation } from "../utils/JobLocationContext";
import { motion } from "framer-motion";
import { Settings, Edit3, Check, Star, Target, Briefcase, Loader2 } from "lucide-react";

// Function to get the auth token from localStorage
const getAuthToken = () => {
	return localStorage.getItem("access_token");
};

const Preference = ({ showdata }) => {
	const [preferences, setPreferences] = useState({
		industry: "",
	});

	const [isEditMode, setIsEditMode] = useState(false);
	const [submittedData, setSubmittedData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { loading, fetchJobData } = useJobLocation();

	useEffect(() => {
		fetchJobData();
	}, []);

	useEffect(() => {
		// Fetch preferences if available
		const fetchPreferences = async () => {
			const token = getAuthToken();
			if (token) {
				try {
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/preferences/`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					const data = response.data;
					if (data) {
						setPreferences({
							industry: data.industry || "",
						});
						setSubmittedData(data);
					}
				} catch (error) {
					console.error("Error fetching preferences:", error);
				}
			}
		};

		fetchPreferences();
	}, []);

	const handlePreferenceChange = (e) => {
		const { name, value } = e.target;
		setPreferences({ ...preferences, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const token = getAuthToken();
		if (token) {
			try {
				const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/preferences/`, preferences, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (response.status === 200 || response.status === 201) {
					setSubmittedData(preferences);
					alert("Preferences saved successfully!");
					setIsEditMode(false);
					window.location.reload();
				}
			} catch (error) {
				console.error("Error saving preferences:", error);
				alert("Error saving preferences.");
			} finally {
				setIsLoading(false);
			}
		}
	};

	if (loading) {
		return (
			<div className='flex items-center justify-center p-8'>
				<Loader2 className='animate-spin mr-3 text-blue-600' size={24} />
				<span className='text-gray-600'>Loading preferences...</span>
			</div>
		);
	}

	return (
		<motion.div className='max-w-2xl mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='flex justify-center mb-4'>
					<div className='bg-blue-100 p-3 rounded-full'>
						<Target className='w-8 h-8 text-blue-600' />
					</div>
				</div>
				<h2 className='text-2xl font-bold text-gray-800 mb-2'>Job Preferences</h2>
				<p className='text-gray-600'>Customize your job search preferences to find the perfect opportunities</p>
			</div>

			{submittedData && !isEditMode ? (
				// Show saved preferences
				<motion.div className='bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 shadow-lg' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-lg font-semibold text-gray-800 flex items-center'>
							<Check className='mr-2 text-green-600' size={20} />
							Your Preferences
						</h3>
						<div className='flex items-center bg-green-100 px-3 py-1 rounded-full'>
							<Star className='w-4 h-4 text-green-600 mr-1' />
							<span className='text-sm text-green-700'>Active</span>
						</div>
					</div>

					<div className='bg-white p-4 rounded-lg shadow-sm mb-4'>
						<div className='flex items-center'>
							<div className='bg-blue-100 p-2 rounded-full mr-3'>
								<Briefcase className='w-5 h-5 text-blue-600' />
							</div>
							<div>
								<p className='text-sm text-gray-500'>Industry Preferences</p>
								<p className='text-gray-800 font-medium'>{submittedData.industry || "No specific preference"}</p>
							</div>
						</div>
					</div>

					<motion.button
						onClick={() => {
							setIsEditMode(true);
							setPreferences(submittedData);
						}}
						className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}>
						<Edit3 className='mr-2' size={18} />
						Edit Preferences
					</motion.button>
				</motion.div>
			) : (
				// Show form for editing/adding preferences
				<motion.div className='bg-white p-6 rounded-xl border border-gray-200 shadow-lg' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='space-y-2'>
							<label htmlFor='industry' className='flex items-center text-sm font-medium text-gray-700'>
								<Briefcase className='mr-2 text-blue-500' size={18} />
								Industry Preferences
							</label>
							<textarea
								name='industry'
								value={preferences.industry}
								onChange={handlePreferenceChange}
								placeholder='e.g., Technology, Healthcare, Finance, Remote Work, Startup Environment'
								className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
								rows='4'
							/>
							<p className='text-xs text-gray-500'>Describe your preferred industries, work environments, or specific job requirements</p>
						</div>

						<div className='flex justify-end space-x-4 pt-4 border-t border-gray-200'>
							{isEditMode && (
								<button type='button' onClick={() => setIsEditMode(false)} className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
									Cancel
								</button>
							)}
							<motion.button
								type='submit'
								disabled={isLoading}
								className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								{isLoading ? <Loader2 className='animate-spin mr-2' size={16} /> : <Check className='mr-2' size={16} />}
								{isLoading ? "Saving..." : "Save Preferences"}
							</motion.button>
						</div>
					</form>
				</motion.div>
			)}
		</motion.div>
	);
};

export default Preference;
