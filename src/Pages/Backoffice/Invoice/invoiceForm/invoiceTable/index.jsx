import React, {useState, useEffect, useRef} from 'react';
import {FiChevronLeft, FiChevronDown, FiChevronUp, FiPrinter, FiPlus } from "react-icons/fi";
import InvoiceLine from "./InvoiceLine";


function InvoiceTable({myPaymentMethods, myItems, myPersons, invoiceLines, setInvoiceLines, totalAmount, setTotalAmount }) {

    //---------------------------------------------------------
    const addNewLine = () => {
        let rls = [...invoiceLines];
        rls = [...rls, {invoiceLine:null}];
        setInvoiceLines(rls);
    }
    //---------------------------------------------------------
    const calculateAmount = (al) => {
        let ta = 0;
        al.map(elt => {
            ta += Number(elt['invoiceLine']['amount']);
        })
        return ta
    };   
    //---------------------------------------------------------
    const removeInvoiceLine = (ind) => {
        let rls = [...invoiceLines];
        rls.splice(ind, 1);
        setInvoiceLines(rls);
        let ta = calculateAmount(rls);
        setTotalAmount(ta);        
    };
    //---------------------------------------------------------
    const updateTableData = ({ind, item, itemDescription, qty, rate, amount}) => {
        let rls = [...invoiceLines];
        rls[ind]['invoiceLine'] = {
            // id: rls[ind]['invoiceLine']['id'] ?? 0,
            id: 0,
            itemId:item?.id,
            itemName:item?.name,
            itemDescription, 
            qty, 
            rate, 
            amount
        };
        setInvoiceLines(rls);
        
        let ta = calculateAmount(rls);
        setTotalAmount(ta)        
    };
    //---------------------------------------------------------


    let title = <>
        <div className="flex justify-between items-end w-full">
            <div className='text-lg'>
                Add funds to this invoice
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
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
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
                        </th>                        
                    </tr>
                </thead>
                <tbody>
                        {
                            myItems && invoiceLines.map((il, ind) => (
                                <InvoiceLine
                                key={ind}
                                ind={ind}
                                currentLine={il}
                                myPaymentMethods={myPaymentMethods}
                                myItems={myItems}
                                myPersons={myPersons}
                                removeInvoiceLine={removeInvoiceLine}
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

export default InvoiceTable;