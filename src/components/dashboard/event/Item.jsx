import React from 'react';

const Item = ({ event, darkMode }) => {
  return (
    <div className="flex gap-5 items-center">
      <span
        className={`p-2 rounded-sm h-16 w-16 font-bold text-center flex items-center justify-center 
          ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-300 text-gray-800'}`}
      >
        {event.date}
      </span>
      <div>
        <h1 className="text-xl font-bold">{event.title}</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>{event.description}</p>
      </div>
    </div>
  );
};

export default Item;
