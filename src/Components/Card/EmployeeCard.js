import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeCard({
  name,
  id,
  role,
  status,
  phone,
  address,
  image,
  department,
  subject,
  grade,
  step,
  salary,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/employees/${id}`);
  };

  return (
    <div className='flex- flex-col p-3 w-[250px] border rounded-xl cursor-pointer bg-white' onClick={handleClick}>
      <div className='flex flex-row justify-between gap-2 items-center mb-2'>
        <img src={image} alt='image' className='w-20 h-20 rounded-full border' />
        <div className='flex flex-col'>
          <h2>{name}</h2>
          <p className='text-xs'>iD: {id}</p>
          <p className='text-xs'>Role: {role}</p>
          <p className='text-xs'>Stats: {status}</p>
        </div>
      </div>
      <div className='flex flex-col justify-around gap-1'>
        <div className='flex justify-between items-center'>
          <p className='text-xs'>Phone:</p>
          <p className='text-xs'>{phone}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-xs'>Address:</p>
          <p className='text-xs'>{address}</p>
        </div>
      </div>
      <hr className='my-2' />
      <div className='flex flex-col justify-around gap-1'>
        <div className='flex justify-between'>
          <p className='text-xs'>Department:</p>
          <p className='text-xs'>{department}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs'>Subject taught:</p>
          <p className='text-xs'>{subject}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs'>Grade/Level:</p>
          <p className='text-xs'>{grade}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs'>Step:</p>
          <p className='text-xs'>{step}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs'>Salary:</p>
          <p className='text-xs'>{salary}</p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
