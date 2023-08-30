import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNewAccountType } from "../../../../Reducers/accountTypesSlice";


const categoryList = [
    {id:1,name:"Income/Expenses"},
    {id:2,name:"Others"},
    {id:3,name:"Custom"}
];


function AddAccountTypeModal({handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [accountTypeName, setAccountTypeName] = useState();
    const [accountTypeCategory, setAccountTypeCategory] = useState();    
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    const closeModal = () => {
        handleModalOpen();    
    }
    const submitNewAccount = () => {
        const toSubmit = {
            id: nanoid(),
            name: accountTypeName,
            category: accountTypeCategory,
        }
        if (accountTypeName && accountTypeCategory) {
            dispatch_and_resetform(toSubmit)
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            addNewAccountType(toSubmit)
        )
        setAccountTypeName('')
        setAccountTypeCategory(false)
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if (accountTypeName && accountTypeCategory) {
            setActiveApplyBtn(true);
        }
        else {
            setActiveApplyBtn(false);
        }       
    }, [accountTypeName, accountTypeCategory])

    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Add Account Type</h1>
                    </div>
                    
                    <div className="new_account_modal">
                        <div className="flex mt-3 gap-10">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Account Type Name</label>
                                    <input type="text" onChange={(e)=>setAccountTypeName(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className='myprimarytextcolor'>Account Type Category</label>
                                    <select onChange={(e)=>(setAccountTypeCategory(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                        <option disabled value="dflt">{`Select category...`}</option>        
                                        {
                                            categoryList.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>                                    
                                </div>                                                       
                        </div>
                        

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                            <button onClick={()=>submitNewAccount(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Save
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

export default AddAccountTypeModal;