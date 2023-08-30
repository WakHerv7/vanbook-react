import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// import SelectSearch from 'react-select-search';

function PaymentDepositLine({ind, currentDepositLine, myPaymentMethods, updatePaymentTableData, 
    allPaymentsSelected, setAllPaymentsSelected}) {
    /** Data to submit ============================ */
    const [accountId, setAccountId] = useState(currentDepositLine.deposit_account_id);  
    const [paymentId, setPaymentId] = useState(currentDepositLine.id ?? '');
    const [person, setPerson] = useState({id:currentDepositLine.person_id, name:currentDepositLine.person_name, roleId: currentDepositLine.person_role_id});
    const [paymentDate, setPaymentDate] = useState(currentDepositLine.date ?? '');
    const [paymentType, setPaymentType] = useState("Receipt");
    //------------------------------------
    const [paymentSelected, setPaymentSelected] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState(currentDepositLine.payment_method_id ?? 'dflt');
    const [paymentDescription, setPaymentDescription] = useState(currentDepositLine.items_list ?? '');
    const [paymentRefNb, setPaymentRefNb] = useState(currentDepositLine.ref_nb ?? '');
    //------------------------------------
    const [paymentAmount, setPaymentAmount] = useState(currentDepositLine.total_amount ?? '');
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
            updatePaymentTableData({ind, accountId, paymentId, person, paymentDate, paymentType, paymentSelected, paymentMethodId, paymentDescription, paymentRefNb, paymentAmount})
        }, 100);
    }, [paymentSelected, paymentMethodId, paymentDescription, paymentRefNb])
    
    

    return (
        <tr className="bg-gray-100 border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <label  htmlFor={`currentDepositLine_${currentDepositLine.id}`} className="myprimarytextcolor container_checkbo_select_w">                                    
                    <input type="checkbox" checked={paymentSelected} onChange={(e)=>setPaymentSelected(e.target.checked)} name={`currentDepositLine`} id={`currentDepositLine_${currentDepositLine.id}`} />
                    <span className="checkmark_checkbo_select_w bg_white"></span>
                </label>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {person.name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {paymentDate}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {paymentType}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {/* {currentDepositLine.payment_method_id} */}
                <select value={paymentMethodId} onChange={(e)=>(setPaymentMethodId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-w-[150px] px-2 rounded-md`} name={""} >
                    <option disabled value="dflt">{`Select ...`}</option>        
                    {
                        myPaymentMethods.map((val, ind) => {
                            return <option key={ind} value={Number(val.id)}>{val.name}</option>
                        })                                
                    }
                </select>
            </td>
            <td className={`relative text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap`}>
                
                <input value={paymentDescription} onChange={(e)=>setPaymentDescription(e.target.value)} type="text" name="depositDescription" id="depositDescriptionId" className="outline-none py-2 px-2 rounded-md"/>
            </td>
            <td className={`text-sm  font-medium px-6 py-4 whitespace-nowrap`}>
                <input value={paymentRefNb} onChange={(e)=>setPaymentRefNb(e.target.value)} type="text" name="depositRefNb" id="depositRefNbId" className="outline-none py-2 px-2 rounded-md"/>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {paymentAmount}
            </td>
        </tr> 
    );
}

export default PaymentDepositLine;