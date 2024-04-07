import React from 'react';
import Spending from '../../../Components/Charts/Spending';
import Expenses from '../../../Components/Charts/Expenses';
import BankAcct from '../../../Components/Charts/BankAcct';
import Invoices from '../../../Components/Charts/Invoices';
import Sales from '../../../Components/Charts/Sales';

const Overview = () => {
  return (
    <section className='py-4 px-10'>
      <h1 className='text-xl text-left font-normal'>Business Overview</h1>
      <section className='my-3 w-full md:grid grid-cols-3 gap-4'>
        <Spending />
        <Expenses />
        <BankAcct />
        <Invoices />
        <Sales />
      </section>
    </section>
  )
}

export default Overview 
