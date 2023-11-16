import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import { updateItemType, selectItemTypeById, selectAllItemTypes,  getItemTypesStatus, getItemTypesError, fetchItemTypes }from '../../../../Reducers/itemTypesSlice';


function EditItemTypeModal({itemTypeId, handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myItemType = useSelector((state) => selectItemTypeById(state, Number(itemTypeId)));
    
    const [itemTypeName, setItemTypeName] = useState(myItemType?.name);
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    
    const itemTypesList = useSelector(selectAllItemTypes);
    const itemTypesStatus = useSelector(getItemTypesStatus);
    const itemTypesError = useSelector(getItemTypesError);
    useEffect(() => {
        if (itemTypesStatus === 'idle') {
            dispatch(fetchItemTypes())            
        }
    }, [itemTypesStatus, dispatch])



    const closeModal = () => {
        handleModalOpen();    
    }
    const submitNewItemType = () => {
        const toSubmit = {
            "id": myItemType?.id,
            "name": itemTypeName,
        }
        console.log("toSubmit: ", toSubmit)
        if ( itemTypeName ) {
            dispatch_and_resetform(toSubmit)
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            updateItemType(toSubmit)
        ).unwrap()
        setItemTypeName('')
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if ( itemTypeName ) {
            setActiveApplyBtn(true);
        } else {
            setActiveApplyBtn(false);
        }

    }, [itemTypeName])

    return (
        <div>
            <div className={`modal_dark_screen_w ${modalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>New Item Type</h1>
                    </div>

                    <div className="new_itemType_modal_page_2">
                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            {/* <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose your itemType category and type</span> */}
                        </div>
                        <div className="flex mt-3 gap-10 w-full">
                            <div className="flex flex-col gap-5 w-full     014">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Item Name</label>
                                    <input type="text" value={itemTypeName} onChange={(e)=>setItemTypeName(e.target.value)} name="itemType_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>                                                               
                            </div>                            
                        </div>

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                            <button onClick={()=>submitNewItemType(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
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

export default EditItemTypeModal;