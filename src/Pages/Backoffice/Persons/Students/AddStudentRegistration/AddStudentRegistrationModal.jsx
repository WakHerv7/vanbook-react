import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import { addNewStudentRegistration, getAddedStudentRegistrationStatus, getStudentRegistrationReceiptId, selectAllStudentRegistrations,  getStudentRegistrationsStatus, getStudentRegistrationsError, fetchStudentRegistrations }from '../../../../../Reducers/studentRegistrationsSlice';
import { selectAllSchoolClasses,  getSchoolClassesStatus, getSchoolClassesError, fetchSchoolClasses }from '../../../../../Reducers/schoolClassesSlice';

const listItems = [
    {value:"m",text:"Male"},
    {value:"f",text:"Female"},
];

function AddStudentRegistrationModal({handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [issubstudentRegistrationof, setIssubstudentRegistrationof] = useState();
    const [studentRegistrationFirstName, setStudentRegistrationFirstName] = useState();
    const [studentRegistrationLastName, setStudentRegistrationLastName] = useState();
    const [studentRegistrationAddress, setStudentRegistrationAddress] = useState();
    const [studentRegistrationBirthdate, setStudentRegistrationBirthdate] = useState();
    const [studentRegistrationBirthplace, setStudentRegistrationBirthplace] = useState();
    const [studentRegistrationGender, setStudentRegistrationGender] = useState();
    const [studentRegistrationNewStudent, setStudentRegistrationNewStudent] = useState(null);
    const [newStudentFilled, setNewStudentFilled] =useState();
    const [studentRegistrationClass, setStudentRegistrationClass] = useState();
    // const [studentRegistrationMajor, setStudentRegistrationMajor] = useState();

    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    const addedStudentRegistrationsStatus = useSelector(getAddedStudentRegistrationStatus);
    const studentRegistrationReceiptId = useSelector(getStudentRegistrationReceiptId);
    useEffect(() => {
        if (addedStudentRegistrationsStatus === 'succeeded') {
            navigate('/dashboard/receipts/'+studentRegistrationReceiptId)           
        }
    }, [addedStudentRegistrationsStatus, dispatch])

    const schoolClasses = useSelector(selectAllSchoolClasses);
    const schoolClassesStatus = useSelector(getSchoolClassesStatus);
    const schoolClassesError = useSelector(getSchoolClassesError);
    useEffect(() => {
        if (schoolClassesStatus === 'idle') {
            dispatch(fetchSchoolClasses())            
        }
    }, [schoolClassesStatus, dispatch])

    const handleStudentRegistrationNewStudent = (value) => {
        setStudentRegistrationNewStudent(value);
        setNewStudentFilled(true)
    }

    const closeModal = () => {
        handleModalOpen();    
    }
    const submitNewStudentRegistration = () => {
        const toSubmit = {
            "firstname": studentRegistrationFirstName,
            "lastname": studentRegistrationLastName,
            "address": studentRegistrationAddress,
            "birth_date": studentRegistrationBirthdate,            
            "gender": studentRegistrationGender,
            "new_student": studentRegistrationNewStudent,
            "school_class_id": studentRegistrationClass,
            "status": "incomplete",
            "registration_number": "RN2023"+Math.ceil(Math.random()*1000000),
            // "place": studentRegistrationAddress,
            // "class_parent_id": issubstudentRegistrationof ? Number(studentRegistrationParent) : null,
        }
        console.log("toSubmit: ", toSubmit)
        if (studentRegistrationFirstName && 
            studentRegistrationLastName  &&
            studentRegistrationAddress  &&
            studentRegistrationBirthdate  &&
            studentRegistrationClass &&
            newStudentFilled
            ) {
            dispatch_and_resetform(toSubmit)
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            addNewStudentRegistration(toSubmit)
        )
        dispatch(fetchStudentRegistrations())

        setStudentRegistrationFirstName('')
        setStudentRegistrationLastName('')
        setStudentRegistrationAddress('')
        setStudentRegistrationBirthdate(null)
        setStudentRegistrationGender(null)
        setStudentRegistrationNewStudent(null)
        setStudentRegistrationNewStudent(null)
        setStudentRegistrationClass(null)
        setNewStudentFilled(null)
        setActiveApplyBtn(false)
        // closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if (studentRegistrationFirstName && 
            studentRegistrationLastName  &&
            studentRegistrationAddress  &&
            studentRegistrationBirthdate  &&
            studentRegistrationClass &&
            newStudentFilled
            ) {
            setActiveApplyBtn(true);
        } else {
            setActiveApplyBtn(false);
        }

    }, [studentRegistrationFirstName, 
        studentRegistrationLastName,
        studentRegistrationAddress,
        studentRegistrationBirthdate,
        studentRegistrationClass,  
        newStudentFilled
    ])

    return (
        <div>
            <div className={`modal_dark_screen_w ${modalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>STUDENT REGISTRATION FORM</h1>                        
                    </div>

                    <div className="new_studentRegistration_modal_page_2">

                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            <span className={`text-[18px] font-meduim myprimarytextcolor`}>Fill out the form carefully for registration</span>
                        </div>

                        <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Firstname</label>
                                <input type="text" onChange={(e)=>setStudentRegistrationFirstName(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Lastname</label>
                                <input type="text" onChange={(e)=>setStudentRegistrationLastName(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                            {/* 
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Name</label>
                                    <input type="text" onChange={(e)=>setItemName(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="item_category_1" className="myprimarytextcolor container_checkbo_select_w mb0w">
                                        Is subitem of
                                        <input type="checkbox" onChange={(e)=>setIssubitemof(e.target.checked)} name="subitem" id="item_category_1"/>
                                        <span className="checkmark_checkbo_select_w"></span>
                                    </label>
                                    {issubitemof?                                    
                                    <select onChange={(e)=>(setItemParent(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            itemsList.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                    :
                                    <></>
                                    }
                                    
                                </div>                                
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Account</label>                                
                                    <select onChange={(e)=>(setItemAccount(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            accountsList.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                    
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Rate</label>
                                    <input type="number" onChange={(e)=>setItemRate(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                            </div>                             
                            */}
                        </div>

                        <div className="flex mt-3  w-full">
                            <div className="flex w-full flex-col gap-1">
                                <label className='myprimarytextcolor'>Home address</label>
                                <input type="text" onChange={(e)=>setStudentRegistrationAddress(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                        </div>

                        <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Birth date</label>
                                <input type="date" onChange={(e)=>setStudentRegistrationBirthdate(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                            {/* <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Birth place</label>
                                <input type="text" onChange={(e)=>setStudentRegistrationFirstName(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div> */}
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Gender</label>
                                {/* <input type="text" onChange={(e)=>setStudentRegistrationLastName(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/> */}
                                <select onChange={(e)=>(setStudentRegistrationGender(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select gender`}</option>        
                                    {
                                        listItems.map((val, ind) => {
                                            return <option key={ind} value={val.value}>{val.text}</option>
                                        })                                
                                    }
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex mt-3 gap-10 w-full items-end">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Class</label>
                                <select onChange={(e)=>(setStudentRegistrationClass(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select class`}</option>        
                                    {
                                        schoolClasses.map((val, ind) => {
                                            return <option key={ind} value={val.id}>{val.name}</option>
                                        })                                
                                    }
                                </select>
                            </div>
                            <div className="flex gap-5 w-full items-bottom">
                                <label className='myprimarytextcolor mb-[12px]'>New Student ?</label>
                                <label onClick={()=>handleStudentRegistrationNewStudent(true)} htmlFor={`account_category_${1}`} className="container_checkbo_select_w">
                                    Yes
                                    <input type="radio" name="account_type" id={`account_category_${1}`} />
                                    <span className="checkmark_checkbo_select_w"></span>
                                </label>
                                <label onClick={()=>handleStudentRegistrationNewStudent(false)} htmlFor={`account_category_${0}`} className="container_checkbo_select_w">
                                    No
                                    <input type="radio" name="account_type" id={`account_category_${0}`} />
                                    <span className="checkmark_checkbo_select_w"></span>
                                </label>
                            </div>
                        </div>


                        <div className="flex justify-end gap-5 mt-10 mb-3 pr-3">
                            <button onClick={()=>submitNewStudentRegistration(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Apply
                            </button>
                            <button onClick={()=>closeModal()} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default AddStudentRegistrationModal;