import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Eye, EyeOff, ArrowRight, Lock, Mail, User, UserPlus, CheckCircle, AlertCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Constants
const VALIDATION_RULES = {
	username: { minLength: 2, required: true },
	email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
	password: { minLength: 8, required: true },
	confirmPassword: { required: true },
};

const FORM_FIELDS = ["username", "email", "password", "confirmPassword"];

// Animation variants
const ANIMATION_VARIANTS = {
	fadeInUp: {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5 },
	},
	fadeIn: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 0.5 },
	},
	scaleIn: {
		initial: { scale: 0 },
		animate: { scale: 1 },
		transition: { type: "spring" },
	},
	errorSlideIn: {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
	},
};

// Utility functions for styling
const getInputIconColor = (fieldName, touchedFields, errors) => {
	if (touchedFields[fieldName] && !errors[fieldName]) return "text-green-500";
	if (errors[fieldName]) return "text-red-500";
	return "text-gray-400 group-hover:text-gray-600";
};

const getInputClassName = (fieldName, touchedFields, errors) => {
	const baseClasses = "w-full pl-11 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 bg-white/70 hover:bg-white/90 focus:bg-white";

	if (touchedFields[fieldName] && !errors[fieldName]) {
		return `${baseClasses} border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200`;
	}
	if (errors[fieldName]) {
		return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200`;
	}
	return `${baseClasses} border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-300`;
};

const getPasswordStrengthColor = (strength) => {
	if (strength >= 75) return { text: "text-green-600", bg: "bg-green-500" };
	if (strength >= 50) return { text: "text-yellow-600", bg: "bg-yellow-500" };
	if (strength >= 25) return { text: "text-orange-600", bg: "bg-orange-500" };
	return { text: "text-red-600", bg: "bg-red-500" };
};

const getPasswordStrengthLabel = (strength) => {
	if (strength >= 75) return "Strong";
	if (strength >= 50) return "Good";
	if (strength >= 25) return "Fair";
	return "Weak";
};

// Background orbs component - memoized for performance
const BackgroundOrbs = memo(() => (
	<div className='absolute inset-0 overflow-hidden'>
		<motion.div
			className='absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-green-200/60 to-blue-200/60 rounded-full blur-3xl'
			animate={{
				scale: [1, 1.2, 1],
				rotate: [0, 180, 360],
			}}
			transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
		/>
		<motion.div
			className='absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-blue-200/60 to-cyan-200/60 rounded-full blur-3xl'
			animate={{
				scale: [1.2, 1, 1.2],
				rotate: [360, 180, 0],
			}}
			transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
		/>
		<motion.div
			className='absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-emerald-200/40 to-green-200/40 rounded-full blur-2xl'
			animate={{
				y: [-30, 30, -30],
				x: [-15, 15, -15],
			}}
			transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
		/>
		<motion.div
			className='absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl'
			animate={{
				scale: [0.8, 1.1, 0.8],
				rotate: [0, 360],
			}}
			transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
		/>
	</div>
));

BackgroundOrbs.displayName = "BackgroundOrbs";

// Grid pattern component - memoized for performance
const GridPattern = memo(() => (
	<div className='absolute inset-0 opacity-[0.03]'>
		<div
			className='absolute inset-0'
			style={{
				backgroundImage: `
					linear-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px),
					linear-gradient(90deg, rgba(34, 197, 94, 0.4) 1px, transparent 1px),
					radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
				`,
				backgroundSize: "60px 60px, 60px 60px, 30px 30px",
			}}
		/>
	</div>
));

GridPattern.displayName = "GridPattern";

// Success overlay component - memoized for performance
const SuccessOverlay = memo(() => (
	<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center'>
		<motion.div
			initial={{ scale: 0, rotate: -180 }}
			animate={{ scale: 1, rotate: 0 }}
			exit={{ scale: 0, rotate: 180 }}
			transition={{ type: "spring", duration: 0.6 }}
			className='bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center max-w-sm mx-4'>
			<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
				<CheckCircle className='w-8 h-8 text-green-600' />
			</motion.div>
			<motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className='text-xl font-bold text-gray-900 mb-2'>
				Registration Successful!
			</motion.h3>
			<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className='text-gray-600'>
				Please check your email for OTP verification.
			</motion.p>
		</motion.div>
	</motion.div>
));

SuccessOverlay.displayName = "SuccessOverlay";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [otp, setOtp] = useState("");
	const [isRegistered, setIsRegistered] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [touchedFields, setTouchedFields] = useState({});
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: "",
		email: localStorage.getItem("userEmail") || "",
		password: "",
		confirmPassword: "",
	});

	// Password strength calculation
	const calculatePasswordStrength = useCallback((password) => {
		let strength = 0;
		if (password.length >= 8) strength += 25;
		if (/[a-z]/.test(password)) strength += 25;
		if (/[A-Z]/.test(password)) strength += 25;
		if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25;
		return strength;
	}, []);

	// Form validation
	const validateField = useCallback(
		(name, value) => {
			const rules = VALIDATION_RULES[name];
			if (!rules) return "";

			if (rules.required && !value?.trim()) {
				return `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1")} is required`;
			}

			if (rules.minLength && value.length < rules.minLength) {
				return `Must be at least ${rules.minLength} characters`;
			}

			if (rules.pattern && !rules.pattern.test(value)) {
				return name === "email" ? "Please enter a valid email" : "Invalid format";
			}

			if (name === "confirmPassword" && value !== formData.password) {
				return "Passwords do not match";
			}

			return "";
		},
		[formData.password]
	);

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target;
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));

			// Calculate password strength
			if (name === "password") {
				setPasswordStrength(calculatePasswordStrength(value));
			}

			// Validate field if it's been touched
			if (touchedFields[name]) {
				const error = validateField(name, value);
				setErrors((prev) => ({
					...prev,
					[name]: error,
				}));
			}
		},
		[touchedFields, validateField, calculatePasswordStrength]
	);

	// Handle field blur
	const handleFieldBlur = useCallback(
		(name) => {
			setTouchedFields((prev) => ({
				...prev,
				[name]: true,
			}));

			const error = validateField(name, formData[name]);
			setErrors((prev) => ({
				...prev,
				[name]: error,
			}));
		},
		[formData, validateField]
	);

	// Memoized form validation
	const isFormValid = useMemo(() => {
		const hasErrors = Object.values(errors).some((error) => error !== "");
		const hasAllFields = FORM_FIELDS.every((field) => formData[field] !== "");
		return !hasErrors && hasAllFields;
	}, [formData, errors]);

	// Memoized completion percentage
	const completionPercentage = useMemo(() => {
		return Math.round((Object.values(formData).filter(Boolean).length / 4) * 100);
	}, [formData]);

	const handleOtpChange = (e) => {
		setOtp(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate all fields
		const newErrors = {};
		Object.keys(formData).forEach((key) => {
			const error = validateField(key, formData[key]);
			if (error) newErrors[key] = error;
		});

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setTouchedFields({
				username: true,
				email: true,
				password: true,
				confirmPassword: true,
			});
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		const userPayload = {
			username: formData.username,
			email: formData.email,
			password: formData.password,
		};

		setLoading(true);
		setError("");

		try {
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/auth/register/`, userPayload, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			if (response.status === 201) {
				setSuccessMessage(response.data.message);
				setIsRegistered(true);
				setIsSuccess(true);
				setTimeout(() => setIsSuccess(false), 3000);
			}
		} catch (error) {
			if (error.response) {
				setError(error.response.data.detail || "An error occurred while registering.");
			} else {
				setError("An unexpected error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyEmail = async () => {
		if (!otp) {
			setError("Please enter the OTP.");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/auth/verify_email/`,
				{ user_email: formData.email, otp },
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);

			if (response.status === 200) {
				setSuccessMessage("Email verified successfully!");
				navigate("/sign-in");
			}
		} catch (error) {
			if (error.response) {
				setError(error.response.data.detail || "Failed to verify OTP.");
			} else {
				setError("An unexpected error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleAuthResponse = async (response) => {
		try {
			const accessToken = response.access_token;
			if (!accessToken) {
				console.error("Access token is missing");
				return;
			}

			const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			const userEmail = googleResponse?.data?.email;
			const firstName = googleResponse?.data?.given_name || "";
			const lastName = googleResponse?.data?.family_name || "";

			if (!userEmail) {
				console.error("No email found in Google response");
				return;
			}

			const userData = {
				username: userEmail,
				email: userEmail,
				first_name: firstName || "DefaultFirstName",
				last_name: lastName || "DefaultLastName",
				password: userEmail,
				is_verified: true,
			};

			try {
				const socialAuthResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/auth/social-auth/`, userData, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (socialAuthResponse.status === 200 || socialAuthResponse.status === 201) {
					const { access_token } = socialAuthResponse.data;
					localStorage.setItem("access_token", access_token);

					// Save full name
					try {
						const fullNamePayload = {
							first_name: firstName,
							last_name: lastName,
						};

						await axios.post(`${import.meta.env.VITE_BACKEND_URL}/job_api/v1/full_name/`, fullNamePayload, {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${access_token}`,
							},
						});
					} catch (fullNameError) {
						console.error("Error saving full name:", fullNameError);
					}

					window.location.href = "/dashboard";
				} else {
					console.warn("Unexpected response during social authentication:", socialAuthResponse);
				}
			} catch (socialAuthError) {
				console.error("Social authentication error:", socialAuthError);
			}
		} catch (error) {
			console.error("Google login error:", error);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: handleGoogleAuthResponse,
		onError: (error) => {
			console.error("Google login error:", error);
		},
	});

	return (
		<>
			<AnimatePresence>{isSuccess && <SuccessOverlay />}</AnimatePresence>
			<div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex relative overflow-hidden'>
				{/* Floating Background Elements */}
				<BackgroundOrbs />
				{/* Enhanced Decorative Grid Pattern */}
				<GridPattern />

				{/* Main Content */}
				<div className='w-full flex items-center justify-center p-6 lg:p-8 relative z-10 min-h-screen'>
					<motion.div className='w-full max-w-lg mx-auto' initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
						{/* Header */}
						<div className='text-center mb-6 lg:mb-6 sm:mb-8'>
							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
								<motion.div
									className='w-12 h-12 lg:w-12 lg:h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl'
									whileHover={{
										scale: 1.05,
										rotate: [0, -10, 10, 0],
										transition: { duration: 0.3 },
									}}
									whileTap={{ scale: 0.95 }}>
									<UserPlus className='w-6 h-6 lg:w-6 lg:h-6 sm:w-7 sm:h-7 text-white' />
								</motion.div>
								<h2 className='text-2xl lg:text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>Create Account</h2>
								<p className='text-gray-600 text-base lg:text-base sm:text-lg'>Join our platform and start your career journey</p>
							</motion.div>
						</div>

						{/* Error Message */}
						{error && (
							<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center'>
								{error}
							</motion.div>
						)}

						{/* Success Message */}
						{successMessage && (
							<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className='mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm text-center'>
								{successMessage}
							</motion.div>
						)}

						{/* Enhanced Sign Up Form */}
						<Card className='border-0 shadow-2xl bg-white/90 backdrop-blur-xl ring-1 ring-gray-100'>
							<CardContent className='p-6 lg:p-6 sm:p-10'>
								{!isRegistered ? (
									<>
										{/* Form completion indicator */}
										<motion.div className='mb-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
											<div className='flex justify-between text-xs text-gray-500 mb-2'>
												<span>Form completion</span>
												<span>{completionPercentage}%</span>
											</div>
											<div className='w-full bg-gray-200 rounded-full h-1.5'>
												<motion.div
													initial={{ width: 0 }}
													animate={{ width: `${completionPercentage}%` }}
													transition={{ duration: 0.3 }}
													className='bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full'
												/>
											</div>
										</motion.div>

										<form onSubmit={handleSubmit} className='space-y-5 lg:space-y-5 sm:space-y-6'>
											{/* Username Field */}
											<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
												<label htmlFor='username' className='block text-sm font-semibold text-gray-700 mb-2'>
													Username
												</label>
												<div className='relative group'>
													<User className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-200 ${getInputIconColor("username", touchedFields, errors)}`} />
													<Input
														id='username'
														name='username'
														type='text'
														value={formData.username}
														onChange={handleChange}
														onBlur={() => handleFieldBlur("username")}
														placeholder='Enter your username'
														className={getInputClassName("username", touchedFields, errors)}
														required
													/>
													{touchedFields.username && !errors.username && formData.username && (
														<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='absolute right-3 top-3'>
															<Check className='w-5 h-5 text-green-500' />
														</motion.div>
													)}
													{errors.username && (
														<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='absolute right-3 top-3'>
															<AlertCircle className='w-5 h-5 text-red-500' />
														</motion.div>
													)}
												</div>
												<AnimatePresence>
													{errors.username && (
														<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='text-red-500 text-sm mt-1 flex items-center gap-1'>
															<AlertCircle className='w-4 h-4' />
															{errors.username}
														</motion.p>
													)}
												</AnimatePresence>
											</motion.div>

											{/* Email Field */}
											<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
												<label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2'>
													Email Address
												</label>
												<div className='relative group'>
													<Mail className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-200 ${getInputIconColor("email", touchedFields, errors)}`} />
													<Input
														id='email'
														name='email'
														type='email'
														value={formData.email}
														onChange={handleChange}
														onBlur={() => handleFieldBlur("email")}
														placeholder='Enter your email'
														className={getInputClassName("email", touchedFields, errors)}
														required
													/>
													{touchedFields.email && !errors.email && formData.email && (
														<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='absolute right-3 top-3'>
															<Check className='w-5 h-5 text-green-500' />
														</motion.div>
													)}
													{errors.email && (
														<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='absolute right-3 top-3'>
															<AlertCircle className='w-5 h-5 text-red-500' />
														</motion.div>
													)}
												</div>
												<AnimatePresence>
													{errors.email && (
														<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='text-red-500 text-sm mt-1 flex items-center gap-1'>
															<AlertCircle className='w-4 h-4' />
															{errors.email}
														</motion.p>
													)}
												</AnimatePresence>
											</motion.div>

											{/* Password Field */}
											<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
												<label htmlFor='password' className='block text-sm font-semibold text-gray-700 mb-2'>
													Password
												</label>
												<div className='relative group'>
													<Lock className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-200 ${getInputIconColor("password", touchedFields, errors)}`} />
													<Input
														id='password'
														name='password'
														type={showPassword ? "text" : "password"}
														value={formData.password}
														onChange={handleChange}
														onBlur={() => handleFieldBlur("password")}
														placeholder='Create a password'
														className={getInputClassName("password", touchedFields, errors).replace("pr-12", "pr-16")}
														required
													/>
													<motion.button
														type='button'
														onClick={() => setShowPassword(!showPassword)}
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.9 }}
														className='absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100'>
														{showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
													</motion.button>
												</div>

												{/* Password Strength Indicator */}
												{formData.password && (
													<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className='mt-3'>
														<div className='flex items-center justify-between text-xs text-gray-600 mb-1'>
															<span>Password strength</span>
															<span className={`font-medium ${getPasswordStrengthColor(passwordStrength).text}`}>{getPasswordStrengthLabel(passwordStrength)}</span>
														</div>
														<div className='w-full bg-gray-200 rounded-full h-2'>
															<motion.div
																initial={{ width: 0 }}
																animate={{ width: `${passwordStrength}%` }}
																transition={{ duration: 0.3 }}
																className={`h-2 rounded-full transition-colors duration-300 ${getPasswordStrengthColor(passwordStrength).bg}`}
															/>
														</div>
													</motion.div>
												)}

												<AnimatePresence>
													{errors.password && (
														<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='text-red-500 text-sm mt-1 flex items-center gap-1'>
															<AlertCircle className='w-4 h-4' />
															{errors.password}
														</motion.p>
													)}
												</AnimatePresence>
											</motion.div>

											{/* Confirm Password Field */}
											<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
												<label htmlFor='confirmPassword' className='block text-sm font-semibold text-gray-700 mb-2'>
													Confirm Password
												</label>
												<div className='relative group'>
													<Lock className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-200 ${getInputIconColor("confirmPassword", touchedFields, errors)}`} />
													<Input
														id='confirmPassword'
														name='confirmPassword'
														type={showConfirmPassword ? "text" : "password"}
														value={formData.confirmPassword}
														onChange={handleChange}
														onBlur={() => handleFieldBlur("confirmPassword")}
														placeholder='Confirm your password'
														className={getInputClassName("confirmPassword", touchedFields, errors).replace("pr-12", "pr-16")}
														required
													/>
													<motion.button
														type='button'
														onClick={() => setShowConfirmPassword(!showConfirmPassword)}
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.9 }}
														className='absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100'>
														{showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
													</motion.button>
													{touchedFields.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
														<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='absolute right-12 top-3'>
															<Check className='w-5 h-5 text-green-500' />
														</motion.div>
													)}
												</div>
												<AnimatePresence>
													{errors.confirmPassword && (
														<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='text-red-500 text-sm mt-1 flex items-center gap-1'>
															<AlertCircle className='w-4 h-4' />
															{errors.confirmPassword}
														</motion.p>
													)}
												</AnimatePresence>
											</motion.div>

											{/* Sign Up Button */}
											<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
												<motion.div whileHover={isFormValid && !loading ? { scale: 1.02 } : {}} whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}>
													<Button
														type='submit'
														disabled={!isFormValid || loading}
														className={`w-full py-3.5 rounded-xl font-semibold relative overflow-hidden group transition-all duration-300 shadow-lg ${
															isFormValid && !loading
																? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white hover:shadow-xl"
																: "bg-gray-300 text-gray-500 cursor-not-allowed"
														}`}>
														<div className='absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
														{loading ? (
															<div className='flex items-center justify-center space-x-3'>
																<BeatLoader color='white' size={8} />
																<span>Creating Account...</span>
															</div>
														) : (
															<div className='flex items-center justify-center space-x-2 group'>
																<span>Create Account</span>
																<motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
																	<ArrowRight className='w-5 h-5' />
																</motion.div>
															</div>
														)}
													</Button>
												</motion.div>
											</motion.div>
										</form>
									</>
								) : (
									<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
										<div className='text-center mb-6'>
											<motion.div className='w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
												<Mail className='w-6 h-6 text-blue-600' />
											</motion.div>
											<h3 className='text-xl font-bold text-gray-900 mb-2'>Verify Your Email</h3>
											<p className='text-gray-600 text-sm'>
												We've sent a verification code to <span className='font-semibold'>{formData.email}</span>
											</p>
										</div>

										<div className='space-y-4'>
											<div>
												<label htmlFor='otp' className='block text-sm font-semibold text-gray-700 mb-2'>
													Enter OTP
												</label>
												<Input
													id='otp'
													name='otp'
													type='text'
													value={otp}
													onChange={handleOtpChange}
													placeholder='Enter the 6-digit code'
													className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-center text-lg font-mono tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300'
													maxLength={6}
													required
												/>
											</div>

											<Button
												type='button'
												onClick={handleVerifyEmail}
												disabled={loading}
												className='w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl'>
												{loading ? (
													<div className='flex items-center justify-center space-x-2'>
														<BeatLoader color='white' size={8} />
														<span>Verifying...</span>
													</div>
												) : (
													"Verify Email"
												)}
											</Button>
										</div>
									</motion.div>
								)}

								{!isRegistered && (
									<>
										{/* Enhanced Divider */}
										<motion.div className='relative my-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
											<div className='absolute inset-0 flex items-center'>
												<div className='w-full border-t border-gray-300'></div>
											</div>
											<div className='relative flex justify-center text-sm'>
												<span className='px-4 bg-white/90 text-gray-500 font-medium backdrop-blur-sm'>Or sign up with</span>
											</div>
										</motion.div>

										{/* Enhanced Social Sign Up */}
										<motion.div className='w-full' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}>
											<motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
												<Button
													type='button'
													onClick={googleLogin}
													variant='outline'
													className='w-full flex items-center justify-center space-x-2 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 rounded-xl group bg-white/70 hover:bg-white/90 backdrop-blur-sm hover:shadow-md'>
													<motion.svg className='w-5 h-5' viewBox='0 0 24 24' whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
														<path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
														<path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
														<path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
														<path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
													</motion.svg>
													<span className='font-medium'>Continue with Google</span>
												</Button>
											</motion.div>
										</motion.div>

										{/* Enhanced Sign In Link */}
										<motion.div className='text-center pt-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 }}>
											<div className='text-gray-600 text-sm'>
												Already have an account?{" "}
												<motion.div className='inline-block' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
													<Link to='/sign-in' className='text-green-600 hover:text-green-700 font-semibold transition-colors underline-offset-2 hover:underline'>
														Sign in here
													</Link>
												</motion.div>
											</div>
										</motion.div>
									</>
								)}
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default Signup;
