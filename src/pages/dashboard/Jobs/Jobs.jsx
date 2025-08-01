import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateUpdateJob from "./CreateUpdateJob";
import JobList from "./JobList";
import Swal from "sweetalert2";

const Jobs = () => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://job-dorkar.vercel.app/api/jobs/categories/"
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchUserJobs = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(
          "https://job-dorkar.vercel.app/api/jobs/dashboard/employer/",
          { headers: { Authorization: `JWT ${token}` } }
        );
        setJobs(response.data.posted_jobs);
      } catch (error) {
        console.error("Error fetching user's posted jobs:", error);
      }
    };

    fetchCategories();
    fetchUserJobs();
  }, []);

  const handleCreateUpdateJob = async (jobData) => {
    const token = localStorage.getItem("access");
    setIsSubmitting(true);

    try {
      const response = currentJob
        ? await axios.put(
            `https://job-dorkar.vercel.app/api/jobs/update/${currentJob.id}/`,
            jobData,
            { headers: { Authorization: `JWT ${token}` } }
          )
        : await axios.post(
            "https://job-dorkar.vercel.app/api/jobs/create/",
            jobData,
            { headers: { Authorization: `JWT ${token}` } }
          );

      if (response.status === (currentJob ? 200 : 201)) {
        setMessage(
          currentJob ? "Job updated successfully!" : "Job created successfully!"
        );
        setJobs((prevJobs) =>
          currentJob
            ? prevJobs.map((job) =>
                job.id === currentJob.id ? { ...job, ...response.data } : job
              )
            : [...prevJobs, response.data]
        );
        setCurrentJob(null);
      } else {
        setMessage("Failed to create or update job.");
      }
    } catch (error) {
      console.error("Error creating/updating job:", error);
      setMessage("Error creating/updating job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (jobId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("access");
      const response = await axios.delete(
        `https://job-dorkar.vercel.app/api/jobs/delete/${jobId}/`,
        { headers: { Authorization: `JWT ${token}` } }
      );

      if (response.status === 204) {
        setJobs(jobs.filter((job) => job.id !== jobId));
        Swal.fire("Deleted!", "Job has been deleted.", "success");
      } else {
        Swal.fire("Failed!", "Job could not be deleted.", "error");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <div className="p-6">
      {message && (
        <div
          className={`text-center p-2 mb-4 ${
            message.includes("successfully") ? "bg-green-200" : "bg-red-200"
          } text-black font-semibold`}
        >
          {message}
        </div>
      )}

      <CreateUpdateJob
        categories={categories}
        currentJob={currentJob}
        onSubmit={handleCreateUpdateJob}
        isSubmitting={isSubmitting}
      />

      <JobList jobs={jobs} onUpdate={setCurrentJob} onDelete={handleDelete} />
    </div>
  );
};

export default Jobs;
