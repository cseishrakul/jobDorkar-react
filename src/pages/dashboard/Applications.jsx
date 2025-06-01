import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [isJobSeeker, setIsJobSeeker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("access");
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (!userData) {
        console.error("User data not found in localStorage.");
        setLoading(false);
        return;
      }
      if (userData.role === "job_seeker") {
        setIsJobSeeker(true);
      } else if (userData.role === "employer") {
        setIsJobSeeker(false);
      } else {
        console.error("Unknown role");
        setLoading(false);
        return;
      }

      const apiUrl = isJobSeeker
        ? "https://job-dorkar.vercel.app/api/jobs/dashboard/jobseeker/"
        : "https://job-dorkar.vercel.app/api/jobs/dashboard/employer/";

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          console.error("Unauthorized! Please log in again.");
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (isJobSeeker) {
          if (!data || !Array.isArray(data.applied_jobs)) {
            console.error("Expected applied_jobs to be an array.");
            setLoading(false);
            return;
          }
          setApplications(data.applied_jobs);
        } else {
          if (!data || !Array.isArray(data.received_applications)) {
            console.error("Expected received_applications to be an array.");
            setLoading(false);
            return;
          }
          setApplications(data.received_applications);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isJobSeeker]);

  const handleStatusChange = (applicationId, newStatus) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [applicationId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (applicationId) => {
    const newStatus = selectedStatus[applicationId];
    if (!newStatus) {
      Swal.fire("Alert!", "Please select a status before updating.", "danger");
      return;
    }
    setLoadingStatus(applicationId);
    try {
      const token = localStorage.getItem("access");

      const response = await axios.patch(
        `https://job-dorkar.vercel.app/api/jobs/applications/${applicationId}/update-status/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      setSelectedStatus((prev) => {
        const updated = { ...prev };
        delete updated[applicationId];
        Swal.fire("Updated!", "Update status successfull !", "success");
        return updated;
      });
    } catch (error) {
      Swal.fire("Alert!", "Failed to update status!", "danger");
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-black"
      } shadow-md rounded-lg p-6`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Applications</h2>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : applications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead
              className={`${
                darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              } uppercase`}
            >
              <tr>
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Resume</th>
                <th className="py-3 px-6">Applicant</th>
                <th className="py-3 px-6">Job</th>
                {isJobSeeker ? (
                  <th className="py-3 px-6">Status</th>
                ) : (
                  <>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr
                  key={application.id}
                  className={`border-b hover:bg-gray-100 ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                    {application.resume_url ? (
                      <a
                        href={application.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                  <td className="py-3 px-6">{application.applicant_id}</td>
                  <td className="py-3 px-6">{application.job_title}</td>
                  {isJobSeeker ? (
                    <td className="py-3 px-6"> {application.status} </td>
                  ) : (
                    <>
                      <td className="py-3 px-6">
                        <select
                          value={
                            selectedStatus[application.id] || application.status
                          }
                          onChange={(e) =>
                            handleStatusChange(application.id, e.target.value)
                          }
                          className="bg-gray-200 p-2 rounded-md cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                        </select>
                      </td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleUpdateStatus(application.id)}
                          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all duration-300 flex items-center justify-center min-w-[80px] cursor-pointer"
                          disabled={loadingStatus === application.id}
                        >
                          {loadingStatus === application.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "Update"
                          )}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No applications found
        </p>
      )}
    </div>
  );
};

export default Applications;
