import React, { useEffect, useState } from "react";
import Stats from "../../components/dashboard/stats/Stats";
import Team from "../../components/team/Team";
import Event from "../../components/dashboard/event/Event";
import JobList from './Jobs/JobList';
import axios from "axios";
import Applications from "./Applications";

const DashboardHome = () => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://job-dorkar.vercel.app/api/jobs/categories/");
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

  return (
    <div>
      {/* <Stats darkMode={false} /> */}
      <JobList jobs={jobs} />

      <div className="flex flex-col gap-3 my-3">
        {/* <Team darkMode={false} /> */}
        {/* <Event darkMode={false} /> */}
        <Applications />
      </div>
    </div>
  );
};

export default DashboardHome;
