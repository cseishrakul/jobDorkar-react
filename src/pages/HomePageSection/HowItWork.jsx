import React from "react";
import {
  FaArrowRight,
  FaUserPlus,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";

const HowItWork = () => {
  const steps = [
    { step: "1", title: "Create Account", icon: <FaUserPlus size={32} /> },
    {
      step: "2",
      title: "Post or Apply for Jobs",
      icon: <FaBriefcase size={32} />,
    },
    {
      step: "3",
      title: "Get Hired or Hire",
      icon: <FaCheckCircle size={32} />,
    },
  ];

  return (
    <section className="py-20 px-6 text-center bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
      <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map(({ step, title, icon }) => (
          <div
            key={step}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8"
          >
            <div className="text-blue-700 mb-4 flex justify-center">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
