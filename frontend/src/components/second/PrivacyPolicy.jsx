import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const effectiveDate = "October 20, 2025";

  return (
    <div className="min-h-screen bg-black text-yellow-200/90 px-6 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-gray-900/50 shadow-lg shadow-yellow-500/10 rounded-2xl p-8 border border-yellow-500/30">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-yellow-400 [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
          Privacy Policy
        </h1>
        <p className="text-center text-yellow-200/60 mb-8">
          <strong>Effective Date:</strong> {effectiveDate}
        </p>

        <div className="space-y-6 text-sm md:text-base">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, email
              address, and phone number, as well as non-personal information
              like browser type, device details, and usage statistics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to provide and improve our services,
              respond to inquiries, share updates, and maintain security on the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              3. Sharing of Information
            </h2>
            <p>
              We do not sell or trade your personal data. Information may be
              shared only with trusted service providers or if legally required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              4. Data Security
            </h2>
            <p>
              We implement standard security practices to protect your
              information, but no online transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              5. Your Rights
            </h2>
            <p>
              You can access, correct, or request deletion of your data. You may
              also opt out of non-essential communications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              6. Third-Party Links
            </h2>
            <p>
              Our website may contain links to external sites. We are not
              responsible for their privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be reflected on this page with an updated date.
            </p>
          </section>
        </div>

        {/* Contact Us Button */}
        <div className="text-center mt-10">
          <Link
            to="/ContactUs"
            className="inline-block cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:shadow-[0_0_20px_rgba(250,204,21,0.7)] transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;