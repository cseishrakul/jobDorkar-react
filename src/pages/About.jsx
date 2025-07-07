import React from "react";
import Hero from "./HomePageSection/Hero";
import Company from "./HomePageSection/Company";
import CTA from "./HomePageSection/CTA";
import Blog from "./HomePageSection/Blog";

const About = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text content */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">About Us</h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Welcome to JobDorkar! We are dedicated to connecting job seekers
              with their ideal careers in the technology, engineering, and
              computer sectors. Our platform helps you discover thousands of
              jobs and provides the tools and support you need to succeed.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to make job hunting simple, fast, and efficient.
              Whether you're looking for your first job or your next big
              opportunity, we've got you covered.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
              alt="About us"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
      <Company />

      <CTA />
      <Blog />
    </div>
  );
};

export default About;
