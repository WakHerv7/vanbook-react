import React, {  useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';

const data = [
  { name: 'Meals', value: 50000 },
  { name: 'Rent', value: 200000 },
  { name: 'Repairs', value: 100000 },
  { name: 'Travel expenses', value: 150000 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`N${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Expenses = () => {
  const [selected, setSelected] = useState({
    activeIndex: 0
  });

  const onPieEnter = (_, index) => {
    setSelected({
      activeIndex: index
    })
  }

  return (
    <div className='flex flex-col justify-center items-start gap-4 p-6 bg-white rounded-md shadow-md'>
      <div className='flex justify-between items-center w-full'>
        <div className=''>
          <h1 className='text-md font-semibold'>Expenses</h1>
          <p className='text-sm mt-2 font-thin text-gray-600'>N500,000</p>
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
        <PieChart width={100} height={100}>
          <Pie
            activeIndex={selected.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#03045E"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Expenses;
