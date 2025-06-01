import React from "react";
import userLogo from "../../../assets/user01.png";

const User = ({ darkMode,user }) => {
  return (
    <div
  className={`max-w-sm w-full p-6 rounded-2xl shadow-md transition-colors duration-300 ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
  }`}
>
  <div className="flex items-center gap-4">
    <img
      src={userLogo}
      alt="User avatar"
      className="w-16 h-16 rounded-full border-2 border-orange-500 shadow-sm"
    />
    <div>
      <h3 className="text-xl font-bold">{user.username}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-600 capitalize">{user.role}</p>
    </div>
  </div>
  <div className="mt-4 text-sm">
    <p className="mb-1 text-xl">
      <span className="font-semibold">Username:</span> {user.username}
    </p>
    <p className="text-lg">
      <span className="font-semibold">Email:</span> {user.email}
    </p>
  </div>
</div>

  );
};

export default User;
