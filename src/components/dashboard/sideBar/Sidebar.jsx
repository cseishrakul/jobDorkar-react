import React, { useContext } from "react";
import { links } from "../../../constants/index";
import LinkItem from "./LinkItem";
import { UserContext } from "../../../context/UserContext";

const Sidebar = ({ isSidebarOpen, darkMode }) => {
  const { userData } = useContext(UserContext);
  if (!userData) return null;

  const isEmployer = userData.role === "employer";
  const filteredLinks = links.filter((link) => {
    if (isEmployer) return true;
    return ["/dashboard", "/dashboard/profile", "/dashboard/applications"].includes(link.to);
  });

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 border-r transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full sm:translate-x-0"
        }
        ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {filteredLinks.map((link, index) => (
            <LinkItem key={index} {...link} darkMode={darkMode} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
