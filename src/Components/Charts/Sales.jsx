import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';

const data = [
  {
    name: 'JAN',
    uv: 40000,
    pv: 24000,
    amt: 24000,
  },
  {
    name: 'FEB',
    uv: 30000,
    pv: 13980,
    amt: 22100,
  },
  {
    name: 'MAR',
    uv: 20000,
    pv: 98000,
    amt: 22900,
  },
  {
    name: 'APR',
    uv: 27800,
    pv: 39080,
    amt: 20000,
  },
  {
    name: 'MAY',
    uv: 18900,
    pv: 48000,
    amt: 21810,
  },
  {
    name: 'JUN',
    uv: 23900,
    pv: 38000,
    amt: 25000,
  },
  {
    name: 'JUL',
    uv: 34900,
    pv: 43000,
    amt: 21000,
  },
  {
    name: 'AUG',
    uv: 13900,
    pv: 43000,
    amt: 21000,
  },
  {
    name: 'SEP',
    uv: 23900,
    pv: 43000,
    amt: 21000,
  },
  {
    name: 'OCT',
    uv: 33900,
    pv: 43000,
    amt: 21000,
  },
  {
    name: 'NOV',
    uv: 43900,
    pv: 43000,
    amt: 21000,
  },
  {
    name: 'DEC',
    uv: 44900,
    pv: 43000,
    amt: 21000,
  },
];

const Sales = () => {
  return (
    <div className='col-span-2 px-4 py-6 bg-white rounded-md shadow-md'>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={150} height={40} data={data}>
          <Bar
            dataKey="uv"
            fill="#2E2F5B"
            barSize={20}
            barCategoryGap={3}
            maxBarSize={10}
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Sales
