import React, {useEffect} from 'react'
import slugify from 'slugify';

const ItemForm = ({
    itemId,
    companyId,
    modalOpen,
    accountsList, isSuccessAccounts,
    itemsList, isSuccessItems,
    activeApplyBtn, setActiveApplyBtn,
    issubitemof, setIssubitemof,
    itemType, setItemType,
    itemName, setItemName,
    itemRate, setItemRate,
    itemAccount, setItemAccount,
    itemParent, setItemParent,
    itemDescription, setItemDescription,
    submitItem,
    closeModal,
    canSave
}) => {

    const handleSubmit= async () => {
        let toSubmit = {
            "name": itemName,
            "slug": slugify(itemName),
            "rate": Number(itemRate),
            "description": itemDescription,
            "item_type_id": Number(itemType),
            "parent_id": issubitemof ? Number(itemParent) : null,
            "account_id": Number(itemAccount),
            "company_id": Number(companyId),
        }
        if(itemId) toSubmit["id"]=itemId;
        await submitItem(toSubmit)
    }
    

    useEffect(() => {
        if (canSave) {
            if (issubitemof) {
                itemParent ? setActiveApplyBtn(true) : setActiveApplyBtn(false)
            } else { setActiveApplyBtn(true) }
        } else { setActiveApplyBtn(false) }
    }, [itemType, itemName, itemAccount, issubitemof, itemParent])    


    return (
    <div>
        <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>{itemId ? 'Edit Item': 'New Item'}</h1>
                    </div>                    

                    <div className="new_item_modal_page">
                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">
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
                                            accountsList.ids.map((accId, ind) => {
                                                const val = accountsList.entities[accId];
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
                                <textarea name="" id="" rows="5" value={itemDescription} onChange={(e)=>setItemDescription(e.target.value)} className={`border p-2 border-[#41436a] rounded-md`}>

                                </textarea>

                            </div>
                        </div>

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">                            
                            <button onClick={handleSubmit} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Apply
                            </button>
                            <button onClick={closeModal} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                    
                    
                    

                </div>
        </div>

    </div>
  )
}

export default ItemForm