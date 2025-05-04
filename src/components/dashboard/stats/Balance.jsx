import React from "react";
import Title from "../../../ui/Title";
import { FiSend } from "react-icons/fi";
import BarChart from "./BarChart";

const Balance = ({ darkMode }) => {
  return (
    <div
      className={`p-5 rounded-2xl flex-1 transition-colors duration-300 ${
        darkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center">
        <Title darkMode={darkMode}>Balance</Title>
        <FiSend
          className={`p-2 rounded-full w-8 h-8 transition-colors duration-300 ${
            darkMode ? "bg-gray-500 text-gray-300" : "bg-gray-200 text-gray-700"
          }`}
        />
      </div>
      <div>
        <h1 className="font-bold text-2xl">
          $60,000 <span className="font-bold text-xl">(USD)</span>
        </h1>
        <span>On April 2025</span>
      </div>
      <BarChart darkMode={darkMode} />
    </div>
  );
};

export default Balance;
