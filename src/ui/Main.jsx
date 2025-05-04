import React from 'react';

const Main = ({ children, darkMode }) => {
  return (
    <div className={`p-4 sm:ml-64 gap-2 flex flex-col lg:flex-row transition-all duration-300 mt-14 
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}>
      {children}
    </div>
  );
};

export default Main;
