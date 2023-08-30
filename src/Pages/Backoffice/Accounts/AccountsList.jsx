import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
// import NewAccountModal from '../../../Components/Dashboard/NewAccountModal/NewAccountModal.jsx';
import AddAccountModal from './AddAccount/AddAccountModal.jsx';
import EditAccountModal from './EditAccount/EditAccountModal.jsx';
import DeleteAccountModal from './DeleteAccount/DeleteAccountModal.jsx';

import { useSelector, useDispatch }from 'react-redux';
import { selectAllAccounts,  getAccountsStatus, getAccountsError, fetchAccounts }from '../../../Reducers/accountsSlice';
import { selectAllAccTypes, getAccTypesStatus, getAccTypesError, fetchAccountTypes }from '../../../Reducers/accountTypesSlice';

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];
// const accountTypesList = [
//     {id:1, name:"Income", part:1},
//     {id:2, name:"Expenses", part:1},
//     {id:3, name:"Current Asset", part:2},
//     {id:4, name:"Fixed Asset", part:2},
//     {id:5, name:"Current Liabilities", part:2},
//     {id:6, name:"Long Term Liabilities", part:2},
//     {id:7, name:"Equity", part:2},
//     {id:8, name:"Account Receivable", part:2},
//     {id:9, name:"Account Payable", part:2},    
// ];

function AccountsList(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [modalOpen, setModalOpen] = useState(false);    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    
    const accounts = useSelector(selectAllAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())            
        }
    }, [accountsStatus, dispatch])

    const accountTypesList = useSelector(selectAllAccTypes);
    const accTypesStatus = useSelector(getAccTypesStatus);
    const accTypesError = useSelector(getAccTypesError);
    useEffect(() => {
        if (accTypesStatus === 'idle') {
            dispatch(fetchAccountTypes())
        }
    }, [accTypesStatus, dispatch])  

    const handleModalOpen = () => {   
        modalOpen ? setModalOpen(false) : setModalOpen(true)   
    }
    const handleEditModalOpen = (id) => {  
        if (editModalOpen) {
            setIdToEdit(null)
            setEditModalOpen(false)
        }
        else {
            
            setIdToEdit(id)
            setEditModalOpen(true)
        }
    }
    const handleDeleteModalOpen = (id) => {  
        if (deleteModalOpen) {
            setIdToDelete(null)
            setDeleteModalOpen(false)
        }
        else {            
            setIdToDelete(id)
            setDeleteModalOpen(true)
        }
    }


    let renderedAccounts;
    if (accountsStatus === 'loading') {
        renderedAccounts = <tr><td>...</td></tr>;
    } else if (accountsStatus === 'succeeded') {
        renderedAccounts = accounts.map((account, index) => (
        <tr key={index} className="table_row_w border border-b-slate-300">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.number}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {account.name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                
                {accountTypesList.filter(type => type.id == account.account_type_id)[0]?.name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Naira
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                N~
            </td>
            <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                
                <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(account.id)}>
                    <AiOutlineEdit size={18} color={"#41436a"}/>
                </div>
                {!account.prime ? 
                    <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(account.id)}>
                        <RiDeleteBinLine size={18} color={"#41436a"}/>
                    </div>
                : <></>}
                
            </td>
        </tr>
    ))
    } else if (accountsStatus === 'failed') {
        renderedAccounts = <tr><td>{accountsError}</td></tr>;
    }
    

    return (
        <>
            <div className="main_page_container bg-[#F0F0F0] flex flex-col justify-between">

                <div>
                    <div className="flex px-10 pt-3 justify-between gap-10">
                        <div className="myprimarytextcolor text-xl font-bold">Accounts</div>
                    </div>
                    <div className="flex px-10 py-3 justify-between gap-10  border border-b-slate-300">
                        <Link to={"#"} onClick={(e) => navigate(-1)} className="flex gap-1 items-center">
                            <FiChevronLeft size={20} color={"#white"}/>
                            <span className="myprimarytextcolor">Back</span>
                        </Link>

                        <div className="select_container flex gap-5 items-center">
                            <span className="myprimarytextcolor">Look for</span>

                            <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Select from the list`}</option>        
                                {
                                    listItems.map((val, ind) => {
                                        return <option key={ind} value={val.value}>{val.text}</option>
                                    })                                
                                }
                            </select>

                        </div>

                        <div className="select_container flex gap-5 items-center">
                            <span className="myprimarytextcolor">In</span>

                            <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Select from the list`}</option>        
                                {
                                    listItems.map((val, ind) => {
                                        return <option key={ind} value={val.value}>{val.text}</option>
                                    })                                
                                }
                            </select>

                        </div>

                        <div className="select_container flex gap-5 items-center">
                            <span className="myprimarytextcolor">Currency</span>

                            <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Select from the list`}</option>        
                                {
                                    listItems.map((val, ind) => {
                                        return <option key={ind} value={val.value}>{val.text}</option>
                                    })                                
                                }
                            </select>

                        </div>

                        <Link to={"#"} onClick={handleModalOpen} className="outline-none flex gap-1 items-center bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                            <FiPlus size={20} color={"#white"}/>
                            New Account
                        </Link>
                    </div>

                    <div className="table_container">
                        <table className="w-full">
                        <thead className="bg-white border-b">
                            <tr>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                #
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Name
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Type
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Currency
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Balance
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">                                
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {renderedAccounts}
                            
                        </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex px-5 py-3 gap-10 ">

                    <div className="select_container flex gap-5 items-center">
                        <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Account`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>
                    </div>
                    <div className="select_container flex gap-5 items-center">
                        <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Activites`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>
                    </div>
                    <div className="select_container flex gap-5 items-center">
                        <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Report`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>
                    </div>
                    <div className="select_container flex gap-5 items-center">
                        <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Export`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>
                    </div>

                </div>
                
            </div>

            {modalOpen ?
            <>
                <AddAccountModal 
                handleModalOpen={handleModalOpen}
                modalOpen={modalOpen}
                />
                
            </>
            :
            <></>}
            {editModalOpen ?
            <>
                <EditAccountModal 
                handleModalOpen={handleEditModalOpen}
                modalOpen={editModalOpen}
                accId ={idToEdit}
                />
                
            </>
            :
            <></>}
            {deleteModalOpen ?
            <>
                <DeleteAccountModal 
                handleDeleteModalOpen={handleDeleteModalOpen}
                deleteModalOpen={deleteModalOpen}
                accId ={idToDelete}
                />
                
            </>
            :
            <></>}
                       
        </>
    );
}

export default AccountsList;