import useScrollToTop from "../motion/useScrollToTop";
import { NavLink } from "react-router-dom";

const HelpCenter = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-6">Help Center</h1>
        <p className="text-center text-slate-600 mb-10">
          Welcome to the Help Center of our platform. We’re here to assist you
          with any questions, technical issues, or feedback you may have.
        </p>

        {/* Sections */}
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 drop-shadow-[0_0_8px_rgba(135,206,235,0.8)]">
            <h2 className="text-2xl font-semibold mb-2">General Support</h2>
            <p className="text-slate-700">
              If you have general queries about our platform, features, or
              usage, please feel free to explore our FAQs or reach out to us.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 drop-shadow-[0_0_8px_rgba(135,206,235,0.8)]">
            <h2 className="text-2xl font-semibold mb-2">Technical Assistance</h2>
            <p className="text-slate-700">
              Facing a technical problem? Our team is ready to help troubleshoot
              login issues, bugs, or any errors you encounter.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 drop-shadow-[0_0_8px_rgba(135,206,235,0.8)]">
            <h2 className="text-2xl font-semibold mb-2">Feedback & Suggestions</h2>
            <p className="text-slate-700">
              We value your feedback! Share your ideas and suggestions to help us
              improve the platform.
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-12 text-center drop-shadow-[0_0_8px_rgba(135,206,235,0.8)]">
          <h2 className="text-2xl font-semibold mb-2">📍 Our Address</h2>
          <p className="text-slate-700">
            GLA University, <br />
            17km Stone, NH-19, Mathura-Delhi Road, <br />
            P.O. Chaumuhan, Mathura - 281406, Uttar Pradesh, India
          </p>
        </div>

        {/* Contact Us Button */}
        <div className="text-center">
          {isVisible && (
            <NavLink
              onClick={scrollToTop}
              to="/ContactUs"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition drop-shadow-[0_0_4px_rgba(85,71,237,0.8)]"
            >
              Contact Us
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
