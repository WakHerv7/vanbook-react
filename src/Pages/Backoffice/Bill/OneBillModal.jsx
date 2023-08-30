import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";
import { IoCloseOutline } from "react-icons/io5";

import {  selectDepositById, selectAllDeposits,  getDepositsStatus, getDepositsError, fetchDeposits }from '../../../Reducers/depositsSlice';


function OneDepositModal({depositId, handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const oneDeposit = useSelector((state) => selectDepositById(state, Number(depositId)));

    const closeModal = () => {
        handleModalOpen();    
    }


    let renderedPaymentDepositLines;
    renderedPaymentDepositLines = oneDeposit?.payment_deposit_lines.map((dl, index) => (
        <tr key={index}>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.student ? dl.student?.name : dl.person?.name}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.date}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.transaction_type_name}
            </td>          
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.payment_receipt.payment_method?.name}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.payment_receipt.description }
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.payment_receipt.ref_nb}
            </td>
            <td className="text-gray-900 text-left font-bold px-6 py-4 whitespace-nowrap">
                {dl.payment_receipt.total_amount}
            </td>                            
        </tr>
    ))



    let renderedRegularDepositLines;
    renderedRegularDepositLines = oneDeposit?.regular_deposit_lines.map((dl, index) => (
        <tr key={index}>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {index+1}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.student ? dl.student?.name : dl.person?.name}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.from_account?.name}
            </td>            
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.payment_method?.name}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.description }
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {dl.ref_nb}
            </td>
            <td className="text-gray-900 text-left font-bold px-6 py-4 whitespace-nowrap">
                {dl.amount ?? 0}
            </td>                            
        </tr>
    ))


    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`relative modal_content_box_w px-5 py-3`}>
                    <span className='absolute top-2 right-2 cursor-pointer' onClick={()=>closeModal()}>
                        <IoCloseOutline size={24}/>
                    </span>
                    {/* <div className="flex flex-col items-center w-full justify-between pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>{oneDeposit.name}</h1>
                        <span className={`mt-1 text-lg myprimarytextcolor`}>Total debt: {oneDeposit.total_amount - oneDeposit.total_amount_paid}</span>
                    </div> */}
                    
                    

                    <div className="flex flex-col  gap-5 mt-5 mb-7">
                        {/* <h1 className='text-[30px] myprimarytextcolor'>Deposit</h1> */}
                        <div className="flex justify-between gap-5">
                            
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-10">
                                    <div className="flex flex-col gap-1">
                                        <label className='mb-1 text-sm myprimarytextcolor'>Date</label>
                                        {oneDeposit.date}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className='mb-1 text-sm myprimarytextcolor'>Deposit To</label>
                                        <div>{oneDeposit.to_account_name}</div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className='mb-1 text-sm myprimarytextcolor'>Amount</label>
                                        <div className='font-bold'>{oneDeposit.total_amount}</div>
                                    </div>
                                </div>
                                { oneDeposit.description?
                                <div className="flex flex-col gap-1">
                                    <label className='text-sm myprimarytextcolor'>Description</label>
                                    <div>{oneDeposit.description}</div>
                                </div>
                                :
                                <></>
                                }
                            </div>

                            <div className="flex flex-col gap-5">
                                {/* <div className="flex flex-col gap-1">
                                    <label className='mb-1 text-sm myprimarytextcolor'>Date</label>
                                    {oneDeposit.date}
                                </div> */}
                            </div>
                        </div>
                    </div>
                    
                    
                    {oneDeposit?.payment_deposit_lines.length>0?
                    <>
                    <label className='text-md myprimarytextcolor'>Payments included in this deposit</label>
                    <div className="table_container rounded-xl border-solid border-2 border-gray-300 overflow-auto mt-2 mb-10">
                    <table className="w-full">
                    <thead className="bg-white border-b">
                        <tr>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Received from
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Date
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Type
                        </th>
                        {/* <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Type
                        </th> */}
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Payment method
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Description
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Ref. N°
                        </th> 
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Amount
                        </th>                            
                        </tr>
                    </thead>
                    <tbody>                        
                        {renderedPaymentDepositLines}
                    </tbody>
                    </table>
                </div>
                </>
                :
                <></>}

                
                {oneDeposit?.regular_deposit_lines.length>0?
                <>
                <label className='text-md myprimarytextcolor '>Funds added in this deposit</label>
                <div className="table_container rounded-xl border-solid border-2 border-gray-300 overflow-auto mt-2">
                    <table className="w-full">
                    <thead className="bg-white border-b">
                        <tr>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            #
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Received from
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Account
                        </th>
                        {/* <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Type
                        </th> */}
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Payment method
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Description
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Ref. N°
                        </th> 
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Amount
                        </th>                            
                        </tr>
                    </thead>
                    <tbody>                        
                        {renderedRegularDepositLines}
                    </tbody>
                    </table>
                </div>
                </>
                :<></>}
                

                </div>
            </div>
        </div>
    );
}

export default OneDepositModal;