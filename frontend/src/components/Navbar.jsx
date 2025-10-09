import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { authUser, logout } = userAuth(); // access logout function
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate(); // for redirect after logout

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); // clear context and localStorage
    navigate("/login"); // redirect to login page
  };

  const navItems = ["All", "Hotels", "Cafes", "Attractions"];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isSticky ? "bg-cyan-50 shadow-md" : "bg-white shadow-sm"
      }`}
      aria-label="Main Navigation"
    >
      <nav className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 gap-4 md:gap-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Home">
          <MdOutlineLocationOn size={28} className="text-indigo-600" />
          <span className="text-xl md:text-2xl font-bold font-serif text-gray-900 hover:scale-105">
            City Buddy
          </span>
        </Link>

        <ul className="flex flex-wrap justify-center gap-3 md:gap-5">
          {navItems.map((item) => (
            <li key={item}>
              <NavLink
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-5 py-2 text-sm md:text-base rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`
                }
                aria-label={`Navigate to ${item}`}
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 md:gap-7">
          <button
            type="button"
            aria-label="Favorites"
            className="text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
          >
            <CiHeart size={38} />
          </button>

          {authUser ? (
            <>
              <span className="text-gray-800 font-medium">Hi, {authUser.username}</span>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 active:bg-red-600 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" aria-label="Login">
              <lord-icon
                src="https://cdn.lordicon.com/cniwvohj.json"
                trigger="hover"
                className="w-8 h-8 md:w-9 md:h-9"
              ></lord-icon>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
