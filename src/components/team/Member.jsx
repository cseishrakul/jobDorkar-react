import React from 'react';

const Member = ({ user, darkMode }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className="flex items-center gap-2">
        <img src={user.image} className='w-12 h-12 rounded-full flex' alt="" />
        <div>
          <h2 className="font-bold">{user.name}</h2>
          <span
            className={`font-semibold text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-400'
            }`}
          >
            {user.country}
          </span>
        </div>
      </div>
      <span
        className={`p-3 rounded-full text-xs font-semibold transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-500 text-gray-300'
            : `${user.bgColor} text-gray-700`
        }`}
      >
        {user.role}
      </span>
    </div>
  );
};

export default Member;
