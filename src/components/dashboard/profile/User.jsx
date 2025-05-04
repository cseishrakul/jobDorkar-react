import React from "react";
import userLogo from "../../../assets/user01.png";

const User = ({ darkMode,user }) => {
  return (
    <div
      className={`flex gap-3 items-center px-2 py-2 rounded-full transition-colors duration-300 ${
        darkMode ? "bg-gray-600 text-white" : "bg-white text-black"
      }`}
    >
      <img src={userLogo} alt="" className="w-14 h-14 rounded-full" />
      <div>
        <h3 className="font-semibold text-2xl"> {user.username} </h3>
        <p>{user.role}</p>
      </div>
    </div>
  );
};

export default User;
