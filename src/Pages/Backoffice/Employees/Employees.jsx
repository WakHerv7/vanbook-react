import React, { useState } from 'react';
import EmployeeCard from '../../../Components/Card/EmployeeCard';
import { employeesInfo } from '../../../constants/index';

// import react icons
import { GiSettingsKnobs } from "react-icons/gi";
import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineViewList } from "react-icons/hi";
import { MdAttachment } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";

// import react router dom
import { Link } from 'react-router-dom';


const Employees = () => {
  const [employeesData, setEmployees] = useState(employeesInfo);
  const [isClicked, setIsClicked] = useState(true);
  let view = isClicked ? 'Grid' : 'List';

  const handleViewChange = () => {
    setIsClicked(!isClicked);
  }

  const removeEmployee = (id) => {
    const newEmployees = employeesData.filter((employee) => employee.id !== id);
    setEmployees(newEmployees);
  }

  return (
    <div className='flex flex-col flex-1 px-10 py-3 gap-4'>
      <div className='border-b flex flex-col md:flex-row flex-1 justify-between items-center w-full py-3'>
        <h3 className='text-left md:text-center text-xl font-normal tex-nowrap'>Employee records</h3>
        <div className='flex flex-row gap-2 justify-center items-center w-[70%]'>
          <p className='hidden md:block text-sm'>upload excel template</p>
          <div className='flex flex-row justify-center items-center'>
            <input type='text' placeholder='No file chosen' className='border h-10 px-2 rounded-s-lg text-sm text-gray-400' />
            <button className='w-[105px] h-10 bg-blue-900 text-white px-4 py-2 rounded-e-lg flex flex-row justify-center items-center gap-1'>
              <MdAttachment />choose
            </button>
          </div>
          <Link to="add-employee" className='flex flex-row justify-center items-center gap-1 h-10 bg-blue-900 text-white px-4 py-2 rounded-xl'>
          <FaPlus /> Add employee
          </Link>
          <div className='flex flex-row gap-2 justify-between items-center'>
            <div className='border px-2 py-1 flex justify-center items-center gap-2 rounded-l bg-white'>
              <GiSettingsKnobs className='w-3 h-3'/>
              <span className='hidden md:block text text-sm font-thin'>
                filter
              </span>
            </div>
            <div className='flex flex-row gap-2 rounded-l py-1 px-2 justify-center items-center bg-white border'>
              <span className='hidden md:block text-sm  font-thin'>{view} view</span>
              {view === 'Grid' ? <BsGrid className='w-3 h-3' /> : <HiOutlineViewList className='w-4 h-4' />}
              <span className='hidden md:block'>
                <IoIosArrowDown onClick={handleViewChange}/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='p-4 flex flex-row flex-wrap gap-3'>
        {view === 'Grid' ? (
          employeesData.map((employee, idx) => (
            <EmployeeCard
              key={idx}
              id={Math.floor(Math.random() * 100) + 1}
              name={employee.name}
              role={employee.role}
              phone={employee.phone}
              image='/assets/Michelle.jpg'
              address={employee.address}
              status={employee.status}
              department={employee.department}
              subject={employee.subject}
              grade={employee.grade}
              step={employee.step}
              salary={employee.salary}
            />
          ))
          ) : (
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
                {employeesInfo.map((employee, idx) => (
                  <tr key={idx} className='text-nowrap hover:bg-gray-100 hover:cursor-pointer'>
                    <td className='flex flex-row justify-between gap-1 items-center p-2'>
                      <img src="/assets/Michelle.jpg" alt="photo" className='h-7 w-7 rounded-full' />
                      <div className='flex flex-col justify-start'>
                        <p className='text-xs'>{employee.name}</p>
                        <p className='text-xs text-gray-500 text-left'>ID: {Math.floor(Math.random() * 100) + 1}</p>
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
                      <RiDeleteBin5Line className='w-4 h-4 float-right' onClick={() => removeEmployee(employee.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
      <div></div>
    </div>
  )
}

export default Employees
