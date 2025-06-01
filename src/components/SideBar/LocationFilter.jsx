import React from "react";
import InputField from "../InputField";

const LocationFilter = ({ handleChange, locations }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <label className="sidebar-label-container">
        <input type="radio" name="location" value="" onChange={handleChange} />
        <span className="checkmark"></span>All
      </label>
      {locations.map((loc, index) => (
        <InputField
          key={index}
          name="location"
          value={loc}
          title={loc}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default LocationFilter;
