import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAccountsByCompanyIdQuery } from "../../../../Api/Reducers/accountsApiSlice.js";
import { useGetItemsByCompanyIdQuery,
    useAddNewItemMutation } from "../../../../Api/Reducers/itemsApiSlice.js";
import ItemForm from './ItemForm.jsx';

const AddItem = ({ companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    
    const [issubitemof, setIssubitemof] = useState();
    const [itemName, setItemName] = useState();
    const [itemDescription, setItemDescription] = useState("");
    const [itemParent, setItemParent] = useState('dflt');
    const [itemRate, setItemRate] = useState(0);
    const [itemType, setItemType] = useState();
    const [itemAccount, setItemAccount] = useState('dflt');
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);

    const closeModal = () => {
        handleModalOpen();    
    }

    const {
        data: accountsList,
        isSuccess: isSuccessAccounts,
    } = useGetAccountsByCompanyIdQuery(companyId);

    const { data: itemsList, isSuccess:isSuccessItems } = useGetItemsByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => {            
            const itemsArray = Object.values(data?.entities);
            const filteredData = itemsArray.filter((acc) => acc.parent_id === null);
            return {
                data: filteredData,
                isLoading,
                isSuccess
            };
        },
     });

    const [addNewItem, { isLoading }] = useAddNewItemMutation()

    const canSave = [itemName, itemAccount].every(Boolean) && !isLoading;

    const submitItem = async (toSubmit) => {
        
        if (canSave) {
            if (issubitemof) {
                if (itemParent) {
                    await addNewItem(toSubmit).unwrap()
                    resetForm(toSubmit)
                }
            } else {
                await addNewItem(toSubmit).unwrap()
                resetForm(toSubmit)
            }
        }
    }

    const resetForm = () => {
        setItemName('')
        setItemRate(0)
        setItemParent(null)
        setItemDescription('')
        setItemAccount(null)
        setItemType(null)
        setActiveApplyBtn(false)
        closeModal()
    }

    return (
        <ItemForm
        companyId={companyId}
        modalOpen={modalOpen}
        accountsList={accountsList}
        isSuccessAccounts={isSuccessAccounts}
        itemsList={itemsList}
        isSuccessItems={isSuccessItems}
        activeApplyBtn={activeApplyBtn}
        setActiveApplyBtn={setActiveApplyBtn}
        issubitemof={issubitemof}
        setIssubitemof={setIssubitemof}
        itemType={itemType}
        setItemType={setItemType}
        itemName={itemName}
        setItemName={setItemName}
        itemRate={itemRate}
        setItemRate={setItemRate}
        itemAccount={itemAccount}
        setItemAccount={setItemAccount}
        itemParent={itemParent}
        setItemParent={setItemParent}
        itemDescription={itemDescription}
        setItemDescription={setItemDescription}
        submitItem={submitItem}
        closeModal={closeModal}
        canSave={canSave}
        />
    )
}

export default AddItem