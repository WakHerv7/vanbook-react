import React from 'react';
import { useParams } from 'react-router-dom';
import { employeesInfo } from '../../../constants';

import { useNavigate } from 'react-router-dom';

import { FaArrowLeftLong } from "react-icons/fa6";
import { getDate } from './utils';

import { MdOutlineEdit } from "react-icons/md";

const EmployeesDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const employee = employeesInfo.find((employee) => employee.id === parseInt(id));

  return (
    <div className='flex flex-col justfiy-start bg-gray-100 p-4'>
      <div className='flex justify-between items-center mb-3 gap-4 p-3 border-b-2 w-full'>
        <div className='flex justify-around items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white hover:rounded-lg' onClick={() => navigate(-1)}>
          <FaArrowLeftLong className='w-3 h-3'/><span className='text-sm text-center font-thin'>Back</span>
        </div>
        <div>
          <p className='text-sm font-thin'>Date: {getDate()}</p>
        </div>
      </div>
      <div className='w-[95%] mx-auto'>
        <h3 className='text-sm md:text-lg font-normal border-b mb-4'>Employee details</h3>
        <div className='flex justify-between gap-3'>
          <div className='flex flex-col gap-1 bg-white pb-3 rounded-lg shadow-lg w-56 relative'>
            <div  className='absolute right-[-5px] top-[-5px] bg-white rounded-full p-2 shadow-sm cursor-pointer hover:shadow-lg'>  
              <MdOutlineEdit className='object-contain' />
            </div>
            <img src='/assets/Michelle.jpg' alt='image' className='w-25 h-25 rounded-lg border object-cover' />
            <p className='font-normal text-sm md:text-lg px-3'>{employee.name}</p>
            <div className='flex flex-col p-2 gap-2'>
              <div className='flex flex-col justify-start items-start bg-gray-100 rounded-lg p-2'>
                <p className='text-xs'>ID:</p>
                <p className='font-normal text-sm md:text-lg'>{employee.id}</p>
              </div>
              <div className='flex flex-col justify-start items-start bg-gray-100 rounded-lg p-2'>
                <p className='text-xs'>Date of resumption</p>
                <p className='font-normal text-sm'>{getDate()}</p>
              </div>
              <div className='flex flex-col justify-center items-start bg-gray-100 rounded-lg p-2'>
                <p className='text-xs'>Department</p>
                <p className='font-normal text-sm md:text-lg'>{employee.department}</p>
              </div>
              <div className='flex flex-col justify-center items-start bg-gray-100 rounded-lg p-2'>
                <p className='text-xs'>Role</p>
                <p className='font-normal text-sm md:text-lg'>{employee.role}</p>
              </div>
              <div className='flex flex-col justify-center items-start bg-gray-100 rounded-lg p-2'>
                <p className='text-xs'>Salary</p>
                <p className='font-normal text-sm md:text-lg'># {employee.salary}</p>
              </div>
              <div className='flex flex-col justify-center items-start bg-gray-100 rounded-lg p-2'>
                <p className='text-xs'>Status</p>
                <p className='font-normal text-sm md:text-lg'>{employee.status}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-10'>
            <div  className='basis-1/2 bg-white p-4 rounded-lg w-[900px] shadow-lg'>
              <div className='w-full flex flex-row justify-between items-center'>
                <h3 className='text-sm md:text-lg font-normal mb-2'>Personal details</h3>
                <MdOutlineEdit className='object-contain' />
              </div>
              <div className='flex flex-col bg-white gap-2'>
                <div className='flex justify-betwen items-center gap-6'>
                  <div className='basis-1/2 bg-gray-100 p-2 rounded-lg'>
                    <p className='text-xs'>Firstname</p>
                    <p className='font-normal text-sm md:text-lg'>{employee.name.split(" ")[0]}</p>
                  </div>
                  <div className='basis-1/2 bg-gray-100 p-2 rounded-lg'>
                    <p className='text-xs'>Middlename</p>
                    <p className='font-normal text-sm md:text-lg'>{employee.name.split(" ")[1]}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='bg-gray-100 p-2 rounded-lg'>
                    <p className='text-xs'>Lastname</p>
                    <p className='font-normal text-sm md:text-lg'>{employee.name}</p>
                  </div>
                  <div className='bg-gray-100 p-2 rounded-lg'>
                    <p className='text-xs'>Gender</p>
                    <p className='font-normal text-sm md:text-lg'>{employee.gender}</p>
                  </div>
                  <div className='bg-gray-100 p-2 rounded-lg'>
                    <p className='text-xs'>Date of birth</p>
                    <p className='font-normal text-sm md:text-lg'>{employee.dob}</p>
                  </div>
                </div>
              </div>
            </div>
            <div  className='basis-1/2 bg-white p-4 rounded-lg shadow-lg'>
              <div className='w-full flex flex-row justify-between items-center'>
                <h3 className='text-sm md:text-lg font-normal mb-2'>Contact details</h3>
                <MdOutlineEdit className='object-contain' />
              </div>
              <div className='flex flex-col bg-white gap-2'>
                <div className='flex flex-col gap-2'>
                  <div className='basis-1/2 bg-gray-100 p-2 rounded-lg'>
                    <p className='text-xs'>Home adress</p>
                    <p className='font-normal text-sm md:text-lg'>{employee.address}</p>
                  </div>
                  <div className='basis-1/2 bg-gray-100 p-2 rounded-lg'>
                    <p className='text-xs'>Phone number</p>
                    <p className='font-normal text-sm md:text-lg'>{employee.phone}</p>
                  </div>
                  <div className='basis-1/2 bg-gray-100 p-2 rounded-lg'>
                    <p className='text-xs'>Email</p>
                    <p className='font-normal text-sm md:text-lg'>{employee.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeesDetail;