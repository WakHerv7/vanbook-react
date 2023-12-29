import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import AddItem from './Item/AddItem';
import EditItem from './Item/EditItem';
import DeleteItem from './Item/DeleteItem';

import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../../Api/Auth/authSlice.js';
import { useGetItemsByCompanyIdQuery } from '../../../Api/Reducers/itemsApiSlice.js';
import { useSelector, useDispatch }from 'react-redux';


const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function ItemsList(props) {        
    const navigate = useNavigate();

    const token = useSelector(selectCurrentToken)
    const decodedToken = jwtDecode(token);
    const { rc } = decodedToken;

    const [modalOpen, setModalOpen] = useState(false);    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    const {
        data: items,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetItemsByCompanyIdQuery(rc.id);

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


    

    const renderItems = (items) => {
        return items.map((item, index) => {
            return (
                <tr key={item.id} className="table_row_w border border-b-slate-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" style={{ paddingLeft: `${item.level * 20}px` }}>
                        {item.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.description}</td>
                    {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.type?.name}</td> */}
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.account?.name}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">N{item.rate}</td>
                    <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(item.id)}>
                        <AiOutlineEdit size={18} color={"vanbook-primary"}/>
                        </div>
                        {!item.prime ? 
                        <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(item.id)}>
                            <RiDeleteBinLine size={18} color={"vanbook-primary"}/>
                        </div>
                        : <></>}
                    </td>
                </tr>
            );
        });
     };

    let renderedItems;
    if (isLoading) {
        renderedItems = <tr><td>...</td></tr>;
    } else if (isSuccess && items) {
        renderedItems = renderItems(items.ids.map(id => items.entities[id]));
    } else if (isError) {
        renderedItems = <tr><td>{JSON.stringify(error)}</td></tr>;
    }
       


    return (
        <>
        <div className="main_page_container bg-[#F0F0F0] flex flex-col justify-between">
            <div>
                <div className="flex px-10 pt-3 justify-between gap-10">
                    <div className="myprimarytextcolor text-xl font-bold">Items</div>
                </div>
                <div className="flex px-10 py-3 justify-between gap-10  border border-b-slate-300">
                    <Link to={""} onClick={() => navigate(-1)} className="flex gap-1 items-center">
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

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""}  defaultValue={'dflt'}>
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
                        New Item
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
                            Item
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Description
                        </th>
                        {/* <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Type
                        </th> */}
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Account
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Price 
                        </th>
                        {/* <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Balance
                        </th> */}
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">                            
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedItems}
                    </tbody>
                    </table>
                </div>
            </div>

            <div className="flex px-5 py-3 gap-10 ">

                <div className="select_container flex gap-5 items-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Items`}</option>        
                        {
                            listItems.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 items-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Activites`}</option>        
                        {
                            listItems.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 items-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Report`}</option>        
                        {
                            listItems.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 items-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
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
            <AddItem
            handleModalOpen={handleModalOpen}
            modalOpen={modalOpen}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        {editModalOpen ?
        <>
            <EditItem
            handleModalOpen={handleEditModalOpen}
            modalOpen={editModalOpen}
            itemId ={idToEdit}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        {deleteModalOpen ?
        <>
            <DeleteItem
            handleModalOpen={handleDeleteModalOpen}
            modalOpen={deleteModalOpen}
            itemId ={idToDelete}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        </>
    );
}

export default ItemsList;