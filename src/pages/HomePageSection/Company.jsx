import React from "react";

const Company = () => {
  const companies = [
    "/images/google.png",
    "/images/facebook.png",
    "/images/amazon.png",
    "/images/netflix.png",
    "/images/apple.png",
    "/images/microsoft.png",
  ];

  return (
    <section className="marquee-container">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Trusted by Top Companies
      </h2>

      <div className="marquee">
        {[...companies, ...companies].map((logo, idx) => (
          <div key={idx}>
            <img src={logo} alt="Company logo" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Company;
