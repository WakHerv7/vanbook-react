import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import { updateSchoolPaymentConfig, selectSchoolPaymentConfigById, selectAllSchoolPaymentConfigs,  getSchoolPaymentConfigsStatus, getSchoolPaymentConfigsError, fetchSchoolPaymentConfigs }from '../../../../Reducers/schoolPaymentConfigsSlice';


function EditSchoolPaymentConfigModal({schoolPaymentConfigId, handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mySchoolPaymentConfig = useSelector((state) => selectSchoolPaymentConfigById(state, Number(schoolPaymentConfigId)));
    
    const [issubschoolPaymentConfigof, setIssubschoolPaymentConfigof] = useState(mySchoolPaymentConfig?.parent_id);
    const [schoolPaymentConfigName, setSchoolPaymentConfigName] = useState(mySchoolPaymentConfig?.name);
    const [schoolPaymentConfigParent, setSchoolPaymentConfigParent] = useState(mySchoolPaymentConfig?.parent_id);
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);
    
    
    const schoolPaymentConfigsList = useSelector(selectAllSchoolPaymentConfigs);
    const schoolPaymentConfigsStatus = useSelector(getSchoolPaymentConfigsStatus);
    const schoolPaymentConfigsError = useSelector(getSchoolPaymentConfigsError);
    useEffect(() => {
        if (schoolPaymentConfigsStatus === 'idle') {
            dispatch(fetchSchoolPaymentConfigs())            
        }
    }, [schoolPaymentConfigsStatus, dispatch])



    const closeModal = () => {
        handleModalOpen();    
    }
    const submitNewSchoolPaymentConfig = () => {
        const toSubmit = {
            "id": mySchoolPaymentConfig?.id,
            "name": schoolPaymentConfigName,
            "parent_id": issubschoolPaymentConfigof ? Number(schoolPaymentConfigParent) : null,
        }
        console.log("toSubmit: ", toSubmit)
        if ( schoolPaymentConfigName ) {
            if (issubschoolPaymentConfigof) {
                if (schoolPaymentConfigParent) {
                    dispatch_and_resetform(toSubmit)
                }
            } else {
                dispatch_and_resetform(toSubmit)
            }
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            updateSchoolPaymentConfig(toSubmit)
        ).unwrap()
        setSchoolPaymentConfigName('')
        setSchoolPaymentConfigParent('')
        setActiveApplyBtn(false)
        closeModal()
        // navigate(0);
    }
    useEffect(() => {
        if ( schoolPaymentConfigName ) {
            if (issubschoolPaymentConfigof) {
                if (schoolPaymentConfigParent) {
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

    }, [schoolPaymentConfigName, issubschoolPaymentConfigof, schoolPaymentConfigParent])

    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>New School Class</h1>
                    </div>

                    <div className="new_schoolPaymentConfig_modal_page_2">
                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            {/* <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose your schoolPaymentConfig category and type</span> */}
                        </div>
                        <div className="flex mt-3 gap-10 w-full">
                            <div className="flex flex-col gap-5 w-full     014">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Class Name</label>
                                    <input type="text" value={schoolPaymentConfigName} onChange={(e)=>setSchoolPaymentConfigName(e.target.value)} name="schoolPaymentConfig_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="schoolPaymentConfig_category_1" className="myprimarytextcolor container_checkbo_select_w mb0w">
                                        Is subclass of
                                        <input type="checkbox" checked={issubschoolPaymentConfigof} onChange={(e)=>setIssubschoolPaymentConfigof(e.target.checked)} name="subschoolPaymentConfig" id="schoolPaymentConfig_category_1"/>
                                        <span className="checkmark_checkbo_select_w"></span>
                                    </label>
                                    {issubschoolPaymentConfigof?                                    
                                    <select onChange={(e)=>(setSchoolPaymentConfigParent(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={schoolPaymentConfigParent}>
                                        <option disabled value="dflt">{`Select from the list`}</option>        
                                        {
                                            schoolPaymentConfigsList.map((val, ind) => {
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

export default EditSchoolPaymentConfigModal;