import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewAccTypeMutation } from "../../../../Api/Reducers/accountTypesApiSlice.js";

import AccountTypeForm from './AccountTypeForm.jsx';

const AddAccountType = ({ companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    const [accountTypeName, setAccountTypeName] = useState();
    const [accountTypeCategory, setAccountTypeCategory] = useState();    
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);

    const closeModal = () => {
        handleModalOpen();    
    }

    const [addNewAccType, { isLoading }] = useAddNewAccTypeMutation()

    const canSave = [accountTypeName, accountTypeCategory].every(Boolean) && !isLoading;

    const submitAccType = async (toSubmit) => {
        if (canSave) {
            await addNewAccType(toSubmit).unwrap()
            resetForm(toSubmit)
        }
    }

    const resetForm = () => {
        setAccountTypeName('')
        setAccountTypeCategory(false)
        setActiveApplyBtn(false)
        closeModal()
    }

    return (
        <AccountTypeForm
        companyId={companyId}
        modalOpen={modalOpen}
        activeApplyBtn={activeApplyBtn}
        setActiveApplyBtn={setActiveApplyBtn}
        accountTypeName={accountTypeName}
        setAccountTypeName={setAccountTypeName}
        accountTypeCategory={accountTypeCategory}
        setAccountTypeCategory={setAccountTypeCategory}
        canSave={canSave}
        submitAccType={submitAccType}
        closeModal={closeModal}
        />
    )
}

export default AddAccountType