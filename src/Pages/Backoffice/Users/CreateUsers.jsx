import React from 'react';
import { Link } from 'react-router-dom';
import UsersForm from '../../../Components/Form/UsersForm';

const fieldOnChange = (fieldValues) => {
  console.log(fieldValues)
}

const CreateUsers = () => {
  const mediaUrl = '/assets/avatar.png';

  return (
    <div className='py-4 px-10'>
      <Link to="/dashboard/users" className='font-thin text-sm mb-2'>Back to users list</Link>
      <h2 className='border-b-2 py-3 mb-6 font-normal text-lg'>Create new users</h2>
      <UsersForm mediaUrl={mediaUrl} action="Create" />
    </div>
  )
}

export default CreateUsers
