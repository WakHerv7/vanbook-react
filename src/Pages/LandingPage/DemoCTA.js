import React from 'react'
import { Link } from 'react-router-dom'
import play from "../../Assets/play-circle.png"

const DemoCTA = () => {
    return (
        <div className='flex items-center justify-center gap-3'>
            <a
                className='text-[#2E2F5B] py-2 px-4 rounded-lg border text-[.9rem] font-medium flex items-center gap-2'
                href="https://drive.google.com/file/d/1o8UWLwAbP2IMJtIH_0RgiBqPwgEza9zW/view?usp=sharing"
                target="_blank"
            >
                <img src={play} alt="" width="15"/>
                Demo
            </a>

            <button
                className='bg-[#2E2F5B] text-white py-2 px-4 rounded-lg text-[.9rem] font-medium'
            >
                <Link to="/signup">
                    Get started
                </Link>
            </button>
        </div>
    )
}

export default DemoCTA