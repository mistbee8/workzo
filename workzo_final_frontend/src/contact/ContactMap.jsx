import React from "react";

const ContactMap = () => {
	return (
		<div className='mt-8 lg:mt-36'>
			<div className='w-full h-64 md:h-96 lg:h-[550px] rounded-lg overflow-hidden shadow-lg'>
				<iframe
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234700.90003037432!2d77.24107826768915!3d23.199323870937356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1738943600619!5m2!1sen!2sin'
					width='100%'
					height='100%'
					style={{ border: "0" }}
					allowFullScreen=''
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'></iframe>
			</div>
		</div>
	);
};

export default ContactMap;
