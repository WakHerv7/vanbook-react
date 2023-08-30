import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch }from 'react-redux';
import OneDepositModal from './OneDepositModal.jsx';
import { selectAllDeposits,  getDepositsStatus, getDepositsError, fetchDeposits }from '../../../Reducers/depositsSlice.js';
const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function DepositsList(props) {    
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [idToOpen, setIdToOpen] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    // --------------------------------------------------------
    const myDeposits = useSelector(selectAllDeposits);
    const depositsStatus = useSelector(getDepositsStatus);
    const depositsError = useSelector(getDepositsError);
    useEffect(() => {
        if (depositsStatus === 'idle') {
            dispatch(fetchDeposits())            
        }
        else if (depositsStatus === 'succeeded') {
            console.log("======================")
            console.log("myDeposits:",myDeposits)
            console.log("======================")

            let total = 0;
            myDeposits.map((deposit, index) =>{
                total += parseInt(deposit.total_amount)
            })

            setTotalAmount(total);
        }
    }, [depositsStatus, dispatch])
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


    let renderedDeposits;
    if (depositsStatus === 'loading') {
        renderedDeposits = <tr><td>...</td></tr>;
    } else if (depositsStatus === 'succeeded') {
        renderedDeposits = myDeposits.map((deposit, index) => (
        <tr key={index} onClick={()=>handleModalOpen(deposit.id)} className="table_row_w cursor-pointer">
            <td className="text-gray-900  cursor-pointer font-light px-6 py-4 whitespace-nowrap">
                {deposit.createdAt.split("T")[0]}
            </td>
            {/* <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {deposit.transaction_type}
            </td> */}
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {deposit.to_account_name}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {deposit.depositors_names}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {deposit.total_amount ?? 0}
            </td>                           
        </tr>
    ))
    } else if (depositsStatus === 'failed') {
        renderedDeposits = {depositsError};
    }


    return (
        <>
        <div className="main_page_container px-10 bg-[#F0F0F0] flex flex-col justify-between">

            <div>
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
                    <h1 className='text-[30px] myprimarytextcolor'>Deposits</h1>
                    <div className="flex justify-between gap-5">
                        
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

                        <div className="h-fit">
                            <Link to={"/dashboard/new-deposit"} className="flex gap-2 outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                                <FiPlus size={20} color={"white"}/>
                                New Deposit
                            </Link>
                        </div>

                        {/* <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Date</label>
                                <input type="date" name="dateInput" placeholder="Choose date" id="dateInputId" className="outline-none py-2 px-2 rounded-md border-1 border-slate-300"/>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="table_container rounded-xl overflow-hidden">
                    <table className="w-full">
                    <thead className="bg-white border-b">
                        <tr>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Date
                        </th>
                        {/* <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Transaction type
                        </th> */}
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Deposit to
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            By
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Amount
                        </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {renderedDeposits}
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
                <OneDepositModal 
                handleModalOpen={handleModalOpen}
                modalOpen={modalOpen}
                depositId ={idToOpen}
                />
                
            </>
            :
            <></>
        }
        </>
    );
}

export default DepositsList;