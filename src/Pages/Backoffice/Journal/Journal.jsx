import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch }from 'react-redux';
import JournalEntryModal from './AddJournalEntry/AddJournalEntryModal.jsx';
import { selectAllJournal,  getJournalStatus, getJournalError, fetchJournal }from '../../../Reducers/journalSlice.js';
import "./journal-style.css";

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function JournalList(props) {    
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [idToOpen, setIdToOpen] = useState(null);
    const [totalDebitAmount, setTotalDebitAmount] = useState(0);
    const [totalCreditAmount, setTotalCreditAmount] = useState(0);
    // --------------------------------------------------------
    const myJournal = useSelector(selectAllJournal);
    const journalStatus = useSelector(getJournalStatus);
    const journalError = useSelector(getJournalError);
    useEffect(() => {
        if (journalStatus === 'idle') {
            dispatch(fetchJournal())            
        }
        else if (journalStatus === 'succeeded') {
            console.log("======================")
            console.log("myJournal:",Array.isArray(myJournal) && myJournal)
            console.log("======================")

            let totalDebit = 0;
            let totalCredit = 0;
            Array.isArray(myJournal) && myJournal.map((journalItem, index) =>{
                if (journalItem.is_debit == true) {
                    totalDebit += parseInt(journalItem.amount)
                } else {
                    totalCredit += parseInt(journalItem.amount)
                }
            })

            setTotalDebitAmount(totalDebit);
            setTotalCreditAmount(totalCredit);
        }
    }, [journalStatus, dispatch])
    // --------------------------------------------------------
    // --------------------------------------------------------
    const handleModalOpen = (id) => {  
        if (modalOpen) {
            setIdToOpen(null)
            setModalOpen(false)
        }
        else {
            setIdToOpen(id)
            setModalOpen(true)
        }
    }
    // --------------------------------------------------------
    const capitalizeText = (str) => {  
        return str.charAt(0).toUpperCase() + str.slice(1)
    }


    let renderedJournal;
    if (journalStatus === 'loading') {
        renderedJournal = <tr><td>...</td></tr>;
    } else if (journalStatus === 'succeeded') {
        renderedJournal = Array.isArray(myJournal) && myJournal.map((journalItem, index) => (
        <tr key={index} className="table_row_w cursor-pointer">
            <td className="text-gray-900  cursor-pointer font-light px-6 py-4 whitespace-nowrap">
                {journalItem.date.split("T")[0]}
            </td>
            {/* <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {journalItem.transaction_type}
            </td> */}
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {journalItem.account.name}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {journalItem.is_debit ? journalItem.amount : ''}
            </td>            
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {journalItem.is_debit ? '' : journalItem.amount }
            </td>
            <td className="journal-item-description text-gray-900 font-light px-6 py-4">
                {journalItem.description}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {journalItem.type == "journal" ? 
                    <div className="hover:cursor-pointer">
                        <RiDeleteBinLine size={18} color={"#41436a"}/>
                    </div>
                : <></>}
            </td>
        </tr>
    ))
    } else if (journalStatus === 'failed') {
        renderedJournal = {journalError};
    }


    return (
        <>
        <div className="main_page_container px-10 bg-[#F0F0F0] flex flex-col justify-between">

            <div className='mb-10'>
                <div className="flex py-3 justify-between items-center gap-10  border border-b-slate-300">
                    <Link to={""} onClick={() => navigate(-1)} className="flex gap-1 items-center">
                        <FiChevronLeft size={20} color={"#white"}/>
                        <span className="myprimarytextcolor">Back</span>
                    </Link>

                    <div className="select_container flex gap-5 items-center">
                        <span className="myprimarytextcolor">Bank</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-md`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div>

                    <div className="select_container flex gap-5 items-center">
                        <span className="myprimarytextcolor">Template</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-md`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div>

                    <div className="select_container flex gap-5 items-center">
                        <span className="myprimarytextcolor">Currency</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-md`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div>
                </div>
                
                <div className="flex flex-col  gap-5 mt-5 mb-7">
                    {/* <h1 className='text-[30px] myprimarytextcolor'>Journal</h1> */}
                    <div className="flex justify-between gap-5">
                        
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <h1 className='text-[30px] myprimarytextcolor'>Journal</h1>
                            </div>
                            <div className="flex gap-5">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>From</label>
                                    <input type="date" name="dateInput" placeholder="Choose date" id="dateInputId" className="outline-none py-2 px-2 rounded-md border-1 border-slate-300"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>To</label>
                                    <input type="date" name="dateInput" placeholder="Choose date" id="dateInputId" className="outline-none py-2 px-2 rounded-md border-1 border-slate-300"/>
                                </div>
                            </div>
                                                                
                        </div>
                        
                        <div className="flex flex-col gap-5 mb-5">
                            <div className="flex flex-col gap-1 items-end">
                                <label className='myprimarytextcolor'>Debit</label>
                                <h1 className='text-[20px] myprimarytextcolor'>#{totalDebitAmount.toLocaleString('en-US')}</h1>
                            </div>

                            <div className="flex flex-col gap-1 items-end">
                                <label className='myprimarytextcolor'>Credit</label>
                                <h1 className='text-[20px] myprimarytextcolor'>#{totalCreditAmount.toLocaleString('en-US')}</h1>
                            </div>

                            <div className="h-fit items-end">
                            <Link to={"#"} onClick={handleModalOpen} className="flex gap-2 outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                                <FiPlus size={20} color={"white"}/>
                                New Journal Entry
                            </Link>
                        </div>
                            
                        </div>
                        

                        {/* <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Date</label>
                                <input type="date" name="dateInput" placeholder="Choose date" id="dateInputId" className="outline-none py-2 px-2 rounded-md border-1 border-slate-300"/>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="table_container rounded-xl overflow-hidden mb-10">
                    <table className="w-full">
                    <thead className="bg-white border-b">
                        <tr>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Date
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Account
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Debit
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Credit
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Description
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">                            
                        </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {renderedJournal}
                    </tbody>
                    </table>
                </div>

                {/* <div className="flex justify-between mt-5 px-1">
                    <div className="flex flex-col gap-1">
                        <label className='myprimarytextcolor'>Memo</label>
                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-md`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>
                    </div>

                    <div className="flex gap-20">
                        <span className="myprimarytextcolor">Total</span>
                        <span className="myprimarytextcolor">{totalAmount}</span>
                    </div>
                </div>
                <div className="flex justify-end mt-5 px-1 gap-5">
                    <button className="outline-none bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Save & Close
                    </button>
                    <button className="outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        Save & New
                    </button>
                    <button className="outline-none  bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Clear
                    </button>
                </div> */}
            </div>

        </div>
        {
            modalOpen ?
            <>
                <JournalEntryModal 
                handleModalOpen={handleModalOpen}
                modalOpen={modalOpen}
                journalItemId ={idToOpen}
                />
                
            </>
            :
            <></>
        }
        </>
    );
}

export default JournalList;