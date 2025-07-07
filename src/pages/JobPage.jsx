import React, { useEffect, useState, useMemo } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import SideBar from "../components/SideBar/SideBar";
import { FiLoader } from "react-icons/fi";
import NewsLetter from "../components/NewsLetter";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const JobPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    setIsLoading(true);

    const fetchJobs = fetch("https://job-dorkar.vercel.app/api/jobs/")
      .then((res) => res.json())
      .then((data) => {
        const sortedJobs = data.sort((a, b) => {
          return b.is_promoted - a.is_promoted;
        });

        console.log(
          "promoted",
          data.map((job) => job.is_promoted)
        );
        console.log("Sample job:", data[0]);
        return sortedJobs;
      });

    // Fetch categories
    const fetchCategories = fetch(
      "https://job-dorkar.vercel.app/api/jobs/categories/"
    ).then((res) => res.json());

    Promise.all([fetchJobs, fetchCategories])
      .then(([jobsData, categoriesData]) => {
        setJobs(jobsData);
        setCategories(categoriesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setCurrentPage(1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      setSelectedCategory(value);
    } else if (name === "postingDate") {
      setSelectedDate(value);
    } else if (name === "location") {
      setSelectedLocation(value);
    }
    setCurrentPage(1);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(allFilteredJobs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const allFilteredJobs = useMemo(() => {
    let filtered = jobs;

    if (query) {
      filtered = filtered.filter((job) =>
        job.title?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      if (selectedCategory !== "") {
        filtered = filtered.filter(
          (job) => job?.category_name === selectedCategory
        );
      }
    }

    if (selectedDate && selectedDate !== "") {
      filtered = filtered.filter((job) => {
        const jobDate = new Date(job.date_posted).toISOString().slice(0, 10);
        return jobDate >= selectedDate;
      });
    }

    const searchLocation = selectedLocation || location;
    if (searchLocation) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    return filtered;
  }, [jobs, query, selectedCategory, selectedDate, selectedLocation, location]);

  const { startIndex, endIndex } = calculatePageRange();
  const paginatedJobs = allFilteredJobs.slice(startIndex, endIndex);

  const result = useMemo(() => {
    return paginatedJobs.map((data, i) => <Card key={i} data={data} />);
  }, [paginatedJobs]);

  const uniqueLocations = useMemo(() => {
    return [...new Set(jobs.map((job) => job.location))];
  }, [jobs]);

  return (
    <div>
      <Banner
        query={query}
        location={location}
        handleQueryChange={handleQueryChange}
        handleLocationChange={handleLocationChange}
      />

      <div className="bg-[#FAFAFA] lg:px-24 px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-white p-4 rounded">
            <SideBar handleChange={handleChange} locations={uniqueLocations} />
          </div>

          {/* Job Listings */}
          <div className="w-full lg:w-3/4 bg-white p-4 rounded-sm min-h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <FiLoader className="animate-spin text-5xl text-blue-500" />
              </div>
            ) : result.length > 0 ? (
              <div className="space-y-4">
                <Jobs result={result} />
              </div>
            ) : (
              <div className="text-center mt-10">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  0 Jobs
                </h3>
                <p className="text-gray-500">No Data Found</p>
              </div>
            )}

            {/* Pagination */}
            {result.length > 0 && (
              <div className="flex justify-center mt-6 space-x-8 text-sm">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of{" "}
                  {Math.ceil(allFilteredJobs.length / itemsPerPage)}
                </span>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(allFilteredJobs.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter (below the flex layout) */}
        <div className="mt-10 bg-white p-6 rounded">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
