import React from "react";
import { NavLink } from "react-router-dom";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-black text-yellow-200/90 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-yellow-400 [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
          Help Center
        </h1>
        <p className="text-center text-yellow-200/80 mb-10 max-w-2xl mx-auto">
          Welcome to the CityBuddy Help Center. We’re here to assist you with
          any questions, technical issues, or feedback you may have.
        </p>

        {/* Sections */}
        <div className="space-y-8 mb-12">
          {/* General Support Card */}
          <div className="bg-gray-900/50 p-6 rounded-2xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30">
            <h2 className="text-2xl font-semibold mb-2 text-yellow-400">
              General Support
            </h2>
            <p className="text-yellow-200/80">
              If you have general queries about our platform, features, or
              usage, please feel free to explore our FAQs or reach out to us.
            </p>
          </div>

          {/* Technical Assistance Card */}
          <div className="bg-gray-900/50 p-6 rounded-2xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30">
            <h2 className="text-2xl font-semibold mb-2 text-yellow-400">
              Technical Assistance
            </h2>
            <p className="text-yellow-200/80">
              Facing a technical problem? Our team is ready to help troubleshoot
              login issues, bugs, or any errors you encounter.
            </p>
          </div>

          {/* Feedback & Suggestions Card */}
          <div className="bg-gray-900/50 p-6 rounded-2xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30">
            <h2 className="text-2xl font-semibold mb-2 text-yellow-400">
              Feedback & Suggestions
            </h2>
            <p className="text-yellow-200/80">
              We value your feedback! Share your ideas and suggestions to help
              us improve the platform.
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-gray-900/50 p-6 rounded-2xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30 mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-400">
            📍 Our Address
          </h2>
          <p className="text-yellow-200/80 leading-relaxed">
            GLA University, <br />
            17km Stone, NH-19, Mathura-Delhi Road, <br />
            P.O. Chaumuhan, Mathura - 281406, Uttar Pradesh, India
          </p>
        </div>

        {/* Contact Us Button */}
        <div className="text-center">
          <NavLink
            to="/ContactUs"
            className="inline-block cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:shadow-[0_0_20px_rgba(250,204,21,0.7)] transition-all duration-300"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;