import { useEffect, useState, useMemo } from "react";
import Card from "../components/Card";
import Hero from "./HomePageSection/Hero";
import Company from "./HomePageSection/Company";
import HowItWork from "./HomePageSection/HowItWork";
import Countdown from "./HomePageSection/Countdown";
import FeaturedJob from "./HomePageSection/FeaturedJob";
import Categories from "./HomePageSection/Categories";
import CTA from "./HomePageSection/CTA";
import Blog from './HomePageSection/Blog';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);

    const fetchJobs = fetch("https://job-dorkar.vercel.app/api/jobs/")
      .then((res) => res.json())
      .then((data) => {
        const sortedJobs = data.sort((a, b) => b.is_promoted - a.is_promoted);
        setJobs(sortedJobs);
        setTotalJobs(sortedJobs.length);
      });

    const fetchCategories = fetch(
      "https://job-dorkar.vercel.app/api/jobs/categories/"
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setTotalCategories(data.length);
      });

    Promise.all([fetchJobs, fetchCategories])
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // Animate counter for categories
  useEffect(() => {
    let start = 0;
    const end = totalCategories;
    if (start === end) return;

    let incrementTime = 30;
    let timer = setInterval(() => {
      start += 1;
      setCategoryCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [totalCategories]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
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
        job.jobTitle?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "") {
      filtered = filtered.filter(
        (job) => job?.category_name === selectedCategory
      );
    }

    if (selectedDate && selectedDate !== "") {
      filtered = filtered.filter((job) => {
        const jobDate = new Date(job.date_posted).toISOString().slice(0, 10);
        return jobDate >= selectedDate;
      });
    }

    if (selectedLocation) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    return filtered;
  }, [jobs, query, selectedCategory, selectedDate, selectedLocation]);

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
      {/* Hero Section */}
      <Hero />

      {/* Comapny */}
      <Company />

      {/* How It Works */}
      <HowItWork />

      {/* Total Section */}
      <Countdown categoryCount={categoryCount} totalJobs={totalJobs} />

      {/* Featured Jobs */}
      <FeaturedJob isLoading={isLoading} jobs={jobs} />

      {/* Categories */}
      <Categories isLoading={isLoading} categories={categories} />

      {/* Call to Action */}
      <CTA />

      {/* Blog */}
      <Blog />
    </div>
  );
};

export default Home;
