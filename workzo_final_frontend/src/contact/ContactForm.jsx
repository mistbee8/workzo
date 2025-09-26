import React from "react";

const ContactForm = () => {
	return (
		<>
			<div className='mt-8 lg:mt-32'>
				<div className='w-full h-96 md:h-[600px] lg:h-[950px] rounded-lg overflow-hidden shadow-lg'>
					<iframe
						src='https://docs.google.com/forms/d/e/1FAIpQLSc47NUemwb49LQiCcyZ2dOlM5r4Mki5VTGLQEXT2k0UEmCUcQ/viewform?embedded=true'
						width='100%'
						height='100%'
						frameBorder='0'
						marginHeight='0'
						marginWidth='0'
						className='rounded-lg'>
						Loading…
					</iframe>
				</div>
			</div>
			{/* <form
        className="contact-form-1 rainbow-dynamic-form"
        id="contact-form"
        method="POST"
        action="mail.php"
      >
        <div className="form-group">
          <input
            type="text"
            name="contact-name"
            id="contact-name"
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="contact-phone"
            id="contact-phone"
            placeholder="Phone Number"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="contact-email"
            name="contact-email"
            placeholder="Your Email"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Your Subject"
          />
        </div>

        <div className="form-group">
          <textarea
            name="contact-message"
            id="contact-message"
            placeholder="Your Message"
          ></textarea>
        </div>

        <div className="form-group">
          <button
            name="submit"
            type="submit"
            id="submit"
            className="btn-default btn-large rainbow-btn"
          >
            <span>Submit Now</span>
          </button>
          
        </div>
      </form> */}
		</>
	);
};

export default ContactForm;
