import React from 'react'

const Countdown = ({categoryCount,totalJobs}) => {
  return (
     <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          <div>
            <div className="text-5xl font-extrabold text-blue-600">
              {categoryCount} +
            </div>
            <p className="text-gray-700 mt-2 font-medium">Categories</p>
          </div>
          <div>
            <div className="text-5xl font-extrabold text-green-600">
              {totalJobs} +
            </div>
            <p className="text-gray-700 mt-2 font-medium">Job Posts</p>
          </div>
          <div>
            <div className="text-5xl font-extrabold text-purple-600">🚀</div>
            <p className="text-gray-700 mt-2 font-medium">Coming Soon</p>
          </div>
          <div>
            <div className="text-5xl font-extrabold text-orange-600">✨</div>
            <p className="text-gray-700 mt-2 font-medium">More Features</p>
          </div>
        </div>
      </section>
  )
}

export default Countdown