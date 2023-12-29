import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { selectAccountById, deleteAccount } from "../../../../Reducers/accountsSlice";
import { useSelector }from 'react-redux';
import { findObjectById } from '../../../../Helpers/index.js';
import { useGetAccTypesByCompanyIdQuery, useDeleteAccTypeMutation } from "../../../../Api/Reducers/accountTypesApiSlice.js";


function DeleteAccountType({accTypeId, companyId, handleModalOpen, modalOpen}) {
    const [deleteAccType] = useDeleteAccTypeMutation()
    const [accountTypeName, setAccountTypeName] = useState();

    
    const { data: accType, isLoading, isSuccess } = useGetAccTypesByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.entities[accTypeId],
            isLoading,
            isSuccess
        }),
    });

    useEffect(() => {
        isSuccess && setAccountTypeName(accType?.name)
    }, [isSuccess, accType?.name])
    
    
    const onDeleteClicked = async () => {
        try {
            await deleteAccType({ id: accTypeId }).unwrap()
        } catch (err) {
            console.error('Failed to delete the account.', err)
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
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Delete Account Type </h1>
                        <h3 className={`text-[18px] font-bold myprimarytextcolor`}>"{accountTypeName}"</h3>
                    </div>
                    
                    <div className="new_account_modal">
                        <div className="flex mt-3 justify-center">
                            Are you sure you want to delete this account type ?               
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

export default DeleteAccountType;