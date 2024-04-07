import React from 'react'
import FileUploader from '../FileUploader/FileUploader'

const UsersForm = ({ mediaUrl, action }) => {
  const handlesubmit = (action) => {
    if (action === 'Create') {
      console.log('User created');
    } else {
      console.log('User updated');
    }
  }

  const fieldOnChange = (fieldValues) => {
    console.log(fieldValues)
  }

  return (
    <>
      <FileUploader mediaUrl={mediaUrl} fieldOnChange={fieldOnChange} />
      <form className='flex flex-wrap justify-start items-center gap-2 w-full md:w-[70%]'>
        <label className='flex flex-col font-thin text-sm w-full lg:w-[400px]' htmlFor='firstName'>Name of user*
          <input type='text' id='firstName' className='w-full p-3 border-2 rounded-lg' placeholder='Enter the user name' />
        </label>
        <label className='flex flex-col font-thin text-sm w-full lg:w-[400px]' htmlFor='email'>Email*
          <input type='text' id='email' className='w-full p-3 border-2 rounded-lg' placeholder='Enter the email address' />
        </label>
        <h2 className='w-full font-normal text-lg mt-6'>Access level</h2>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='dashboard'>Dashboard*
          <select name='dashboard' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>--Select--</option>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='business-overview'>Business overview*
          <select name='business-overview' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>--Select--</option>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='budget'>Budget*
          <select name='budget' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>--Select--</option>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='report'>Report*
          <select name='report' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>--Select--</option>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='employee'>Employee*
          <select name='employee' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>--Select--</option>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='salesAndExpense'>Sales & expense*
          <select name='salesAndExpense' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>--Select--</option>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='schedule'>Schedule*
          <select name='schedule' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>--Select--</option>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <label className='flex flex-col mt-2 font-thin text-sm w-full lg:w-[400px]' htmlFor='users'>Users*
          <select name='users' defaultValue='--Select--' className='p-3 border-2 rounded-lg'>
            <option value='manager'>--Select--</option>
            <option value='manager'>Full access</option>
            <option value='staff'>View only</option>
          </select>
        </label>
        <button className='bg-[#2e2f5b] text-white p-3 rounded-full mt-6 w-full' onSubmit={() => handlesubmit(action)}>Create</button>
      </form>
    </>
  )
}

export default UsersForm
