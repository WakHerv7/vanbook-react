import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAccountsByCompanyIdQuery } from "../../../../Api/Reducers/accountsApiSlice.js";
import { useGetItemsByCompanyIdQuery,
    useUpdateItemMutation } from "../../../../Api/Reducers/itemsApiSlice.js";
import ItemForm from './ItemForm.jsx';

const EditItem = ({ itemId, companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    
    const [issubitemof, setIssubitemof] = useState();
    const [itemName, setItemName] = useState();
    const [itemDescription, setItemDescription] = useState("");
    const [itemParent, setItemParent] = useState('dflt');
    const [itemRate, setItemRate] = useState(0);
    const [itemType, setItemType] = useState();
    const [itemAccount, setItemAccount] = useState();
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
            // Filter out the item with the specific id
            const itemsArray = Object.values(data?.entities);
            const filteredData = itemsArray.filter((acc) => acc.id !== itemId && acc.parent_id === null);
            return {
                data: filteredData,
                isLoading,
                isSuccess
            };
        },
     });
    
     // Get current item
    const { data: item, isSuccess:isSuccessOneItem } = useGetItemsByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.entities[itemId],
            isLoading,
            isSuccess
        }),
    });


    const [updateItem, { isLoading }] = useUpdateItemMutation()

    useEffect(() => {
        if (isSuccessOneItem) {
            // console.log("### EDIT ACCOUNT IS OPEN ### : ", accountType);
            setIssubitemof(item.parent_id)
            setItemName(item.name)
            setItemRate(item.rate)
            setItemParent(item.parent_id)
            setItemDescription(item.description)
            setItemAccount(item.account_id)
            setItemType(item.item_type_id)
        }
    }, [isSuccessOneItem, 
        item.name,
        item.rate,
        item.parent_id,
        item.description,
        item.account_id,
        item.item_type_id])

    const canSave = [itemName, itemAccount].every(Boolean) && !isLoading;

    const submitItem = async (toSubmit) => {
        if (canSave) {
            if (issubitemof) {
                if (itemParent) {
                    await updateItem(toSubmit).unwrap()
                    resetForm(toSubmit)
                }
            } else {
                await updateItem(toSubmit).unwrap()
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
        itemId={itemId}
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

export default EditItem