import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// import SelectSearch from 'react-select-search';

function OutstandingTransactionsLine({ind, currentDepositLine, myPaymentMethods, updatePaymentTableData, 
    allPaymentsSelected, setAllPaymentsSelected}) {
    /** Data to submit ============================ */
    const [accountId, setAccountId] = useState(currentDepositLine.deposit_account_id);  
    const [paymentId, setPaymentId] = useState(currentDepositLine.id ?? '');
    const [person, setPerson] = useState({id:currentDepositLine.person_id, name:currentDepositLine.person.name, roleId: currentDepositLine.person_role_id});
    const [paymentDate, setPaymentDate] = useState(currentDepositLine.date ?? '');
    const [paymentType, setPaymentType] = useState("Invoice");
    //------------------------------------
    const [paymentSelected, setPaymentSelected] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState(currentDepositLine.payment_method_id ?? 'dflt');
    const [paymentDescription, setPaymentDescription] = useState(currentDepositLine.items_list ?? '');
    const [paymentRefNb, setPaymentRefNb] = useState(currentDepositLine.ref_nb ?? '');
    //------------------------------------
    const [paymentAmount, setPaymentAmount] = useState(currentDepositLine.balance_due ?? '');
    /** ============================================ */
    
    useEffect(() => {
        if (allPaymentsSelected.new && allPaymentsSelected.old) {
            setPaymentSelected(allPaymentsSelected.new);
        } else if (allPaymentsSelected.new ==false && allPaymentsSelected.old==false) {
            setPaymentSelected(false);
        }
        // console.log(allPaymentsSelected.new+" === "+allPaymentsSelected.old);
    }, [allPaymentsSelected])

    useEffect(() => {
        setTimeout(() => {
            updatePaymentTableData({ind, currentLine:currentDepositLine,accountId, paymentId, person, paymentDate, paymentType, paymentSelected, paymentMethodId, paymentDescription, paymentRefNb, paymentAmount})
        }, 100);
    }, [paymentSelected, paymentAmount])
    
    

    return (
        <tr className="bg-gray-100 border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <label  htmlFor={`currentDepositLine_${currentDepositLine.id}`} className="myprimarytextcolor container_checkbo_select_w">                                    
                    <input type="checkbox" checked={paymentSelected} onChange={(e)=>setPaymentSelected(e.target.checked)} name={`currentDepositLine`} id={`currentDepositLine_${currentDepositLine.id}`} />
                    <span className="checkmark_checkbo_select_w bg_white"></span>
                </label>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {paymentDate} 
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {currentDepositLine.number}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {person.name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {currentDepositLine.due_date}
            </td>
            <td className={`relative text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap`}>                
                {currentDepositLine.total_amount}
            </td>
            <td className={`relative text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap`}>                
                {currentDepositLine.balance_due}
            </td>
            <td className={`text-sm  font-medium px-6 py-4 whitespace-nowrap`}>
                <input value={paymentAmount} onChange={(e)=>setPaymentAmount(e.target.value)} type="text" name="depositRefNb" id="depositRefNbId" className="outline-none py-2 px-2 rounded-md"/>
            </td>
        </tr> 
    );
}

export default OutstandingTransactionsLine;