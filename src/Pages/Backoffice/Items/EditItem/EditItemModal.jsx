import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import { updateItem, selectItemById, selectAllItems,  getItemsStatus, getItemsError, fetchItems }from '../../../../Reducers/itemsSlice';
import { selectAllAccounts, getAccountsStatus, getAccountsError, fetchAccounts }from '../../../../Reducers/accountsSlice';


function EditItemModal({itemId, handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myItem = useSelector((state) => selectItemById(state, Number(itemId)));

    const [issubitemof, setIssubitemof] = useState(myItem?.item_parent_id);
    
    const [itemName, setItemName] = useState(myItem?.name);
    const [itemDescription, setItemDescription] = useState(myItem?.description);
    const [itemParent, setItemParent] = useState(myItem?.item_parent_id);
    const [itemRate, setItemRate] = useState(myItem?.rate);
    const [itemAccount, setItemAccount] = useState(myItem?.account_id);
    
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    const accountsList =useSelector(selectAllAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())
        }
        // console.log("accountsList: ", accountsList);
    }, [accountsStatus, dispatch])    
    const itemsList = useSelector(selectAllItems);
    const itemsStatus = useSelector(getItemsStatus);
    const itemsError = useSelector(getItemsError);
    useEffect(() => {
        if (itemsStatus === 'idle') {
            dispatch(fetchItems())            
        }
        
    }, [itemsStatus, dispatch])



    const closeModal = () => {
        handleModalOpen();    
    }
    const submitNewItem = () => {
        const toSubmit = {
            "id": myItem?.id,            
            "name": itemName,
            "description": itemDescription,
            "rate": Number(itemRate),
            "item_parent_id": issubitemof ? Number(itemParent) : null,                        
            "account_id": Number(itemAccount),
        }
        console.log("toSubmit: ", toSubmit)
        if (itemName && itemAccount) {
            if (issubitemof) {
                if (itemParent) {
                    dispatch_and_resetform(toSubmit)
                }
            } else {
                dispatch_and_resetform(toSubmit)
            }
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            updateItem(toSubmit)
        ).unwrap()
        setItemName('')
        setItemRate(0)
        setItemParent(null)
        setItemDescription('')
        setItemAccount(null)
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if (itemAccount && itemName ) {
            if (issubitemof) {
                if (itemParent) {
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

        console.log("myItem: ", myItem);

    }, [itemName, itemAccount, issubitemof, itemParent])

    return (
        <div>
            <div className={`modal_dark_screen_w ${modalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Edit Item {myItem?.name}</h1>
                    </div>                    

                    <div className="new_item_modal_page">
                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            {/* <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose your item category and type</span> */}
                        </div>
                        <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Name*</label>
                                    <input type="text" value={itemName} onChange={(e)=>setItemName(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="item_category_1" className="myprimarytextcolor container_checkbo_select_w mb0w">
                                        Is subitem of
                                        <input type="checkbox" checked={issubitemof} onChange={(e)=>setIssubitemof(e.target.checked)} name="subitem" id="item_category_1"/>
                                        <span className="checkmark_checkbo_select_w"></span>
                                    </label>
                                    {issubitemof?                                    
                                    <select onChange={(e)=>(setItemParent(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={itemParent}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            itemsList.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                    :
                                    <></>
                                    }
                                    
                                </div>                                
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Account*</label>                                
                                    <select onChange={(e)=>(setItemAccount(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={itemAccount}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            accountsList.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                    
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Rate</label>
                                    <input type="number" value={itemRate} onChange={(e)=>setItemRate(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                            </div>                            
                        </div>
                        <div className="flex w-full my-5">
                            <div className="flex w-full flex-col gap-1">
                                <label className='myprimarytextcolor'>Description</label>
                                <textarea name="" id="" rows="5" value={itemDescription} onChange={(e)=>setItemDescription(e.target.value)} className={`border border-[#41436a] rounded-md`}>

                                </textarea>

                            </div>
                        </div>

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">                            
                            <button onClick={()=>submitNewItem(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
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

export default EditItemModal;