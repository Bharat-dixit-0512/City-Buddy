import React from "react";

const ContactUs = () => {
  const teamMembers = [
    {
      name: "Komal Patel",
      role: "Team Leader/Backend",
      email: "komal.patel_cs23@gla.ac.in",
      phone: "+91 94542 58641",
    },
    {
      name: "Bharat Dixit",
      role: "Frontend Developer",
      email: "bharat.dixit1_cs23@gla.ac.in",
      phone: "+91 94126 59692",
    },
    {
      name: "Avni Yadav",
      role: "UI/UX Designer",
      email: "avni.yadav_cs23@gla.ac.in",
      phone: "+91 63925 24133",
    },
    {
      name: "Love Pandey",
      role: "Backend Dev Helper",
      email: "love.pandey_cs23@gla.ac.in",
      phone: "+91 93896 79496",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#495057] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#212529]">
          Contact Us
        </h1>
        <p className="text-center text-[#495057] mb-12 max-w-2xl mx-auto">
          We’d love to hear from you! Connect with any of our team members
          below, or fill out the form to send us a message directly.
        </p>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-[#E9ECEF] text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-[#023047]">
                {member.name}
              </h2>
              <p className="text-[#0077B6] font-medium mb-3">{member.role}</p>
              <p className="text-sm">
                <a
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495057] hover:underline hover:text-[#00B4D8] break-all"
                >
                  📧 {member.email}
                </a>
              </p>
              <p className="text-sm mt-2">
                <a
                  href={`tel:${member.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495057] hover:underline hover:text-[#00B4D8]"
                >
                  📞 {member.phone}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#E9ECEF] max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#212529]">
            Send Us a Message
          </h2>
          <form
            className="space-y-4"
            action="https://formspree.io/f/xldlkvol"
            method="POST"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-[#212529]">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full bg-white text-[#212529] border border-[#E9ECEF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0077B6] placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#212529]">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-white text-[#212529] border border-[#E9ECEF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0077B6] placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#212529]">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message here..."
                className="w-full bg-white text-[#212529] border border-[#E9ECEF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0077B6] placeholder:text-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF7B54] text-white font-semibold py-3 rounded-lg hover:bg-[#E85D04] disabled:opacity-50 shadow-[0_0_10px_rgba(255,123,84,0.4)] hover:shadow-[0_0_15px_rgba(232,93,4,0.6)] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;