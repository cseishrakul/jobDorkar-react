import React from "react";
import { FaEnvelopeOpen, FaRocket } from "react-icons/fa";

const NewsLetter = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:gap-16">
      
      {/* Email subscription section */}
      <div className="flex-1 flex flex-col items-center text-center md:text-left md:items-start">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpen /> Email me for Jobs
        </h3>
        <p className="text-black/75 text-base mb-6 max-w-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <input
            type="email"
            className="flex-grow py-2 px-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="your@email.com"
          />
          <input
            type="submit"
            value="Subscribe"
            className="py-2 rounded bg-blue-700 text-white cursor-pointer font-semibold hover:bg-blue-800 transition p-2"
          />
        </form>
      </div>

      {/* Upload resume section */}
      <div className="flex-1 flex flex-col items-center text-center md:text-left md:items-start mt-10 md:mt-0">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket /> Get notice faster
        </h3>
        <p className="text-black/75 text-base mb-6 max-w-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
        <button
          type="button"
          className="w-full max-w-sm py-2 rounded bg-blue-700 text-white cursor-pointer font-semibold hover:bg-blue-800 transition"
        >
          Upload your resume
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
