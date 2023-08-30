import React, {useState, useEffect, useRef} from 'react';
import {FiChevronLeft, FiChevronDown, FiChevronUp, FiPrinter, FiPlus } from "react-icons/fi";
import FundDepositLine from "./FundDepositLine";


function FundDepositTable({myPaymentMethods, myAccounts, myPersons, fundDepositLines, setFundDepositLines, totalAmount, setTotalAmount }) {

    //---------------------------------------------------------
    const addNewLine = () => {
        let rls = [...fundDepositLines];
        rls = [...rls, {depositLine:null}];
        setFundDepositLines(rls);
    }
    //---------------------------------------------------------
    const calculateAmount = (al) => {
        let ta = 0;
        al.map(elt => {
            ta += Number(elt['depositLine']['depositAmount']);
        })
        return ta
    };   
    //---------------------------------------------------------
    const removeDepositLine = (ind) => {
        let rls = [...fundDepositLines];
        rls.splice(ind, 1);
        setFundDepositLines(rls);
        let ta = calculateAmount(rls);
        setTotalAmount(ta);        
    };
    //---------------------------------------------------------
    const updateFundTableData = ({ind, accountId, personId, personRoleId, paymentMethodId, depositDescription, depositRefNb, depositAmount}) => {
        let rls = [...fundDepositLines];
        rls[ind]['depositLine'] = {
            accountId, personId, personRoleId, 
            paymentMethodId, depositDescription, 
            depositRefNb, depositAmount
        };
        setFundDepositLines(rls);
        
        let ta = calculateAmount(rls);
        setTotalAmount(ta)        
    };
    //---------------------------------------------------------


    let title = <>
        <div className="flex justify-between items-end w-full">
            <div className='text-lg'>
                Add funds to this deposit
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
                            Received from
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Account
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Description
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Payment method
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Ref. N°
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
                            fundDepositLines.map((rl, ind) => (
                                <FundDepositLine
                                key={ind}
                                ind={ind}
                                currentDepositLine={rl}
                                myPaymentMethods={myPaymentMethods}
                                myAccounts={myAccounts}
                                myPersons={myPersons}
                                removeDepositLine={removeDepositLine}
                                updateFundTableData={updateFundTableData}
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

export default FundDepositTable;