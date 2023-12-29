import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewItemTypeMutation } from "../../../../Api/Reducers/itemTypesApiSlice.js";
import ItemTypeForm from './ItemTypeForm.jsx';

const AddItemType = ({ companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    const [itemTypeName, setItemTypeName] = useState();
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);

    const closeModal = () => {
        handleModalOpen();    
    }

    const [addNewItemType, { isLoading }] = useAddNewItemTypeMutation()

    const canSave = [itemTypeName].every(Boolean) && !isLoading;

    const submitItemType = async (toSubmit) => {
        
        if (canSave) {
            await addNewItemType(toSubmit).unwrap()
            resetForm(toSubmit)
        }
    }

    const resetForm = () => {
        setItemTypeName('')
        setActiveApplyBtn(false)
        closeModal()
    }

    return (
        <ItemTypeForm
        companyId={companyId}
        modalOpen={modalOpen}
        activeApplyBtn={activeApplyBtn}
        setActiveApplyBtn={setActiveApplyBtn}
        itemTypeName={itemTypeName}
        setItemTypeName={setItemTypeName}
        submitItemType={submitItemType}
        closeModal={closeModal}
        canSave={canSave}
        />
    )
}

export default AddItemType