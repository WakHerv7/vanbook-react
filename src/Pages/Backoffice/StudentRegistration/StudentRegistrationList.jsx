import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
// import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import AddStudentRegistrationModal from './AddStudentRegistration/AddStudentRegistrationModal.jsx';
// import EditStudentRegistrationModal from './EditStudentRegistration/EditStudentRegistrationModal.jsx';
// import DeleteStudentRegistrationModal from './DeleteStudentRegistration/DeleteStudentRegistrationModal.jsx';

import { useSelector, useDispatch }from 'react-redux';
import { selectAllStudentRegistrations,  getStudentRegistrationsStatus, getStudentRegistrationsError, fetchStudentRegistrations }from '../../../Reducers/studentRegistrationsSlice';

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

function StudentRegistrationList(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    
    const studentRegistrations = useSelector(selectAllStudentRegistrations);
    const studentRegistrationsStatus = useSelector(getStudentRegistrationsStatus);
    const studentRegistrationsError = useSelector(getStudentRegistrationsError);
    useEffect(() => {
        if (studentRegistrationsStatus === 'idle') {
            dispatch(fetchStudentRegistrations())            
        }
    }, [studentRegistrationsStatus, dispatch])


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


    let renderedStudentRegistrations;
    if (studentRegistrationsStatus === 'loading') {
        renderedStudentRegistrations = <tr><td>...</td></tr>;
    } else if (studentRegistrationsStatus === 'succeeded') {
        renderedStudentRegistrations = studentRegistrations?.map((studentRegistration, index) => (
        <tr key={index} className="table_row_w border border-b-slate-300">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {studentRegistration.registration_number}
            </td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {studentRegistration.name}
            </td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {studentRegistration.class}
            </td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {studentRegistration.birth_date}
            </td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {genderList[studentRegistration.gender]}
            </td>
            <td scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                {studentRegistration.status}
            </td>
            <td className="flex gap-5 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                
                <div className="hover:cursor-pointer" onClick={()=>handleEditModalOpen(studentRegistration.id)}>
                    <AiOutlineEdit size={18} color={"#41436a"}/>
                </div>
                <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(studentRegistration.id)}>
                    <RiDeleteBinLine size={18} color={"#41436a"}/>
                </div>
            </td>
        </tr>
    ))
    } else if (studentRegistrationsStatus === 'failed') {
        renderedStudentRegistrations = <tr><td>{studentRegistrationsError}</td></tr>;
    }
    

    return (
        <>
        <div className="main_page_container px-10 bg-[#F0F0F0] flex flex-col justify-between">

            <div>
                <div className="flex py-3 justify-between items-center gap-10  border border-b-slate-300">
                    <Link to={""} onClick={() => navigate(-1)} className="flex gap-1 items-center">
                        <FiChevronLeft size={20} color={"#white"}/>
                        <span className="myprimarytextcolor">Back</span>
                    </Link>
                    <div className="flex justify-end overflow-hidden border-2 rounded-lg border-gray-300">
                        <button className="outline-none bg-white border border-r-gray-400 text-[#41436a] text-sm px-3 py-2">
                            Student
                        </button>
                        <button className="outline-none text-[#41436a] text-sm px-3 py-2">
                            Staff
                        </button>
                        <button className="outline-none border border-l-gray-400 rounded-md text-[#41436a] text-sm px-3 py-2">
                            Customers
                        </button>
                    </div>

                </div>
                <div className="tab_container_w">
                    <div className="flex justify-between mt-5 mb-7">
                        <div className="flex flex-col gap-5">
                            <h1 className='text-[30px] myprimarytextcolor'>Student List</h1>
                            <button onClick={handleModalOpen} className="flex gap-2 outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                                <FiPlus size={20} color={"white"}/>
                                Register new student
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex gap-5">
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
                                S/N
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Name
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Class
                            </th>
                            {/* <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Major
                            </th> */}
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Date of birth
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Gender
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Status
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {renderedStudentRegistrations}                            
                        </tbody>
                        </table>
                    </div>
                </div>
                
          
            </div>

        </div>

        {modalOpen ?
        <>
            <AddStudentRegistrationModal 
            handleModalOpen={handleModalOpen}
            modalOpen={modalOpen}
            />
            
        </>
        :
        <></>}
        {/* {editModalOpen ?
        <>
            <EditStudentRegistrationModal 
            handleModalOpen={handleEditModalOpen}
            modalOpen={editModalOpen}
            schoolStudentId ={idToEdit}
            />
            
        </>
        :
        <></>}
        {deleteModalOpen ?
        <>
            <DeleteStudentRegistrationModal 
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

export default StudentRegistrationList;