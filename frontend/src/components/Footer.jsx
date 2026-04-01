import { Link } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import useScrollToTop from "./motion/useScrollToTop";
import { userAuth } from "../context/useAuth";

const Footer = () => {
  const { isVisible, scrollToTop } = useScrollToTop();
  const { authUser } = userAuth();
  const footerLinkClass =
    "inline-flex rounded-sm text-[#F9FAFB]/85 hover:text-[#00B4D8] focus-visible:text-[#00B4D8]";

  return (
    <footer className="bg-[#023047] text-[#F9FAFB] pt-12 pb-6 relative border-t border-[#E9ECEF]/20">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold font-serif text-[#FFD60A]">
            CityBuddy
          </h2>
          <p className="text-[#F9FAFB]/70 mt-2 text-sm">
            Your smart travel companion for discovering the best places in every
            city.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FFD60A]">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/restaurants" className={footerLinkClass}>
                Restaurants
              </Link>
            </li>
            <li>
              <Link to="/cafes" className={footerLinkClass}>
                Cafes
              </Link>
            </li>
            <li>
              <Link to="/attractions" className={footerLinkClass}>
                Attractions
              </Link>
            </li>
            <li>
              <Link to="/map" className={footerLinkClass}>
                Map View
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FFD60A]">
            My Account
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/favorites" className={footerLinkClass}>
                My Favorites
              </Link>
            </li>
            <li>
              <Link to="/profile" className={footerLinkClass}>
                My Profile
              </Link>
            </li>
            {!authUser && (
              <>
                <li>
                  <Link to="/login" className={footerLinkClass}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className={footerLinkClass}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FFD60A]">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/helpCenter" className={footerLinkClass}>
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contactUs" className={footerLinkClass}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/termsOfServices" className={footerLinkClass}>
                Terms of Services
              </Link>
            </li>
            <li>
              <Link to="/privacyPolicy" className={footerLinkClass}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="mt-8 border-[#E9ECEF]/20 max-w-screen-xl mx-auto" />
      <div className="text-center text-sm text-gray-400 mt-5">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[#FFD60A]">CityBuddy</span> | All
        Rights Reserved
      </div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full bg-[#FF7B54] p-3 text-white shadow-lg hover:-translate-y-1 hover:bg-[#E85D04] hover:shadow-xl"
          aria-label="Back to top"
          type="button"
        >
          <ChevronUp size={22} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
