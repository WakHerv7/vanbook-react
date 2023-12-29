import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch }from 'react-redux';
import "./cashbook-style.css";
// import OneCashbookItemModal from './OneCashbookItemModal.jsx';
import { selectAllCashbook,  getCashbookStatus, getCashbookError, fetchCashbook }from '../../../Reducers/cashbookSlice.js';
const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function Cashbook(props) {    
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [idToOpen, setIdToOpen] = useState(null);
    const [totalDebitAmount, setTotalDebitAmount] = useState(0);
    const [totalCreditAmount, setTotalCreditAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalCashAmount, setTotalCashAmount] = useState(0);
    const [balanceCf, setBalanceCf] = useState(0);
    // --------------------------------------------------------
    const myCashbook = useSelector(selectAllCashbook);
    const cashbookStatus = useSelector(getCashbookStatus);
    const cashbookError = useSelector(getCashbookError);
    useEffect(() => {
        if (cashbookStatus === 'idle') {
            dispatch(fetchCashbook())            
        }
        else if (cashbookStatus === 'succeeded') {
            console.log("======================")
            console.log("myCashbook:",myCashbook)
            console.log("======================")

            let total = 0;
            let totalDebit = 0;
            let totalCredit = 0;
            let totalDebitCash = 0;
            let totalCreditCash = 0;
            myCashbook.map((cashbookItem, index) =>{
                total += parseInt(cashbookItem.amount)
                if (cashbookItem.is_debit == true) {
                    totalDebit += parseInt(cashbookItem.amount)
                    if (cashbookItem.payment_method == "cash") {
                        totalDebitCash += parseInt(cashbookItem.amount)
                    }
                } else {
                    totalCredit += parseInt(cashbookItem.amount)
                    if (cashbookItem.payment_method == "cash") {
                        totalCreditCash += parseInt(cashbookItem.amount)
                    }
                }
            })
            setTotalCashAmount(totalDebitCash - totalCreditCash);
            setTotalAmount(total);
            setTotalDebitAmount(totalDebit);
            setTotalCreditAmount(totalCredit);
            setBalanceCf(totalDebit - totalCredit);
        }
    }, [cashbookStatus, dispatch])
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


    let renderedCashbook;
    if (cashbookStatus === 'loading') {
        renderedCashbook = <tr><td>...</td></tr>;
    } else if (cashbookStatus === 'succeeded') {
        renderedCashbook = myCashbook.map((cashbookItem, index) => (
        <tr key={index} onClick={()=>handleModalOpen(cashbookItem.id)} className="table_row_w cursor-pointer">
            <td className="text-gray-900  cursor-pointer font-light px-6 py-4 whitespace-nowrap">
                {cashbookItem.date.split("T")[0]}
            </td>
            <td className="cashbook-item-description text-gray-900 font-light px-6 py-4">
                <span className="font-medium">{cashbookItem.description}</span>
                <br/>
                {cashbookItem.content}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {cashbookItem.is_debit ? cashbookItem.payment_method == "bank" ? cashbookItem.amount.toLocaleString('en-US') : '' : ''}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {cashbookItem.is_debit ? cashbookItem.payment_method == "cash" ? cashbookItem.amount.toLocaleString('en-US') : '' : ''}
            </td>            
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {!cashbookItem.is_debit ? cashbookItem.payment_method == "bank" ? cashbookItem.amount.toLocaleString('en-US') : '' : ''}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {!cashbookItem.is_debit ? cashbookItem.payment_method == "cash" ? cashbookItem.amount.toLocaleString('en-US') : '' : ''}
            </td>                           
        </tr>
    ))
    } else if (cashbookStatus === 'failed') {
        renderedCashbook = {cashbookError};
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
                
                <div className="flex justify-between mt-5 mb-7">
                    <div className="flex flex-col gap-5">
                        <h1 className='text-[30px] myprimarytextcolor'>Cashbook</h1>
                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Available balance:</label>
                            <span className='myprimarytextcolor font-medium text-[20px]'># {balanceCf.toLocaleString('en-US')}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mb-5">
                        <div className="flex flex-col gap-1 items-end">
                            <label className='myprimarytextcolor'>Balance b/f</label>
                            <h1 className='text-[20px] myprimarytextcolor'>#000</h1>
                        </div>
                        <div className="flex gap-7">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>From</label>
                                <input type="date" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>To</label>
                                <input type="date" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/>
                            </div>
                        </div>
                        {/* <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Amount</label>
                            <input type="text" name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md" placeholder='0000'/>
                        </div> */}
                    </div>
                </div>

                <div className="table_container rounded-xl overflow-hidden">
                    <table className="w-full">
                    <thead className="bg-white border-b">
                    <tr>
                            <th rowSpan="2" scope="col" className="text-md border-r font-medium myprimarytextcolor px-6 py-4 text-left">
                                Date
                            </th>
                            <th rowSpan="2" scope="col" className="text-md border-r font-medium myprimarytextcolor px-6 py-4 text-left">
                                Description   
                            </th>
                            <th colSpan="2"  scope="col" className="text-md border-r border-b font-medium myprimarytextcolor px-6 py-4 text-left">
                                Debit
                            </th>
                            <th colSpan="2" scope="col" className="text-md border-b font-medium myprimarytextcolor px-6 py-4 text-left">
                                Credit
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" className="text-sm border-r font-medium myprimarytextcolor px-6 py-4 text-left">
                                Bank
                            </th>
                            <th scope="col" className="text-sm border-r font-medium myprimarytextcolor px-6 py-4 text-left">
                                Cash
                            </th>
                            <th scope="col" className="text-sm border-r font-medium myprimarytextcolor px-6 py-4 text-left">
                                Bank
                            </th>
                            <th scope="col" className="text-sm border-r font-medium myprimarytextcolor px-6 py-4 text-left">
                                Cash
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedCashbook}
                    </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-5 px-1 mb-10">

                    <div className="flex gap-20 mb-10">
                        <div className="flex flex-col gap-3 text-right font-medium">
                            <span className="myprimarytextcolor">Total Cash:</span>
                            <span className="myprimarytextcolor">Total Income:</span>
                            <span className="myprimarytextcolor">Total Expenses:</span>
                            <span className="myprimarytextcolor">Balance c/f:</span>
                        </div>
                        <div className="flex flex-col  gap-3 text-right font-medium">
                            <span className="myprimarytextcolor">{totalCashAmount.toLocaleString('en-US')}</span>
                            <span className="myprimarytextcolor">{totalDebitAmount.toLocaleString('en-US')}</span>
                            <span className="myprimarytextcolor">{totalCreditAmount.toLocaleString('en-US')}</span>
                            <span className="myprimarytextcolor">{balanceCf.toLocaleString('en-US')}</span>
                        </div>
                        
                    </div>
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
        {/* {
            modalOpen ?
            <>
                <OneCashbookItemModal 
                handleModalOpen={handleModalOpen}
                modalOpen={modalOpen}
                cashbookItemId ={idToOpen}
                />
                
            </>
            :
            <></>
        } */}
        </>
    );
}

export default Cashbook;