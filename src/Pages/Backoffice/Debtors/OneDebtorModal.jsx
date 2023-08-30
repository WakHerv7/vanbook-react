import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";
import { IoCloseOutline } from "react-icons/io5";

import {  selectDebtorById, selectAllDebtors,  getDebtorsStatus, getDebtorsError, fetchDebtors }from '../../../Reducers/debtorsSlice';


function OneDebtorModal({debtorId, handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const oneDebtor = useSelector((state) => selectDebtorById(state, Number(debtorId)));

    const closeModal = () => {
        handleModalOpen();    
    }


    let renderedReceipts;
    renderedReceipts = oneDebtor && oneDebtor.invoices.map((invoice, index) => (
        <tr key={index}>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.createdAt.split("T")[0]}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.number}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.items_list}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.total_amount }
            </td>
            <td className="text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                {invoice.balance_due}
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
                    <div className="flex flex-col items-center w-full justify-between pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>{oneDebtor.name}</h1>
                        <span className={`mt-1 text-lg myprimarytextcolor`}>Total debt: {oneDebtor.balance_due}</span>
                    </div>
                    
                    <div className="table_container rounded-xl border-solid border-2 border-gray-300 overflow-auto">
                    <table className="w-full">
                    <thead className="bg-white border-b">
                        <tr>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Date
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Invoice N°
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Description
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Amount
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Balance due
                        </th>                           
                        </tr>
                    </thead>
                    <tbody>                        
                        {renderedReceipts}
                    </tbody>
                    </table>
                </div>

                </div>
            </div>
        </div>
    );
}

export default OneDebtorModal;