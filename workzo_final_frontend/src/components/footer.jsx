import { Link } from "react-router-dom";

export function Footer() {
	return (
		<footer className='w-full border-t py-6 md:py-8 bg-white dark:bg-[#0d1117] dark:border-gray-800'>
			<div className='container flex flex-col gap-6 md:gap-8'>
				<div className='flex flex-col md:flex-row justify-between gap-4'>
					<div className='flex flex-col gap-2'>
						<Link to='/' className='flex items-center gap-2'>
							<div className='relative h-8 w-8'>
								<div className='absolute h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500'></div>
								<span className='relative flex h-8 w-8 items-center justify-center font-bold text-white'>W</span>
							</div>
							<span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400'>Workzo</span>
						</Link>
						<p className='text-sm text-gray-500 max-w-[300px] dark:text-gray-400'>Simplifying the job search process for professionals worldwide.</p>
					</div>
					<div className='grid grid-cols-2 gap-8'>
						<div className='flex flex-col gap-2'>
							<p className='font-medium text-gray-900 dark:text-white'>Product</p>
							<nav className='flex flex-col gap-2'>
								<Link to='/job-match' className='text-sm text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
									Job Search
								</Link>
								<Link to='/resume-builder' className='text-sm text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
									Resume Builder
								</Link>
								<Link to='/faq' className='text-sm text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
									Career Resources
								</Link>
							</nav>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='font-medium text-gray-900 dark:text-white'>Company</p>
							<nav className='flex flex-col gap-2'>
								<Link to='/contact' className='text-sm text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
									About Us
								</Link>
								<Link to='/contact' className='text-sm text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
									Contact
								</Link>
							</nav>
						</div>
					</div>
				</div>
				<div className='flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-6 dark:border-gray-800'>
					<p className='text-xs text-gray-500 dark:text-gray-400'>© {new Date().getFullYear()} Workzo. All rights reserved.</p>
					<div className='flex items-center gap-4'>
						<a href='#' className='text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-5 w-5'>
								<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
							</svg>
							<span className='sr-only'>Facebook</span>
						</a>
						<a href='#' className='text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-5 w-5'>
								<path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
							</svg>
							<span className='sr-only'>Twitter</span>
						</a>
						<a href='#' className='text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-5 w-5'>
								<rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
								<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
								<line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
							</svg>
							<span className='sr-only'>Instagram</span>
						</a>
						<a href='#' className='text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400'>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-5 w-5'>
								<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
								<rect width='4' height='12' x='2' y='9' />
								<circle cx='4' cy='4' r='2' />
							</svg>
							<span className='sr-only'>LinkedIn</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
