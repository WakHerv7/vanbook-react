import React from 'react';
import { insightsData as data } from '.././../constants';

const Insight = () => {
    return (
        <section>
            <div className='w-[85%] mx-auto py-16'>
                <div className='flex flex-col'>
                    <span className="font-semibold text-[.9rem] text-[#2E2F5B]">Launch faster</span>
                    <span className="text-[2.3rem] font-medium mb-2 mt-2 text-[#101828]">
                        Build something great
                    </span>
                    <span className='text-[#667085] w-[55%]'>We’ve done all the heavy lifting so you don’t have to — get all the data you need to launch and grow your business faster.</span>
                </div>

                <div className='flex gap-8 items-center pt-12'>
                    <div className='grid grid-cols-2 gap-10'>
                        {data.map((data, index) => {
                            const { figure, details, text } = data;
                            return (
                                <div className='flex flex-col text-center' key={index}>
                                    <span
                                        className='text-[2.4rem] text-[#2E2F5B] font-semibold'
                                    >
                                        {figure}
                                    </span>

                                    <span
                                        className='text-[1rem] text-[#101828] mb-3 font-medium'
                                    >
                                        {details}
                                    </span>

                                    <span
                                        className='text-[.8rem] text-[#667085] px-8'
                                    >
                                        {text}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <div>
                        <img
                            src="assets/insight_img.png"
                            alt=""
                            width={700}
                            height={600}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Insight