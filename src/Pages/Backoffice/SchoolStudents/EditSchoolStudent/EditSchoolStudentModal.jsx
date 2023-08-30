import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import { updateSchoolStudent, selectSchoolStudentById, selectAllSchoolStudents,  getSchoolStudentsStatus, getSchoolStudentsError, fetchSchoolStudents }from '../../../../Reducers/schoolStudentsSlice';


function EditSchoolStudentModal({schoolStudentId, handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mySchoolStudent = useSelector((state) => selectSchoolStudentById(state, Number(schoolStudentId)));
    
    const [issubschoolStudentof, setIssubschoolStudentof] = useState(mySchoolStudent?.class_parent_id);
    const [schoolStudentName, setSchoolStudentName] = useState(mySchoolStudent?.name);
    const [schoolStudentParent, setSchoolStudentParent] = useState(mySchoolStudent?.class_parent_id);
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    
    const schoolStudentsList = useSelector(selectAllSchoolStudents);
    const schoolStudentsStatus = useSelector(getSchoolStudentsStatus);
    const schoolStudentsError = useSelector(getSchoolStudentsError);
    useEffect(() => {
        if (schoolStudentsStatus === 'idle') {
            dispatch(fetchSchoolStudents())            
        }
    }, [schoolStudentsStatus, dispatch])



    const closeModal = () => {
        handleModalOpen();    
    }
    const submitNewSchoolStudent = () => {
        const toSubmit = {
            "id": mySchoolStudent?.id,
            "name": schoolStudentName,
            "class_parent_id": issubschoolStudentof ? Number(schoolStudentParent) : null,
        }
        console.log("toSubmit: ", toSubmit)
        if ( schoolStudentName ) {
            if (issubschoolStudentof) {
                if (schoolStudentParent) {
                    dispatch_and_resetform(toSubmit)
                }
            } else {
                dispatch_and_resetform(toSubmit)
            }
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            updateSchoolStudent(toSubmit)
        ).unwrap()
        setSchoolStudentName('')
        setSchoolStudentParent('')
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if ( schoolStudentName ) {
            if (issubschoolStudentof) {
                if (schoolStudentParent) {
                    setActiveApplyBtn(true);
                } else {
                    setActiveApplyBtn(false);
                }
            } else {
                setActiveApplyBtn(true);
            }
        } else {
            setActiveApplyBtn(false);
        }

    }, [schoolStudentName, issubschoolStudentof, schoolStudentParent])

    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>New School Student</h1>
                    </div>

                    <div className="new_schoolStudent_modal_page_2">
                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            {/* <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose your schoolStudent category and type</span> */}
                        </div>
                        <div className="flex mt-3 gap-10 w-full">
                            <div className="flex flex-col gap-5 w-full     014">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Student Name</label>
                                    <input type="text" value={schoolStudentName} onChange={(e)=>setSchoolStudentName(e.target.value)} name="schoolStudent_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="schoolStudent_category_1" className="myprimarytextcolor container_checkbo_select_w mb0w">
                                        Is subclass of
                                        <input type="checkbox" checked={issubschoolStudentof} onChange={(e)=>setIssubschoolStudentof(e.target.checked)} name="subschoolStudent" id="schoolStudent_category_1"/>
                                        <span className="checkmark_checkbo_select_w"></span>
                                    </label>
                                    {issubschoolStudentof?                                    
                                    <select onChange={(e)=>(setSchoolStudentParent(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={schoolStudentParent}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            schoolStudentsList.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                    :
                                    <></>
                                    }
                                    
                                </div>                                
                            </div>                            
                        </div>

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                            <button onClick={()=>submitNewSchoolStudent(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
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

export default EditSchoolStudentModal;