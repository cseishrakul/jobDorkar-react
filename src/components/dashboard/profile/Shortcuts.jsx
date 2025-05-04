import React from "react";
import Title from "../../../ui/Title";
import { shortcutLink } from "../../../constants";
import { IoIosArrowForward } from "react-icons/io";

const Shortcuts = ({ darkMode }) => {
  return (
    <div
      className={`flex gap-4 flex-col rounded-lg p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-600 text-white" : "bg-white text-black"
      }`}
    >
      <Title darkMode={darkMode}>Shortcuts</Title>
      {shortcutLink.map((list, index) => (
        <div
          className={`flex justify-between items-center cursor-pointer rounded-sm p-2 hover:pl-2 transition-all duration-300 ${
            darkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
          }`}
          key={index}
        >
          <div className="flex gap-4 items-center">
            <span
              className={`p-2 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300 ${
                darkMode ? "bg-gray-800 text-gray-300" : "bg-blue-100 text-black"
              }`}
            >
              <list.icon />
            </span>
            <h3 className={`${darkMode ? "text-gray-300" : "text-gray-800"} font-medium`}>
              {list.title}
            </h3>
          </div>
          <span
            className={`p-2 rounded-md transition-all duration-500 ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-black"
            } hover:mr-2`}
          >
            <IoIosArrowForward />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Shortcuts;
