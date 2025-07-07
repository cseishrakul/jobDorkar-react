import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-blue-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">
          Join thousands of others finding jobs or hiring talent on JobDorkar.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/job-apply"
            className="bg-white text-blue-900 font-bold px-6 py-2 rounded-full shadow hover:bg-blue-800 hover:text-white"
          >
            Browse Jobs
          </Link>
          <Link
            to="/dashboard"
            className="bg-blue-800 text-white font-bold px-6 py-2 rounded-full hover:bg-gray-100 hover:text-blue-900"
          >
            Post a Job
          </Link>
        </div>
      </section>
  )
}

export default CTA