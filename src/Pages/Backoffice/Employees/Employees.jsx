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
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

// import react router dom
import { Link, useNavigate } from 'react-router-dom';
import TableView from '../../../Components/Table/TableView';


const Employees = () => {
  const [employeesData, setEmployees] = useState(employeesInfo);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  let view = localStorage.getItem('View') ? localStorage.getItem('View') : 'Grid';

  const handleViewChange = () => {
    localStorage.setItem('View', isClicked ? 'Grid' : 'List');
    view = localStorage.getItem('View');
    setIsClicked(!isClicked);
  }

  const removeEmployee = (id) => {
    const newEmployees = employeesData.filter((employee) => employee.id !== id);
    setEmployees(newEmployees);
  }

  const handleClick = (id) => {
    navigate(`/dashboar/employees/${id}`);
  };

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
      {employeesData.length === 0 ? (
        <div className='flex justify-center items-center p-4 flex-1'>
          <h3 className='text-center text-lg font-normal'>No employee records found</h3>
        </div>
        ) : (
        <div className='p-4 flex flex-row flex-wrap gap-3'>
          {view === 'Grid' ? (
            employeesData.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))) : (
            <TableView employeeData={employeesData} removeEmployee={removeEmployee} handleClick={handleClick} />
            )
          }
        </div>
        )
      }
      <div className='flex flex-row flex-1 bg-white p-3 justify-between items-center sticky'>
        <div className='border p-2 rounded-lg flex justify-between items-center gap-3'>
          <FaArrowLeftLong />
          <span>
            Prev
          </span>
        </div>
        <div className='flex flex-row justify-around items-center p-2'>
          {[1, 2, 3, 4, 5].map((count) => {
            return <div key={count} className={`boarder rounded-lg px-3 py-2 text-purple-600 w-10 h-10 text-center ${count === 1 && `bg-gray-100`}`}>{count}</div>;
          })}
        </div>
        <div className='border p-2 rounded-lg flex justify-around items-center gap-3'>
          <span>Next</span>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}

export default Employees;
