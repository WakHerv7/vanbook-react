import React from 'react'

const BankAcct = () => {
  return (
    <div className='flex flex-col justify-start items-start gap-4 py-6 px-10 bg-white rounded-md shadow-md'>
      <div className='mb-3'>
        <h1 className='text-lg font-normal text-[#2E2F5B]'>Bank accounts</h1>
        <p className='text-sm mt-2 font-thin text-[#2E2F5B]'>GTB - *********759</p>
      </div>
      <div className='w-full'>
        <div className='flex justify-between items-center w-64'>
          <h2 className='text-md text-[#2E2F5B] text-right'>Bank account</h2>
          <p className='ml-10 font-thin text-left'>N1,200,000</p>
        </div>
        <div className='flex justify-between items-center w-64'>
          <h2 className='text-md text-[#2E2F5B] text-right'>In vanbook</h2>
          <p className='ml-10 font-thin text-left'>N1,200,000</p>
        </div>
      </div>
    </div>
  )
}

export default BankAcct
