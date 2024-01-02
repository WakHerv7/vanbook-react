
import { Link } from 'react-router-dom'
import css from './admin.module.css'
import { topDealUsers } from './data'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'

const AdminDashboard = () => {
  return (
    <div className={`p-5`}>
      <div className={`grid_system gap-5 grid grid-cols-4 ${css.grid_row}`}>
        <TopDeals />
        <div className={`${css.box} box2`}>
          <Chart />
        </div>
        <div className={`${css.box} box3`}>box3</div>
        <div className={`${css.box} ${css.box4}`}>box4</div>
        <div className={`${css.box} box5`}>box5</div>
        <div className={`${css.box} box6`}>box6</div>
        <div className={`${css.box} ${css.box7}`}>box7</div>
        <div className={`${css.box} box8`}>box8</div>
        <div className={`${css.box} box9`}>box9</div>
      </div>
    </div>
  )
}

export default AdminDashboard

export const TopDeals = () => {
  return (
    <div className={`${css.box} ${css.box1} flex-col flex`}>
      <h1 className=' text-3xl'>Top Deals</h1>
      <div className={`list flex-1 flex-col justify-around flex pb-24`}>
        {
          topDealUsers.map(item => (
            <div key={item.id} className={`listItem items-center justify-between flex`}>
              <div className={`user-section gap-4 items-center flex`}>
                <img className='w-10 h-10 object-cover' src={item.img} alt="avatar" />
                <div>
                  <h2 className='font-semibold'> {item.username} </h2>
                  <p className='text-xs text-gray-500'> {item.email} </p>
                </div>
              </div>
              <span className={`amount-section font-semibold`}> ${item.amount} </span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export const Chart = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  return (
    <div className='flex h-full'>
      <div className="main_info flex-col justify-around flex flex-[2] h-full">
        <div className='title items-center flex'>
          <img src="/tech64Logo.svg" alt="logo" />
          <span>User Title</span>
        </div>

        <div className='text-3xl'>11.238</div>
        <Link to={'/'}> View all</Link>
      </div>
      <div className="chart_info flex-col justify-between flex flex-1 h-full">
        <div className="chart h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
              <Tooltip />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="summary text-right flex-col flex">
          <span className="font-bold text-sm text-green-400">45%</span>
          <span className='text-xs text-gray-500'>This month</span>
        </div>
      </div>
    </div>
  )
}