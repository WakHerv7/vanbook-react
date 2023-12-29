import React, {useEffect} from 'react'
import slugify from 'slugify';

const SchoolClassForm = ({
    schoolClassId,
    companyId,
    modalOpen,
    schoolClassesList, isSuccessSchoolClasses,
    activeApplyBtn, setActiveApplyBtn,
    issubschoolClassof, setIssubschoolClassof,
    schoolClassName, setSchoolClassName,
    schoolClassParent, setSchoolClassParent,
    submitSchoolClass,
    closeModal,
    canSave
}) => {

    const handleSubmit= async () => {
        let toSubmit = {
            "name": schoolClassName,
            "slug": slugify(schoolClassName),
            "parent_id": issubschoolClassof ? Number(schoolClassParent) : null,            
            "company_id": Number(companyId),
            // "academic_year_id": null,
        }
        if(schoolClassId) toSubmit["id"]=schoolClassId;
        await submitSchoolClass(toSubmit)
    }
    

    useEffect(() => {
        if (canSave) {
            if (issubschoolClassof) {
                schoolClassParent ? setActiveApplyBtn(true) : setActiveApplyBtn(false)
            } else { setActiveApplyBtn(true) }
        } else { setActiveApplyBtn(false) }
    }, [schoolClassName])    


    return (
    <div>
        <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col schoolClasses-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>{schoolClassId ? 'Edit SchoolClass': 'New SchoolClass'}</h1>
                    </div>                    

                    <div className="new_schoolClass_modal_page">
                        <div className="flex flex-col schoolClasses-center w-full justify-center pt-2 pb-5">
                        </div>
                        <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Class Name</label>
                                    <input type="text" value={schoolClassName} onChange={(e)=>setSchoolClassName(e.target.value)} name="schoolClass_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="schoolClass_category_1" className="myprimarytextcolor container_checkbo_select_w mb0w">
                                        Is subschoolClass of
                                        <input type="checkbox" checked={issubschoolClassof} onChange={(e)=>setIssubschoolClassof(e.target.checked)} name="subschoolClass" id="schoolClass_category_1"/>
                                        <span className="checkmark_checkbo_select_w"></span>
                                    </label>
                                    {issubschoolClassof?                                    
                                    <select onChange={(e)=>(setSchoolClassParent(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={schoolClassParent}>
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
                            <button onClick={handleSubmit} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Apply
                            </button>
                            <button onClick={closeModal} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                    
                    
                    

                </div>
        </div>

    </div>
  )
}

export default SchoolClassForm