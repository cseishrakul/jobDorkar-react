import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaLock,
  FaUser,
  FaGoogle,
  FaLinkedin,
  FaArrowLeft,
} from "react-icons/fa";

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://job-dorkar.vercel.app/auth/jwt/create",
        { username, password }
      );

      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      const userRes = await axios.get(
        "https://job-dorkar.vercel.app/auth/users/me/",
        {
          headers: {
            Authorization: `JWT ${access}`,
          },
        }
      );

      const user = userRes.data;
      localStorage.setItem("userData", JSON.stringify(user));
      setUserData(user);

      if (user.is_staff) {
        navigate("/admin-dashboard");
      } else if (user.role === "employer") {
        navigate("/dashboard");
      } else if (user.role === "job_seeker") {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const message =
        error.response?.data?.detail || "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In flow to be implemented");
  };

  const handleLinkedInSignIn = () => {
    alert("LinkedIn Sign-In flow to be implemented");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 md:px-16">
        {/* Back to Home */}
        <Link
          to="/"
          className="self-start mb-6 flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold"
        >
          <FaArrowLeft /> Back to Home
        </Link>
        <a href="/" className="text-blue-700 text-4xl font-bold mb-5">
          <img src="fav.png" className="w-10 h-10" alt="" />
        </a>
        {error && (
          <div className="mb-4 text-red-600 text-sm font-semibold text-center w-full max-w-md">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-md"
          noValidate
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
            <FaUser className="absolute left-4 top-3.5 text-gray-600" />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
            <FaLock className="absolute left-4 top-3.5 text-gray-600" />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="hover:underline text-blue-700 font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition duration-300 cursor-pointer text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-8 flex items-center gap-3 w-full max-w-md">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons in a row */}
        <div className="flex gap-4 w-full max-w-md">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition px-2"
          >
            <FaGoogle size={20} /> Sign In with Google
          </button>
          <button
            onClick={handleLinkedInSignIn}
            className="flex items-center justify-center gap-3 flex-1 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold transition px-1"
          >
            <FaLinkedin size={20} /> Sign In with LinkedIn
          </button>
        </div>

        <p className="text-center text-gray-800 mt-10 text-sm select-none w-full max-w-md">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="underline text-blue-700 hover:text-blue-800 font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/hero.avif')" }}
  ></div>

  {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

  {/* Optional Content */}
  <div className="relative z-10 h-full flex items-center justify-center px-6 text-center text-white">
    <div>
      <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
      <p className="text-lg max-w-md mx-auto">
        Discover your next opportunity with JobDorkar. Sign in and take the next step in your career.
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

export default Login;
