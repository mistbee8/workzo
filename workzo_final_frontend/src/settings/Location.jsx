import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Search, Globe, MapPinIcon } from "lucide-react";

const Location = () => {
	const [preferences, setPreferences] = useState({
		locations: [],
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Predefined list of job locations
	const locationsList = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Surat", "Jaipur", "Chandigarh", "Lucknow", "Indore", "Gurgaon", "Noida", "Visakhapatnam", "Mysore", "Thane", "Bhopal", "Patna"];

	// Filter locations based on search term
	const filteredLocations = locationsList.filter((location) => location.toLowerCase().includes(searchTerm.toLowerCase()));

	// Handle checkbox selection
	const handlePreferenceChange = (e) => {
		const { value, checked } = e.target;
		setPreferences((prevState) => {
			if (checked) {
				// Add location to preferences if checked
				return { ...prevState, locations: [...prevState.locations, value] };
			} else {
				// Remove location from preferences if unchecked
				return {
					...prevState,
					locations: prevState.locations.filter((loc) => loc !== value),
				};
			}
		});
	};

	// Handle form submission (e.g., saving preferences)
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			alert("Location preferences saved successfully!");
		}, 1000);
	};

	return (
		<motion.div className='w-full mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center'>
					<div className='bg-green-100 p-3 rounded-full mr-4'>
						<MapPin className='w-6 h-6 text-green-600' />
					</div>
					<div>
						<h2 className='text-2xl font-bold text-gray-800'>Location Preferences</h2>
						<p className='text-gray-600'>Select your preferred job locations</p>
					</div>
				</div>
				<div className='flex items-center bg-gray-100 px-3 py-2 rounded-lg'>
					<Globe className='w-5 h-5 text-gray-500 mr-2' />
					<span className='text-sm text-gray-600'>{preferences.locations.length} selected</span>
				</div>
			</div>

			<form onSubmit={handleSubmit} className='space-y-8'>
				{/* Search Bar */}
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
					<input
						type='text'
						placeholder='Search locations...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
					/>
				</div>

				{/* Selected Locations Summary */}
				{preferences.locations.length > 0 && (
					<motion.div className='bg-green-50 p-4 rounded-lg border border-green-200' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
						<h4 className='font-semibold text-green-800 mb-2 flex items-center'>
							<CheckCircle className='mr-2' size={18} />
							Selected Locations
						</h4>
						<div className='flex flex-wrap gap-2'>
							{preferences.locations.map((location) => (
								<motion.span
									key={location}
									className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.2 }}>
									{location}
								</motion.span>
							))}
						</div>
					</motion.div>
				)}

				{/* Locations Grid */}
				<div className='space-y-4'>
					<h4 className='text-lg font-semibold text-gray-800'>Available Locations</h4>

					{filteredLocations.length === 0 ? (
						<div className='text-center py-8 text-gray-500'>No locations found matching "{searchTerm}"</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{filteredLocations.map((location, index) => (
								<motion.label
									key={location}
									className='flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
									whileHover={{ scale: 1.02 }}>
									<div className='flex items-center flex-1'>
										<input
											type='checkbox'
											value={location}
											checked={preferences.locations.includes(location)}
											onChange={handlePreferenceChange}
											className='h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300'
										/>
										<div className='ml-3 flex items-center'>
											<MapPinIcon className='w-4 h-4 text-gray-500 mr-2' />
											<span className='font-medium text-gray-800'>{location}</span>
										</div>
									</div>
									{preferences.locations.includes(location) && <CheckCircle className='w-5 h-5 text-green-600' />}
								</motion.label>
							))}
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className='flex justify-between items-center pt-6 border-t border-gray-200'>
					<div className='text-sm text-gray-500'>{preferences.locations.length === 0 ? "No locations selected" : `${preferences.locations.length} location${preferences.locations.length > 1 ? "s" : ""} selected`}</div>
					<motion.button
						type='submit'
						disabled={isLoading}
						className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						{isLoading ? <div className='animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full'></div> : <CheckCircle className='mr-2' size={16} />}
						{isLoading ? "Saving..." : "Save Preferences"}
					</motion.button>
				</div>
			</form>
		</motion.div>
	);
};

export default Location;
