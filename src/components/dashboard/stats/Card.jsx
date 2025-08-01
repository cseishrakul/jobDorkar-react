import React from "react";

const Card = ({ darkMode, data }) => {
  return (
    <div
      className={`p-6 rounded-2xl flex items-center gap-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-600 text-white" : "bg-white text-black"
      }`}
    >
      <span
        className={`${data.bgColor} px-3 py-6 text-2xl rounded-2xl transition-colors duration-300 ${
          darkMode ? "dark:bg-gray-500" : ""
        }`}
      >
        <data.icon />
      </span>
      <div>
        <h2 className="text-xl">
          <span className="text-2xl font-bold">{data.count}</span>/250
        </h2>
        <p className="font-bold">{data.title}</p>
      </div>
    </div>
  );
};

export default Card;
