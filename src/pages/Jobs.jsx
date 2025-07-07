import React from "react";

const Jobs = ({ result }) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {result}
      </section>
    </>
  );
};

export default Jobs;