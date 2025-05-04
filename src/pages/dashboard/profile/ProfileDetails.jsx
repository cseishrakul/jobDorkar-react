import React from 'react';

const ProfileDetails = ({ userData, darkMode }) => {
  const containerStyles = `${
    darkMode
      ? 'bg-gray-800 border border-gray-700 text-white'
      : 'bg-white border border-gray-200 text-black'
  }`;

  return (
    <div className={`w-full max-w-xl mx-auto rounded-xl p-6 mt-10 shadow-md ${containerStyles}`}>
      <h2 className="text-3xl font-bold text-center mb-6">Profile Details</h2>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between flex-wrap">
          <span className="font-semibold">First Name:</span>
          <span>{userData.first_name}</span>
        </div>

        <div className="flex justify-between flex-wrap">
          <span className="font-semibold">Last Name:</span>
          <span>{userData.last_name}</span>
        </div>

        <div className="flex justify-between flex-wrap">
          <span className="font-semibold">Username:</span>
          <span>{userData.username}</span>
        </div>

        <div className="flex justify-between flex-wrap">
          <span className="font-semibold">Email:</span>
          <span>{userData.email}</span>
        </div>

        <div className="flex justify-between flex-wrap">
          <span className="font-semibold">Role:</span>
          <span className="capitalize">{userData.role}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
