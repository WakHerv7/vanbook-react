import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import AddItemType from './ItemType/AddItemType';
import EditItemType from './ItemType/EditItemType';
import DeleteItemType from './ItemType/DeleteItemType';

import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../../Api/Auth/authSlice.js';
import { useGetItemTypesByCompanyIdQuery } from '../../../Api/Reducers/itemTypesApiSlice.js';
import { useSelector, useDispatch }from 'react-redux';


function ItemTypesList(props) {        
    const dispatch = useDispatch();
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
        data: itemTypes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetItemTypesByCompanyIdQuery(rc.id);

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


    const renderItemTypes = (itemTypes) => {
        return itemTypes.map((itemType, index) => {
            return (
                <tr key={itemType.id} className="table_row_w border border-b-slate-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {itemType.name}
                    </td>
                    
                    <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(itemType.id)}>
                        <AiOutlineEdit size={18} color={"vanbook-primary"}/>
                        </div>
                        {!itemType.prime ? 
                        <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(itemType.id)}>
                            <RiDeleteBinLine size={18} color={"vanbook-primary"}/>
                        </div>
                        : <></>}
                    </td>
                </tr>
            );
        });
     };

    let renderedItemTypes;
    if (isLoading) {
        renderedItemTypes = <tr><td>...</td></tr>;
    } else if (isSuccess && itemTypes) {
        renderedItemTypes = renderItemTypes(itemTypes.ids.map(id => itemTypes.entities[id]));
    } else if (isError) {
        renderedItemTypes = <tr><td>{JSON.stringify(error)}</td></tr>;
    }
    


    return (
        <>
        <div className="main_page_container bg-[#F0F0F0] flex flex-col justify-between">
            <div>
                <div className="flex px-10 pt-3 justify-between gap-10">
                    <div className="myprimarytextcolor text-xl font-bold">Item Types</div>
                </div>
                <div className="flex items-center px-10 py-3 justify-between gap-10  border border-b-slate-300">
                    <Link to={""} onClick={() => navigate(-1)} className="flex gap-1 items-center">
                        <FiChevronLeft size={20} color={"#white"}/>
                        <span className="myprimarytextcolor">Back</span>
                    </Link>

                    <Link to={"#"} onClick={handleModalOpen} className="outline-none flex gap-1 items-center bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        <FiPlus size={20} color={"#white"}/>
                        New Item Type
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
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedItemTypes}
                    </tbody>
                    </table>
                </div>
            </div>

        </div>

        {modalOpen ?
        <>
            <AddItemType 
            handleModalOpen={handleModalOpen}
            modalOpen={modalOpen}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        {editModalOpen ?
        <>
            <EditItemType
            handleModalOpen={handleEditModalOpen}
            modalOpen={editModalOpen}
            itemTypeId ={idToEdit}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        {deleteModalOpen ?
        <>
            <DeleteItemType
            handleModalOpen={handleDeleteModalOpen}
            modalOpen={deleteModalOpen}
            itemTypeId ={idToDelete}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        </>
    );
}

export default ItemTypesList;