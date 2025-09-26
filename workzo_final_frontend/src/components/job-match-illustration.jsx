import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, MapPin, Clock, DollarSign, Building2, Users, Star } from "lucide-react";

export function JobMatchIllustration() {
	return (
		<div className='p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-[500px] flex flex-col'>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-3'>
					<div className='h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center'>
						<span className='text-white font-bold text-sm'>JM</span>
					</div>
					<div>
						<h2 className='text-lg font-semibold text-gray-900 dark:text-white'>Job Match</h2>
						<p className='text-sm text-gray-500 dark:text-gray-400'>Find your perfect job</p>
					</div>
				</div>
				<Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>127 matches found</Badge>
			</div>

			{/* Search/Filter Bar */}
			<div className='flex flex-col sm:flex-row gap-2 mb-6'>
				<div className='flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm'>
					<span className='text-gray-600 dark:text-gray-300'>Search jobs...</span>
				</div>
				<div className='flex gap-2'>
					<Badge variant='outline' className='text-xs px-2 py-1'>
						Remote
					</Badge>
					<Badge variant='outline' className='text-xs px-2 py-1'>
						Full-time
					</Badge>
					<Badge variant='outline' className='text-xs px-2 py-1'>
						$80k+
					</Badge>
				</div>
			</div>

			{/* Job Cards */}
			<div className='space-y-4 flex-1'>
				{/* Job Card 1 - High Match */}
				<div className='bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow'>
					<div className='flex items-start justify-between mb-3'>
						<div className='flex items-center gap-3'>
							<div className='h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center'>
								<Building2 className='h-6 w-6 text-blue-600 dark:text-blue-400' />
							</div>
							<div>
								<h3 className='font-semibold text-gray-900 dark:text-white'>Senior Frontend Developer</h3>
								<p className='text-sm text-gray-600 dark:text-gray-400'>TechCorp Inc.</p>
							</div>
						</div>
						<div className='flex flex-col items-end gap-2'>
							<Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs'>95% Match</Badge>
							<Heart className='h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer' />
						</div>
					</div>

					<div className='flex flex-wrap gap-2 mb-3'>
						<Badge variant='secondary' className='text-xs'>
							React
						</Badge>
						<Badge variant='secondary' className='text-xs'>
							TypeScript
						</Badge>
						<Badge variant='secondary' className='text-xs'>
							Node.js
						</Badge>
					</div>

					<div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3'>
						<div className='flex items-center gap-1'>
							<MapPin className='h-4 w-4' />
							<span>Remote</span>
						</div>
						<div className='flex items-center gap-1'>
							<DollarSign className='h-4 w-4' />
							<span>$85k - $120k</span>
						</div>
						<div className='flex items-center gap-1'>
							<Clock className='h-4 w-4' />
							<span>2d ago</span>
						</div>
					</div>

					<p className='text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2'>
						Join our dynamic team to build cutting-edge web applications using modern React and TypeScript. Experience with Node.js backend integration required.
					</p>

					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-1'>
							<Star className='h-4 w-4 text-yellow-500 fill-current' />
							<span className='text-sm text-gray-600 dark:text-gray-400'>4.8 company rating</span>
						</div>
						<Button size='sm' className='bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1'>
							Apply Now
						</Button>
					</div>
				</div>

				{/* Job Card 2 - Medium Match */}
				<div className='bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm'>
					<div className='flex items-start justify-between mb-3'>
						<div className='flex items-center gap-3'>
							<div className='h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center'>
								<Users className='h-6 w-6 text-green-600 dark:text-green-400' />
							</div>
							<div>
								<h3 className='font-semibold text-gray-900 dark:text-white'>Full Stack Developer</h3>
								<p className='text-sm text-gray-600 dark:text-gray-400'>StartupHub</p>
							</div>
						</div>
						<div className='flex flex-col items-end gap-2'>
							<Badge className='bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs'>78% Match</Badge>
							<Heart className='h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer' />
						</div>
					</div>

					<div className='flex flex-wrap gap-2 mb-3'>
						<Badge variant='secondary' className='text-xs'>
							JavaScript
						</Badge>
						<Badge variant='secondary' className='text-xs'>
							Python
						</Badge>
						<Badge variant='secondary' className='text-xs'>
							MongoDB
						</Badge>
					</div>

					<div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3'>
						<div className='flex items-center gap-1'>
							<MapPin className='h-4 w-4' />
							<span>San Francisco, CA</span>
						</div>
						<div className='flex items-center gap-1'>
							<DollarSign className='h-4 w-4' />
							<span>$70k - $95k</span>
						</div>
						<div className='flex items-center gap-1'>
							<Clock className='h-4 w-4' />
							<span>1w ago</span>
						</div>
					</div>

					<p className='text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2'>Exciting opportunity to work on innovative projects in a fast-paced startup environment. Full stack development with modern technologies.</p>

					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-1'>
							<Star className='h-4 w-4 text-yellow-500 fill-current' />
							<span className='text-sm text-gray-600 dark:text-gray-400'>4.5 company rating</span>
						</div>
						<Button size='sm' variant='outline' className='text-xs px-3 py-1 border-purple-200 text-purple-700 hover:bg-purple-50'>
							View Details
						</Button>
					</div>
				</div>

				{/* Job Card 3 - Partial View */}
				<div className='bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm opacity-60'>
					<div className='flex items-start justify-between mb-3'>
						<div className='flex items-center gap-3'>
							<div className='h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center'>
								<Building2 className='h-6 w-6 text-purple-600 dark:text-purple-400' />
							</div>
							<div>
								<h3 className='font-semibold text-gray-900 dark:text-white'>React Developer</h3>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Digital Solutions Ltd.</p>
							</div>
						</div>
						<Badge className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs'>68% Match</Badge>
					</div>

					<div className='flex flex-wrap gap-2 mb-3'>
						<Badge variant='secondary' className='text-xs'>
							React
						</Badge>
						<Badge variant='secondary' className='text-xs'>
							CSS
						</Badge>
						<Badge variant='secondary' className='text-xs'>
							Git
						</Badge>
					</div>

					<div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
						<div className='flex items-center gap-1'>
							<MapPin className='h-4 w-4' />
							<span>New York, NY</span>
						</div>
						<div className='flex items-center gap-1'>
							<DollarSign className='h-4 w-4' />
							<span>$65k - $85k</span>
						</div>
						<div className='flex items-center gap-1'>
							<Clock className='h-4 w-4' />
							<span>3d ago</span>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Action */}
			<div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
				<div className='flex items-center justify-between'>
					<p className='text-sm text-gray-600 dark:text-gray-400'>Showing 3 of 127 matches</p>
					<Button variant='outline' size='sm' className='text-xs px-3 py-1'>
						View All Matches
					</Button>
				</div>
			</div>
		</div>
	);
}
