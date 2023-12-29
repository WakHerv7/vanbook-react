import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { selectItemTypeById, deleteItemType } from "../../../../Reducers/itemTypesSlice";
import { useSelector }from 'react-redux';
import { findObjectById } from '../../../../Helpers/index.js';
import { useGetItemTypesByCompanyIdQuery, useDeleteItemTypeMutation } from "../../../../Api/Reducers/itemTypesApiSlice.js";


function DeleteItemType({itemTypeId, companyId, handleModalOpen, modalOpen}) {
    const [deleteItemType] = useDeleteItemTypeMutation()
    const [itemTypeName, setItemTypeName] = useState();

    const { data: itemType, isLoading, isSuccess } = useGetItemTypesByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.entities[itemTypeId],
            isLoading,
            isSuccess
        }),
    });

    useEffect(() => {
        isSuccess && setItemTypeName(itemType?.name)
    }, [isSuccess, itemType?.name])
    
    
    const onDeleteClicked = async () => {
        try {
            await deleteItemType({ id: itemTypeId }).unwrap()
        } catch (err) {
            console.error('Failed to delete the itemType.', err)
        }
        closeModal()
    }

    const closeModal = () => {
        handleModalOpen();    
    }

    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col itemTypes-center w-full justify-center text-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Delete Item Type </h1>
                        <h3 className={`text-[18px] font-bold myprimarytextcolor`}>"{itemTypeName}"</h3>
                    </div>
                    
                    <div className="new_itemType_modal">
                        <div className="flex mt-3 justify-center">
                            Are you sure you want to delete this item type ?               
                        </div>
                        

                        <div className="flex justify-center gap-5 mt-5 mb-3 pr-3">
                            <button onClick={()=>onDeleteClicked()} className={`outline-none bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Yes, delete
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

export default DeleteItemType;