import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

export function CallToAction() {
	return (
		<section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden'>
			<div className='absolute inset-0'>
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#7c3aed)] opacity-90'></div>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.8),rgba(124,58,237,0)_70%)]'></div>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.8),rgba(79,70,229,0)_70%)]'></div>
			</div>

			<div className='container px-4 md:px-6 relative z-10'>
				<motion.div className='flex flex-col items-center justify-center space-y-4 text-center' initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
					<div className='space-y-2'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white'>Ready to transform your job search?</h2>
						<p className='max-w-[600px] text-purple-100 md:text-xl/relaxed'>Join thousands of professionals who have already streamlined their career journey with Workzo.</p>
					</div>
					<div className='w-full max-w-sm space-y-2'>
						<form className='flex w-full max-w-sm items-center space-x-2'>
							<Input type='email' placeholder='Enter your email' className='bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white' />
							<Button type='submit' variant='secondary' className='bg-white text-purple-700 hover:bg-purple-100'>
								Get Started
							</Button>
						</form>
						<p className='text-xs text-purple-100'>No credit card required. Start your free account today.</p>
					</div>
					<div className='flex flex-wrap justify-center gap-4 mt-8'>
						<div className='flex items-center space-x-2'>
							<div className='h-4 w-4 rounded-full bg-white'></div>
							<p className='text-sm font-medium text-white'>Free forever plan</p>
						</div>
						<div className='flex items-center space-x-2'>
							<div className='h-4 w-4 rounded-full bg-white'></div>
							<p className='text-sm font-medium text-white'>Cancel anytime</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
