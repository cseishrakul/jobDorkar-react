import React from 'react'
import { FaEnvelopeOpen, FaRocket } from 'react-icons/fa'

const NewsLetter = () => {
  return (
    <div className=''>
        <div className="">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2"> 
                <FaEnvelopeOpen className='' />Email me for Jobs
            </h3>
            <p className="text-black/75 text-base mb-4"> Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <div className="w-full space-x-4">
                <input type="email" className="w-full block py-2 mb-2 rounded-sm pl-3 border focus:outline-none" placeholder='your@email.com' />
                <input type="submit" value={"Subscribe"} className="w-full block py-2 pl-3 border focus:outline-none bg-blue-700 rounded-sm text-white cursor-pointer font-semibold" />

            </div>
        </div>
        <div className="mt-20">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2"> 
                <FaRocket className='' />Get notice faster
            </h3>
            <p className="text-black/75 text-base mb-4"> Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <div className="w-full space-x-4">
                <input type="submit" value={"Upload your resume"} className="w-full block py-2 pl-3 border focus:outline-none bg-blue-700 rounded-sm text-white cursor-pointer font-semibold" />

            </div>
        </div>
    </div>
  )
}

export default NewsLetter