import React from 'react'
import User from './User'
import Shortcuts from './Shortcuts'
import DonutChart from './DonutChart'

const Profile = ({darkMode,user}) => {
  return (
    <div
      className={`px-2 py-4 mt-2 rounded-lg w-full lg:w-60 xl:w-80 flex flex-col justify-between gap-4 transition-all duration-300 ${
        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-900'
      }`}
    >
      <User darkMode={darkMode} user={user} />
      <Shortcuts darkMode={darkMode} />
      <DonutChart darkMode={darkMode} />
    </div>
  )
}

export default Profile