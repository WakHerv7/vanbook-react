import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNewAccountType, selectAccTypeById, updateAccountType } from "../../../../Reducers/accountTypesSlice";
import { useSelector }from 'react-redux';
const categoryList = [
    {id:1,name:"Income/Expenses"},
    {id:2,name:"Others"},
    {id:3,name:"Custom"}
];


function EditAccountTypeModal({accTypeId, handleEditModalOpen, editModalOpen}) {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const accType = useSelector((state) => selectAccTypeById(state, Number(accTypeId)));

    const [accountTypeName, setAccountTypeName] = useState(accType?.name);
    const [accountTypeCategory, setAccountTypeCategory] = useState(accType?.category);
    const [requestStatus, setRequestStatus] = useState('idle');   
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    // const onNameChanged = e => setAccountTypeName(e.target.value)
    // const onCategoryChanged = e => setAccountTypeCategory(e.target.value)

    const canSave = [accountTypeName, accountTypeCategory].every(Boolean) && requestStatus === 'idle';

    const onSaveClicked = () => {
        if (canSave) {
            let toSave = {
                id: accType.id, 
                name:accountTypeName, 
                category: accountTypeCategory
            }
            dispatch_and_resetform(toSave)
        }
    }

    const closeModal = () => {
        handleEditModalOpen();    
    }    
    const dispatch_and_resetform = (toSave) => {
        try {
            setRequestStatus('pending')
            dispatch(updateAccountType(toSave)).unwrap()

            setAccountTypeName('')
            setAccountTypeCategory('')
        } catch (err) {
            console.error('Failed to save the account type.', err)
        } finally {
            setRequestStatus('idle')
        }
        setActiveApplyBtn(false)
        closeModal()
    }

    useEffect(() => {
        // console.log("accTypeId")  
        // console.log(accTypeId)  
        if (canSave) {
            setActiveApplyBtn(true);
        }
        else {
            setActiveApplyBtn(false);
        }       
    }, [accountTypeName, accountTypeCategory])

    return (
        <div>
            <div className={`modal_dark_screen_w ${editModalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Edit Account Type</h1>
                    </div>
                    
                    <div className="new_account_modal">
                        <div className="flex mt-3 gap-10">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Account Type Name</label>
                                    <input type="text" value={accountTypeName} onChange={(e)=>setAccountTypeName(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className='myprimarytextcolor'>Account Type Category</label>
                                    <select onChange={(e)=>(setAccountTypeCategory(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={accountTypeCategory}>
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
                            <button onClick={()=>onSaveClicked()} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
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

export default EditAccountTypeModal;