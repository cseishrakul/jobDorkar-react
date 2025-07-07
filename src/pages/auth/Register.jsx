import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("job_seeker");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://job-dorkar.vercel.app/auth/users/",
        { username, email, password, role }
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
    <div className="min-h-screen flex">
      {/* Left Side: Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 md:px-16">
        {/* Back Button */}
        <Link
          to="/"
          className="self-start mb-6 flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        <h1 className="text-4xl font-extrabold text-blue-800 mb-5 select-none">
          JobDorkar
        </h1>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create Your Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm font-semibold text-center w-full">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
          <div className="relative">
            <FaUser className="absolute left-4 top-3.5 text-gray-600" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3.5 text-gray-600" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-3.5 text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="job_seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-blue-700 hover:text-blue-800 font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>

      {/* Right Side: Image with overlay */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.avif')" }}
        ></div>
        {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join JobDorkar</h2>
          <p className="text-lg max-w-md mx-auto">
            Find the job that fits your life. Register now and explore thousands of opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
