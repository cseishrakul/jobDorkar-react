import React from "react";
import {Link} from 'react-router-dom'

const LinkItem = ({darkMode, to, icon: Icon, text, badge }) => {
  return (
<li>
  <Link
    to={to}
    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
      darkMode
        ? "text-white hover:bg-gray-700"
        : "text-gray-900 hover:bg-gray-100"
    }`}
  >
    <Icon className="mr-2" />
    <span className="flex-1 me-3"> {text} </span>
    {badge && (
      <span
        className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${badge.color}`}
      >
        {badge.text}
      </span>
    )}
  </Link>
</li>

  );
};

export default LinkItem;
