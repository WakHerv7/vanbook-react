import React, {useEffect} from 'react'
import slugify from 'slugify';
import CustomInput from '../../../../Components/CustomInput/CustomInput';

const categoryList = [
    {id:1,name:"Income/Expenses"},
    {id:2,name:"Others"},
    {id:3,name:"Custom"}
];

const AccounTypeForm = ({
    accTypeId,
    companyId,
    modalOpen,
    activeApplyBtn, setActiveApplyBtn,
    accountTypeName, setAccountTypeName,
    accountTypeCategory, setAccountTypeCategory,
    submitAccType,
    closeModal,
    canSave
}) => {

    const handleSubmit= async () => {
        let toSubmit = {
            "name": accountTypeName,
            "slug": slugify(accountTypeName),
            "category": accountTypeCategory,
            "company_id": Number(companyId),
        }
        if(accTypeId) toSubmit["id"]=accTypeId;
        await submitAccType(toSubmit)
    }
    
    
    useEffect(() => {
        if (canSave) setActiveApplyBtn(true);
        else setActiveApplyBtn(false);
    }, [accountTypeName, accountTypeCategory])


    return (
        <div>
            <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
                <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>{accTypeId ? 'Edit Account Type': 'New Account Type'}</h1>
                    </div>
                    
                    <div className="new_account_modal">
                        <div className="flex mt-3 gap-10">
                            <CustomInput 
                            type="text" 
                            label="Account Type Name" 
                            name="account_type_name" 
                            value={accountTypeName} 
                            onChange={(e)=>setAccountTypeName(e.target.value)}
                            required={false}
                            />
                            <CustomInput 
                            type="select" 
                            label="Account Type Category" 
                            name="account_type_category" 
                            value={accountTypeCategory} 
                            onChange={(e)=>(setAccountTypeCategory(e.target.value))}
                            required={false}                
                            options={categoryList}
                            optionValues={categoryList.map((obj) => obj.id)}
                            optionLabels={categoryList.map((obj) => obj.name)}
                            />
                                {/* <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Account Type Name</label>
                                    <input type="text" value={accountTypeName} onChange={(e)=>setAccountTypeName(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className='myprimarytextcolor'>Account Type Category</label>
                                    <select onChange={(e)=>(setAccountTypeCategory(e.target.value))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={accountTypeCategory}>
                                        <option disabled value="dflt">{`Select category...`}</option>
                                        {
                                            categoryList.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>                                    
                                </div>                                                        */}
                        </div>
                        

                        <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                            <button onClick={handleSubmit} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                                Save
                            </button>
                            <button onClick={()=>closeModal()} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                    

                </div>
            </div>
        </div>
  )
}

export default AccounTypeForm