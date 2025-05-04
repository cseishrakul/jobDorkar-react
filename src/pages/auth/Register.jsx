import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState("job_seeker");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username,
      email,
      password,
      role,
    };

    try {
      const response = await axios.post(
        "https://job-dorkar.vercel.app/auth/users/",
        data
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.detail || "Something went wrong");
      } else {
        setError("Network error or server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-blue-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/Back.jpeg')` }}
      ></div>
      <div className="relative z-10 mx-2 bg-white bg-opacity-90 text-gray-800 rounded-2xl shadow-lg p-6 max-w-sm w-full backdrop-blur-md">
        <h2 className="text-center text-3xl font-bold mb-6">Create Account</h2>
        <hr />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="my-4 relative">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-70 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaUser className="absolute left-3 top-2.5 text-gray-700" />
          </div>
          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-70 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaEnvelope className="absolute left-3 top-2.5 text-gray-700" />
          </div>
          <div className="mb-4 relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-3 pr-4 py-2 rounded-lg bg-white bg-opacity-70 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="job_seeker">Job Seeker</option>
              <option value="employer">Employee</option>
            </select>
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-70 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaLock className="absolute left-3 top-2.5 text-gray-700" />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-800">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-blue-700 hover:text-blue-800"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
