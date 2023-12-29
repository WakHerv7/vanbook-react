import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAccTypesByCompanyIdQuery } from "../../../../Api/Reducers/accountTypesApiSlice.js";
import { useGetAccountsByCompanyIdQuery,
    useAddNewAccountMutation, 
    useUpdateAccountMutation} from "../../../../Api/Reducers/accountsApiSlice.js";
import "./style_modal.css";
import { findObjectById } from '../../../../Helpers/index.js';
import AccountForm from './AccountForm.jsx';
import { useSelector, useDispatch } from 'react-redux';


const EditAccount = ({accId, companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const accounts = useSelector(state => state.accounts);
    
    const [page1, setPage1] = useState(true);
    const [issubaccountof, setIssubaccountof] = useState();
    const [accountType, setAccountType] = useState();
    const [accountName, setAccountName] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [accountParent, setAccountParent] = useState();
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
            // Filter out the account with the specific id
            const accountsArray = Object.values(data?.entities);
            const filteredData = accountsArray.filter((acc) => acc.id !== accId && acc.parent_id === null);
            return {
                data: filteredData,
                isLoading,
                isSuccess
            };
        },
     });
    
     // Get current account
    const { data: account, isSuccess:isSuccessOneAccount } = useGetAccountsByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.entities[accId],
            isLoading,
            isSuccess
        }),
    });

    const [updateAccount, { isLoading }] = useUpdateAccountMutation();

    useEffect(() => {
        if (isSuccessOneAccount) {
            // console.log("### EDIT ACCOUNT IS OPEN ### : ", accountType);
            setIssubaccountof(account.parent_id)
            setAccountParent(account.parent_id)
            setAccountType(account.account_type_id)
            setAccountName(account.name)
            setAccountNumber(account.number)
            setAccountDescription(account.description)
        }
    }, [isSuccessOneAccount, 
        account?.account_parent_id,
        account?.account_parent_id,
        account?.account_type_id,
        account?.name,
        account?.number,
        account?.description])

    const submitNewAccount = async (toSubmit) => {
        // console.log("toSubmit: ", toSubmit)
        const canSave = [accountType, accountName, accountNumber].every(Boolean) && !isLoading;
        if (canSave) {
            if (issubaccountof) {
                if (accountParent) {
                    await updateAccount(toSubmit).unwrap()
                    resetForm(toSubmit)
                    // dispatch(accountsApiSlice.endpoints.updateAccount.initiate(account));
                }
            } else {
                await updateAccount(toSubmit).unwrap()
                resetForm(toSubmit)
                // dispatch(accountsApiSlice.endpoints.updateAccount.initiate(account));
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
        accId={accId}
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

export default EditAccount