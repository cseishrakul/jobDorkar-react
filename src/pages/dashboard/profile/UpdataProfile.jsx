import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileUpdate = ({ darkMode }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = localStorage.getItem("access");

        const response = await axios.get(
          `https://job-dorkar.vercel.app/api/accounts/user/${userData.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("access");

      const response = await axios.patch(
        "https://job-dorkar.vercel.app/api/jobs/dashboard/profile/update/",
        formData,
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile updated successfully!", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error.response?.data || error.message
      );
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = `${
    darkMode
      ? "bg-gray-800 text-white border-gray-700"
      : "bg-white text-black border-gray-200"
  }`;
  const inputStyles = `${
    darkMode
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
      : "bg-white border-gray-300 text-black placeholder-gray-500"
  }`;
  const selectStyles = `${
    darkMode
      ? "bg-gray-700 text-white border-gray-600"
      : "bg-white text-black border-gray-300"
  }`;

  return (
    <div
      className={`w-full max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-md border ${containerStyles}`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="first_name"
          value={formData.first_name || ""}
          onChange={handleChange}
          placeholder="First Name"
          className={`p-3 rounded-md border ${inputStyles}`}
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name || ""}
          onChange={handleChange}
          placeholder="Last Name"
          className={`p-3 rounded-md border ${inputStyles}`}
        />
        <input
          type="text"
          name="username"
          value={formData.username || ""}
          onChange={handleChange}
          placeholder="Username"
          className={`p-3 rounded-md border ${inputStyles}`}
        />
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className={`p-3 rounded-md border ${inputStyles}`}
        />

        <select
          name="role"
          value={formData.role || ""}
          onChange={handleChange}
          className={`p-3 rounded-md border ${selectStyles}`}
        >
          <option value="">Select Role</option>
          <option value="job_seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center bg-blue-600 text-white py-3 rounded-md transition duration-300 
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
