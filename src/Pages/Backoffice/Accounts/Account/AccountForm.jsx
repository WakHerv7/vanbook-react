import React, {useEffect} from 'react'
import slugify from 'slugify';
const AccountForm = ({
    accId,
    companyId,
    modalOpen,
    acctypes, isSuccessAccTypes,
    accountsList, isSuccessAccounts,
    page1, setPage1,
    activeApplyBtn, setActiveApplyBtn,
    issubaccountof, setIssubaccountof,
    accountType, setAccountType,
    accountName, setAccountName,
    accountNumber, setAccountNumber,
    accountParent, setAccountParent,
    accountDescription, setAccountDescription,
    submitNewAccount,
    closeModal
}) => {

    const goToNextPage = () => {
        if (accountType) {
            setPage1(false);
        }   
    }
    const handleSubmit= async () => {
        let toSubmit = {
            "name": accountName,
            "slug": slugify(accountName),
            "number": Number(accountNumber),
            "description": accountDescription,
            "account_type_id": Number(accountType),
            "parent_id": issubaccountof ? Number(accountParent) : null,
            "company_id": Number(companyId),
        }
        if(accId) toSubmit["id"]=accId;
        await submitNewAccount(toSubmit)
    }
    

    useEffect(() => {
        if (accountType && accountName && accountNumber) {
            if (issubaccountof) {
                accountParent ? setActiveApplyBtn(true) : setActiveApplyBtn(false)
            } else { setActiveApplyBtn(true); }
        } else { setActiveApplyBtn(false); }
    }, [accountType, accountName, accountNumber, issubaccountof, accountParent])

    // useEffect(() => {
    //   console.log("issubaccountof : ", issubaccountof);
    //   console.log("accountParent : ", accountParent);
    // }, [issubaccountof, accountParent])
    


    return (
    <div>
        <div className={`modal_container_wh ${modalOpen ? '': 'displayNone'}`}>
            <div className="modal_bg_screen" onClick={()=>closeModal()}></div>
            <div className={`modal_content_box_w px-5 py-3`}>
                <div className="flex flex-col items-center w-full justify-center pt-2">
                    <h1 className={`text-[24px] font-bold myprimarytextcolor`}>{accId ? 'Edit Account': 'New Account'}</h1>
                </div>
                
                {page1 ?

                <div className="new_account_modal_page_1">
                    <div className="flex flex-col items-center w-full justify-center pb-5">                            
                        <span className={`text-[18px] font-meduim myprimarytextcolor`}>Choose one account type</span>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className={`text-[18px] font-bold myprimarytextcolor`}>Categorize your account</h2>
                        <ul className="list-none mt-2 pl-3">
                            {isSuccessAccTypes && acctypes.ids.map((acctypeId, index) => (                                                                        
                                (Number(acctypes.entities[acctypeId].category) == 1) &&
                                
                                    <li key={index}>                                    
                                        <label htmlFor={`account_category_${acctypeId}`} className="container_checkbo_select_w">
                                            {acctypes.entities[acctypeId].name}
                                            <input type="radio" name="account_type" id={`account_category_${acctypeId}`} checked={accountType == acctypeId}
                                            onChange={()=>setAccountType(acctypeId)}/>
                                            <span className="checkmark_checkbo_select_w"></span>
                                        </label>
                                    </li>    
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col mt-3">
                        <h2 className={`text-[18px] font-bold myprimarytextcolor`}>Or track your account</h2>
                        <ul className="list-none mt-2 pl-3">
                            {isSuccessAccTypes && acctypes.ids.map((acctypeId, index) => (
                                (Number(acctypes.entities[acctypeId].category) == 2) &&
                                    <li key={index}>                                    
                                        <label htmlFor={`account_category_${acctypeId}`} className="container_checkbo_select_w">
                                            {acctypes.entities[acctypeId].name}
                                            <input type="radio" name="account_type" id={`account_category_${acctypeId}`} checked={accountType == acctypeId}
                                            onChange={()=>setAccountType(acctypeId)}/>
                                            <span className="checkmark_checkbo_select_w"></span>
                                        </label>
                                    </li>                                            
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                        <button onClick={()=>goToNextPage()} className={`${accountType?"":"opacity-30"} outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                            Continue
                        </button>
                        <button onClick={()=>closeModal()} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                            Cancel
                        </button>
                    </div>
                </div>

                :

                <div className="new_account_modal_page_2">
                    <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">
                    </div>
                    <div className="flex mt-3 gap-10">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Account Name</label>
                                <input type="text" value={accountName} onChange={(e)=>setAccountName(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="account_category_1" className="myprimarytextcolor container_checkbo_select_w mb0w">
                                    Is subaccount of
                                    <input type="checkbox" checked={issubaccountof} onChange={(e)=>setIssubaccountof(e.target.checked)} name="subaccount" id="account_category_1"/>
                                    <span className="checkmark_checkbo_select_w"></span>
                                </label>
                                {issubaccountof &&                                    
                                <select value={accountParent} onChange={(e)=>setAccountParent(e.target.value)} className="commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md" name="">
                                    <option disabled value="dflt">Select from the list</option>        
                                    {isSuccessAccounts && accountsList.map((account, ind) => (
                                        <option key={ind} value={account.id}>
                                            {account.name}
                                        </option>
                                    ))}
                                </select>
                                }
                            </div>                              
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Account Number</label>
                                <input type="number" value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)} name="account_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                        </div>                            
                    </div>
                    <div className="flex w-full my-5">
                        <div className="flex w-full flex-col gap-1">
                            <label className='myprimarytextcolor'>Description</label>
                            <textarea name="" id="" rows="5" value={accountDescription} onChange={(e)=>setAccountDescription(e.target.value)} className={`border border-[#41436a] rounded-md p-2`}>

                            </textarea>

                        </div>
                    </div>

                    <div className="flex justify-end gap-5 mt-5 mb-3 pr-3">
                        <button onClick={()=>setPage1(true)} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                            Back
                        </button>
                        <button onClick={handleSubmit} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
                            Apply
                        </button>
                        <button onClick={closeModal} className="outline-none  bg-white hover:bg-[#9094e333] border border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                            Cancel
                        </button>
                    </div>
                </div>
                
                }
                
                

            </div>
        </div>
    </div>
  )
}

export default AccountForm