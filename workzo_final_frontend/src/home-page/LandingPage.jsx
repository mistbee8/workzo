import React from "react";
import { Features } from "../components/features";
import { Hero } from "../components/hero";
import { Footer } from "../components/footer";
import { Testimonials } from "../components/testimonials";
import { CallToAction } from "../components/call-to-action";
import { DemoSection } from "../components/demo-section";
import { CompanyLogos } from "../components/company-logos";

const LandingPage = () => {
	return (
		<div className='min-h-screen bg-white dark:bg-[#0d1117] w-full'>
			<div className='absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-purple-50 to-white dark:from-[#161b22]/30 dark:to-[#0d1117] -z-10'></div>
			<main className='w-full relative z-10'>
				<Hero />
				<CompanyLogos />
				<Features />
				<DemoSection />
				<Testimonials />
				<CallToAction />
			</main>
		</div>
	);
};

export default LandingPage;
