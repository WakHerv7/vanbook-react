import React from 'react'
import { Link } from 'react-router-dom'

const DemoCTA = () => {
    return (
        <div className='flex items-center justify-center gap-3'>
            <a
                className='text-[#2E2F5B] py-2 px-4 rounded-lg border text-[.9rem] font-medium flex justify-center items-center gap-2 bg-slate-300 hover:bg-slate-400 w-[130px]'
                href="https://drive.google.com/file/d/1o8UWLwAbP2IMJtIH_0RgiBqPwgEza9zW/view?usp=sharing"
                target="_blank" rel='noreferrer'
            >
                <img src="assets/play-circle.png" alt="" width="15"/>
                Demo
            </a>

            <button
                className='bg-[#2E2F5B] text-white py-2 px-4 rounded-lg text-[.9rem] font-medium'
            >
                <Link to="/join-wait-list">
                    Join wait-list
                </Link>
            </button>
        </div>
    )
}

export default DemoCTA