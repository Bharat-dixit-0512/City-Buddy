import { useEffect, useState } from "react";
import {
  Heart,
  Map,
  Menu,
  MoonStar,
  Sun,
  User,
  X,
} from "lucide-react";
import { MdOutlineLocationOn } from "react-icons/md";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { userAuth } from "../context/useAuth";
import { useTheme } from "../context/useTheme";
import Searchbar from "./Searchbar";
import AppInstallButton from "./shared/AppInstallButton";

const navItems = [
  "Restaurants",
  "Hotels",
  "Guest Houses",
  "Cafes",
  "Attractions",
];

const Navbar = () => {
  const { authUser, logout, isAdmin } = userAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 6);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const utilityIconClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-[#F9FAFB] transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/14";

  const primaryButtonClass =
    "inline-flex h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isSticky
          ? "bg-[#023047]/96 shadow-[0_14px_36px_rgba(2,48,71,0.22)] backdrop-blur-md"
          : "bg-[#023047]"
      }`}
    >
      <nav className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0077B6]/30 ring-1 ring-white/10">
              <MdOutlineLocationOn size={24} className="text-[#FFD60A]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-bold tracking-[0.12em] text-[#F9FAFB] uppercase sm:text-xl">
                CityBuddy
              </span>
              <span className="block truncate text-[11px] font-medium tracking-[0.28em] text-[#FFD60A]/90 uppercase">
                Smart Travel Guide
              </span>
            </span>
          </Link>

          <div className="hidden flex-wrap items-center justify-end gap-2 lg:flex xl:gap-3">
            <div className="hidden xl:block">
              <AppInstallButton className="h-10 px-4 py-2" />
            </div>
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-[#F9FAFB] hover:border-[#FFD60A]/60 hover:bg-white/15"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              type="button"
            >
              {isDark ? <Sun size={16} /> : <MoonStar size={16} />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>
            <NavLink
              to="/map"
              className={`${utilityIconClass} hover:text-[#FFD60A]`}
            >
              <Map size={20} />
            </NavLink>
            {authUser ? (
              <>
                <NavLink
                  to="/favorites"
                  className={`${utilityIconClass} hover:text-[#FF7B54]`}
                >
                  <Heart size={20} />
                </NavLink>
                <NavLink
                  to="/profile"
                  title="Profile"
                  className={`${utilityIconClass} hover:text-[#FFD60A]`}
                >
                  <User size={20} />
                </NavLink>
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    className={`theme-keep-contrast ${primaryButtonClass} bg-[#FFD60A] text-[#023047] hover:brightness-110`}
                  >
                    Admin
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className={`${primaryButtonClass} bg-[#0077B6] text-white hover:bg-[#023E8A]`}
                  type="button"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`${primaryButtonClass} bg-[#0077B6] text-white hover:bg-[#023E8A]`}
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#F9FAFB] hover:border-[#FFD60A]/60 hover:bg-white/15"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              type="button"
            >
              {isDark ? <Sun size={18} /> : <MoonStar size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#F9FAFB] hover:border-[#FFD60A]/60 hover:bg-white/15"
              title={isMobileMenuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div className="hidden items-center justify-between gap-4 pt-4 lg:flex">
          <ul className="flex min-w-0 flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/6 px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {navItems.map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                  className={({ isActive }) =>
                    `inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#FF7B54] text-white shadow-[0_10px_24px_rgba(255,123,84,0.26)]"
                        : "text-[#F9FAFB] hover:bg-[#0077B6] hover:text-white"
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="w-full max-w-xs shrink-0 xl:max-w-sm">
            <Searchbar />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 rounded-[28px] border border-white/10 bg-[#023047]/98 p-4 shadow-[0_20px_44px_rgba(2,48,71,0.28)] backdrop-blur-md lg:hidden">
            <div className="mb-4">
              <Searchbar />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                  className={({ isActive }) =>
                    `inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#FF7B54] text-white shadow-[0_12px_28px_rgba(255,123,84,0.22)]"
                        : "border border-white/10 bg-white/6 text-[#F9FAFB] hover:bg-[#0077B6]"
                    }`
                  }
                >
                  {item}
                </NavLink>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <AppInstallButton className="h-10 px-4 py-2" />
              <NavLink
                to="/map"
                className={`${utilityIconClass} border-white/12 bg-white/6 hover:text-[#FFD60A]`}
              >
                <Map size={20} />
              </NavLink>
              {authUser ? (
                <>
                  <NavLink
                    to="/favorites"
                    className={`${utilityIconClass} border-white/12 bg-white/6 hover:text-[#FF7B54]`}
                  >
                    <Heart size={20} />
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={`${utilityIconClass} border-white/12 bg-white/6 hover:text-[#FFD60A]`}
                  >
                    <User size={20} />
                  </NavLink>
                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      className={`theme-keep-contrast ${primaryButtonClass} bg-[#FFD60A] text-[#023047] hover:brightness-110`}
                    >
                      Admin
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className={`${primaryButtonClass} bg-[#0077B6] text-white hover:bg-[#023E8A]`}
                    type="button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`${primaryButtonClass} bg-[#0077B6] text-white hover:bg-[#023E8A]`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
