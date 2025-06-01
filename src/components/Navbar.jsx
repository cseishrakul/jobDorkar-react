import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { IoIosArrowDropdown } from "react-icons/io";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuToggler = () => setIsMenuOpen(!isMenuOpen);

   const handleLogout = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("userData");
          setUserData(null);
          Swal.fire(
            "Logged Out!",
            "You have been successfully logged out.",
            "success"
          ).then(() => {
            navigate("/");
            window.location.reload();
          });
        }
      });
    };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="text-blue-700 text-4xl font-bold">
          JobDorkar
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-black">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="text-base text-black font-medium hidden lg:block relative" ref={dropdownRef}>
          {userData ? (
            <div className="relative inline-block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="py-2 px-5 border border-gray-400 rounded-md hover:bg-gray-100 cursor-pointer flex"
              >
                {userData.username} <IoIosArrowDropdown className="mt-1 ml-2" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="py-2 mr-2 px-5 border border-gray-400 rounded-md">
                Log In
              </Link>
              <Link
                to="/register"
                className="py-2 px-5 border border-blue-700 rounded-md bg-blue-700 text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-black" />
            ) : (
              <HiOutlineBars3BottomRight className="w-5 h-5 text-black" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white py-1">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-white py-1">
            <Link
              to="/login"
              className="py-2 px-5 border border-gray-400 rounded-md"
            >
              Log In
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
