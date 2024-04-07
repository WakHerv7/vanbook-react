import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Profit and Loss',
    pv: 1200000,
    uv: 200000,
  }
]

const Spending = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-start gap-4 p-6 bg-white rounded-md shadow-md'>
        <div className='flex justify-between items-center w-full'>
          <div className=''>
            <h1 className='text-md font-semibold'>Profit & Loss</h1>
            <p className='text-sm mt-2 font-thin text-gray-600'>N1,000,000</p>
          </div>
          <div className='px-4 py-3 border-gray-950'>
            <select className='bg-white border border-gray-200 shadow-sm rounded-md py-1 px-3 '>
              <option value='null'>--Select--</option>
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
              <option value='yearly'>Yearly</option>
            </select>
          </div>
        </div>
        <ResponsiveContainer width='100%' height={200}>
          <BarChart data={data} barSize={40}>
            <Bar dataKey='pv' fill='#2E2F5B' />
            <Bar dataKey='uv' fill='#EBB376' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Spending
