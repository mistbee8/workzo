import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { BeatLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  BarChart3,
  Clock,
  Cloud,
  Github,
  Eye,
  EyeOff,
  Shield,
  Zap,
  Database,
  Code2,
  Terminal,
  Cpu,
  ArrowRight,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      // Prepare login form parameters
      const formParams = new URLSearchParams();
      formParams.append("username", formData.username);
      formParams.append("password", formData.password);

      // Step 1: Perform login
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/auth/login/`,
        formParams,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Step 2: Store the access token in localStorage
      localStorage.setItem("access_token", response.data.access_token);
      const token = response.data.access_token;

      // Step 3: Call onLogin callback immediately after successful login
      if (onLogin) onLogin();

      // Step 4: Try to save full name (but don't let this failure block navigation)
      try {
        const fullNamePayload = {
          first_name: formData.username, // Set the username as the first name
          last_name: "", // You can either leave last_name empty or set a default value
        };

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/full_name/`,
          fullNamePayload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the token for authentication
            },
          }
        );
      } catch (fullNameError) {
        // Log the error but don't prevent navigation
        console.error("Error saving full name (non-critical):", fullNameError);
      }

      // Step 5: Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid username or password");
      console.error("Login error:", error);
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

      // Step 1: Fetch user info from Google
      const googleResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // Extract data from Google response
      const userEmail = googleResponse?.data?.email || "";
      const firstName = googleResponse?.data?.given_name || "";
      const lastName = googleResponse?.data?.family_name || "";

      if (!userEmail) {
        console.error("Email not found in Google response");
        return;
      }

      // Step 2: Prepare payload for backend API
      const userData = {
        username: userEmail,
        email: userEmail,
        first_name: firstName || "DefaultFirstName",
        last_name: lastName || "DefaultLastName",
        password: userEmail, // Assuming password is userEmail
        is_verified: true, // Mark the user as verified
      };

      // Step 3: Send data to your backend's user creation endpoint
      const backendResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/auth/social-auth/`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success response
      if (backendResponse.status === 200 || backendResponse.status === 201) {
        const { access_token } = backendResponse.data;
        localStorage.setItem("access_token", access_token);

        // Call onLogin callback immediately after successful login
        if (onLogin) onLogin();

        // Step 4: Try to save full name (but don't let this failure block navigation)
        try {
          const fullNamePayload = {
            first_name: firstName,
            last_name: lastName,
          };

          await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/job_api/v1/full_name/`,
            fullNamePayload,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`, // Pass the user's token for authentication
              },
            }
          );
        } catch (fullNameError) {
          // Log the error but don't prevent navigation
          console.error(
            "Error saving full name (non-critical):",
            fullNameError
          );
        }

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        console.warn("Unexpected response from backend:", backendResponse);
      }
    } catch (error) {
      console.error("Error in Google login:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleAuthResponse,
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  useEffect(() => {
    const getTokenFromCookies = () => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
      return null;
    };

    const token = getTokenFromCookies();

    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      setError("");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-60 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-60 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-30 h-30 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-40 blur-2xl"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
						linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
						linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
					`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Left Section - Job Platform Features */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 justify-center items-center">
        <div className="flex flex-col justify-center max-w-4xl space-y-3">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-center text-4xl font-extrabold mb-2 bg-gradient-to-r from-gray-900 via-blue-900 to-green-900 bg-clip-text text-transparent leading-tight ">
              Find Your Dream Career
            </h1>
            <p className="text-center text-sm text-gray-600 leading-relaxed">
              Connect with top employers and discover opportunities that match
              your skills and career goals.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="group relative p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-blue-100 shadow-md hover:shadow-lg transition-all duration-500"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900 mb-0.5">
                    Smart Job Matching
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    AI-powered algorithm matches you with perfect job
                    opportunities.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            <motion.div
              className="group relative p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-green-100 shadow-md hover:shadow-lg transition-all duration-500"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900 mb-0.5">
                    Profile Builder
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Create stunning professional profiles that stand out to
                    employers.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            <motion.div
              className="group relative p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-purple-100 shadow-md hover:shadow-lg transition-all duration-500"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-900 mb-0.5">
                    Verified Companies
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Apply only to legitimate, verified companies and startups.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex items-center justify-between pt-2 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-sm font-bold text-blue-600">50K+</div>
              <div className="text-xs text-gray-500">Jobs Posted</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-green-600">98%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-purple-600">1000+</div>
              <div className="text-xs text-gray-500">Companies</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Modern Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-4 sm:p-6 relative z-10 min-h-screen lg:min-h-0">
        <motion.div
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-4 lg:mb-4 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl lg:text-3xl sm:text-2xl font-bold text-gray-900 mb-1">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-sm lg:text-sm sm:text-base font-smeibold">
                Please sign in to your account to continue
              </p>
            </motion.div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* Modern Sign In Form */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl">
            <CardContent className="p-4 lg:p-4 sm:p-6">
              <form
                onSubmit={handleSubmit}
                className="space-y-3 lg:space-y-3 sm:space-y-4"
              >
                {/* Username Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-700 mb-1 lg:mb-1 sm:mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 lg:top-2.5 sm:top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      className="w-full pl-10 pr-4 py-2.5 lg:py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50"
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-1 lg:mb-1 sm:mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 lg:top-2.5 sm:top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-2.5 lg:py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 lg:top-2.5 sm:top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-1 lg:mt-1 sm:mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-3 h-3 lg:w-3 lg:h-3 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-xs lg:text-xs sm:text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs lg:text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </motion.div>

                {/* Sign In Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-2.5 lg:py-2.5 sm:py-3 rounded-lg font-semibold relative overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <BeatLoader color="white" size={8} />
                        <span className="text-sm lg:text-sm sm:text-base">
                          Signing In...
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 group">
                        <span className="text-sm lg:text-sm sm:text-base">
                          Sign In
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="relative my-3 lg:my-3 sm:my-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500 font-medium text-xs lg:text-xs sm:text-sm">
                      Or continue with
                    </span>
                  </div>
                </motion.div>

                {/* Social Login */}
                <motion.div
                  className=" gap-2 lg:gap-2 sm:gap-3 items-center justify-center flex"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button
                    type="button"
                    onClick={googleLogin}
                    variant="outline"
                    className="flex items-center justify-center space-x-2 py-2.5 lg:py-2.5 sm:py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 rounded-lg group w-1/2"
                  >
                    <svg
                      className="w-4 h-4 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-medium text-sm">Google</span>
                  </Button>
                </motion.div>

                {/* Sign Up Link */}
                <motion.div
                  className="text-center pt-2 lg:pt-2 sm:pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <span className="text-gray-600 text-xs lg:text-xs sm:text-sm">
                    Don't have an account?{" "}
                  </span>
                  <Link
                    to="/sign-up"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-xs lg:text-xs sm:text-sm"
                  >
                    Sign up for free
                  </Link>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
