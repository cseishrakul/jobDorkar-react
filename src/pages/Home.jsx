import React, { useEffect, useState, useMemo } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import SideBar from "../components/SideBar/SideBar";
import { FiLoader } from "react-icons/fi";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);

    const fetchJobs = fetch("https://job-dorkar.vercel.app/api/jobs/")
      .then((res) => res.json())
      .then((data) => {
        const sortedJobs = data.sort((a, b) => {
          return b.is_promoted - a.is_promoted;
        });
        
        console.log("promoted",data.map(job => job.is_promoted));
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

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
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
        job.jobTitle?.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((job) => {
        return job.category === selectedCategory;
      });
    }

    return filtered;
  }, [jobs, query, selectedCategory]);

  const { startIndex, endIndex } = calculatePageRange();
  const paginatedJobs = allFilteredJobs.slice(startIndex, endIndex);

  const result = useMemo(() => {
    return paginatedJobs.map((data, i) => <Card key={i} data={data} />);
  }, [paginatedJobs]);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <SideBar handleChange={handleChange} />
        </div>
        <div className="bg-white p-4 rounded-sm col-span-2">
          <div className="bg-white p-4 rounded-sm col-span-2 min-h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <FiLoader className="animate-spin text-5xl text-blue-500" />
              </div>
            ) : result.length > 0 ? (
              <Jobs result={result} />
            ) : (
              <div className="text-center mt-10">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  0 Jobs
                </h3>
                <p className="text-gray-500">No Data Found</p>
              </div>
            )}
          </div>

          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                className="cursor-pointer"
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
                className="cursor-pointer"
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
        <div className="bg-white p-4 rounded">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
