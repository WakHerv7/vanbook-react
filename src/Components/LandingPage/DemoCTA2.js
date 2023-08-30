import React from 'react'
import { Link } from 'react-router-dom'

const DemoCTA2 = () => {
    return (
        <div className='flex items-center justify-center gap-3'>
            <button
                className='text-[#2E2F5B] py-2 px-5 rounded-lg border text-[.9rem] font-medium flex items-center gap-2 bg-white'
            >
                Learn more
            </button>

            <button
                className='bg-[#2E2F5B] text-white py-2 px-5 rounded-lg text-[.9rem] font-medium'
            >
                <Link to="/signup">
                    Get started
                </Link>
            </button>
        </div>
    )
}

export default DemoCTA2