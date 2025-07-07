import React, { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ query, location, handleQueryChange, handleLocationChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-5 md:py-20 py-14">
      <h1 className="text-5xl font-bold text-black mb-3">
        Find your <span className="text-blue-700">new job</span> today
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Thousands of jobs in the computer, engineering and technology sectors are waiting for you.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          {/* Job Title Input */}
          <div className="relative flex md:rounded-s-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 md:w-1/2 w-full">
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="block w-full border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 sm:text-sm"
              value={query}
              onChange={handleQueryChange}
            />
          </div>

          {/* Location Input */}
          <div className="relative flex shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 md:w-1/3 w-full">
            <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="block w-full border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 sm:text-sm"
              value={location}
              onChange={handleLocationChange}
            />
          </div>

          <button
            className="bg-blue-700 py-2 px-8 text-white md:rounded-s-none rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};


export default Banner;
