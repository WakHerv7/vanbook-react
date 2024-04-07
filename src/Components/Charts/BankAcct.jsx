import React from 'react'

const BankAcct = () => {
  return (
    <div className='flex flex-col justify-start items-start gap-4 py-6 px-10 bg-white rounded-md shadow-md'>
      <div className='mb-3'>
        <h1 className='text-lg font-normal text-[#2E2F5B]'>Bank accounts</h1>
        <p className='text-sm mt-2 font-thin text-[#2E2F5B]'>GTB - *********759</p>
      </div>
      <div className='w-full'>
        <p className='text-sm text-[#2E2F5B]'>Bank account <span className='ml-10 font-thin'>N1,200,000</span></p>
        <p className='text-sm text-[#2E2F5B]'>In vanbook <span className='ml-10 font-thin'>N1,200,000</span></p>
      </div>
    </div>
  )
}

export default BankAcct
