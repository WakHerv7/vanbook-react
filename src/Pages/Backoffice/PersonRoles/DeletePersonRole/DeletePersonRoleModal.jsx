import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { selectPersonRoleById, deletePersonRole } from "../../../../Reducers/personRolesSlice";
import { useSelector }from 'react-redux';



function DeleteAccountTypeModal({personRoleId, handleDeleteModalOpen, deleteModalOpen}) {
    
    const dispatch = useDispatch();
    const myPersonRole = useSelector((state) => selectPersonRoleById(state, Number(personRoleId)));
    const [personRoleName, setPersonRoleName] = useState(myPersonRole?.name);
    const [requestStatus, setRequestStatus] = useState('idle');
    
    const onDeleteClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePersonRole({ id: Number(personRoleId) })).unwrap()
        } catch (err) {
            console.error('Failed to delete the item.', err)
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
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Delete Role "{personRoleName}"</h1>
                    </div>
                    
                    <div className="new_account_modal">
                        <div className="flex mt-3 justify-center">
                            Are you sure you want to delete this role ?                                                                                   
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