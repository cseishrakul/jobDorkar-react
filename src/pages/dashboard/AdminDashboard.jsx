import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/dashboard/Header";
import Main from "../../ui/Main";
import Content from "../../ui/content/Content";
import { UserContext } from "../../context/UserContext";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userData } = useContext(UserContext);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toogleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [data, setData] = useState({
    users: [],
    jobs: [],
    categories: [],
    applications: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("access");
    axios
      .get("https://job-dorkar.vercel.app/api/accounts/admin-dashboard/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        toogleSidebar={toogleSidebar}
      />
      <Main darkMode={darkMode}>
        <Content>
          <div className="p-6 space-y-10">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <DashboardCard title="Total Users" value={data.users.length} />
              <DashboardCard title="Total Jobs" value={data.jobs.length} />
              <DashboardCard
                title="Categories"
                value={data.categories.length}
              />
              <DashboardCard
                title="Applications"
                value={data.applications.length}
              />
            </div>

            {/* Users Table */}
            <SectionTable
              title="Users Info"
              headers={["Username", "Email", "Name"]}
              rows={data.users
                .slice(0, 5)
                .map((user) => [
                  user.username,
                  user.email,
                  user.first_name || "N/A",
                ])}
            />

            {/* Jobs Table */}
            <SectionTable
              title="Jobs Info"
              headers={["Title", "Location", "Posting Date"]}
              rows={data.jobs
                .slice(0, 5)
                .map((job) => [
                  job.title,
                  job.location,
                  formatDate(job.date_posted) || "N/A",
                ])}
            />

            {/* Categories Table */}
            <SectionTable
              title="Categories Info"
              headers={["Name"]}
              rows={data.categories.slice(0, 5).map((cat) => [cat.name])}
            />

            {/* Applications Table */}
            <SectionTable
              title="Applications Info"
              headers={["Applicant", "Job Title", "Status"]}
              rows={data.applications
                .slice(0, 5)
                .map((app) => [
                  app.applicant?.username || "N/A",
                  app.job?.title || "N/A",
                  app.status,
                ])}
            />
          </div>
        </Content>
      </Main>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="p-6 bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

const SectionTable = ({ title, headers, rows }) => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 font-semibold">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="py-3 px-5 border-b border-gray-300 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={`transition duration-200 ease-in-out hover:bg-blue-50 ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              {row.map((cell, i) => (
                <td key={i} className="py-3 px-5 text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default AdminDashboard;
