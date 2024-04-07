import React from 'react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'

const data = [
  {
    name: 'overdue',
    pv: 50000,
    pu: 80000,
    amt: 50000
  },
  {
    name: 'deposited',
    pv: 50000,
    pu: 80000,
    amt: 50000
  },
]

const Invoices = () => {
  return (
    <div className='flex flex-col justify-center items-start gap-4 p-6 bg-white rounded-md shadow-md'>
      <div className='w-full px-10 py-6'>
        <h1 className='text-xl font-semibold'>Invoices</h1>
      </div>
      <ResponsiveContainer width='100%' height={200}>
        <BarChart data={data} barSize={40}>
          <Bar dataKey='pv' stackId="a" fill='#2E2F5B' />
          <Bar dataKey='pu' stackId="a" fill='#EBB376' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Invoices
