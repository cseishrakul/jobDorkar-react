import React, { useState } from "react";
import { FiCalendar, FiClipboard, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import JobApplyModal from "./JobApplyModal";
import Swal from "sweetalert2";

const Card = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    id,
    title,
    description,
    requirements,
    location,
    category_name,
    date_posted,
    company_logo,
    company_name,
  } = data;

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

  return (
    <>
      <section className="card">
        <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
          <Link
            to={`/jobs/${id}`}
            className="flex gap-4 flex-col sm:flex-row items-start flex-1"
          >
            <img
              src="images/Linear.png"
              alt="Company Logo"
              className="w-16 h-16 object-cover rounded-md bg-white"
            />

            <div>
              <h4 className="text-black mb-1 font-medium">{category_name}</h4>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <h4 className="text-lg font-semibold mb-2">{company_name}</h4>

              <div className="text-black/70 text-base flex flex-wrap gap-3 mb-2">
                <span className="flex items-center gap-2">
                  <FiMapPin /> {location}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar /> {formattedDate}
                </span>
              </div>

              <p className="text-sm text-black/70 mb-1 line-clamp-2">
                {description}
              </p>

              <p className="text-sm text-black/70 flex items-center gap-2">
                <FiClipboard className="text-blue-600" /> {requirements}
              </p>
            </div>
          </Link>
        </div>
        <div className="flex sm:items-start sm:justify-end">
          <button
            onClick={handleApplyClick}
            className="bg-blue-700 text-white px-3 py-2 rounded-md whitespace-nowrap cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </section>
      {isModalOpen && (
        <JobApplyModal job={data} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Card;
