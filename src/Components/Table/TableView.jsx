import React from 'react'

import { RiDeleteBin5Line } from "react-icons/ri";

const TableView = ({ employeeData, handleClick, removeEmployee }) => {
  const employees = employeeData;

  return (
    <>
      <table className='w-full'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='text-left py-1 px-4 text-[13px] border'>Employee Name</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Role</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Grade</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Step</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Status</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Department</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Subject Taught</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Salary</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Total income received</th>
                  <th className='text-left py-1 px-4 text-[13px] border'>Address</th>
                  <th className='w-8'></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, idx) => (
                  <tr key={idx} className='text-nowrap hover:bg-gray-100 hover:cursor-pointer' onClick={() => handleClick(employee.id)}>
                    <td className='flex flex-row justify-between gap-1 items-center p-2'>
                      <img src="/assets/Michelle.jpg" alt="photo" className='h-7 w-7 rounded-full' />
                      <div className='flex flex-col justify-start'>
                        <p className='text-xs'>{employee.name}</p>
                        <p className='text-xs text-gray-500 text-left'>ID: {employee.id}</p>
                        <p className='text-xs text-gray-500'>{employee.phone}</p>
                      </div>
                    </td>
                    <td className='p-1 text-sm text-center'>{employee.role}</td>
                    <td className='p-1 text-sm text-center'>{employee.grade}</td>
                    <td className='p-1 text-sm text-center'>{employee.step}</td>
                    <td className='p-1 text-sm text-center'>{employee.status}</td>
                    <td className='p-1 text-sm text-center'>{employee.department}</td>
                    <td className='p-1 text-sm text-center'>{employee.subject}</td>
                    <td className='p-1 text-sm text-center'># {employee.salary}</td>
                    <td className='p-1 text-sm text-center'># {employee.salary}</td>
                    <td className='p-1 text-sm text-center'>{employee.address}</td>
                    <td>
                      <RiDeleteBin5Line className='w-4 h-4 float-right' onClick={(e) => {
                        e.stopPropagation();
                        removeEmployee(employee.id);
                      }}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    </>
  )
}

export default TableView
