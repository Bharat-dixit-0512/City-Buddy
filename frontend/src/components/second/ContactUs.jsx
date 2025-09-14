import React from "react";

const ContactUs = () => {
    const teamMembers = [
        {
            name: "Komal Patel",
            role: "Team Leader",
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
            role: "Backend dev Helper",
            email: "love.pandey_cs23@gla.ac.in",
            phone: "+91 93896 79496",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 px-6 py-12">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-5xl font-bold text-center mb-6 hover:scale-105 duration-300 transition-all ease-in-out cursor-pointer">Contact Us</h1>
                <p className="text-center text-slate-600 mb-12">
                    We’d love to hear from you! Connect with any of our team members
                    below, or fill out the form to send us a message directly.
                </p>

                {/* Team Members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-center cursor-pointer hover:scale-105 duration-200"
                        >
                            <h2 className="text-xl font-semibold">{member.name}</h2>
                            <p className="text-indigo-600 mb-2">{member.role}</p>
                            <p className="text-md">
                                📧{" "}
                                <a
                                    href={`mailto:${member.email}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {member.email}
                                </a>
                            </p>
                            <p className="text-sm mt-1">
                                📞{" "}
                                <a
                                    href={`tel:${member.phone}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {member.phone}
                                </a>
                            </p>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Send Us a Message
                    </h2>
                    <form
                        className="space-y-4"
                        action="https://formspree.io/f/xldlkvol"
                        method="POST"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-2">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Write your message here..."
                                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
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
