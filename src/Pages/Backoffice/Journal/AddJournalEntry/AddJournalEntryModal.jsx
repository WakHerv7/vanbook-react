import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import SelectSearch from "../../../../Components/InputAndTitle/SelectSearch/SelectSearch";
import { selectAllAccounts, selectAllTypedAccounts, getAccountsStatus, getAccountsError, fetchAccounts, fetchAccountsByType }from '../../../../Reducers/accountsSlice';
import { addNewJournalItem, selectAllJournal,  getJournalStatus, getJournalError, fetchJournal }from '../../../../Reducers/journalSlice';
import { selectAllPaymentMethods,  getPaymentMethodsStatus, getPaymentMethodsError, fetchPaymentMethods }from '../../../../Reducers/paymentMethodsSlice';

function AddJournalEntryModal({handleModalOpen, modalOpen, journalItemId}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [entryDate, setEntryDate] = useState(new Date().toISOString().substring(0, 10));
    const [issuingAccount, setIssuingAccount] = useState();
    const [receivingAccount, setReceivingAccount] = useState();
    const [paymentMethodId, setPaymentMethodId] = useState('dflt');
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);    

    //------------------------------------------------------
    const myAccounts = useSelector(selectAllAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())            
        }
        else if (accountsStatus === 'succeeded') {
            console.log("======================")
            console.log("myAccounts:", Array.isArray(myAccounts) && myAccounts)
            console.log("======================")
        }
    }, [accountsStatus, dispatch])
    //------------------------------------------------------
    const myPaymentMethods = useSelector(selectAllPaymentMethods);
    const paymentMethodsStatus = useSelector(getPaymentMethodsStatus);
    const paymentMethodsError = useSelector(getPaymentMethodsError);
    useEffect(() => {
        if (paymentMethodsStatus === 'idle') {
            dispatch(fetchPaymentMethods())            
        } else if (paymentMethodsStatus === 'succeeded') {
            // setPaymentMethodId(currentDepositLine.payment_method_id ?? 'dflt')
        }
    }, [paymentMethodsStatus, dispatch])
    //------------------------------------------------------

    const closeModal = () => {
        handleModalOpen();    
    }

    //------------------------------------------------------
    const handleSelectedIssuingAccount = (elt) => {
        setIssuingAccount(elt)
        console.log(elt)
    };
    //------------------------------------------------------
    const handleSelectedReceivingAccount = (elt) => {
        setReceivingAccount(elt)
        console.log(elt)
    };


    const submitNewJournalItem = () => {
        const toSubmit = {
            "date": new Date().toISOString().substring(0, 10),
            "issuing_account_id": issuingAccount.id,
            "receiving_account_id": receivingAccount.id,
            "payment_method_id": paymentMethodId,
            "amount": amount,                     
            "description": description,
        }
        console.log("toSubmit: ", toSubmit)
        if (issuingAccount && 
            receivingAccount  &&
            amount  &&
            paymentMethodId != 'dflt' &&
            description
            ) {
            dispatch_and_resetform(toSubmit)
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            addNewJournalItem(toSubmit)
        )
        setIssuingAccount(null)
        setIssuingAccount(null)
        setAmount(null)
        setDescription('')
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if (issuingAccount && 
            receivingAccount  &&
            amount  &&
            paymentMethodId != 'dflt' &&
            description
            ) {
            setActiveApplyBtn(true);
        } else {
            setActiveApplyBtn(false);
        }

    }, [issuingAccount, 
        receivingAccount,
        amount,
        paymentMethodId,
        description
    ])

    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>NEW JOURNAL ENTRY</h1>                        
                    </div>

                    <div className="new_person_modal_page_2">

                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            <span className={`text-[18px] font-meduim myprimarytextcolor`}>Fill out the form carefully</span>
                        </div>

                        <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Issuing account</label>
                                {myAccounts?                                
                                    <SelectSearch
                                    itemPlaceholder = {'Select issuing account'}
                                    selectedItem = {issuingAccount}
                                    itemsList={myAccounts}
                                    itemHasRole={false}
                                    handleSelected={handleSelectedIssuingAccount}
                                    fullWidth={true}
                                    />
                                :
                                    <></>
                                }
                            </div>

                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Receiving account</label>
                                {myAccounts?                                
                                    <SelectSearch
                                    itemPlaceholder = {'Select receiving account'}
                                    selectedItem = {receivingAccount}
                                    itemsList={myAccounts}
                                    itemHasRole={false}
                                    handleSelected={handleSelectedReceivingAccount}
                                    fullWidth={true}
                                    />
                                :
                                    <></>
                                }
                            </div>
                        </div>

                        {/* <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Receiving account</label>
                                {myAccounts?                                
                                    <SelectSearch
                                    itemPlaceholder = {'Select receiving account'}
                                    selectedItem = {receivingAccount}
                                    itemsList={myAccounts}
                                    itemHasRole={false}
                                    handleSelected={handleSelectedReceivingAccount}
                                    />
                                :
                                    <></>
                                }
                            </div>
                        </div> */}
                        

                        <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Amount</label>
                                <input type="number" required onChange={(e)=>setAmount(e.target.value)} name="amount" id="amountId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor w-fit'>Payment method</label> 
                            <select value={paymentMethodId} onChange={(e)=>(setPaymentMethodId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-w-[200px] w-full px-2 rounded-md border border-[#41436a]`} name={""} >
                                <option disabled value="dflt">{`Select ...`}</option>        
                                {
                                    Array.isArray(myPaymentMethods) && myPaymentMethods.map((val, ind) => {
                                        return <option key={ind} value={Number(val.id)}>{val.name}</option>
                                    })                                
                                }
                            </select>
                        </div>

                        <div className="flex w-full my-5">
                            <div className="flex w-full flex-col gap-1">
                                <label className='myprimarytextcolor'>Description</label>
                                <textarea name="" id="" rows="5" onChange={(e)=>setDescription(e.target.value)} className={`border border-[#41436a] rounded-md p-2`}>

                                </textarea>

                            </div>
                        </div>

                        {/* <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Description</label>
                                <input type="text" required onChange={(e)=>setDescription(e.target.value)} name="description" id="descriptionId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                        </div> */}

                        <div className="flex justify-end gap-5 mt-10 mb-3 pr-3">
                            <button onClick={()=>submitNewJournalItem(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Apply
                            </button>
                            <button onClick={()=>closeModal()} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default AddJournalEntryModal;