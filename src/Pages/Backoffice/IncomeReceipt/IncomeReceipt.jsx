import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { getDate } from '../Employees/utils';
import { BsPrinter } from "react-icons/bs";


import { IoIosArrowDown } from "react-icons/io";

const IncomeReceipt = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  }

  const handleToChange = (e) => {
    setTo(e.target.value);
  }


  return (
    <div className='w-full bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center gap-4 px-8 py-2 border-b-2'>
        <div className='flex justify-around items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white hover:rounded-lg' onClick={() => navigate(-1)}>
          <FaArrowLeftLong className='w-3 h-3'/><span className='text-sm text-center font-thin'>Back</span>
        </div>
        <form className='flex w-[60%]'>
          <label htmlFor='from' className='flex justify-between items-center gap-2 mr-4'>From
            <input id='from' name="date" type='date' placeholder='choose date' className='border-none font-thin text-sm rounded-sm p-1' onChange={handleFromChange} />
          </label>
          <label htmlFor='to' className='flex justify-between items-center gap-2 mr-4'>To
            <input id='to' name='to' type='date' placeholder='choose date' className='border-none font-thin text-sm rounded-sm p-1' onChange={handleToChange} />
          </label>
          <label htmlFor='branch' className='flex justify-between items-center gap-2 mr-4'>Branch
            <select id='branch' name='branch' className='border-none font-thin text-sm rounded-sm p-1 w-52'>
              <option value=''>All</option>
              <option value=''>Lagos</option>
              <option value=''>Abuja</option>
              <option value=''>Port Harcourt</option>
            </select>
          </label>
        </form>
        <div>
          <p className='text-sm font-thin'>Date: {getDate()}</p>
        </div>
      </div>
      <div className='w-full px-8 py-2'>
        <div className='flex justify-between items-center border-b py-2'>
          <div className='flex justify-around items-center gap-3 w-80'>
            <h3 className='text-sm font-thin'>Report basic</h3>
            <label htmlFor='accural' className='flex justify-between items-center gap-3'>
              <input type='radio' name='report' id='accural' value='accural' />
              <span className='text-sm font-thin'>Accural</span>
            </label>
            <label htmlFor='cash' className='flex justify-between items-center gap-3'>
              <input type='radio' name='report' id='cash' value='cash' />
              <span className='text-sm font-thin'>Cash</span>
            </label>
          </div>
          <div className='flex justify-between items-center gap-2 p-2 bg-white cursor-pointer rounded-lg'>
            <BsPrinter />
            <span className='text-sm font-thin'>Print</span>
          </div>
        </div>
      </div>
      <div className='w-full md:w-[80%] mx-auto mt-6 bg-white py-6'>
        <h3 className='text-lg font-thin text-center'>XYZ COMPANY</h3>
        <h2 className='text-lg font-semibold text-center'>INCOME STATEMENT</h2>
        {from && to && (
          <p className='text-sm font-normal text-center'>{from} through {to}</p>
          )
        }
        <ul className='my-10'>
          <li>
            <div className='flex justify-start items-center gap-1 w-full p-4 bg-gray-100'>
              <IoIosArrowDown /> <span>Income</span>
            </div>
            <ul>
              <li>
                <div className='flex justify-start items-center gap-1 w-full px-10 py-2 bg-gray-100'>
                  <IoIosArrowDown /> <span>200L Administrative</span>
                </div>
                <ul>
                  <li className={`w-full md:w-[60%] mx-auto`}>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>2002 School fees</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-normal text-sm'>2003 Hostel fees</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-bold text-sm'>Total Income</p>
                      <p className='font-semibold text-sm text-right border-b-4 border-t-4 w-24 py-2 px-3'>0.00</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <div className='flex justify-start items-center gap-1 w-full p-4 bg-gray-100'>
              <IoIosArrowDown /> <span>Expenses</span>
            </div>
            <ul>
              <li>
                <div className='flex justify-start items-center gap-1 w-full px-10 py-2 bg-gray-100'>
                  <IoIosArrowDown /> <span>300L Revenue</span>
                </div>
                <ul>
                  <li className={`w-full md:w-[60%] mx-auto`}>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>3002 School fees</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-bold text-sm'>Total Administrative Expenses</p>
                      <p className='font-semibold text-sm text-right border-b-4 border-t-4 w-24 py-2 px-3'>0.00</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <div className='flex justify-start items-center gap-1 w-full px-10 py-2 bg-gray-100'>
                  <IoIosArrowDown /> <span>400L Energy Supplies</span>
                </div>
                <ul>
                  <li className={`w-full md:w-[60%] mx-auto`}>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>4002 Petrol</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>4003 Diesel</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-bold text-sm'>Total Energy Expenses</p>
                      <p className='font-semibold text-sm text-right border-b-4 border-t-4 w-24 py-2 px-3'>0.00</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <div className='flex justify-start items-center gap-1 w-full px-10 py-2 bg-gray-100'>
                  <IoIosArrowDown /> <span>500L Payroll</span>
                </div>
                <ul>
                  <li className={`w-full md:w-[60%] mx-auto`}>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>5002 Salary</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-bold text-sm'>Total Payroll Expenses</p>
                      <p className='font-semibold text-sm text-right border-b-4 border-t-4 w-24 py-2 px-3'>0.00</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <div className='flex justify-start items-center gap-1 w-full px-10 py-2 bg-gray-100'>
                  <IoIosArrowDown /> <span>600L Transport Expenses</span>
                </div>
                <ul>
                  <li className={`w-full md:w-[60%] mx-auto`}>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>6002 Salary</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-bold text-sm'>Total Transport Expenses</p>
                      <p className='font-normal text-sm text-right border-b-4 border-t-4 w-24 py-2 px-3'>0.00</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-bold text-sm'>Total Expenses</p>
                      <p className='font-semibold text-sm text-right border-b-4 border-t-4 w-24 py-2 px-3'>0.00</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <div className='flex justify-between items-center w-full px-6 bg-gray-100'>
          <span className='font-bold text-sm'>Income</span>
          <span className='font-bold text-sm border-b-4 border-t-4 w-24 py-3 text-right'>0.00</span>
        </div>
      </div>
    </div>
  )
}

export default IncomeReceipt;
