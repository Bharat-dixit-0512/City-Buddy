import { useEffect, useState } from "react";
import { Heart, Map } from "lucide-react";
import { MdOutlineLocationOn } from "react-icons/md";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthProvider";
import Searchbar from "./Searchbar";

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

  const navItems = ["Restaurants", "Hotels", "Guesthouses", "Cafes", "Attractions"];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isSticky ? "bg-[#023047] shadow-lg shadow-cyan-500/10" : "bg-[#023047]"}`} >
      <nav className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-6 py-4 gap-y-4">
        <Link to="/" className="flex items-center gap-2">
          <MdOutlineLocationOn size={28} className="text-[#FFD60A]" />
          <span className="text-xl md:text-2xl font-bold font-serif text-[#F9FAFB] hover:scale-105 hover:text-[#FFD60A] transition-all">
            City <span className="animate-pulse text-[#FFD60A]">Buddy</span>
          </span>
        </Link>
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2 order-3 w-full md:order-2 md:w-auto">
          {navItems.map((item) => (
            <li key={item}>
              <NavLink to={`/${item.toLowerCase().replace(/\s+/g, '')}`} className={({ isActive }) => `px-4 py-2 text-sm rounded-full font-medium transition-colors ${isActive ? "bg-[#FF7B54] text-white" : "text-[#F9FAFB] hover:bg-[#0077B6]"}`}>
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 order-2 md:order-3">
          <div className="w-48 hidden lg:block"><Searchbar /></div>
          <NavLink to="/map" className="text-[#F9FAFB] hover:text-[#FFD60A]"><Map size={24} /></NavLink>
          <NavLink to="/favorites" className="text-[#F9FAFB] hover:text-[#FF7B54]"><Heart size={24} /></NavLink>
          {authUser ? (
            <>
              {isAdmin && (
                <NavLink to="/admin" className="px-3 py-1 bg-[#FFD60A] text-[#023047] rounded hover:brightness-110 font-semibold">Admin</NavLink>
              )}
              <button onClick={handleLogout} className="px-3 py-1 bg-[#0077B6] text-white rounded hover:bg-[#023E8A]">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 bg-[#0077B6] text-white rounded hover:bg-[#023E8A]">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;