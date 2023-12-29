import React, {useEffect} from 'react'
import slugify from 'slugify';
import CustomInput from '../../../../Components/CustomInput/CustomInput';

const ItemTypeForm = ({
    itemTypeId,
    companyId,
    modalOpen,
    itemTypeName, setItemTypeName,
    activeApplyBtn, setActiveApplyBtn,
    submitItemType,
    closeModal,
    canSave
}) => {

    const handleSubmit= async () => {
        let toSubmit = {
            "name": itemTypeName,
            "slug": slugify(itemTypeName.toLowerCase()),
            "company_id": Number(companyId),
        }
        if(itemTypeId) toSubmit["id"]=itemTypeId;
        await submitItemType(toSubmit)
    }
    

    useEffect(() => {
        canSave ? setActiveApplyBtn(true) : setActiveApplyBtn(false)
    }, [itemTypeName])    


    return (
    <div>
        <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>{itemTypeId ? 'Edit Item Type': 'New Item Type'}</h1>
                    </div>                    

                    <div className="new_item_modal_page">
                        
                        <div className="flex mt-3 gap-10 w-full">
                            <CustomInput 
                            type="text" 
                            label="Item Type Name" 
                            name="item_type_name" 
                            value={itemTypeName} 
                            onChange={(e)=>setItemTypeName(e.target.value)}
                            required={false}
                            className={`w-full`}
                            />
                            {/* 
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Item Type Name</label>
                                    <input type="text" value={itemTypeName} onChange={(e)=>setItemTypeName(e.target.value)} name="itemType_name" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>                  
                            </div>
                            */}
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

export default ItemTypeForm