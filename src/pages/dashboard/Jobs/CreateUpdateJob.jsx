import React, { useState, useEffect } from "react";

const CreateUpdateJob = ({ categories, currentJob, onSubmit, isSubmitting, darkMode }) => {
  const [title, setTitle] = useState(currentJob ? currentJob.title : "");
  const [description, setDescription] = useState(currentJob ? currentJob.description : "");
  const [requirements, setRequirements] = useState(currentJob ? currentJob.requirements : "");
  const [location, setLocation] = useState(currentJob ? currentJob.location : "");
  const [categoryId, setCategoryId] = useState(currentJob ? currentJob.category_id : "");
  const [companyName, setCompanyName] = useState(currentJob ? currentJob.company_name : "");
  const [companyLogo, setCompanyLogo] = useState(null);

  useEffect(() => {
    if (currentJob) {
      setTitle(currentJob.title);
      setDescription(currentJob.description);
      setRequirements(currentJob.requirements);
      setLocation(currentJob.location);
      setCategoryId(currentJob.category_id);
      setCompanyName(currentJob.company_name);
      setCompanyLogo(currentJob.company_logo);
    }
  }, [currentJob]);

  const handleLogoChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("requirements", requirements);
    formData.append("location", location);
    formData.append("category", categoryId);
    formData.append("company_name", companyName);
    
    if (companyLogo) {
      formData.append("company_logo", companyLogo);
    } else if (currentJob && currentJob.company_logo) {
      formData.append("company_logo", currentJob.company_logo);
    }
    onSubmit(formData);
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-black"
      } shadow-md rounded-lg p-6 mb-10`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {currentJob ? "Update Job" : "Create Job"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <textarea
            placeholder="Requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Company Name Field */}
        <div>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Company Logo Field */}
        <div>
          <input
            type="file"
            onChange={handleLogoChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {companyLogo && <p>{companyLogo.name}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`cursor-pointer w-full ${isSubmitting ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"} text-white font-semibold py-2 rounded-md transition duration-300`}
        >
          {isSubmitting ? "Processing..." : currentJob ? "Update Job" : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateUpdateJob;
