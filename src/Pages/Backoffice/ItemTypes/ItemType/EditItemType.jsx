import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetItemTypesByCompanyIdQuery, useUpdateItemTypeMutation } from "../../../../Api/Reducers/itemTypesApiSlice.js";
import ItemTypeForm from './ItemTypeForm.jsx';

const EditItemType = ({ itemTypeId, companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    const [itemTypeName, setItemTypeName] = useState();
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);

    const closeModal = () => {
        handleModalOpen();    
    }

     // Get current item
     const { data: itemType, isSuccess:isSuccessOneItemType } = useGetItemTypesByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.entities[itemTypeId],
            isLoading,
            isSuccess
        }),
    });

    const [updateItemType, { isLoading }] = useUpdateItemTypeMutation()

    const canSave = [itemTypeName].every(Boolean) && !isLoading;

    useEffect(() => {
        if (isSuccessOneItemType) {
            setItemTypeName(itemType.name)
        }
    }, [isSuccessOneItemType, itemType?.name])

    const submitItemType = async (toSubmit) => {
        if (canSave) {
            await updateItemType(toSubmit).unwrap()
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
        itemTypeId={itemTypeId}
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

export default EditItemType