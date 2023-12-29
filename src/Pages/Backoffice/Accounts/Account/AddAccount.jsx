import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAccTypesByCompanyIdQuery } from "../../../../Api/Reducers/accountTypesApiSlice.js";
import { useGetAccountsByCompanyIdQuery,
    useAddNewAccountMutation } from "../../../../Api/Reducers/accountsApiSlice.js";
import "./style_modal.css";
import AccountForm from './AccountForm.jsx';

const AddAccount = ({ companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    
    const [page1, setPage1] = useState(true);
    const [issubaccountof, setIssubaccountof] = useState();
    const [accountType, setAccountType] = useState();
    const [accountName, setAccountName] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [accountParent, setAccountParent] = useState("dflt");
    const [accountDescription, setAccountDescription] = useState("");
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);

    const closeModal = () => {
        handleModalOpen();    
    }

    const {
        data: acctypes,
        isSuccess: isSuccessAccTypes,
    } = useGetAccTypesByCompanyIdQuery(companyId);

    const { data: accountsList, isSuccess:isSuccessAccounts } = useGetAccountsByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => {            
            const accountsArray = Object.values(data?.entities);
            const filteredData = accountsArray.filter((acc) => acc.parent_id === null);
            return {
                data: filteredData,
                isLoading,
                isSuccess
            };
        },
     });

    const [addNewAccount, { isLoading }] = useAddNewAccountMutation()

    const submitNewAccount = async (toSubmit) => {
        // console.log("toSubmit: ", toSubmit)
        const canSave = [accountType, accountName, accountNumber].every(Boolean) && !isLoading;
        if (canSave) {
            if (issubaccountof) {
                if (accountParent) {
                    await addNewAccount(toSubmit).unwrap()
                    resetForm(toSubmit)
                }
            } else {
                await addNewAccount(toSubmit).unwrap()
                resetForm(toSubmit)
            }
        }
    }

    const resetForm = () => {
        setPage1(true)
        setAccountType(false)
        setAccountName('')
        setAccountNumber('')
        setAccountParent('')
        setAccountDescription('')
        setActiveApplyBtn(false)
        closeModal()
    }

    return (
        <AccountForm
        companyId={companyId}
        modalOpen={modalOpen}
        acctypes={acctypes}
        isSuccessAccTypes={isSuccessAccTypes}
        accountsList={accountsList}
        isSuccessAccounts={isSuccessAccounts}
        page1={page1}
        setPage1={setPage1}
        activeApplyBtn={activeApplyBtn}
        setActiveApplyBtn={setActiveApplyBtn}
        issubaccountof={issubaccountof}
        setIssubaccountof={setIssubaccountof}
        accountType={accountType}
        setAccountType={setAccountType}
        accountName={accountName}
        setAccountName={setAccountName}
        accountNumber={accountNumber}
        setAccountNumber={setAccountNumber}
        accountParent={accountParent}
        setAccountParent={setAccountParent}
        accountDescription={accountDescription}
        setAccountDescription={setAccountDescription}
        submitNewAccount={submitNewAccount}
        closeModal={closeModal}
        />
    )
}

export default AddAccount