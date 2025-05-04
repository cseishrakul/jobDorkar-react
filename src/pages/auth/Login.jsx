import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaUser } from "react-icons/fa6";

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

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-blue-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/Back.jpeg')` }}
      ></div>

      <div className="relative z-10 mx-2 bg-white bg-opacity-90 text-gray-800 rounded-2xl shadow-lg p-6 max-w-sm w-full backdrop-blur-md">
        <Link to="/" className="">
          {" "}
          <p className="text-center text-2xl font-bold text-blue-800">
            JobDorkar
          </p>{" "}
        </Link>
        <hr /> <h2 className="text-center text-3xl font-bold my-4">Login</h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm font-semibold text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-70 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <FaUser className="absolute left-3 top-2.5 text-gray-700" />
          </div>

          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-70 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <FaLock className="absolute left-3 top-2.5 text-gray-700" />
          </div>

          <div className="flex justify-between items-center text-sm mb-5 text-gray-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <a href="#" className="hover:underline text-blue-700">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-semibold transition duration-300 cursor-pointer ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-gray-800">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="underline text-blue-700 hover:text-blue-800"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
