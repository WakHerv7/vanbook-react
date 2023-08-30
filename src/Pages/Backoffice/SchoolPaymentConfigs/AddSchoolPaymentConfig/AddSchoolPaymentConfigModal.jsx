import React, {useRef, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';

import { addNewSchoolPaymentConfig, selectAllSchoolPaymentConfigs,  getSchoolPaymentConfigsStatus, getSchoolPaymentConfigsError, fetchSchoolPaymentConfigs }from '../../../../Reducers/schoolPaymentConfigsSlice';
import { selectAllSchoolClasses,  getSchoolClassesStatus, getSchoolClassesError, fetchSchoolClasses }from '../../../../Reducers/schoolClassesSlice';

function AddSchoolPaymentConfigModal({handleModalOpen, modalOpen}) {
    const myRefs= useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [schoolPaymentConfigName, setSchoolPaymentConfigName] = useState('');
    const [schoolConcernedClasses, setSchoolConcernedClasses] = useState([]);
    const [schoolRegistrationOldStudent, setSchoolRegistrationOldStudent] = useState();
    const [schoolRegistrationNewStudent, setSchoolRegistrationNewStudent] = useState();
    const [schoolTrainingOldStudent, setSchoolTrainingOldStudent] = useState();
    const [schoolTrainingNewStudent, setSchoolTrainingNewStudent] = useState();
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    
    const schoolPaymentConfigsList = useSelector(selectAllSchoolPaymentConfigs);
    const schoolPaymentConfigsStatus = useSelector(getSchoolPaymentConfigsStatus);
    const schoolPaymentConfigsError = useSelector(getSchoolPaymentConfigsError);
    useEffect(() => {
        if (schoolPaymentConfigsStatus === 'idle') {
            dispatch(fetchSchoolPaymentConfigs())            
        }
    }, [schoolPaymentConfigsStatus, dispatch])

    const schoolClasses = useSelector(selectAllSchoolClasses);
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
    const submitNewSchoolPaymentConfig = () => {
        // let concernedClassesIds = [];

        // schoolConcernedClasses.map((scc, idx) => {
        //     concernedClassesIds = [...concernedClassesIds, scc.id];
        // });
 
        const toSubmit = {
            "name": schoolPaymentConfigName,
            "slug": schoolPaymentConfigName,
            "registration_fees_new_student": parseInt(schoolRegistrationNewStudent),
            "registration_fees_old_student": parseInt(schoolRegistrationOldStudent),
            "school_fees_new_student": parseInt(schoolTrainingNewStudent),
            "school_fees_old_student": parseInt(schoolTrainingOldStudent),
            "classes": schoolConcernedClasses,
        }
        console.log("toSubmit: ", toSubmit)
        if ( schoolPaymentConfigName && schoolConcernedClasses.length > 0 &&  schoolRegistrationOldStudent && schoolRegistrationNewStudent
            && schoolTrainingOldStudent && schoolTrainingNewStudent) 
        {
            dispatch_and_resetform(toSubmit)
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            addNewSchoolPaymentConfig(toSubmit)
        )
        setSchoolPaymentConfigName('')
        setSchoolConcernedClasses([])
        setSchoolRegistrationOldStudent()
        setSchoolRegistrationNewStudent()
        setSchoolTrainingOldStudent()
        setSchoolTrainingNewStudent()
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        // console.log("schoolConcernedClasses: ", schoolConcernedClasses)
        if ( schoolPaymentConfigName && schoolConcernedClasses.length>0 &&  schoolRegistrationOldStudent && schoolRegistrationNewStudent
            && schoolTrainingOldStudent && schoolTrainingNewStudent )
        {
            setActiveApplyBtn(true);
        } else {
            setActiveApplyBtn(false);
        }

    }, [schoolPaymentConfigName, schoolConcernedClasses, schoolRegistrationOldStudent, schoolRegistrationNewStudent,
         schoolTrainingOldStudent, schoolTrainingNewStudent])

    // useEffect(() => {
    //     console.log("schoolConcernedClasses: ", schoolConcernedClasses)
    // }, [schoolConcernedClasses])

    const handleClass = (oneClass, checked) => {
        let classes = schoolConcernedClasses
        if (checked){            
            classes = [...classes, {'id':oneClass.id, 'name':oneClass.name, 'slug':oneClass.slug}]
            setSchoolConcernedClasses(classes)
        } else {
            classes = schoolConcernedClasses.filter(classItem => classItem.id != oneClass.id)
            setSchoolConcernedClasses(classes)
        }

        let paymentConfigName = classes[0]['slug'];
        classes.map((scc, idx) => {
            if (idx > 0) {
                paymentConfigName = paymentConfigName + "_"+scc.slug;
            }            
        });

        setSchoolPaymentConfigName(paymentConfigName);
        
        console.log("setSchoolPaymentConfigName");
    }

    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>New School Payment Configuration</h1>
                    </div>

                    <div className="new_schoolPaymentConfig_modal_page_2">
                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            {/* <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose your schoolPaymentConfig category and type</span> */}
                        </div>
                        <div className="flex mt-3 gap-10 w-full">
                            <div className="flex flex-col gap-5 w-full">
                                {/* <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Config Name</label>
                                    <input type="text" onChange={(e)=>setSchoolPaymentConfigName(e.target.value)} name="schoolClass_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='eg.: Config class 1 to 3'/>
                                </div> */}
                                <div className="flex flex-col w-full">
                                    <h2 className={`text-[18px] myprimarytextcolor`}>Concerned classes</h2>
                                    <ul className="flex flex-wrap gap-10 list-none mt-2 pl-3">
                                        {schoolClasses.map((value, index) => (                                                                        
                                            (!value.school_payment_config_id) ?
                                            
                                                <li key={index} className="">                                    
                                                    <label htmlFor={`account_category_${value.id}`} className="container_checkbo_select_w">
                                                        {value.name}
                                                        <input onChange={(e)=>handleClass(value, e.target.checked)} ref={(el) => (myRefs.current[index] = el)} type="checkbox" name="account_type" id={`account_category_${value.id}`}/>
                                                        <span className="checkmark_checkbo_select_w"></span>
                                                    </label>
                                                </li>                                     
                                            :
                                            <></>                                             
                                        ))}                                        
                                    </ul>
                                </div>

                                <div className="flex gap-10">
                                    <div className="flex flex-col w-full gap-2">
                                        <label className='text-[18px] myprimarytextcolor'>Registration fees</label>
                                        <div className="flex items-center gap-5 w-full">
                                            <label className='myprimarytextcolor text-sm w-[80px]'>Old Student</label>
                                            <input type="number" onChange={(e)=>setSchoolRegistrationOldStudent(e.target.value)} name="schoolPaymentConfig_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                        </div>
                                        <div className="flex items-center gap-5 w-full">
                                            <label className='myprimarytextcolor text-sm w-[80px]'>New Student</label>
                                            <input type="number" onChange={(e)=>setSchoolRegistrationNewStudent(e.target.value)} name="schoolPaymentConfig_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                        <label className='text-[18px] myprimarytextcolor'>Training fees</label>
                                        <div className="flex items-center gap-5 w-full">
                                            <label className='myprimarytextcolor text-sm w-[80px]'>Old Student</label>
                                            <input type="number" onChange={(e)=>setSchoolTrainingOldStudent(e.target.value)} name="schoolPaymentConfig_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                        </div>
                                        <div className="flex items-center gap-5 w-full">
                                            <label className='myprimarytextcolor text-sm w-[80px]'>New Student</label>
                                            <input type="number" onChange={(e)=>setSchoolTrainingNewStudent(e.target.value)} name="schoolPaymentConfig_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                        </div>
                                    </div>
                                </div>

                                

                            </div>                            
                        </div>

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                            <button onClick={()=>submitNewSchoolPaymentConfig(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
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

export default AddSchoolPaymentConfigModal;