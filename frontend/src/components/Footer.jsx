import useScrollToTop from "./motion/useScrollToTop";
import { Link } from "react-router-dom";
import { ChevronUp } from "lucide-react";

const Footer = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <footer className="bg-black text-white pt-12 pb-6 relative border-t border-yellow-500/20">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold font-serif text-yellow-400 hover:scale-105 transition-transform duration-300 cursor-pointer [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
            CityBuddy
          </h2>
          <p className="text-yellow-200/70 mt-2 text-sm">
            Your smart travel companion for discovering the best hotels, cafes,
            and restaurants in every city.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-yellow-200">
            <li>
              <Link
                onClick={scrollToTop}
                to="/all"
                className="hover:text-yellow-300 hover:underline transition"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/restaurants"
                className="hover:text-yellow-300 hover:underline transition"
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/cafes"
                className="hover:text-yellow-300 hover:underline transition"
              >
                Cafes
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/attractions"
                className="hover:text-yellow-300 hover:underline transition"
              >
                Attractions
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Support</h3>
          <ul className="space-y-2 text-yellow-200">
            <li>
              <Link
                onClick={scrollToTop}
                to="/HelpCenter"
                className="hover:text-yellow-300 hover:underline transition"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/ContactUs"
                className="hover:text-yellow-300 hover:underline transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/TermsOfServices"
                onClick={scrollToTop}
                className="hover:text-yellow-300 hover:underline transition"
              >
                Terms of Services
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/PrivacyPolicy"
                className="hover:text-yellow-300 hover:underline transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="mt-8 border-yellow-500/20 w-full max-w-screen-xl mx-auto" />

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-5 px-4">
        &copy; 2025{" "}
        <span className="font-semibold text-yellow-400">CityBuddy</span> | All
        Rights Reserved
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-400 text-black p-3 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)] hover:shadow-[0_0_20px_rgba(250,204,21,0.7)] transition-all"
          aria-label="Back to top"
        >
          <ChevronUp size={22} />
        </button>
      )}
    </footer>
  );
};

export default Footer;