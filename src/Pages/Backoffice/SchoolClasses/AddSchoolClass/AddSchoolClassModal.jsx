import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import { addNewSchoolClass, selectAllSchoolClasses,  getSchoolClassesStatus, getSchoolClassesError, fetchSchoolClasses }from '../../../../Reducers/schoolClassesSlice';


function AddSchoolClassModal({handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [issubschoolClassof, setIssubschoolClassof] = useState();
    const [schoolClassName, setSchoolClassName] = useState();
    const [schoolClassParent, setSchoolClassParent] = useState();
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    
    const schoolClassesList = useSelector(selectAllSchoolClasses);
    const schoolClassesStatus = useSelector(getSchoolClassesStatus);
    const schoolClassesError = useSelector(getSchoolClassesError);
    useEffect(() => {
        if (schoolClassesStatus === 'idle') {
            dispatch(fetchSchoolClasses())            
        }
    }, [schoolClassesStatus, dispatch])



    const closeModal = () => {
        handleModalOpen();    
    }
    const submitNewSchoolClass = () => {
        const toSubmit = {
            "name": schoolClassName,
            "class_parent_id": issubschoolClassof ? Number(schoolClassParent) : null,
        }
        console.log("toSubmit: ", toSubmit)
        if ( schoolClassName ) {
            if (issubschoolClassof) {
                if (schoolClassParent) {
                    dispatch_and_resetform(toSubmit)
                }
            } else {
                dispatch_and_resetform(toSubmit)
            }
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            addNewSchoolClass(toSubmit)
        )
        setSchoolClassName('')
        setSchoolClassParent('')
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if ( schoolClassName ) {
            if (issubschoolClassof) {
                if (schoolClassParent) {
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

    }, [schoolClassName, issubschoolClassof, schoolClassParent])

    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>New School Class</h1>
                    </div>

                    <div className="new_schoolClass_modal_page_2">
                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            {/* <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose your schoolClass category and type</span> */}
                        </div>
                        <div className="flex mt-3 gap-10 w-full">
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Class Name</label>
                                    <input type="text" onChange={(e)=>setSchoolClassName(e.target.value)} name="schoolClass_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="schoolClass_category_1" className="myprimarytextcolor container_checkbo_select_w mb0w">
                                        Is subclass of
                                        <input type="checkbox" onChange={(e)=>setIssubschoolClassof(e.target.checked)} name="subschoolClass" id="schoolClass_category_1"/>
                                        <span className="checkmark_checkbo_select_w"></span>
                                    </label>
                                    {issubschoolClassof?                                    
                                    <select onChange={(e)=>(setSchoolClassParent(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            schoolClassesList.map((val, ind) => {
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
                            <button onClick={()=>submitNewSchoolClass(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
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

export default AddSchoolClassModal;