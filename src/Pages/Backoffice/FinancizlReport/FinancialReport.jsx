import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { getDate } from '../Employees/utils';
import { BsPrinter } from "react-icons/bs";


import { IoIosArrowDown } from "react-icons/io";

const FinancialReport = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showIncome, setShowIncome] = useState(false);
  const [showIncomeList, setShowIncomeList] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showExpensesList, setShowExpensesList] = useState(false);

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  }

  const handleToChange = (e) => {
    setTo(e.target.value);
  }

  const handleShowIncome = () => {
    setShowIncome(!showIncome);
  }

  const handleShowIncomeList = () => {
    setShowIncomeList(!showIncomeList);
  }

  const handleShowExpenses = () => {
    setShowExpenses(!showExpenses);
  }

  const handleShowExpensesList = () => {
    setShowExpensesList(!showExpensesList);
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
        <h2 className='text-lg font-semibold text-center'>FINANCIAL POSITION</h2>
        {from && to && (
          <p className='text-sm font-normal text-center'>{from} through {to}</p>
          )
        }
        <ul className='my-10'>
          <li>
            <div className='flex justify-start items-center gap-1 w-full p-4 bg-gray-100'>
              <IoIosArrowDown onClick={handleShowIncome} /> <span className='font-semibold'>Assets</span>
            </div>
            <ul className={showIncome ? `` : `hidden`}>
              <li>
                <div className='flex justify-start items-center gap-1 w-full px-10 py-2 bg-gray-100'>
                  <IoIosArrowDown onClick={handleShowIncomeList} /> <span>11001. Current Assets</span>
                </div>
                <ul className={`w-full md:w-[60%] mx-auto`}>
                  <li>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>11002. Cash</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-normal text-sm'>11003. Bank</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-normal text-sm'>11004. Debtor</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-normal text-sm'>11005. Inventory</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex justify-between items-center gap-4 p-2'>
                      <p className='font-semibold text-sm'>Total Income</p>
                      <p className='font-semibold text-sm text-right border-b-4 border-t-4 w-24 py-2 px-3'>0.00</p>
                    </div>
                  </li>
                </ul>
              </li>
              <ul>
                <li>
                  <div className='flex justify-between items-center gap-1 w-full px-10 py-2 pr-[205px] bg-gray-100'>
                    <div className='flex justify-between items-center gap-2'>
                      <IoIosArrowDown onClick={handleShowIncomeList} /> <span>12000. Fixed Assets</span>
                    </div>
                    <div className='flex justify-between items-center gap-10'>
                      <p>Cost</p>
                      <p>Depreciation</p>
                      <p>NBV</p>
                    </div>
                  </div>
                  <ul className={`w-full md:w-[60%] mx-auto`}>
                    <li>
                      <div className='flex justify-between items-center gap-4 w-full p-2'>
                        <p className='font-normal text-sm basis-1/2'>12002. Plant, Property and Equipment</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                      </div>
                    </li>
                    <li>
                      <div className='flex justify-between items-center gap-4 p-2'>
                        <p className='font-normal text-sm basis-1/2'>12003. Furniture & fittings</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                      </div>
                    </li>
                    <li>
                      <div className='flex justify-between items-center gap-3 p-2'>
                        <p className='font-normal text-sm basis-1/2'>12004. Motor vehicle</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                      </div>
                    </li>
                    <li>
                      <div className='flex justify-between items-center gap-4 p-2 border-t-4 border-b-4'>
                        <p className='font-normal text-sm basis-1/2'>12005. Others</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                      </div>
                    </li>
                    <li>
                      <div className='flex justify-between items-center gap-4 p-2 border-t-4 border-b-4'>
                        <p className='font-normal text-sm basis-1/2'>Total Fixed Assetss</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                        <p className='font-normal text-sm'>0.00</p>
                      </div>
                    </li>
                    <li>
                      <div className='flex justify-between items-center gap-4 p-2'>
                        <p className='font-semibold text-sm'>Total Income</p>
                        <p className='font-semibold text-sm text-right border-b-4 border-t-4 w-24 py-2 px-3'>0.00</p>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <div className='flex justify-start items-center gap-1 w-full p-4 bg-gray-100'>
              <IoIosArrowDown onClick={handleShowIncome} /> <span className='font-semibold'>Liability and Equity</span>
            </div>
            <ul>
              <li>
                <div className='flex justify-start items-center gap-1 w-full p-4 bg-gray-100'>
                  <IoIosArrowDown onClick={handleShowIncome} /> <span className='font-semibold'>13001. Current Liabilities</span>
                </div>
                <ul>
                  <li>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>13002. Creditors</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>13003. Advance receipts</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>13004. Short-term loan</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>Total Current liabilities</p>
                      <p className='font-normal text-sm border-t-2 border-b-2'>0.00</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <div className='flex justify-start items-center gap-1 w-full p-4 bg-gray-100'>
                  <IoIosArrowDown onClick={handleShowIncome} /> <span className='font-semibold'>14001. Long-term Liabilities</span>
                </div>
                <ul>
                  <li>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>14002. Loan</p>
                      <p className='font-normal text-sm'>0.00</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex justify-between items-center gap-4 w-full p-2'>
                      <p className='font-normal text-sm'>Total Long Term Liabilities</p>
                      <p className='font-normal text-sm border-t-2 border-b-2'>0.00</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FinancialReport;
