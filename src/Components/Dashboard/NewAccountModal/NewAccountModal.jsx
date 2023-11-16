import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { accountAdded } from "../../../Reducers/accountsSlice";
import "./style_modal.css";


const accountTypesList = [
    {id:1, name:"Income", part:1},
    {id:2, name:"Expenses", part:1},
    {id:3, name:"Current Asset", part:2},
    {id:4, name:"Fixed Asset", part:2},
    {id:5, name:"Current Liabilities", part:2},
    {id:6, name:"Long Term Liabilities", part:2},
    {id:7, name:"Equity", part:2},
    {id:8, name:"Account Receivable", part:2},
    {id:9, name:"Account Payable", part:2},    
];
const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];


function NewAccountModal({handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page1, setPage1] = useState(true);
    const [issubaccountof, setIssubaccountof] = useState();
    const [accountType, setAccountType] = useState();
    const [accountName, setAccountName] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [accountParent, setAccountParent] = useState();
    const [accountDescription, setAccountDescription] = useState();
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    const closeModal = () => {
        handleModalOpen();    
    }
    const goToNextPage = () => {
        if (accountType) {
            setPage1(false);
        }   
    }
    const submitNewAccount = () => {
        const accountToSubmit = {
            id: nanoid(),
            typeId: accountType,
            name: accountName,
            number: accountNumber,
            issubaccountof: issubaccountof,
            parentId: accountParent,
            description: accountDescription,
        }
        if (accountType && accountName && accountNumber) {
            if (issubaccountof) {
                if (accountParent) {
                    dispatch_and_reset(accountToSubmit)
                }
            } else {
                dispatch_and_reset(accountToSubmit)
            }
        }
    }
    const dispatch_and_reset = (accountToSubmit) => {
        dispatch(
            accountAdded(accountToSubmit)
        )
        setPage1(true)
        setAccountType(false)
        setAccountName('')
        setAccountNumber('')
        setAccountParent('')
        setAccountDescription('')
        setActiveApplyBtn(false)
        closeModal()
        navigate(0);
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

        console.log("accountType: ",accountType);
        console.log("activeApplyBtn: ",activeApplyBtn);

    }, [accountType, accountName, accountNumber, issubaccountof, accountParent])

    return (
        <div>
            <div className={`modal_dark_screen_w ${modalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>New Account</h1>
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
                                    (value.part == 1) ?
                                        <li>                                    
                                            <label key={index} onClick={()=>setAccountType(value.id)} htmlFor={`account_category_${value.id}`} class="container_checkbo_select_w">
                                                {value.name}
                                                <input type="radio" name="account_type" id={`account_category_${value.id}`} checked={accountType == value.id}/>
                                                <span class="checkmark_checkbo_select_w"></span>
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
                                    (value.part == 2) ?
                                        <li>                                    
                                            <label key={index} onClick={()=>setAccountType(value.id)} htmlFor={`account_category_${value.id}`} class="container_checkbo_select_w">
                                                {value.name}
                                                <input type="radio" name="account_type" id={`account_category_${value.id}`} checked={accountType == value.id}/>
                                                <span class="checkmark_checkbo_select_w"></span>
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
                                    <input type="text" onChange={(e)=>setAccountName(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="account_category_1" class="myprimarytextcolor container_checkbo_select_w mb0w">
                                        Is subaccount of
                                        <input type="checkbox" onChange={(e)=>setIssubaccountof(e.target.checked)} name="subaccount" id="account_category_1"/>
                                        <span class="checkmark_checkbo_select_w"></span>
                                    </label>
                                    {issubaccountof?                                    
                                    <select onChange={(e)=>(setAccountParent(e.target.current.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            listItems.map((val, ind) => {
                                                return <option value={val.value}>{val.text}</option>
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
                                    <input type="text" onChange={(e)=>setAccountNumber(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                            </div>                            
                        </div>
                        <div className="flex w-full my-5">
                            <div className="flex w-full flex-col gap-1">
                                <label className='myprimarytextcolor'>Description</label>
                                <textarea name="" id="" rows="5" className={`border border-[#41436a] rounded-md`}>

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

export default NewAccountModal;