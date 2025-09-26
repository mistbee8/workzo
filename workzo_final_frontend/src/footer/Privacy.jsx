import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 mt-20 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">
        Privacy Policy
      </h1>
      <div className="space-y-8 text-gray-800">
        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            1. Introduction
          </h2>
          <p className="leading-relaxed text-lg">
            At JobFinder, we take your privacy seriously. This Privacy Policy
            describes how we collect, use, and protect your personal information
            when you visit our website or use our services. By using JobFinder,
            you agree to the practices outlined in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            2. Information We Collect
          </h2>
          <p className="leading-relaxed text-lg">
            We collect personal information that you provide to us directly, as
            well as data automatically collected when you use our platform. The
            information we may collect includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>
              Personal details such as your name, email address, and contact
              information.
            </li>
            <li>
              Account information including your job preferences, resume, and
              employment history.
            </li>
            <li>
              Usage data including how you interact with the platform (e.g., job
              searches, applications).
            </li>
            <li>
              Device information and browsing activity (e.g., IP address,
              browser type, and operating system).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="leading-relaxed text-lg">We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Provide you with job recommendations and job alerts.</li>
            <li>Allow you to apply for jobs and create/edit your resume.</li>
            <li>
              Improve our platform by analyzing user behavior and usage
              patterns.
            </li>
            <li>
              Communicate with you about your job applications, account
              activity, and platform updates.
            </li>
            <li>
              Ensure the security of our platform and prevent fraudulent
              activities.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            4. Sharing Your Information
          </h2>
          <p className="leading-relaxed text-lg">
            JobFinder does not sell your personal information to third parties.
            However, we may share your information in the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>
              With employers who post job listings on JobFinder, to allow them
              to contact you regarding your application.
            </li>
            <li>
              With third-party service providers who help us operate and
              maintain our platform (e.g., hosting services, payment
              processors).
            </li>
            <li>
              In compliance with legal requirements, such as a court order or to
              protect our rights and interests.
            </li>
            <li>
              With your consent, for example, when you choose to share your
              profile with specific employers or partners.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            5. Data Retention
          </h2>
          <p className="leading-relaxed text-lg">
            We will retain your personal information for as long as your account
            is active or as needed to provide you with services. If you wish to
            delete your account or stop receiving communications from us, you
            can contact us at any time. We will retain and use your information
            as necessary to comply with our legal obligations, resolve disputes,
            and enforce our agreements.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            6. Security of Your Information
          </h2>
          <p className="leading-relaxed text-lg">
            We take reasonable precautions to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
            While we strive to use commercially acceptable means to protect your
            personal data, no method of electronic storage or transmission is
            100% secure, and we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            7. Your Rights
          </h2>
          <p className="leading-relaxed text-lg">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>The right to access the personal data we hold about you.</li>
            <li>
              The right to correct any inaccurate or incomplete personal data.
            </li>
            <li>
              The right to delete your personal data (subject to certain
              exceptions).
            </li>
            <li>
              The right to object to or restrict our use of your personal data.
            </li>
            <li>
              The right to withdraw consent for any data processing based on
              consent.
            </li>
          </ul>
          <p className="leading-relaxed text-lg">
            To exercise these rights, please contact us using the details
            provided at the end of this policy.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            8. Cookies
          </h2>
          <p className="leading-relaxed text-lg">
            We use cookies and similar technologies to improve the functionality
            of our platform, enhance your experience, and analyze how our
            website is used. Cookies are small data files stored on your device.
            You can control the use of cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            9. Changes to this Privacy Policy
          </h2>
          <p className="leading-relaxed text-lg">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. When we make
            changes, we will post the updated policy on this page and revise the
            "Last Updated" date at the bottom. Please review this policy
            periodically for any updates.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">
            10. Contact Us
          </h2>
          <p className="leading-relaxed text-lg">
            If you have any questions or concerns about this Privacy Policy or
            the way we handle your personal information, please contact us at:
          </p>
          <p className="font-semibold text-lg">
            Email: [your-email@example.com]
          </p>
          <p className="font-semibold text-lg">Phone: [your-phone-number]</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
