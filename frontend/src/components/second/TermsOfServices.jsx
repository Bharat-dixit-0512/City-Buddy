const TermsOfServices = () => {
  return (
    <div className="min-h-screen bg-black text-yellow-200/90 px-6 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-gray-900/50 shadow-lg shadow-yellow-500/10 rounded-2xl p-8 border border-yellow-500/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400 [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
          Terms of Service
        </h1>
        <p className="text-sm text-yellow-200/60 mb-8 text-center">
          Effective Date: October 20, 2025
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              1. Acceptance of Terms
            </h2>
            <p>
              By using CityBuddy, you agree to comply with and be legally bound
              by these Terms. If you do not agree, you must stop using our
              Services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years old (or the age of majority in your
              jurisdiction) to use our Services. If you are under 18, you may
              use CityBuddy only with the involvement of a parent or guardian.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              3. Services Provided
            </h2>
            <p>
              CityBuddy helps users discover hotels, cafes, restaurants, and
              local attractions. We provide recommendations and maps, but we do
              not own or operate any of the listed businesses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              4. User Accounts
            </h2>
            <p>
              You may need to create an account to access certain features. You
              are responsible for providing accurate information and maintaining
              the confidentiality of your login credentials.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              5. User Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-1 text-yellow-200/80">
              <li>Do not provide false or misleading information.</li>
              <li>Do not post offensive, unlawful, or harmful content.</li>
              <li>Do not attempt to hack, damage, or disrupt the Services.</li>
              <li>Follow all applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
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
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              7. Third-Party Services
            </h2>
            <p>
              CityBuddy integrates with third-party APIs (like Google Maps). We
              are not responsible for the accuracy or reliability of
              third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              8. Limitation of Liability
            </h2>
            <p>
              CityBuddy is not responsible for booking issues, disputes, or
              losses caused by businesses listed on the platform. We are also
              not liable for indirect or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              9. Privacy
            </h2>
            <p>
              Your use of CityBuddy is also governed by our Privacy Policy,
              which explains how we handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              10. Termination
            </h2>
            <p>
              We may suspend or terminate your account if you violate these
              Terms or misuse our Services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              11. Modifications
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of
              CityBuddy after updates means you accept the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              12. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of [Insert Country/State].
              Any disputes shall be resolved in the courts of [Insert
              Jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-yellow-400">
              13. Contact Us
            </h2>
            <p>
              For questions or concerns, contact us at our Team:
              <br />{" "}
              <a
                className="text-yellow-300 hover:text-yellow-200 hover:underline"
                href="mailto:komal.patel_cs23@gla.ac.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 komal.patel_cs23@gla.ac.in
              </a>{" "}
              <span>(Team Leader)</span>
              <br />{" "}
              <a
                className="text-yellow-300 hover:text-yellow-200 hover:underline"
                href="mailto:avni.yadav_cs23@gla.ac.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 avni.yadav_cs23@gla.ac.in
              </a>
              <br />{" "}
              <a
                className="text-yellow-300 hover:text-yellow-200 hover:underline"
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