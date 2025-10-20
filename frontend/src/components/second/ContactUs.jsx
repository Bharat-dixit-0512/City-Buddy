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
    <div className="min-h-screen bg-black text-yellow-200/90 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-yellow-400 [text-shadow:_0_0_10px_theme(colors.yellow.500)]">
          Contact Us
        </h1>
        <p className="text-center text-yellow-200/80 mb-12 max-w-2xl mx-auto">
          We’d love to hear from you! Connect with any of our team members
          below, or fill out the form to send us a message directly.
        </p>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-900/50 p-6 rounded-2xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30 text-center transition-transform duration-300 hover:scale-105 hover:shadow-yellow-500/20"
            >
              <h2 className="text-xl font-semibold text-yellow-300">
                {member.name}
              </h2>
              <p className="text-yellow-400/80 mb-3">{member.role}</p>
              <p className="text-sm">
                <a
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-200 hover:underline hover:text-yellow-100 break-all"
                >
                  📧 {member.email}
                </a>
              </p>
              <p className="text-sm mt-2">
                <a
                  href={`tel:${member.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-200 hover:underline hover:text-yellow-100"
                >
                  📞 {member.phone}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900/50 p-8 rounded-2xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-yellow-400">
            Send Us a Message
          </h2>
          <form
            className="space-y-4"
            action="https://formspree.io/f/xldlkvol" 
            method="POST"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-yellow-400">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-yellow-400">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-yellow-400">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message here..."
                className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 shadow-[0_0_10px_rgba(250,204,21,0.4)] hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;5