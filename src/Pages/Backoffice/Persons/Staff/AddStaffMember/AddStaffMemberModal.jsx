import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

import { addNewPerson, selectAllPersons,  getPersonsStatus, getPersonsError, fetchPersons }from '../../../../../Reducers/personsSlice';
import { selectAllPersonRoles,  getPersonRolesStatus, getPersonRolesError, fetchPersonRoles }from '../../../../../Reducers/personRolesSlice';

function AddStaffMemberModal({handleModalOpen, modalOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [personName, setPersonName] = useState();
    const [personEmail, setPersonEmail] = useState();
    const [personAddress, setPersonAddress] = useState();
    const [personPhone, setPersonPhone] = useState();
    const [personRole, setPersonRole] = useState();
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);    

    const personRoles = useSelector(selectAllPersonRoles);
    const personRolesStatus = useSelector(getPersonRolesStatus);
    const personRolesError = useSelector(getPersonRolesError);
    useEffect(() => {
        if (personRolesStatus === 'idle') {
            dispatch(fetchPersonRoles())            
        }
    }, [personRolesStatus, dispatch])


    const closeModal = () => {
        handleModalOpen();    
    }
    const submitNewPerson = () => {
        const toSubmit = {
            "name": personName,
            "address": personAddress, 
            "email": personEmail,                     
            "phone": personPhone,
            "person_role_id": Number(personRole),
        }
        console.log("toSubmit: ", toSubmit)
        if (personName && 
            personEmail  &&
            personAddress  &&
            personRole &&
            personPhone
            ) {
            dispatch_and_resetform(toSubmit)
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            addNewPerson(toSubmit)
        )
        setPersonName('')
        setPersonEmail('')
        setPersonAddress('')
        setPersonPhone('')
        setPersonRole(null)
        setActiveApplyBtn(false)
        closeModal()
        navigate(0);
    }
    useEffect(() => {
        if (personName && 
            personEmail  &&
            personAddress  &&
            personRole &&
            personPhone
            ) {
            setActiveApplyBtn(true);
        } else {
            setActiveApplyBtn(false);
        }

    }, [personName, 
        personEmail ,
        personAddress ,
        personRole,
        personPhone
    ])

    return (
        <div>
            <div className={`modal_dark_screen_w ${modalOpen ? '': 'displayNone'}`}>
                <div className={`modal_content_box_w px-5 py-3`}>
                    <div className="flex flex-col items-center w-full justify-center pt-2">
                        <h1 className={`text-[24px] font-bold myprimarytextcolor`}>NEW STAFF MEMBER</h1>                        
                    </div>

                    <div className="new_person_modal_page_2">

                        <div className="flex flex-col items-center w-full justify-center pt-2 pb-5">                            
                            <span className={`text-[18px] font-meduim myprimarytextcolor`}>Fill out the form carefully</span>
                        </div>

                        <div className="flex mt-3 gap-10 w-full justify-between">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Name</label>
                                <input type="text" required onChange={(e)=>setPersonName(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                        </div>
                        
                        <div className="flex mt-3  w-full">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Email</label>
                                <input type="email" required onChange={(e)=>setPersonEmail(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                        </div>

                        <div className="flex mt-3  w-full">
                            <div className="flex w-full flex-col gap-1">
                                <label className='myprimarytextcolor'>Phone</label>
                                <input type="text" onChange={(e)=>setPersonPhone(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                        </div>

                        <div className="flex mt-3  w-full">
                            <div className="flex w-full flex-col gap-1">
                                <label className='myprimarytextcolor'>Home address</label>
                                <input type="text" onChange={(e)=>setPersonAddress(e.target.value)} name="item_name" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md border border-[#41436a]" placeholder='...'/>
                            </div>
                        </div>
                        
                        <div className="flex mt-3 gap-10 w-full items-end">
                            <div className="flex flex-col w-full gap-1">
                                <label className='myprimarytextcolor'>Role</label>
                                <select required onChange={(e)=>(setPersonRole(Number(e.target.value)))} className={`commonSelectInput border border-[#41436a] outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select class`}</option>        
                                    {
                                        personRoles.map((val, ind) => {
                                            return <option key={ind} value={val.id}>{val.name}</option>
                                        })                                
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-5 mt-10 mb-3 pr-3">
                            <button onClick={()=>submitNewPerson(true)} className={`outline-none  ${activeApplyBtn? "":"opacity-30"} bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2`}>
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

export default AddStaffMemberModal;