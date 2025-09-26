import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CgProfile } from "react-icons/cg";
import ShiningButton from "../utils/Shining";

export function Navbar({ authenticated, onLogout, toggleSidebar }) {
	const [scrolled, setScrolled] = useState(false);
	const [theme, setTheme] = useState("light");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();

	// Close mobile menu and scroll to top when route changes
	useEffect(() => {
		setIsMobileMenuOpen(false);
		window.scrollTo(0, 0);
	}, [location.pathname]);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		// Check if we're in the browser
		if (typeof window !== "undefined") {
			// Get initial theme from localStorage or default to light
			const savedTheme = localStorage.getItem("theme") || "light";
			setTheme(savedTheme);
			document.documentElement.classList.toggle("dark", savedTheme === "dark");

			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		onLogout();
		setIsMobileMenuOpen(false);
		window.location.href = "/";
	};

	const handleBrandClick = () => {
		setIsMobileMenuOpen(false);
		if (authenticated) {
			window.location.href = "/dashboard";
		} else {
			window.location.href = "/";
		}
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 100, damping: 20 }}
			className={cn("navbar-fixed transition-all duration-300", scrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-[#0d1117]/80" : "bg-transparent")}>
			<div className='container mx-auto flex h-16 items-center justify-between px-4'>
				<div className='flex items-center gap-6'>
					{/* Left Side: Hamburger Icon for authenticated users
					{authenticated && (
						<div className='md:hidden'>
							<button onClick={toggleSidebar} className='rounded bg-gray-800 text-white p-2'>
								<Menu className='w-6 h-6' />
							</button>
						</div>
					)} */}

					<Link to='/' className='flex items-center gap-2' onClick={handleBrandClick}>
						<div className='relative h-8 w-8'>
							<div className='absolute h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500'></div>
							<span className='relative flex h-8 w-8 items-center justify-center font-bold text-white'>W</span>
						</div>
						<span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400'>Workzo</span>
					</Link>

					<nav className='hidden md:flex items-center gap-6'>
						<Link to='/job-match' className='text-[16px] font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400'>
							Job Match
						</Link>
						<Link to='/resume-builder' className='text-[16px] font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400'>
							Resume Builder
						</Link>
						{authenticated && (
							<Link to='/wishlist' className='text-[16px] font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400'>
								Wishlist
							</Link>
						)}

						<Link to='/contact' className='text-[16px] font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400'>
							Contact
						</Link>
						<Link to='/faq' className='text-[16px] font-medium text-gray-700 hover:text-purple-600 transition-colors dark:text-gray-300 dark:hover:text-purple-400'>
							FAQ
						</Link>
					</nav>
				</div>

				<div className='hidden md:flex items-center gap-4'>
					{authenticated ? (
						<Button onClick={handleLogout} variant='destructive' className='text-[16px]'>
							Logout
						</Button>
					) : (
						<>
							<Link to={"/sign-in"}>
								<Button variant='ghost' className='text-[16px] text-gray-700 hover:text-purple-600 hover:bg-purple-100/50 dark:text-gray-300 dark:hover:bg-purple-900/20'>
									Log In
								</Button>
							</Link>
							<Link to={"/sign-up"}>
								<Button className='text-[16px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0'>Sign Up</Button>
							</Link>
						</>
					)}
				</div>

				<div className='flex items-center md:hidden gap-2'>
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button variant='outline' size='icon' className='md:hidden'>
								<Menu className='w-5 h-5' />
								<span className='sr-only'>Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='w-[280px] sm:w-[320px]'>
							<SheetHeader className='border-b pb-4'>
								<SheetTitle className='text-left'>Navigation Menu</SheetTitle>
							</SheetHeader>
							<nav className='flex flex-col gap-4 mt-6'>
								<Link to='/job-match' className='text-base font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-2' onClick={closeMobileMenu}>
									Job Match
								</Link>
								<Link to='/resume-builder' className='text-base font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-2' onClick={closeMobileMenu}>
									Resume Builder
								</Link>
								{authenticated && (
									<Link to='/wishlist' className='text-base font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-2' onClick={closeMobileMenu}>
										Wishlist
									</Link>
								)}

								<Link to='/contact' className='text-base font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-2' onClick={closeMobileMenu}>
									Contact
								</Link>
								<Link to='/faq' className='text-base font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-2' onClick={closeMobileMenu}>
									FAQ
								</Link>
								<div className='flex flex-col gap-3 mt-6 pt-4 border-t'>
									{authenticated ? (
										<Button onClick={handleLogout} variant='destructive' className='justify-start'>
											Logout
										</Button>
									) : (
										<>
											<Link to={"/sign-in"} className='w-full' onClick={closeMobileMenu}>
												<Button variant='ghost' className='w-full justify-start'>
													Log In
												</Button>
											</Link>
											<Link to={"/sign-up"} className='w-full' onClick={closeMobileMenu}>
												<Button className='w-full bg-gradient-to-r from-purple-600 to-indigo-600'>Sign Up</Button>
											</Link>
										</>
									)}
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</motion.header>
	);
}
