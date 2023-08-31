import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import AddSchoolClassModal from './AddSchoolClass/AddSchoolClassModal.jsx';
import EditSchoolClassModal from './EditSchoolClass/EditSchoolClassModal.jsx';
import DeleteSchoolClassModal from './DeleteSchoolClass/DeleteSchoolClassModal.jsx';

import { useSelector, useDispatch }from 'react-redux';
import { selectAllSchoolClasses,  getSchoolClassesStatus, getSchoolClassesError, fetchSchoolClasses }from '../../../Reducers/schoolClassesSlice';
import { selectAllAccounts,  getAccountsStatus, getAccountsError, fetchAccounts }from '../../../Reducers/accountsSlice';


const listSchoolClasses = [
    {value:"SchoolClass",text:"Element"},
    {value:"SchoolClass",text:"Element"},
    {value:"SchoolClass",text:"Element"},
    {value:"SchoolClass",text:"Element"}
];

function SchoolClassesList(props) {        
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    
    const schoolClasses = useSelector(selectAllSchoolClasses);
    const schoolClassesStatus = useSelector(getSchoolClassesStatus);
    const schoolClassesError = useSelector(getSchoolClassesError);
    useEffect(() => {
        if (schoolClassesStatus === 'idle') {
            dispatch(fetchSchoolClasses())            
        }
    }, [schoolClassesStatus, dispatch])

    // const accounts = useSelector(selectAllAccounts);
    // const accountsStatus = useSelector(getAccountsStatus);
    // const accountsError = useSelector(getAccountsError);
    // useEffect(() => {
    //     if (accountsStatus === 'idle') {
    //         dispatch(fetchAccounts())            
    //     }
    // }, [accountsStatus, dispatch]) 

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



    let renderedSchoolClasses;
    if (schoolClassesStatus === 'loading') {
        renderedSchoolClasses = <tr><td>...</td></tr>;
    } else if (schoolClassesStatus === 'succeeded') {
        renderedSchoolClasses = Array.isArray(schoolClasses) && schoolClasses.map((schoolClass, index) => (
        <tr key={index} className="table_row_w border border-b-slate-300">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {schoolClass.name}
            </td>
            <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                
                <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(schoolClass.id)}>
                    <AiOutlineEdit size={18} color={"#41436a"}/>
                </div>
                <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(schoolClass.id)}>
                    <RiDeleteBinLine size={18} color={"#41436a"}/>
                </div>
            </td>
        </tr>
    ))
    } else if (schoolClassesStatus === 'failed') {
        renderedSchoolClasses = <tr><td>{schoolClassesError}</td></tr>;
    }

    


    return (
        <>
        <div className="main_page_container bg-[#F0F0F0] flex flex-col justify-between">
            <div>
                <div className="flex px-10 pt-3 justify-between gap-10">
                    <div className="myprimarytextcolor text-xl font-bold">School Classes</div>
                </div>
                <div className="flex items-center px-10 py-3 justify-between gap-10  border border-b-slate-300">
                    <Link to={""} onClick={() => navigate(-1)} className="flex gap-1 items-center">
                        <FiChevronLeft size={20} color={"#white"}/>
                        <span className="myprimarytextcolor">Back</span>
                    </Link>

                    {/* <div className="select_container flex gap-5 schoolClasses-center">
                        <span className="myprimarytextcolor">Look for</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listSchoolClasses.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div>

                    <div className="select_container flex gap-5 schoolClasses-center">
                        <span className="myprimarytextcolor">In</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""}  defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listSchoolClasses.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div>

                    <div className="select_container flex gap-5 schoolClasses-center">
                        <span className="myprimarytextcolor">Currency</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listSchoolClasses.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>
                    </div> */}

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
                            Class
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">                            
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedSchoolClasses}
                    </tbody>
                    </table>
                </div>
            </div>

            <div className="flex px-5 py-3 gap-10 ">

                {/* <div className="select_container flex gap-5 schoolClasses-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`SchoolClasses`}</option>        
                        {
                            listSchoolClasses.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 schoolClasses-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Activites`}</option>        
                        {
                            listSchoolClasses.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 schoolClasses-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Report`}</option>        
                        {
                            listSchoolClasses.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 schoolClasses-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Export`}</option>        
                        {
                            listSchoolClasses.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div> */}

            </div>

        </div>

        {modalOpen ?
        <>
            <AddSchoolClassModal 
            handleModalOpen={handleModalOpen}
            modalOpen={modalOpen}
            />
            
        </>
        :
        <></>}
        {editModalOpen ?
        <>
            <EditSchoolClassModal 
            handleModalOpen={handleEditModalOpen}
            modalOpen={editModalOpen}
            schoolClassId ={idToEdit}
            />
            
        </>
        :
        <></>}
        {deleteModalOpen ?
        <>
            <DeleteSchoolClassModal 
            handleDeleteModalOpen={handleDeleteModalOpen}
            deleteModalOpen={deleteModalOpen}
            schoolClassId ={idToDelete}
            />
            
        </>
        :
        <></>}
        </>
    );
}

export default SchoolClassesList;