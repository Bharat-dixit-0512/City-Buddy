import React from "react";

import useScrollToTop from "../motion.jsx/useScrollToTop";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {

  const effectiveDate = new Date().toLocaleDateString();
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-center text-slate-600 mb-8">
          <strong>Effective Date:</strong> {effectiveDate}
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address,
              and phone number, as well as non-personal information like browser type,
              device details, and usage statistics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>
              Your information is used to provide and improve our services, respond
              to inquiries, share updates, and maintain security on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Sharing of Information</h2>
            <p>
              We do not sell or trade your personal data. Information may be shared
              only with trusted service providers or if legally required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We implement standard security practices to protect your information,
              but no online transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
            <p>
              You can access, correct, or request deletion of your data. You may
              also opt out of non-essential communications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites. We are not
              responsible for their privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be
              reflected on this page with an updated date.
            </p>
          </section>
        </div>

        {/* Contact Us Button */}
        <div className="text-center mt-10">
          {isVisible && (<Link to='/ContactUs'
            onClick={scrollToTop}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Contact Us
          </Link>)}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
