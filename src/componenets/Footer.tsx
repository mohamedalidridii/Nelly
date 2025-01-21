import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
<div className="flex items-end min-h-100vh">

    <footer className="w-full bg-teal-800 body-font mt-16">
        <div className="bg-teal-800 container flex flex-col flex-wrap px-5 py-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
            
            <div className="flex flex-wrap flex-grow flex-col mt-8 mb-0 text-center md:pl-20 md:mt-1 md:text-center min-w-100vw">
            <div className='mb-7 text-white '>
                    <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-center">
                        <a className="text-white-500 cursor-pointer hover:text-gray-700">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        
                        <a className="ml-3 text-white-500 cursor-pointer hover:text-gray-700">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-white-500 cursor-pointer hover:text-gray-700">
                            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
                                </path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                    </div>
                <p className="text-sm text-white capitalize xl:text-center">© 2024 All rights reserved - Rym Gamra </p>
            </div>
        </div>
    </footer>

</div>
  )
}

export default Footer