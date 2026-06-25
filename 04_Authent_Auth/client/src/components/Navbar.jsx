import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AUTH_ENDPOINTS } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const Navbar = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="grid grid-cols-3 items-center px-10 py-6 bg-purple-700 relative z-10">
      {/* Logo */}
      <div className="justify-self-start">
        <Link to="/" className="text-3xl font-bold text-white">
          MyApp
        </Link>
      </div>
      {/* Navigation Links */}
      <ul className="flex justify-center space-x-8 text-white font-medium">
        <li>
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
        </li>

        <li>
          <Link to="/about" className="hover:text-gray-300 transition">
            About
          </Link>
        </li>

        <li>
          <Link to="/services" className="hover:text-gray-300 transition">
            Services
          </Link>
        </li>

        <li>
          <Link to="/contact" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </li>
      </ul>

      {/* Login / Signup Buttons */}
      <div className="justify-self-end space-x-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-gray-300 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-white text-purple-700 px-5 py-2 rounded-full font-semibold hover:scale-105 transition inline-block"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
