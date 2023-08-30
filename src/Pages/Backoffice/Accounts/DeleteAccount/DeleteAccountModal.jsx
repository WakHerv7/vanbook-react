import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { selectAccountById, deleteAccount } from "../../../../Reducers/accountsSlice";
import { useSelector }from 'react-redux';



function DeleteAccountTypeModal({accId, handleDeleteModalOpen, deleteModalOpen}) {
    
    const dispatch = useDispatch();
    const acc = useSelector((state) => selectAccountById(state, Number(accId)));
    const [accountName, setAccountName] = useState(acc?.name);
    const [requestStatus, setRequestStatus] = useState('idle');
    
    const onDeleteClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deleteAccount({ id: Number(accId) })).unwrap()

        } catch (err) {
            console.error('Failed to delete the account.', err)
        } finally {
            setRequestStatus('idle')
        }
        closeModal()
    }

    const closeModal = () => {
        handleDeleteModalOpen();    
    }

    return (
        <div>
            <div className={`modal_container_wh ${deleteModalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Delete Account "{accountName}"</h1>
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

export default DeleteAccountTypeModal;