import React from 'react'
import { Link } from 'react-router-dom'

const Categories = ({isLoading,categories}) => {
  return (
    <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-8">Explore by Category</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <Link
                to="/job-apply"
                key={cat.id || cat.name}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200"
              >
                {cat.name || cat}
              </Link>
            ))}
          </div>
        )}
      </section>
  )
}

export default Categories