import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import AddSchoolClass from './SchoolClass/AddSchoolClass';
import EditSchoolClass from './SchoolClass/EditSchoolClass';
import DeleteSchoolClass from './SchoolClass/DeleteSchoolClass';

import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../../Api/Auth/authSlice.js';
import { useGetSchoolClassesByCompanyIdQuery } from "../../../Api/Reducers/schoolClassesApiSlice.js";
import { useSelector, useDispatch }from 'react-redux';


function SchoolClassesList(props) {        
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
        data: schoolClasses,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSchoolClassesByCompanyIdQuery(rc.id);

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


    const renderSchoolClasses = (schoolClasses) => {
        return schoolClasses.map((schoolClass, index) => {
            return (
                <tr key={schoolClass.id} className="table_row_w border border-b-slate-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" style={{ paddingLeft: `${schoolClass.level * 20}px` }}>
                    {schoolClass.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{schoolClass.myparent?.name}</td>
                    
                    <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(schoolClass.id)}>
                        <AiOutlineEdit size={18} color={"vanbook-primary"}/>
                        </div>
                        {!schoolClass.prime ? 
                        <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(schoolClass.id)}>
                            <RiDeleteBinLine size={18} color={"vanbook-primary"}/>
                        </div>
                        : <></>}
                    </td>
                </tr>
            );
        });
     };

    let renderedSchoolClasses;
    if (isLoading) {
        renderedSchoolClasses = <tr><td>...</td></tr>;
    } else if (isSuccess && schoolClasses) {
        renderedSchoolClasses = renderSchoolClasses(schoolClasses.ids.map(id => schoolClasses.entities[id]));
    } else if (isError) {
        renderedSchoolClasses = <tr><td>{JSON.stringify(error)}</td></tr>;
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
                            Parent Class
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
            <AddSchoolClass
            handleModalOpen={handleModalOpen}
            modalOpen={modalOpen}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        {editModalOpen ?
        <>
            <EditSchoolClass 
            handleModalOpen={handleEditModalOpen}
            modalOpen={editModalOpen}
            schoolClassId ={idToEdit}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        {deleteModalOpen ?
        <>
            <DeleteSchoolClass
            handleModalOpen={handleDeleteModalOpen}
            modalOpen={deleteModalOpen}
            schoolClassId ={idToDelete}
            companyId={rc.id}
            />
            
        </>
        :
        <></>}
        </>
    );
}

export default SchoolClassesList;