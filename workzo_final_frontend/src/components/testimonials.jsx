import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export function Testimonials() {
	const testimonials = [
		{
			name: "Alex Johnson",
			role: "Software Engineer",
			content: "Workzo helped me land my dream job at a top tech company. The resume builder and job matching features were game-changers for my search.",
			avatar: "AJ",
			image: "/placeholder-user.jpg",
		},
		{
			name: "Priya Sharma",
			role: "Full Stack Developer",
			content: "As a fresher, I was overwhelmed by the job market. Workzo's personalized guidance helped me secure a position at a leading IT company in just 3 weeks!",
			avatar: "PS",
			image: "/1.jpg",
		},
		{
			name: "Michael Chen",
			role: "Data Analyst",
			content: "The personalized job recommendations were spot on. I found opportunities I wouldn't have discovered otherwise. Highly recommend!",
			avatar: "MC",
			image: "/2.jpg",
		},
		{
			name: "Arjun Patel",
			role: "Product Manager",
			content: "The interview preparation resources were incredibly helpful. I felt confident during my interviews and successfully transitioned from a startup to a Fortune 500 company.",
			avatar: "AP",
			image: "/3.jpg",
		},
		{
			name: "Sneha Reddy",
			role: "UX Designer",
			content: "The resume templates are beautiful and professional. I received compliments on my resume from every interviewer. Thank you Workzo!",
			avatar: "SR",
			image: "/4.jpg",
		},
		{
			name: "David Kim",
			role: "DevOps Engineer",
			content: "The job tracking system helped me stay organized during my search. I accepted an offer that was 40% higher than my previous salary.",
			avatar: "DK",
			image: "/5.jpg",
		},
		{
			name: "Rahul Gupta",
			role: "Machine Learning Engineer",
			content: "Workzo's AI-powered job matching connected me with opportunities that perfectly matched my skills. I found my dream job in AI research within a month!",
			avatar: "RG",
			image: "/placeholder-user.jpg",
		},
	];

	return (
		<section className='w-full py-12 bg-white dark:bg-[#0d1117]'>
			<div className='container px-4 md:px-6'>
				<motion.div className='flex flex-col items-center justify-center space-y-4 text-center mb-10' initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
					<div className='space-y-2 max-w-[800px]'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400'>What our users say</h2>
						<p className='text-gray-600 md:text-xl/relaxed dark:text-gray-400'>Join thousands of job seekers who have found success with our platform.</p>
					</div>
				</motion.div>

				<Carousel className='w-full max-w-5xl mx-auto'>
					<CarouselContent>
						{testimonials.map((testimonial, i) => (
							<CarouselItem key={i} className='md:basis-1/2 lg:basis-1/3 pl-4'>
								<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
									<Card className='h-full min-h-[280px] border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-all'>
										<CardContent className='p-6 flex flex-col h-full'>
											<div className='flex items-center gap-1 mb-4'>
												{[...Array(5)].map((_, i) => (
													<Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
												))}
											</div>
											<p className='text-gray-600 mb-6 dark:text-gray-400 flex-grow'>{testimonial.content}</p>
											<div className='flex items-center gap-3 mt-auto'>
												<Avatar className='h-10 w-10 border-2 border-purple-200 dark:border-purple-900'>
													<AvatarImage src={testimonial.image} alt={testimonial.name} />
													<AvatarFallback className='bg-gradient-to-br from-purple-400 to-indigo-400 text-white'>{testimonial.avatar}</AvatarFallback>
												</Avatar>
												<div>
													<p className='font-medium text-gray-900 dark:text-white'>{testimonial.name}</p>
													<p className='text-sm text-gray-600 dark:text-gray-400'>{testimonial.role}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className='flex justify-center mt-8 gap-2'>
						<CarouselPrevious className='relative inset-auto translate-y-0' />
						<CarouselNext className='relative inset-auto translate-y-0' />
					</div>
				</Carousel>
			</div>
		</section>
	);
}
