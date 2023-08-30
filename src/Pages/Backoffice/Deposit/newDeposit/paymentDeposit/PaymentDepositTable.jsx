import React, {useState, useEffect, useRef} from 'react';
import {FiChevronLeft, FiChevronDown, FiChevronUp, FiPrinter, FiPlus } from "react-icons/fi";
import PaymentDepositLine from "./PaymentDepositLine";


function PaymentDepositTable({myPaymentMethods, receiptsAndPayments, 
    paymentDepositLines, setPaymentDepositLines, totalAmount, setTotalAmount,
    allPaymentDepositLines, setAllPaymentDepositLines}) {
    
    const [allPaymentsSelected, setAllPaymentsSelected] = useState({new:false, old:false});
    
    let apdls = [...allPaymentDepositLines];
    let rls = [...paymentDepositLines];
    //---------------------------------------------------------
    const handleAllPaymentsSelected = (boolVal) => {
        // console.log("handleAllPaymentsSelected : ", boolVal);
        let rls = [...allPaymentDepositLines];
        for (let i = 0; i < rls.length; i++) {
            rls[i].paymentSelected = boolVal;
        }
        setAllPaymentDepositLines(rls);
        let ta = calculateAmount2(rls);

        // console.log("rls : ", rls);
        // console.log("totalAmount : ", ta);
        setTotalAmount(ta)
        setAllPaymentsSelected({new:boolVal, old:false});
        
    };
    const calculateAmountAll = (al) => {
        let ta = 0;
        al.map(elt => {            
            ta += Number(elt?.paymentAmount);  
        })
        return ta
    };
    //---------------------------------------------------------
    const calculateAmount2 = (al) => {
        let ta = 0;
        al.map(elt => {
            if (elt?.paymentSelected) {
                ta += Number(elt?.paymentAmount);
            }            
        })
        return ta
    };
    //---------------------------------------------------------
    const calculateAmount = (al) => {
        let ta = 0;
        al.map(elt => {
            ta += Number(elt.paymentLine?.paymentAmount ?? 0);
        })
        return ta
    };
    //---------------------------------------------------------
    

    const updatePaymentTableData = ({ind, accountId, paymentId, person, paymentDate, paymentType, paymentSelected, paymentMethodId, paymentDescription, paymentRefNb, paymentAmount}) => {
        
        if (allPaymentsSelected.old && paymentSelected == false) {
            let aps = {...allPaymentsSelected}
            aps.new = false;
            setAllPaymentsSelected(aps);
        }
        let currentAllPaymentIndex = apdls.findIndex(elt => elt?.paymentId === paymentId);

        apdls[ind] = {
            accountId, paymentId, person, paymentDate, paymentType, 
            paymentSelected, paymentMethodId, paymentDescription, 
            paymentRefNb, paymentAmount
        };
        
        setAllPaymentDepositLines(apdls);
        
        let ta = 0; 
        ta = calculateAmount2(apdls);
        setTotalAmount(ta);
        // console.log(ind+' - '+paymentId+' = '+paymentSelected+' === '+paymentAmount+'///'+ta);
        
        // ===========================================================================
        // let rls = [...paymentDepositLines];
        let currentPaymentLineIndex = rls.findIndex(elt => elt.paymentLine?.paymentId == paymentId);

        if (currentPaymentLineIndex >= 0) {
            if (paymentSelected) {
                // console.log('update payment')
                rls[currentPaymentLineIndex]['paymentLine'] = {
                    accountId, paymentId, person, paymentDate, paymentType, 
                    paymentSelected, paymentMethodId, paymentDescription, 
                    paymentRefNb, paymentAmount
                };
            } else {
                // console.log('remove payment')
                rls = rls.filter(elt => elt.paymentLine.paymentId !== paymentId);
            }            
        } else {
            if (paymentSelected) {
                // console.log('add payment')
                rls = [... rls, {paymentLine: {
                    accountId, paymentId, person, paymentDate, paymentType, 
                    paymentSelected, paymentMethodId, paymentDescription, 
                    paymentRefNb, paymentAmount
                }}]
                // console.log('================')
                // console.log(rls)  
            }
        }         
        setPaymentDepositLines(rls);
        
        // let ta = calculateAmount(rls);
        // setTotalAmount(ta)        
    };
    //---------------------------------------------------------



        let title = <>
            <div className="flex justify-between items-end w-full">
                <div className='text-lg'>
                    Select payments included in this deposit
                </div>
                <div className='flex gap-2'>
                    <span className='text-md'>Selected payments total</span>
                    <strong className='text-md'>#{totalAmount}</strong>
                </div>
            </div>
        </>

        let content = <>
            <div className="table_container relative ">
                <div className="table_subcontainer relative">
                    <table className="w-full border-solid border-2 border-gray-300">
                    <thead className="bg-white border-b rounded-xl">
                        <tr>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                <label  htmlFor={`currentDepositLine`} className="myprimarytextcolor container_checkbo_select_w">                                    
                                    <input type="checkbox" checked={allPaymentsSelected.new} onChange={(e)=>setAllPaymentsSelected({new:e.target.checked, old:e.target.checked})} name={`currentDepositLine`} id={`currentDepositLine`} />
                                    <span className="checkmark_checkbo_select_w bg_white"></span>
                                </label>
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Received from
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Date
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Type
                            </th>
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
                            {
                                receiptsAndPayments.map((rl, ind) => (
                                    <PaymentDepositLine
                                    key={rl.id}
                                    ind={ind}
                                    currentDepositLine={rl}
                                    myPaymentMethods={myPaymentMethods}
                                    updatePaymentTableData={updatePaymentTableData}
                                    allPaymentsSelected={allPaymentsSelected}
                                    setAllPaymentsSelected={setAllPaymentsSelected}
                                    />
                                ))
                            }
                    </tbody>
                    </table>
                </div>
            </div>
            {/* <button onClick={()=>addNewLine()} className="outline-none z-50 cursor-pointer flex gap-3 border border-gray-500 rounded-md p-2 mt-2 mb-5">
                <FiPlus size={20} color={"#41436a"}/>
                <span className="myprimarytextcolor">Add new line</span>                            
            </button> */}
        </>
        
        return {
            title: title,
            content: content
        }
}

export default PaymentDepositTable;