import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./home-page/HomePage";
import LandingPage from "./home-page/LandingPage";
import { Navbar } from "./components/navbar";
import Resume from "./resumeBuilder/Resume";
import Login from "./sign/Login";
import Signup from "./sign/SignUp";
import JobMatch from "./job/JobMatch";
import Footer from "./home-page/Footer";
import Sidebar from "./SideBar";
import ResumeForm from "./resumeBuilder/ResumeForm";
import EditResume from "./resumeBuilder/EditResume";
import JobMatch1 from "./job/ResumeBuilder1";
import JobMatch2 from "./job/JobMatch2";
import ResumeUpload from "./resumeBuilder/ResumeUpload";
import Setting from "./settings/Settings";
import Resume1 from "./resumeBuilder/Resume1";
import Resume2 from "./resumeBuilder/Resume2";
import Resume3 from "./resumeBuilder/Resume3";
import FAQPage from "./footer/Faq";
import TermsOfServicePage from "./footer/Terms";
import PrivacyPolicyPage from "./footer/Privacy";
import DashboardPage from "./home-page/Dashboard";
import { isAuthenticated } from "./utils/Auth"; // Import isAuthenticated
import Wishlist from "./job/Wishlist";
import Test1 from "./Test1";
import JobLocationDisplay from "./sign/JobLocationDisplay";
import { UserProvider } from "./utils/UserContext";
import { JobLocationProvider } from "./utils/JobLocationContext";
import Wishlist1 from "./job/Wishlist1";
import Test from "./resumeBuilder/Test";
import Autofill1 from "./settings/Autofill1";
import Contact from "./contact/Contact";
import ForgotPassword from "./sign/ForgotPassowrd";
function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		// Check if user is authenticated when the app loads
		const checkAuthStatus = () => {
			if (isAuthenticated()) {
				setAuthenticated(true);
			} else {
				setAuthenticated(false);
			}
			setLoading(false); // Stop loading once authentication status is determined
		};

		checkAuthStatus();
	}, []);

	const handleLogin = () => {
		setAuthenticated(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		setAuthenticated(false);
	};

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	if (loading) {
		return <div></div>; // Show loading while checking auth status
	}

	return (
		<Router>
			<Navbar authenticated={authenticated} onLogout={handleLogout} toggleSidebar={toggleSidebar} />
			<div className=' w-full min-h-screen'>
				<Routes>
					<Route path='/' element={authenticated ? <Navigate to='/dashboard' /> : <LandingPage />} />

					<Route path='/sign-in' element={authenticated ? <Navigate to='/dashboard' /> : <Login onLogin={handleLogin} />} />

					<Route path='/sign-up' element={authenticated ? <Navigate to='/dashboard' /> : <Signup />} />
					<Route path='/forgot-password' element={<ForgotPassword/> } />
					<Route path='/contact' element={<Contact />} />
					{/* <Route
          path="/resume1"
          element={
            <Sidebar>
              <Resume1 data={mockData} />
            </Sidebar>
          }
        />
        <Route
          path="/resume2"
          element={
            <Sidebar>
              <Resume2 data={mockData2} />
            </Sidebar>
          }
        /> */}
					<Route
						path='/resume'
						element={
							<Sidebar>
								<Resume3 />
							</Sidebar>
						}
					/>
					<Route path='/resume-form' element={<ResumeForm />} />
					<Route path='/resume-upload' element={<ResumeUpload />} />
					<Route
						path='/test'
						element={
							<div>
								<UserProvider>
									{/* Ensure UserProvider wraps around the components */}
									<div>
										<Test />
									</div>
								</UserProvider>
							</div>
						}
					/>
					<Route path='/profile' element={<Test1 />} />
					<Route
						path='/autofill'
						element={
							<JobLocationProvider>
								<div>
									<Autofill1 />
								</div>
							</JobLocationProvider>
						}
					/>
					<Route
						path='/job-match'
						element={
							authenticated ? (
								<div>
									<UserProvider>
										{" "}
										{/* Ensure UserProvider wraps around the components */}
										<JobLocationProvider>
											<div>
												<JobMatch2 />
											</div>
										</JobLocationProvider>
									</UserProvider>
								</div>
							) : (
								<Login onLogin={handleLogin} />
							)
						}
					/>
					<Route
						path='/wishlist'
						element={
							authenticated ? (
								<div>
									<UserProvider>
										{" "}
										{/* Ensure UserProvider wraps around the components */}
										<div>
											<Wishlist1 />
										</div>
									</UserProvider>
								</div>
							) : (
								<Login onLogin={handleLogin} />
							)
						}
					/>

					<Route path='/resume-builder' element={authenticated ? <JobMatch1 /> : <Login onLogin={handleLogin} />} />

					<Route
						path='/edit-resume/:id'
						element={
							authenticated ? (
								<Sidebar>
									<EditResume />
								</Sidebar>
							) : (
								<Login onLogin={handleLogin} />
							)
						}
					/>

					<Route
						path='/settings'
						element={
							authenticated ? (
								<JobLocationProvider>
									<div>
										<Setting />
									</div>
								</JobLocationProvider>
							) : (
								<Login onLogin={handleLogin} />
							)
						}
					/>

					<Route
						path='/dashboard'
						element={
							authenticated ? (
								<UserProvider>
									{" "}
									{/* Ensure UserProvider wraps around the components */}
									<div>
										<DashboardPage />
									</div>
								</UserProvider>
							) : (
								<Login onLogin={handleLogin} />
							)
						}
					/>

					<Route path='/faq' element={<FAQPage />} />
					<Route path='/terms' element={<TermsOfServicePage />} />
					<Route path='/privacy' element={<PrivacyPolicyPage />} />
				</Routes>
			</div>

			{!authenticated && <Footer />}
		</Router>
	);
}

export default App;
