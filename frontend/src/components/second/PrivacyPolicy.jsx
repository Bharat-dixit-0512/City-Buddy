import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const effectiveDate = "October 20, 2025";

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#495057] px-6 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 border border-[#E9ECEF]">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#212529]">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-500 mb-8">
          <strong>Effective Date:</strong> {effectiveDate}
        </p>

        <div className="space-y-6 text-sm md:text-base">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#023047]">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, email
              address, and phone number, as well as non-personal information
              like browser type, device details, and usage statistics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#023047]">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to provide and improve our services,
              respond to inquiries, share updates, and maintain security on the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#023047]">
              3. Sharing of Information
            </h2>
            <p>
              We do not sell or trade your personal data. Information may be
              shared only with trusted service providers or if legally required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#023047]">
              4. Data Security
            </h2>
            <p>
              We implement standard security practices to protect your
              information, but no online transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#023047]">
              5. Your Rights
            </h2>
            <p>
              You can access, correct, or request deletion of your data. You may
              also opt out of non-essential communications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#023047]">
              6. Third-Party Links
            </h2>
            <p>
              Our website may contain links to external sites. We are not
              responsible for their privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-[#023047]">
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
            className="inline-block cursor-pointer bg-[#FF7B54] hover:bg-[#E85D04] text-white font-semibold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(255,123,84,0.5)] hover:shadow-[0_0_20px_rgba(232,93,4,0.7)] transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;