import React from "react";
import { Link } from "react-router-dom";

const TermsOfServices = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#495057] px-6 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 border border-[#E9ECEF]">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#212529]">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Effective Date: October 20, 2025
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              1. Acceptance of Terms
            </h2>
            <p>
              By using CityBuddy, you agree to comply with and be legally bound
              by these Terms. If you do not agree, you must stop using our
              Services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years old (or the age of majority in your
              jurisdiction) to use our Services. If you are under 18, you may
              use CityBuddy only with the involvement of a parent or guardian.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              3. Services Provided
            </h2>
            <p>
              CityBuddy helps users discover hotels, cafes, restaurants, and
              local attractions. We provide recommendations and maps, but we do
              not own or operate any of the listed businesses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              4. User Accounts
            </h2>
            <p>
              You may need to create an account to access certain features. You
              are responsible for providing accurate information and maintaining
              the confidentiality of your login credentials.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              5. User Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-1 text-[#495057]">
              <li>Do not provide false or misleading information.</li>
              <li>Do not post offensive, unlawful, or harmful content.</li>
              <li>Do not attempt to hack, damage, or disrupt the Services.</li>
              <li>Follow all applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              6. Reviews & Content
            </h2>
            <p>
              Users may post reviews and ratings. By posting content, you grant
              CityBuddy a non-exclusive, royalty-free license to use and
              distribute that content. We may remove content that violates
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              7. Third-Party Services
            </h2>
            <p>
              CityBuddy integrates with third-party APIs (like Google Maps). We
              are not responsible for the accuracy or reliability of
              third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              8. Limitation of Liability
            </h2>
            <p>
              CityBuddy is not responsible for booking issues, disputes, or
              losses caused by businesses listed on the platform. We are also
              not liable for indirect or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              9. Privacy
            </h2>
            <p>
              Your use of CityBuddy is also governed by our{" "}
              <Link
                to="/PrivacyPolicy"
                className="text-[#0077B6] hover:underline hover:text-[#023E8A]"
              >
                Privacy Policy
              </Link>
              , which explains how we handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              10. Termination
            </h2>
            <p>
              We may suspend or terminate your account if you violate these
              Terms or misuse our Services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              11. Modifications
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of
              CityBuddy after updates means you accept the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              12. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be
              resolved in the courts of Mathura, Uttar Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-[#023047]">
              13. Contact Us
            </h2>
            <p>
              For questions or concerns, contact our Team:
              <br />{" "}
              <a
                className="text-[#0077B6] hover:underline hover:text-[#023E8A]"
                href="mailto:komal.patel_cs23@gla.ac.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 komal.patel_cs23@gla.ac.in
              </a>{" "}
              <span>(Team Leader)</span>
              <br />{" "}
              <a
                className="text-[#0077B6] hover:underline hover:text-[#023E8A]"
                href="mailto:avni.yadav_cs23@gla.ac.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 avni.yadav_cs23@gla.ac.in
              </a>
              <br />{" "}
              <a
                className="text-[#0077B6] hover:underline hover:text-[#023E8A]"
                href="mailto:bharat.dixit1_cs23@gla.ac.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 bharat.dixit1_cs23@gla.ac.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServices;