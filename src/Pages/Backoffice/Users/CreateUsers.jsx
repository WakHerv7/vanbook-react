import React from 'react';
import { Link } from 'react-router-dom';
import FileUploader from '../../../Components/FileUploader/FileUploader';

const fieldOnChange = (fieldValues) => {
  console.log(fieldValues)
}

const CreateUsers = () => {
  const mediaUrl = '/assets/avatar.png';

  return (
    <div className='py-4 px-10'>
      <Link to="/dashboard/users" className='font-thin text-sm mb-2'>Back to users list</Link>
      <h2 className='border-b-2 py-3 mb-6 font-normal text-lg'>Create new users</h2>
      <FileUploader fieldOnChange={fieldOnChange} mediaUrl={mediaUrl} />
      <div className='flex flex-wrap justify-start items-center gap-1 w-full md:w-[70%]'>
        <label className='flex flex-col font-thin text-sm w-full lg:w-[400px]' htmlFor='firstName'>Name of user*
          <input type='text' id='firstName' className='w-full p-3 border-2 rounded-lg' placeholder='Enter the user name' />
        </label>
        <label className='flex flex-col font-thin text-sm w-full lg:w-[400px]' htmlFor='email'>Email*
          <input type='text' id='email' className='w-full p-3 border-2 rounded-lg' placeholder='Enter the email address' />
        </label>
        <h2 className='w-full font-normal text-lg mt-6'>Access level</h2>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='dashboard'>Dashboard*
          <select id='dashboard' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='business-overview'>Business overview*
          <select id='business-overview' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='budget'>Budget*
          <select id='budget' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='report'>Report*
          <select id='report' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='employee'>Employee*
          <select id='employee' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='salesAndExpense'>Sales & expense*
          <select id='salesAndExpense' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='schedule'>Schedule*
          <select id='schedule' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='users'>Users*
          <select id='users' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <button className='bg-[#2e2f5b] text-white p-3 rounded-full mt-6 w-full'>Create</button>
      </div>
    </div>
  )
}

export default CreateUsers
