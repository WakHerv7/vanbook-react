import React, { useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import AddAccountModal from './Account/AddAccount';
import EditAccountModal from './Account/EditAccount.jsx';
import DeleteAccountModal from './Account/DeleteAccount';
import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../../Api/Auth/authSlice.js';
import { useSelector, useDispatch }from 'react-redux';
import { accountsApiSlice, useGetAccountsByCompanyIdQuery } from "../../../Api/Reducers/accountsApiSlice.js";

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function AccountsList(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(selectCurrentToken)
    const decodedToken = jwtDecode(token);
    const { firstname, lastname, username, email, role, privileges, cc, rc } = decodedToken;
    
    const [modalOpen, setModalOpen] = useState(false);    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    
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

    const {
        data: accounts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAccountsByCompanyIdQuery(rc.id);
    
    const renderAccount = (account) => {
        return (
            <tr key={account.id} className="table_row_w border border-b-slate-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.number}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" style={{ paddingLeft: `${account.level * 20}px` }}>
                    {account.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{account.account_type?.name}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Naira</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">N~</td>
                <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(account.id)}>
                       <AiOutlineEdit size={18} color={"vanbook-primary"}/>
                    </div>
                    {!account.prime ? 
                       <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(account.id)}>
                           <RiDeleteBinLine size={18} color={"vanbook-primary"}/>
                       </div>
                    : <></>}
                </td>
            </tr>
        );
    };

    const renderAccounts = (accounts) => {
        return accounts.map((account) => {
            return (
                <React.Fragment key={account.id}>
                    {renderAccount(account)}
                </React.Fragment>
            );
        });
     };

    let renderedAccounts;
    if (isLoading) {
        renderedAccounts = <tr><td>...</td></tr>;
    } else if (isSuccess && accounts) {
        renderedAccounts = renderAccounts(accounts.ids.map(id => accounts.entities[id]));
    } else if (isError) {
        renderedAccounts = <tr><td>{JSON.stringify(error)}</td></tr>;
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
                companyId={rc.id}
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
                companyId={rc.id}
                />
                
            </>
            :
            <></>}
            {deleteModalOpen && rc.id ?
            <>
                <DeleteAccountModal 
                handleModalOpen={handleDeleteModalOpen}
                modalOpen={deleteModalOpen}
                accId ={idToDelete}
                companyId={rc.id}
                />
                
            </>
            :
            <></>}
                       
        </>
    );
}

export default AccountsList;