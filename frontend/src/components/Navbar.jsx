// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { GiWheat } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out!");
    navigate("/");
  };

  // Dashboard route based on role
  const dashboardPath =
    userRole === "admin" ? "/dashboard/admin"
    : userRole === "expert" ? "/dashboard/expert"
    : "/dashboard/farmer";

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-green-600" : "text-gray-600 hover:text-green-600"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-green-700 text-lg">
          <GiWheat className="text-2xl" />
          কৃষি সেবা
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink to="/crop-tips" className={linkClass}>Crop Tips</NavLink>
          <NavLink to="/marketplace" className={linkClass}>Marketplace</NavLink>
        </div>

        {/* Auth section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-700"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} className="w-8 h-8 rounded-full object-cover" alt="avatar" />
                ) : (
                  <FaUserCircle className="text-2xl text-gray-400" />
                )}
                <span className="font-medium">{user.displayName || "User"}</span>
              </button>

              {dropOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                  <Link
                    to={dashboardPath}
                    onClick={() => setDropOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Dashboard
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={() => { setDropOpen(false); handleLogout(); }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm py-1.5 px-4">Login</Link>
              <Link to="/register" className="btn-primary text-sm py-1.5 px-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
