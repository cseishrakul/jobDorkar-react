import React, { useState } from "react";
import { FaCircle, FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = ({ toggleDarkMode, darkMode, toogleSidebar }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
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
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b px-4 py-3 transition-all ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toogleSidebar}
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          <a href="/dashboard" className="flex items-center ms-2 md:me-24">
            <MdSpaceDashboard className="h-8 me-3 text-xl text-violet-500" />
            <span className="self-center text-xl font-semibold text-blue-800">
              JobDorkar
            </span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-200"
            onClick={handleLogout}
          >
            <CiLogout size={20} />
            Logout
          </Link>

          <button
            onClick={toggleDarkMode}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition duration-200 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
