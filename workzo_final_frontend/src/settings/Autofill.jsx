import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Code, Briefcase, GraduationCap, Target, Sparkles, Send, RotateCcw } from "lucide-react";

const AutoFillJobFinderForm = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		address: "",
		skills: "",
		experience: "",
		education: "",
		jobPreferences: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleAutoFill = () => {
		setFormData({
			fullName: "Jane Doe",
			email: "jane.doe@example.com",
			phone: "123-456-7890",
			address: "456 Elm Street, Springfield, USA",
			skills: "Python, JavaScript, React, Node.js",
			experience: "Senior Software Engineer at TechCorp (2019-2023), Software Engineer at Innovate Solutions (2016-2019)",
			education: "B.Sc. in Computer Science from Springfield University (2012-2016)",
			jobPreferences: "Full-time, Remote, $80,000 - $100,000, Software Development",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		console.log("Form Submitted:", formData);
		alert("Form Submitted Successfully!");
		setIsSubmitting(false);
	};

	const handleReset = () => {
		setFormData({
			fullName: "",
			email: "",
			phone: "",
			address: "",
			skills: "",
			experience: "",
			education: "",
			jobPreferences: "",
		});
	};

	const formFields = [
		{ name: "fullName", label: "Full Name", icon: User, type: "text", placeholder: "Enter your full name" },
		{ name: "email", label: "Email", icon: Mail, type: "email", placeholder: "Enter your email" },
		{ name: "phone", label: "Phone", icon: Phone, type: "tel", placeholder: "Enter your phone number" },
		{ name: "address", label: "Address", icon: MapPin, type: "text", placeholder: "Enter your address" },
	];

	const textAreaFields = [
		{ name: "skills", label: "Skills", icon: Code, placeholder: "List your skills", rows: 3 },
		{ name: "experience", label: "Work Experience", icon: Briefcase, placeholder: "Describe your work experience", rows: 4 },
		{ name: "education", label: "Education", icon: GraduationCap, placeholder: "Describe your education", rows: 3 },
		{ name: "jobPreferences", label: "Job Preferences", icon: Target, placeholder: "Specify your job preferences", rows: 3 },
	];

	return (
		<div className='w-full flex justify-center min-h-screen bg-gray-50 py-8'>
			<motion.div className='w-full max-w-4xl mx-auto px-4' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				{/* Header */}
				<div className='text-center mb-8'>
					<div className='flex justify-center mb-4'>
						<div className='bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-full'>
							<Sparkles className='w-10 h-10 text-purple-600' />
						</div>
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>Auto-Fill Job Application Form</h1>
					<p className='text-gray-600 max-w-2xl mx-auto'>Streamline your job application process with our smart auto-fill feature. Complete your profile information efficiently and professionally.</p>
				</div>
				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8'>
					<motion.button
						type='button'
						onClick={handleAutoFill}
						className='flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg w-full sm:w-auto'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						<Sparkles className='mr-2' size={18} />
						Auto-Fill Demo Data
					</motion.button>
					<motion.button
						type='button'
						onClick={handleReset}
						className='flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg w-full sm:w-auto'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						<RotateCcw className='mr-2' size={18} />
						Reset Form
					</motion.button>
				</div>

				{/* Form */}
				<motion.form onSubmit={handleSubmit} className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
					<div className='p-8'>
						{/* Basic Information */}
						<div className='mb-8'>
							<h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
								<User className='mr-2 text-blue-600' size={20} />
								Basic Information
							</h2>{" "}
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
								{formFields.map((field, index) => (
									<motion.div key={field.name} className='space-y-2' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
										<label className='flex items-center text-sm font-medium text-gray-700'>
											<field.icon className='mr-2 text-blue-500' size={16} />
											{field.label}
										</label>
										<input
											type={field.type}
											name={field.name}
											value={formData[field.name]}
											onChange={handleChange}
											className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
											placeholder={field.placeholder}
										/>
									</motion.div>
								))}
							</div>
						</div>

						{/* Detailed Information */}
						<div className='mb-8'>
							<h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
								<Briefcase className='mr-2 text-green-600' size={20} />
								Professional Details
							</h2>{" "}
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
								{textAreaFields.map((field, index) => (
									<motion.div key={field.name} className='space-y-2' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
										<label className='flex items-center text-sm font-medium text-gray-700'>
											<field.icon className='mr-2 text-green-500' size={16} />
											{field.label}
										</label>
										<textarea
											name={field.name}
											value={formData[field.name]}
											onChange={handleChange}
											className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
											placeholder={field.placeholder}
											rows={field.rows}
										/>
									</motion.div>
								))}
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div className='bg-gray-50 px-8 py-6 border-t border-gray-200'>
						<motion.button
							type='submit'
							disabled={isSubmitting}
							className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							{isSubmitting ? (
								<motion.div className='flex items-center' animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
									<div className='animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
									Submitting...
								</motion.div>
							) : (
								<>
									<Send className='mr-2' size={18} />
									Submit Application
								</>
							)}
						</motion.button>
					</div>
				</motion.form>
			</motion.div>
		</div>
	);
};

export default AutoFillJobFinderForm;
