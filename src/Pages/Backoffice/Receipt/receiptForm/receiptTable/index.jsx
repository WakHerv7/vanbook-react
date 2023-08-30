import React, {useState, useEffect, useRef} from 'react';
import {FiChevronLeft, FiChevronDown, FiChevronUp, FiPrinter, FiPlus } from "react-icons/fi";
import ReceiptLine from "./ReceiptLine";


function ReceiptTable({myPaymentMethods, myItems, myPersons, receiptLines, setReceiptLines, totalAmount, setTotalAmount, setTotalAmountPaid }) {

    //---------------------------------------------------------
    const addNewLine = () => {
        let rls = [...receiptLines];
        rls = [...rls, {receiptLine:null}];
        setReceiptLines(rls);
    }
    //---------------------------------------------------------
    const calculateAmount = (al, column) => {
        let ta = 0;
        al.map(elt => {
            ta += Number(elt['receiptLine'][column]);
        })
        return ta
    };   
    //---------------------------------------------------------
    const removeReceiptLine = (ind) => {
        let rls = [...receiptLines];
        rls.splice(ind, 1);
        setReceiptLines(rls);
        let ta = calculateAmount(rls, 'amount');
        setTotalAmount(ta)
        let tap = calculateAmount(rls, 'amountPaid');
        setTotalAmountPaid(tap)        
    };
    //---------------------------------------------------------
    const updateTableData = ({ind, selectedItem, itemDescription, qty, rate, amount, amountPaid}) => {
        let rls = [...receiptLines];
        if (selectedItem) {
            rls[ind]['receiptLine'] = {
                // id: rls[ind]['receiptLine']['id'] ?? 0,
                id: 0,
                itemId:selectedItem?.id,
                itemName:selectedItem?.name,
                itemDescription, 
                qty, 
                rate, 
                amount,
                amountPaid
            };
        }
        else {
            rls[ind]['receiptLine'] = {
                ...rls[ind]['receiptLine'],
                amount,
                amountPaid
            };
        }
        setReceiptLines(rls);
        
        let ta = calculateAmount(rls, 'amount');
        setTotalAmount(Math.round(ta))
        let tap = calculateAmount(rls, 'amountPaid');
        setTotalAmountPaid(Math.round(tap))

        console.log('Receipt Lines : ')
        console.log(rls)
        
    };
    //---------------------------------------------------------


    let title = <>
        <div className="flex justify-between items-end w-full">
            <div className='text-lg'>
                Add funds to this receipt
            </div>
            <div className='flex gap-2'>
                <span className='text-md'>Funds total</span>
                <strong className='text-md'>#{totalAmount}</strong>
            </div>
        </div>
        </>

        let content = <>
        <div className="table_container relative rounded-xl  ">
            <div className="table_subcontainer relative">
                <table className="w-full border-solid border-2 border-gray-300">
                <thead className="bg-white" >
                    <tr>
                        <th scope="col" className="text-sm text-center font-medium myprimarytextcolor px-6 py-4 text-left">
                            #
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Product/Service
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Description
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Qty
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Rate
                        </th> 
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Amount
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Amount Paid
                        </th>                         
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                        </th>                        
                    </tr>
                </thead>
                <tbody>
                        {
                            myItems && receiptLines.map((il, ind) => (
                                <ReceiptLine
                                key={ind}
                                ind={ind}
                                currentLine={il}
                                myPaymentMethods={myPaymentMethods}
                                myItems={myItems}
                                myPersons={myPersons}
                                removeReceiptLine={removeReceiptLine}
                                updateTableData={updateTableData}
                                />
                            ))
                        }
                </tbody>
                </table>
            </div>
        </div>
        <button onClick={()=>addNewLine()} className="outline-none z-50 cursor-pointer flex gap-3 border border-gray-500 rounded-md p-2 mt-2 mb-5">
            <FiPlus size={20} color={"#41436a"}/>
            <span className="myprimarytextcolor">Add new line</span>                            
        </button>
    </>
        
        return {
            title: title,
            content: content
        }
}

export default ReceiptTable;