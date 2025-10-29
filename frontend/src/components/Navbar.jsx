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
          ? "bg-[#023047] shadow-lg shadow-cyan-500/10"
          : "bg-[#023047]"
      }`}
      aria-label="Main Navigation"
    >
      <nav className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 gap-4 md:gap-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Home">
          <MdOutlineLocationOn
            size={28}
            className="text-[#FFD60A]"
          />
          <span className="text-xl md:text-2xl font-bold font-serif text-[#F9FAFB] hover:scale-105 hover:text-[#FFD60A] transition-all duration-300 [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
            City <span className="animate-pulse text-[#FFD60A]">Buddy</span>
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
                      ? "bg-[#FF7B54] text-white shadow-md shadow-[#FF7B54]/40"
                      : "bg-transparent border border-[#0077B6] text-[#F9FAFB] hover:bg-[#0077B6] hover:text-white hover:shadow-lg hover:shadow-[#0077B6]/40"
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
            className="text-[#FF7B54] hover:text-[#E85D04] transition-colors cursor-pointer"
          >
            <CiHeart size={38} className="hover:animate-ping" />
          </button>

          {authUser ? (
            <>
              <span className="text-[#F9FAFB] font-medium">
                Hi, {authUser.username}
              </span>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="ml-3 px-3 py-1 bg-[#FFD60A] text-[#023047] rounded hover:brightness-110 font-semibold [text-shadow:_0_0_1px_black]"
                >
                  Admin
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 bg-[#0077B6] text-white rounded hover:bg-[#023E8A] active:bg-[#023E8A] transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" aria-label="Login">
              <lord-icon
                src="https://cdn.lordicon.com/cniwvohj.json"
                trigger="hover"
                colors="primary:#FF7B54,secondary:#FFD60A"
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
