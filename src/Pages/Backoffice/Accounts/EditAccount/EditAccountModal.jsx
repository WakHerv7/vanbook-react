import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import { updateAccount, selectAccountById, selectAllAccounts,  getAccountsStatus, getAccountsError, fetchAccounts }from '../../../../Reducers/accountsSlice';
import { selectAllAccTypes, getAccTypesStatus, getAccTypesError, fetchAccountTypes }from '../../../../Reducers/accountTypesSlice';

// const accountTypesList = [
//     {id:1, name:"Income", category:1},
//     {id:2, name:"Expenses", category:1},
//     {id:3, name:"Current Asset", category:2},
//     {id:4, name:"Fixed Asset", category:2},
//     {id:5, name:"Current Liabilities", category:2},
//     {id:6, name:"Long Term Liabilities", category:2},
//     {id:7, name:"Equity", category:2},
//     {id:8, name:"Account Receivable", category:2},
//     {id:9, name:"Account Payable", category:2},    
// ];

function EditAccountModal({accId, handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const acc = useSelector((state) => selectAccountById(state, Number(accId)));

    const [page1, setPage1] = useState(true);
    const [issubaccountof, setIssubaccountof] = useState(acc?.account_parent_id);
    const [accountType, setAccountType] = useState(acc?.account_type_id);
    const [accountName, setAccountName] = useState(acc?.name);
    const [accountNumber, setAccountNumber] = useState(acc?.number);
    const [accountParent, setAccountParent] = useState(acc?.account_parent_id);
    const [accountDescription, setAccountDescription] = useState(acc?.description);
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    const accountTypesList =useSelector(selectAllAccTypes);
    const accTypesStatus = useSelector(getAccTypesStatus);
    const accTypesError = useSelector(getAccTypesError);
    useEffect(() => {
        if (accTypesStatus === 'idle') {
            dispatch(fetchAccountTypes())
        }
    }, [accTypesStatus, dispatch])    
    const accountsList = useSelector(selectAllAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())            
        }
    }, [accountsStatus, dispatch])



    const closeModal = () => {
        handleModalOpen();    
    }
    const goToNextPage = () => {
        if (accountType) {
            setPage1(false);
        }   
    }
    const submitNewAccount = () => {
        const toSubmit = {
            "id": acc?.id,
            "name": accountName,
            "number": Number(accountNumber),
            "description": accountDescription,
            "account_type_id": Number(accountType),
            "account_parent_id": issubaccountof ? Number(accountParent) : null,
        }
        console.log("toSubmit: ", toSubmit)
        // debugger
        if (accountType && accountName && accountNumber) {
            if (issubaccountof) {
                if (accountParent) {
                    dispatch_and_resetform(toSubmit)
                }
            } else {
                dispatch_and_resetform(toSubmit)
            }
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            updateAccount(toSubmit)
        ).unwrap()
        setPage1(true)
        setAccountType(false)
        setAccountName('')
        setAccountNumber('')
        setAccountParent('')
        setAccountDescription('')
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if (accountType && accountName && accountNumber) {
            if (issubaccountof) {
                if (accountParent) {
                    setActiveApplyBtn(true);
                } else {
                    setActiveApplyBtn(false);
                }
            } else {
                setActiveApplyBtn(true);
            }
        } else {
            setActiveApplyBtn(false);
        }

        console.log("acc: ", acc);

    }, [accountType, accountName, accountNumber, issubaccountof, accountParent])

    return (
        <div>
            <div className={`modal_dark_screen_w ${modalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Edit Account</h1>
                    </div>
                    
                    {page1 ?

                    <div className="new_account_modal_page_1">
                        <div className="flex flex-col items-center w-full justify-center pb-5">                            
                            <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose one account type</span>
                        </div>
                        <div className="flex flex-col mt-3">
                            <h2 className={`text-[18px] font-bold myprimarytextcolor`}>Categorize your account</h2>
                            <ul className="list-none mt-2 pl-3">
                                {accountTypesList.map((value, index) => (                                                                        
                                    (Number(value.category) == 1) ?
                                    
                                        <li key={value.id}>                                    
                                            <label key={index} onClick={()=>setAccountType(value.id)} htmlFor={`account_category_${value.id}`} className="container_checkbo_select_w">
                                                {value.name}
                                                <input type="radio" name="account_type" id={`account_category_${value.id}`} defaultChecked={accountType == value.id}/>
                                                <span className="checkmark_checkbo_select_w"></span>
                                            </label>
                                        </li>                                     
                                    :
                                    <></>                                             
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col mt-3">
                            <h2 className={`text-[18px] font-bold myprimarytextcolor`}>Or track your account</h2>
                            <ul className="list-none mt-2 pl-3">
                                {accountTypesList.map((value, index) => (
                                    (Number(value.category) == 2) ?
                                        <li key={value.id}>                                    
                                            <label key={index} onClick={()=>setAccountType(value.id)} htmlFor={`account_category_${value.id}`} className="container_checkbo_select_w">
                                                {value.name}
                                                <input type="radio" name="account_type" id={`account_category_${value.id}`} defaultChecked={accountType == value.id}/>
                                                <span className="checkmark_checkbo_select_w"></span>
                                            </label>
                                        </li>                                     
                                    :
                                    <></>                                             
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                            <button onClick={()=>goToNextPage()} className={`${accountType?"":"opacity-30"} outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Continue
                            </button>
                            <button onClick={()=>closeModal()} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>

                    :

                    <div className="new_account_modal_page_2">
                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            {/* <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose your account category and type</span> */}
                        </div>
                        <div className="flex mt-3 gap-10">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Account Name</label>
                                    <input type="text" value={accountName} onChange={(e)=>setAccountName(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="account_category_1" className="myprimarytextcolor container_checkbo_select_w mb0w">
                                        Is subaccount of
                                        <input type="checkbox" checked={issubaccountof} onChange={(e)=>setIssubaccountof(e.target.checked)} name="subaccount" id="account_category_1"/>
                                        <span className="checkmark_checkbo_select_w"></span>
                                    </label>
                                    {issubaccountof?                                    
                                    <select onChange={(e)=>(setAccountParent(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={accountParent}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            accountsList.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                    :
                                    <></>
                                    }
                                    
                                </div>                                
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Account Number</label>
                                    <input type="number" value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                            </div>                            
                        </div>
                        <div className="flex w-full my-5">
                            <div className="flex w-full flex-col gap-1">
                                <label className='myprimarytextcolor'>Description</label>
                                <textarea name="" id="" rows="5" value={accountDescription} onChange={(e)=>setAccountDescription(e.target.value)} className={`border border-[#41436a] rounded-md`}>

                                </textarea>

                            </div>
                        </div>

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                            <button onClick={()=>setPage1(true)} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                                Back
                            </button>
                            <button onClick={()=>submitNewAccount(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Apply
                            </button>
                            <button onClick={()=>closeModal()} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                    
                    }
                    
                    

                </div>
            </div>
        </div>
    );
}

export default EditAccountModal;