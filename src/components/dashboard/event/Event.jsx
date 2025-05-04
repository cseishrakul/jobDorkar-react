import React from 'react'
import Title from '../../../ui/Title'
import { events } from '../../../constants'
import Item from './Item'

const Event = ({ darkMode }) => {
  return (
    <div
      className={`p-5 rounded-2xl flex-1 flex flex-col gap-5 transition-colors duration-300 shadow-sm ${
        darkMode ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-800'
      }`}
    >
      <Title darkMode={darkMode}>Event</Title>
      {events.map((event, index) => (
        <Item key={index} event={event} darkMode={darkMode} />
      ))}
    </div>
  )
}

export default Event
