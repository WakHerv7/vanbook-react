import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeCard({ employee }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/employees/${employee.id}`);
  };

  return (
    <div className='flex- flex-col p-3 w-[250px] border rounded-xl cursor-pointer bg-white' onClick={handleClick}>
      <div className='flex flex-row justify-between gap-2 items-center mb-2'>
        <img src="/assets/Michelle.jpg" alt='image' className='w-20 h-20 rounded-full border' />
        <div className='flex flex-col'>
          <h2>{employee.name}</h2>
          <p className='text-xs'>iD: {employee.id}</p>
          <p className='text-xs'>Role: {employee.role}</p>
          <p className='text-xs'>Stats: {employee.status}</p>
        </div>
      </div>
      <div className='flex flex-col justify-around gap-1'>
        <div className='flex justify-between items-center'>
          <p className='text-xs'>Phone:</p>
          <p className='text-xs'>{employee.phone}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-xs'>Address:</p>
          <p className='text-xs'>{employee.address}</p>
        </div>
      </div>
      <hr className='my-2' />
      <div className='flex flex-col justify-around gap-1'>
        <div className='flex justify-between'>
          <p className='text-xs'>Department:</p>
          <p className='text-xs'>{employee.department}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs'>Subject taught:</p>
          <p className='text-xs'>{employee.subject}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs'>Grade/Level:</p>
          <p className='text-xs'>{employee.grade}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs'>Step:</p>
          <p className='text-xs'>{employee.step}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs'>Salary:</p>
          <p className='text-xs'>{employee.salary}</p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
