import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedJob = ({isLoading,jobs}) => {
  return (
    <section className="py-16 px-20 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-8 text-center">Featured Jobs</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No jobs found.
            </p>
          ) : (
            jobs
              .slice(0, 4) // Show only latest 4 jobs
              .map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company_name}</p>
                  <p className="text-sm mt-1">📍 {job.location}</p>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex items-center text-blue-600 text-sm mt-2 hover:underline"
                  >
                    View Job <FaArrowRight className="ml-1" />
                  </Link>
                </div>
              ))
          )}
        </div>
      )}
    </section>
  );
};

export default FeaturedJob;
