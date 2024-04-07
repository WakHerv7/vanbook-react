import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const TableView = ({ data }) => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(data);

  const removeEmployee = (id) => {
    const newEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(newEmployees);
  }

  const handleEdit = (id) => {
    navigate(`edit-user/${id}`);
  }

  return (
    <>
      <table className='w-full md:w-[90%] mx-auto mt-10'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='text-center py-1 px-4 text-[13px]'>S/N</th>
                  <th className='text-center py-1 px-4 text-[13px]'>Name</th>
                  <th className='text-center py-1 px-4 text-[13px]'>Last Login</th>
                  <th className='text-center py-1 px-4 text-[13px]'>Email</th>
                  <th className='text-center py-1 px-4 text-[13px]'>Date Created</th>
                  <th className='text-center py-1 px-4 text-[13px]'>Created By</th>
                  <th className='text-center py-1 px-4 text-[13px]'>Date Activated</th>
                  <th className='text-center py-1 px-4 text-[13px]'>Access Level</th>
                  <th className='text-center py-1 px-4 text-[13px]'>Manage</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className='text-nowrap hover:bg-gray-100'>
                    <td className='py-3 text-sm text-center'>{employee.id}</td>
                    <td className='py-3 text-sm text-center'>{employee.name}</td>
                    <td className='py-3 text-sm text-center'>{employee.lastLogin}</td>
                    <td className='py-3 text-sm text-center'>{employee.email}</td>
                    <td className='py-3 text-sm text-center'>{employee.dateCreated}</td>
                    <td className='py-3 text-sm text-center'>{employee.createdBy}</td>
                    <td className='py-3 text-sm text-center'>{employee.dateActivated}</td>
                    <td className={`py-3 text-sm text-center ${employee.accesslevel === 'Full access' ? 'text-green-500' : 'text-red-500'}`}>{employee.accesslevel}</td>
                    <td className='flex justify-center items-center gap-3 py-3'>
                      <FiEdit className='w-4 h-4 cursor-pointer' onClick={() => handleEdit(employee.id)} />
                      <RiDeleteBin5Line className='w-4 h-4 cursor-pointer' onClick={(e) => {
                        e.stopPropagation();
                        removeEmployee(employee.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    </>
  )
}

export default TableView
