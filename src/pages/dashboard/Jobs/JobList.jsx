import React, { useEffect, useState } from "react";
import PromoteButton from "../../../components/PromoteButton";

const JobList = ({ jobs, onUpdate, onDelete, darkMode }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-black"
      } shadow-md rounded-lg p-6`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Job List</h2>
      <div className="block overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin border-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>
          </div>
        ) : jobs.length > 0 ? (
          <div className="block w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 text-gray-700 uppercase">
                <tr>
                  <th className="py-3 px-6">#</th>
                  <th className="py-3 px-6">Title</th>
                  <th className="py-3 px-6">Company Name</th>
                  <th className="py-3 px-6">Location</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Actions</th>
                  <th className="py-3 px-6">Promote</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job.id}
                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">{job.title}</td>
                    <td className="py-3 px-6">{job.company_name}</td>
                    <td className="py-3 px-6">{job.location}</td>
                    <td className="py-3 px-6">
                      {job.category_name || "Unknown"}
                    </td>
                    <td className="py-3 px-6 flex space-x-2">
                      <button
                        onClick={() => onUpdate(job)}
                        className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 cursor-pointer transition-all duration-300"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onDelete(job.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 cursor-pointer transition-all duration-300"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      {job.is_promoted ? <p className="text-gray-400 border p-2 rounded-md">Promoted</p> : <PromoteButton jobId={job.id} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
