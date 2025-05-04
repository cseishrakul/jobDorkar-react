import React from "react";

const Title = ({ children, darkMode }) => {
  return (
    <div
      className={`font-bold text-2xl transition-colors duration-300 ${
        darkMode ? "text-gray-400" : "text-gray-700"
      }`}
    >
      {children}
    </div>
  );
};

export default Title;
