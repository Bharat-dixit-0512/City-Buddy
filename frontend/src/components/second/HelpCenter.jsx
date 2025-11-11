import React from "react";
import { NavLink } from "react-router-dom";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#495057] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#212529]">
          Help Center
        </h1>
        <p className="text-center text-[#495057] mb-10 max-w-2xl mx-auto">
          Welcome to the CityBuddy Help Center. We’re here to assist you with
          any questions, technical issues, or feedback you may have.
        </p>

        {/* Sections */}
        <div className="space-y-8 mb-12">
          {/* General Support Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E9ECEF]">
            <h2 className="text-2xl font-semibold mb-2 text-[#023047]">
              General Support
            </h2>
            <p className="text-[#495057]">
              If you have general queries about our platform, features, or
              usage, please feel free to explore our FAQs or reach out to us.
            </p>
          </div>

          {/* Technical Assistance Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E9ECEF]">
            <h2 className="text-2xl font-semibold mb-2 text-[#023047]">
              Technical Assistance
            </h2>
            <p className="text-[#495057]">
              Facing a technical problem? Our team is ready to help troubleshoot
              login issues, bugs, or any errors you encounter.
            </p>
          </div>

          {/* Feedback & Suggestions Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E9ECEF]">
            <h2 className="text-2xl font-semibold mb-2 text-[#023047]">
              Feedback & Suggestions
            </h2>
            <p className="text-[#495057]">
              We value your feedback! Share your ideas and suggestions to help
              us improve the platform.
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E9ECEF] mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-[#023047]">
            📍 Our Address
          </h2>
          <p className="text-[#495057] leading-relaxed">
            GLA University, <br />
            17km Stone, NH-19, Mathura-Delhi Road, <br />
            P.O. Chaumuhan, Mathura - 281406, Uttar Pradesh, India
          </p>
        </div>

        {/* Contact Us Button */}
        <div className="text-center">
          <NavLink
            to="/ContactUs"
            className="inline-block cursor-pointer bg-[#FF7B54] hover:bg-[#E85D04] text-white font-semibold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(255,123,84,0.5)] hover:shadow-[0_0_20px_rgba(232,93,4,0.7)] transition-all duration-300"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;