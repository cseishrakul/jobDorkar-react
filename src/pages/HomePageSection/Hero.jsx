import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[100vh] text-white flex items-center justify-center px-6"
      style={{ backgroundImage: "url('/images/hero.avif')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Find Your Dream Job Today</h1>
        <p className="text-xl mb-6">
          Connecting job seekers with top employers in Bangladesh.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/job-apply"
            className="bg-white text-blue-900 font-bold px-6 py-2 rounded-full shadow hover:bg-blue-800 hover:text-white"
          >
            Browse Jobs
          </Link>
          <Link
            to="/dashboard"
            className="bg-blue-800 text-white font-bold px-6 py-2 rounded-full hover:bg-gray-100 hover:text-blue-900"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
