import React from "react";
import Button from "./Button";
import InputField from "../InputField";

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div className="mb-4">
        <Button onClickHandler={handleChange} value="" title="Hourly" />
        <Button onClickHandler={handleChange} value="Monthly" title="Monthly" />
        <Button onClickHandler={handleChange} value="Yearly" title="Yearly" />
      </div>
      <label className="sidebar-label-container">
        <input
          type="radio"
          name="test"
          id="test"
          value=""
          onChange={handleChange}
        />
        <span className="checkmark"></span>All
      </label>
      <InputField
        handleChange={handleChange}
        value={30}
        title="< $30000"
        name="test2"
      />
      <InputField
        handleChange={handleChange}
        value={50}
        title="< $50000"
        name="test2"
      />
      <InputField
        handleChange={handleChange}
        value={80}
        title="< $80000"
        name="test2"
      />
      <InputField
        handleChange={handleChange}
        value={100}
        title="< $10000"
        name="test2"
      />
    </div>
  );
};

export default Salary;
