import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateAccTypeMutation, useGetAccTypesByCompanyIdQuery } from "../../../../Api/Reducers/accountTypesApiSlice.js";

import AccountTypeForm from './AccountTypeForm.jsx';

const EditAccountType = ({accTypeId, companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    const [accountTypeName, setAccountTypeName] = useState();
    const [accountTypeCategory, setAccountTypeCategory] = useState();    
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);

    const closeModal = () => {
        handleModalOpen();    
    }

    const { data: accType, isLoading:isLoadingOneAccType, isSuccess:isSuccessOneAccType } = useGetAccTypesByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.entities[accTypeId],
            isLoading,
            isSuccess
        }),
    });

    const [updateAccType, { isLoading }] = useUpdateAccTypeMutation()

    useEffect(() => {
        if (isSuccessOneAccType) {
            setAccountTypeName(accType.name)
            setAccountTypeCategory(accType.category)
        }
    }, [isSuccessOneAccType, 
        accType?.name,
        accType?.category,])

    const canSave = [accountTypeName, accountTypeCategory].every(Boolean) && !isLoading;

    const submitAccType = async (toSubmit) => {
        if (canSave) {
            await updateAccType(toSubmit).unwrap()
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
        accTypeId={accTypeId}
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

export default EditAccountType