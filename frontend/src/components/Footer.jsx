import useScrollToTop from "./motion/useScrollToTop";
import { Link } from "react-router-dom";
import { ChevronUp } from "lucide-react";

const Footer = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <footer className="bg-[#023047] text-[#F9FAFB] pt-12 pb-6 relative border-t border-[#E9ECEF]/20">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold font-serif text-[#FFD60A] hover:scale-105 transition-transform duration-300 cursor-pointer [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
            CityBuddy
          </h2>
          <p className="text-[#F9FAFB]/70 mt-2 text-sm">
            Your smart travel companion for discovering the best hotels, cafes,
            and restaurants in every city.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FFD60A]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-[#F9FAFB]">
            <li>
              <Link
                onClick={scrollToTop}
                to="/all"
                className="hover:text-[#00B4D8] hover:underline transition"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/restaurants"
                className="hover:text-[#00B4D8] hover:underline transition"
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/cafes"
                className="hover:text-[#00B4D8] hover:underline transition"
              >
                Cafes
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/attractions"
                className="hover:text-[#00B4D8] hover:underline transition"
              >
                Attractions
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FFD60A]">Support</h3>
          <ul className="space-y-2 text-[#F9FAFB]">
            <li>
              <Link
                onClick={scrollToTop}
                to="/HelpCenter"
                className="hover:text-[#00B4D8] hover:underline transition"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/ContactUs"
                className="hover:text-[#00B4D8] hover:underline transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/TermsOfServices"
                onClick={scrollToTop}
                className="hover:text-[#00B4D8] hover:underline transition"
              >
                Terms of Services
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/PrivacyPolicy"
                className="hover:text-[#00B4D8] hover:underline transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="mt-8 border-[#E9ECEF]/20 w-full max-w-screen-xl mx-auto" />

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-5 px-4">
        &copy; 2025{" "}
        <span className="font-semibold text-[#FFD60A]">CityBuddy</span> | All
        Rights Reserved
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#FF7B54] hover:bg-[#E85D04] text-white p-3 rounded-full shadow-[0_0_15px_rgba(255,123,84,0.5)] hover:shadow-[0_0_20px_rgba(255,123,84,0.7)] transition-all"
          aria-label="Back to top"
        >
          <ChevronUp size={22} />
        </button>
      )}
    </footer>
  );
};

export default Footer;