import React from "react";
import JobPostingData from "./JobPostingData";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";
import Category from "./Category";
import LocationFilter from "./LocationFilter";

const SideBar = ({ handleChange, handleClick, locations }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold mb-2">Filters</h3>
      <Category handleChange={handleChange} />
      <JobPostingData handleChange={handleChange} />
      <LocationFilter handleChange={handleChange} locations={locations} />
    </div>
  );
};

export default SideBar;
