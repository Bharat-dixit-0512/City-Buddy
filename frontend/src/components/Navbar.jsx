import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { authUser, logout, isAdmin } = userAuth();
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = ["All", "Restaurants", "Cafes", "Attractions"];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isSticky
          ? "bg-black shadow-lg shadow-yellow-500/20"
          : "bg-black shadow-md shadow-yellow-500/10"
      }`}
      aria-label="Main Navigation"
    >
      <nav className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 gap-4 md:gap-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Home">
          <MdOutlineLocationOn
            size={28}
            className="text-yellow-400 "
          />
          <span className="text-xl md:text-2xl font-bold font-serif text-yellow-400 hover:scale-105 hover:text-yellow-300 transition-all duration-300 [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
            City <span className="animate-pulse">Buddy</span>
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
                      ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/40"
                      : "bg-gray-900 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black hover:shadow-lg hover:shadow-yellow-500/40"
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
            className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
          >
            <CiHeart size={38} className="hover:animate-ping" />
          </button>

          {authUser ? (
            <>
              <span className="text-yellow-200 font-medium">
                Hi, {authUser.username}
              </span>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="ml-3 px-3 py-1 bg-yellow-400 text-black rounded hover:brightness-110 [text-shadow:_0_0_1px_black]"
                >
                  Admin
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 bg-transparent border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-black active:bg-yellow-600 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" aria-label="Login">
              <lord-icon
                src="https://cdn.lordicon.com/cniwvohj.json"
                trigger="hover"
                colors="primary:#facc15,secondary:#fcea10"
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