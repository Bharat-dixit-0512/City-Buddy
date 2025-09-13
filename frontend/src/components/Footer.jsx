import useScrollToTop from "./motion/useScrollToTop";
import { Link } from "react-router-dom";
import { ChevronUp } from "lucide-react"; // for back-to-top icon

const Footer = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <footer className="bg-[#302357] text-white pt-12 pb-6 relative">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold font-serif hover:scale-102 duration-200 transition-all ease-in-out cursor-pointer">CityBuddy</h2>
          <p className="text-gray-300 mt-2 text-sm">
            Your smart travel companion for discovering the best hotels, cafes, and restaurants in every city.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            {isVisible && (<li>
              <Link onClick={scrollToTop} to="/all" className="hover:text-cyan-300 hover:underline transition">
                Explore
              </Link>
            </li>)}
            {isVisible && (<li>
              <Link onClick={scrollToTop} to="/Hotels" className="hover:text-cyan-300 hover:underline transition">
                Hotels
              </Link>
            </li>)}
            {isVisible && (<li>
              <Link onClick={scrollToTop} to="/Cafes" className="hover:text-cyan-300 hover:underline transition">
                Cafes
              </Link>
            </li>)}
            {isVisible && (<li>
              <Link onClick={scrollToTop} to="/attractions" className="hover:text-cyan-300 hover:underline transition">
                Attractions
              </Link>
            </li>)}

          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            {isVisible && (<li>
              <Link onClick={scrollToTop} to="/HelpCenter" className="hover:text-cyan-300 hover:underline transition">
                Help Center
              </Link>
            </li>)}
            {isVisible && (<li>
              <Link onClick={scrollToTop} to="/ContactUs" className="hover:text-cyan-300 hover:underline transition">
                Contact Us
              </Link>
            </li>)}
            {isVisible && (<li>
              <Link
                to="/TermsOfServices"
                onClick={scrollToTop}
                className="hover:text-cyan-300 hover:underline transition"
              >
                Terms of Services
              </Link>
            </li>)}
            {isVisible && (<li>
              <Link onClick={scrollToTop} to="/PrivacyPolicy" className="hover:text-cyan-300 hover:underline transition">
                Privacy Policy
              </Link>
            </li>
            )}
          </ul>
        </div>
      </div>

      
      <hr className="mt-8 border-gray-500 w-full max-w-screen-xl mx-auto" />

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-5 px-4">
        &copy; 2025 <span className="font-semibold">CityBuddy</span> | All Rights Reserved
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition"
        >
          <ChevronUp size={22} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
