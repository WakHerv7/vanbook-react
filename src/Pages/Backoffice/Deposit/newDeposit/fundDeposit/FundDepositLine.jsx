import React, { useState, useEffect } from 'react';
import { IoRemoveCircleOutline } from "react-icons/io5";


function FundDepositLine({ind, currentDepositLine, removeDepositLine, myPaymentMethods, 
    myAccounts, myPersons, updateFundTableData}) {
    
    /** Data to submit ============================ */
    const [accountId, setAccountId] = useState('dflt');
    const [personId, setPersonId] = useState('dflt');
    const [personRoleId, setPersonRoleId] = useState();
    const [paymentMethodId, setPaymentMethodId] = useState(currentDepositLine?.payment_method_id ?? 'dflt');
    const [depositDescription, setDepositDescription] = useState('');
    const [depositRefNb, setDepositRefNb] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);
    /** ============================================ */
    
    useEffect(() => {
        updateFundTableData({ind, accountId, personId, personRoleId, paymentMethodId, depositDescription, depositRefNb, depositAmount})
    }, [accountId, personId, personRoleId, paymentMethodId, depositDescription, depositRefNb, depositAmount])

    //---------------------------------------------------------
    const handlePersonIdAndRole = (id) => {
        let onePerson = myPersons.filter(elt => elt.id == id);
        setPersonId(onePerson[0].id);
        setPersonRoleId(onePerson[0].person_role_id);

        console.log("handlePersonIdAndRole")
        console.log(onePerson)
    };
    //---------------------------------------------------------

    return (
        <tr className="bg-gray-100 border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {ind+1}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select value={personId} onChange={(e)=>(handlePersonIdAndRole(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-w-[150px] px-2 rounded-md`} name={""} >
                    <option disabled value="dflt">{`Select ...`}</option>        
                    {
                        myPersons.map((val, ind) => {
                            return <option key={ind} value={Number(val.id)}>{val.name}</option>
                        })                                
                    }
                </select>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select value={accountId} onChange={(e)=>(setAccountId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-w-[150px] px-2 rounded-md`} name={""} >
                    <option disabled value="dflt">{`Select ...`}</option>        
                    {
                        myAccounts.map((val, ind) => {
                            return <option key={ind} value={Number(val.id)}>{val.name}</option>
                        })                                
                    }
                </select>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <input value={depositDescription} onChange={(e)=>setDepositDescription(e.target.value)} type="text" name="depositDescription" id="depositDescriptionId" className="outline-none py-2 px-2 rounded-md"/>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
                <input value={depositRefNb} onChange={(e)=>setDepositRefNb(e.target.value)} type="text" name="depositRefNb" id="depositRefNbId" className="outline-none py-2 px-2 rounded-md w-[100px]"/>
            </td>
            <td className={`text-sm  font-medium px-6 py-4 whitespace-nowrap`}>
                <input value={depositAmount != 0 ? depositAmount : ''} onChange={(e)=>setDepositAmount(e.target.value)} type="number" name="depositAmount" id="depositAmountId" className="outline-none py-2 px-2 rounded-md w-[150px]"/>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {ind > 0 ? 
            <span className='cursor-pointer' onClick={()=>removeDepositLine(ind)}>
                <IoRemoveCircleOutline size={24} color={"#41436a"}/>
            </span>
            :
            ''}
            </td>
        </tr> 
    );
}

export default FundDepositLine;