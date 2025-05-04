import React, { useEffect, useState } from 'react';
import InputField from '../InputField';

const Location = ({ handleChange }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://job-dorkar.vercel.app/api/jobs/categories/')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Category</h4>
      <div className="">
        <label className='sidebar-label-container'>
          <input type="radio" name='location' id='all' value="" onChange={handleChange} />
          <span className="checkmark"></span>All
        </label>
        {categories.map((category) => (
          <InputField
            key={category.id}
            handleChange={handleChange}
            value={category.name}
            title={category.name}
            name="location"
          />
        ))}
      </div>
    </div>
  );
};

export default Location;
