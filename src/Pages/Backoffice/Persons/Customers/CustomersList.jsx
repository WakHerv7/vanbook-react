import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import AddPersonModal from './AddPerson/AddPersonModal.jsx';

import { useSelector, useDispatch }from 'react-redux';
import { selectAllPersons,  getPersonsStatus, getPersonsError, fetchPersonsByRole }from '../../../../Reducers/personsSlice';

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];
const genderList = {
    "m":"Male",
    "f":"Female",
};
function StaffList(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    
    const persons = useSelector(selectAllPersons);
    const personsStatus = useSelector(getPersonsStatus);
    const personsError = useSelector(getPersonsError);
    useEffect(() => {
        if (personsStatus === 'idle') {
            dispatch(fetchPersonsByRole("403"))            
        }
    }, [personsStatus, dispatch])


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


    let renderedPersons;
    if (personsStatus === 'loading') {
        renderedPersons = <tr><td>...</td></tr>;
    } else if (personsStatus === 'succeeded') {
        renderedPersons = persons?.map((person, index) => (
        <tr key={index} className="table_row_w border border-b-slate-300">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
            
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {person.name}
            </td>            
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {person.email}
            </td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {person.phone}
            </td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {person.address}
            </td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {person.account_balance ?? 0}
            </td>
            
            <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                
                <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(person.id)}>
                    <AiOutlineEdit size={18} color={"#41436a"}/>
                </div>
                <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(person.id)}>
                    <RiDeleteBinLine size={18} color={"#41436a"}/>
                </div>
            </td>
        </tr>
    ))
    } else if (personsStatus === 'failed') {
        renderedPersons = <tr><td>{personsError}</td></tr>;
    }


    return (
        <>
        <div className="tab_container_w">
            <div className="flex justify-between mt-5 mb-7">
                <div className="flex flex-col gap-5">
                    <h1 className='text-[30px] myprimarytextcolor'>Customers List</h1>
                    <button onClick={handleModalOpen} className="flex gap-2 outline-none w-fit  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        <FiPlus size={20} color={"white"}/>
                        New customer
                    </button>
                </div>
                <div className="flex gap-5">
                    <div className="flex gap-5">
                        {/* 
                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Session</label>
                            <select className={`commonSelectInput outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Select from the list`}</option>        
                                {
                                    listItems.map((val, ind) => {
                                        return <option key={ind} value={val.value}>{val.text}</option>
                                    })                                
                                }
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Class</label>
                            <select className={`commonSelectInput outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                <option disabled value="dflt">{`Select from the list`}</option>        
                                {
                                    listItems.map((val, ind) => {
                                        return <option key={ind} value={val.value}>{val.text}</option>
                                    })                                
                                }
                            </select>
                        </div> 
                        */}
                        
                    </div>
                    
                </div>
            </div>

            <div className="table_container rounded-xl border-solid border-2 border-gray-300 overflow-hidden">
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
                        Email
                    </th>
                    <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                        Phone
                    </th>
                    <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                        Address
                    </th>
                    <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                        Balance
                    </th>
                    
                    <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                    </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {renderedPersons}                            
                </tbody>
                </table>
            </div>
        </div>
        
        
        
        {modalOpen ?
        <>
            <AddPersonModal 
            handleModalOpen={handleModalOpen}
            modalOpen={modalOpen}
            />
            
        </>
        :
        <></>}
        {/* {editModalOpen ?
        <>
            <AddPersonModal 
            handleModalOpen={handleEditModalOpen}
            modalOpen={editModalOpen}
            schoolStudentId ={idToEdit}
            />
            
        </>
        :
        <></>}
        {deleteModalOpen ?
        <>
            <AddPersonModal 
            handleDeleteModalOpen={handleDeleteModalOpen}
            deleteModalOpen={deleteModalOpen}
            schoolStudentId ={idToDelete}
            />
            
        </>
        :
        <></>} */}
        </>
    );
}

export default StaffList;