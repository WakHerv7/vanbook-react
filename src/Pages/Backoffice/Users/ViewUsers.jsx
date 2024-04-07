import React from 'react';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../../../Components/Table/UserTable';
import { userData } from '../../../constants';

const ViewUsers = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('create-users');
  }

  return (
    <div className='p-3'>
      <div className='flex justify-between items-center px-10 py-2 mt-4 mb-2 border-b-2'>
        <h3 className='font-bold text-lg'>Users</h3>
        <button 
          className='px-10 py-2 bg-[#2e2f5b] text-white rounded-xl text-sm'
          onClick={() => handleClick()}
        >
          Add new user
        </button>
      </div>
      <UsersTable data={userData} />
      <div className='flex justify-between items-center px-10 p-3 mt-3'>
        <div className='flex justify-between items-center gap-2 w-[200px]'>
          <div className='text-center border shadow-sm rounded-lg px-4 py-3 w-24 hover:bg-gray-100 cursor-pointer'>Previous</div>
          <div className='text-center border shadow-sm rounded-lg px-4 py-3 w-24 hover:bg-gray-100 cursor-pointer'>Next</div>
        </div>
        <span>Page 1</span>
      </div>
    </div>
  )
}

export default ViewUsers
