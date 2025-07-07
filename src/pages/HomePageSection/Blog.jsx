import React from "react";

const Blog = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
        <p className="text-gray-600 mb-12">
          Stay updated with the latest job market trends and career tips.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src="/images/hero.avif"
                alt="Blog"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2">
                  How to Prepare for a Job Interview
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn essential tips and strategies to ace your next interview
                  confidently.
                </p>
                <a
                  href="#"
                  className="text-blue-600 font-medium hover:underline text-sm"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
