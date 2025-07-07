import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobApplyModal from "../components/JobApplyModal";
import Swal from "sweetalert2";
import { FiCalendar, FiClipboard, FiMapPin } from "react-icons/fi";
import Card from "../components/Card";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    if (!job) return;

    // Fetch all jobs to find related ones
    fetch("https://job-dorkar.vercel.app/api/jobs/")
      .then((res) => res.json())
      .then((allJobs) => {
        const sameCategoryJobs = allJobs.filter(
          (item) =>
            item.category_name === job.category_name && item.id !== job.id
        );
        setRelatedJobs(sameCategoryJobs);
      })
      .catch((err) => console.error("Failed to fetch related jobs:", err));
  }, [job]);

  if (!job) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl text-red-500">No job data found.</h2>
        <button
          onClick={() => navigate("/jobs")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    title,
    description,
    requirements,
    location: jobLocation,
    category_name,
    date_posted,
    company_logo,
    company_name,
  } = job;

  const formattedDate = new Date(date_posted).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleApplyClick = () => {
    const token = localStorage.getItem("access");
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userRole = userData?.role;

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to apply.",
      });
      return;
    }

    if (userRole !== "job_seeker") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Only job seekers can apply for jobs.",
      });
      return;
    }

    setIsModalOpen(true);
  };

  const fullLogoUrl = job.company_logo
    ? `https://res.cloudinary.com/dsgoi1hul/${job.company_logo}`
    : "/images/Linear.png";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Job Detail Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={fullLogoUrl}
            alt="Company Logo"
            className="w-24 h-24 object-cover rounded-md bg-white mb-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-blue-600">{company_name}</p>
          </div>
        </div>

        <div className="text-gray-700 text-sm flex flex-wrap gap-4 mb-4">
          <span className="flex items-center gap-1">
            <FiMapPin className="text-blue-600" /> {jobLocation}
          </span>
          <span className="flex items-center gap-1">
            <FiCalendar className="text-blue-600" /> {formattedDate}
          </span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
            {category_name}
          </span>
        </div>

        <h4 className="text-lg font-semibold mt-6 mb-2">Job Description:</h4>
        <p className="text-gray-700 mb-4">{description}</p>

        <h4 className="text-lg font-semibold mb-2">Requirements:</h4>
        <p className="text-gray-700 flex items-start gap-2">
          <FiClipboard className="mt-1 text-blue-600" />
          {requirements}
        </p>

        <div className="mt-8 text-right">
          <button
            onClick={handleApplyClick}
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <JobApplyModal job={job} onClose={() => setIsModalOpen(false)} />
      )}

      {/* Same Category Jobs */}
      <h2 className="text-center text-3xl mt-15 font-bold">
        {" "}
        <span className="text-blue-600">Related</span> Jobs
      </h2>

      <hr />

      {relatedJobs.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">
            More jobs from{" "}
            <span className="text-blue-700">{category_name}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedJobs.map((jobItem) => (
              <Card key={jobItem.id} data={jobItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
