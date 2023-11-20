import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch }from 'react-redux';

import { useGetUsersQuery } from '../../../Api/Reducers/usersApiSlice';
import { persistor } from '../../../Api/Store/Store';

function UsersList(props) { 
    // Call purgeStoredState to clear the stored state for specific reducers
    
    // persistor.purge(['users', 'auth']).then(() => {
    //     console.log('Persisted state cleared for users and auth');
    // });

    const navigate = useNavigate();
    // const [modalOpen, setModalOpen] = useState(false);    
    // const [editModalOpen, setEditModalOpen] = useState(false);
    // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // const [idToEdit, setIdToEdit] = useState(null);
    // const [idToDelete, setIdToDelete] = useState(null);
    
    const handleModalOpen = () => {   
        // modalOpen ? setModalOpen(false) : setModalOpen(true)   
    }
    const handleEditModalOpen = (id) => {  
        // if (editModalOpen) {
        //     setIdToEdit(null)
        //     setEditModalOpen(false)
        // }
        // else {
        //     setIdToEdit(id)
        //     setEditModalOpen(true)
        // }
    }

    const handleDeleteModalOpen = (id) => {  
        // if (deleteModalOpen) {
        //     setIdToDelete(null)
        //     setDeleteModalOpen(false)
        // }
        // else {            
        //     setIdToDelete(id)
        //     setDeleteModalOpen(true)
        //}
    }


    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('getUsers')

    let renderedUsers;
    if (isLoading) {
        renderedUsers = <tr><td>"Loading..."</td></tr>;
    } else if (isSuccess && users) {
        console.log('users state:', users);
        renderedUsers = users.ids.map((userId,index) => (
        <tr key={userId} className="table_row_w border border-b-slate-300">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {users.entities[userId].fullname}
            </td>
            <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                
                <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(userId)}>
                    <AiOutlineEdit size={18} color={"#41436a"}/>
                </div>
                <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(userId)}>
                    <RiDeleteBinLine size={18} color={"#41436a"}/>
                </div>
            </td>
        </tr>
    ))
    } else if (isError) {
        renderedUsers = error.status === 401 || error.status === 403 ?
        <tr><td>{"Not authorized"}</td></tr>
        :
        <tr><td>{JSON.stringify(error)}</td></tr>
        // renderedUsers = <tr><td>{"Not authorized"}</td></tr>;
    } else {
        renderedUsers = <tr><td>"No users available."</td></tr>;
    }

    


    return (
        <>
        <div className="main_page_container bg-[#F0F0F0] flex flex-col justify-between">
            <div>
                <div className="flex px-10 pt-3 justify-between gap-10">
                    <div className="myprimarytextcolor text-xl font-bold">Users</div>
                </div>
                <div className="flex items-center px-10 py-3 justify-between gap-10  border border-b-slate-300">
                    <Link to={""} onClick={() => navigate(-1)} className="flex gap-1 items-center">
                        <FiChevronLeft size={20} color={"#white"}/>
                        <span className="myprimarytextcolor">Back</span>
                    </Link>

                    <Link to={"#"} onClick={handleModalOpen} className="outline-none flex gap-1 items-center bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        <FiPlus size={20} color={"#white"}/>
                        New Class
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
                        {renderedUsers}
                    </tbody>
                    </table>
                </div>
            </div>

        </div>

        {/* 
        {modalOpen ?
        <>
            <AddUserModal 
            handleModalOpen={handleModalOpen}
            modalOpen={modalOpen}
            />
            
        </>
        :
        <></>}
        {editModalOpen ?
        <>
            <EditUserModal 
            handleModalOpen={handleEditModalOpen}
            modalOpen={editModalOpen}
            userId ={idToEdit}
            />
            
        </>
        :
        <></>}
        {deleteModalOpen ?
        <>
            <DeleteUserModal 
            handleDeleteModalOpen={handleDeleteModalOpen}
            deleteModalOpen={deleteModalOpen}
            userId ={idToDelete}
            />
            
        </>
        :
        <></>} 
        */}


        </>
    );
}

export default UsersList;