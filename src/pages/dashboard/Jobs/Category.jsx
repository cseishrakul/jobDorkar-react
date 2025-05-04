import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://job-dorkar.vercel.app/api/jobs/categories/"
      );
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://job-dorkar.vercel.app/api/jobs/categories/",
        { name: categoryName }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Category created successfully!");
        setCategoryName("");
        fetchCategories();
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Toggle Dark Mode */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-1 rounded-full text-sm font-medium border transition duration-300 
            hover:shadow-md 
            focus:outline-none
            bg-white dark:bg-gray-800
            border-gray-300 dark:border-gray-600 
            text-gray-700 dark:text-white"
          >
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        {/* Create Category Form */}
        <div
          className={`rounded-xl shadow-md overflow-hidden mb-8 border ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create Category
            </h2>

            {success && (
              <div className="mb-4 text-green-500 text-sm font-semibold text-center">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 text-red-500 text-sm font-semibold text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                      : "bg-white border-gray-300 text-black focus:ring-blue-400"
                  }`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md font-semibold transition duration-300 ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {loading ? "Creating..." : "Create Category"}
              </button>
            </form>
          </div>
        </div>

        {/* Categories Table */}
        <div
          className={`rounded-xl shadow-md overflow-hidden p-6 sm:p-8 border ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-black"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Category List</h2>

          {categories.length === 0 ? (
            <p className="text-center">No categories found.</p>
          ) : (
            <div className="w-full">
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <table className="w-full text-sm text-left min-w-full">
                  <thead
                    className={`uppercase ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <tr>
                      <th className="py-3 px-6">#</th>
                      <th className="py-3 px-6 text-right">Category Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr
                        key={category.id || index}
                        className={`border-b ${
                          darkMode
                            ? "hover:bg-gray-700 border-gray-700"
                            : "hover:bg-gray-100 border-gray-300"
                        }`}
                      >
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6 text-right">
                          {category.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List */}
              <div className="sm:hidden space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={category.id || index}
                    className={`p-4 rounded-md shadow border ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-200 text-black"
                    }`}
                  >
                    <p className="font-semibold">#{index + 1}</p>
                    <p className="text-right">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
