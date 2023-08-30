import React from 'react'
import DemoCTA2 from './DemoCTA2'

const Trial = () => {
    return (
        <section className='bg-[#F9FAFB] h-[50vh] max-h-[500px]'>
            <div className='flex flex-col text-center justify-center items-center w-full h-full'>
                <span className='text-[#101828] text-[2.1rem] font-medium mb-4'>
                    Start your free trial
                </span>
                <span className='text-[#667085] text-[1.3rem] font-light'>Join over 4,000+ startups already growing with Vanbook.</span>

                <div className='mt-8'>
                    <DemoCTA2 />
                </div>
            </div>

        </section>
    )
}

export default Trial