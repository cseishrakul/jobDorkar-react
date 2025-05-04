import React from 'react'
import { Link } from 'react-router-dom'

const Payment = () => {
  return (
    <div>
        <h2 className="text-center text-4xl mt-10 pt-10">Payment successful. Your post will be promoted to the top of the list. Return to <Link to="/dashboard" className='text-blue-800'>Dashboard</Link> </h2>
    </div>
  )
}

export default Payment