import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { selectSchoolPaymentConfigById, deleteSchoolPaymentConfig } from "../../../../Reducers/schoolPaymentConfigsSlice";
import { useSelector }from 'react-redux';



function DeleteSchoolPaymentConfigModal({schoolPaymentConfigId, handleDeleteModalOpen, deleteModalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mySchoolPaymentConfig = useSelector((state) => selectSchoolPaymentConfigById(state, Number(schoolPaymentConfigId)));
    const [schoolPaymentConfigName, setSchoolPaymentConfigName] = useState(mySchoolPaymentConfig?.name);
    const [requestStatus, setRequestStatus] = useState('idle');
    
    const onDeleteClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deleteSchoolPaymentConfig({ id: Number(schoolPaymentConfigId) })).unwrap()
        } catch (err) {
            console.error('Failed to delete the item.', err)
        } finally {
            setRequestStatus('idle')
        }
        closeModal()
        navigate(0)
    }

    const closeModal = () => {
        handleDeleteModalOpen();    
    }

    return (
        <div>
            <div className={`modal_dark_screen_w ${deleteModalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>Delete Account "{schoolPaymentConfigName}"</h1>
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

export default DeleteSchoolPaymentConfigModal;