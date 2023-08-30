import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch }from 'react-redux';
import OneInvoiceModal from './OneInvoiceModal.jsx';
import { selectAllInvoices,  getInvoicesStatus, getInvoicesError, fetchInvoices }from '../../../Reducers/invoicesSlice.js';

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function InvoicesList(props) {    
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [idToOpen, setIdToOpen] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    // --------------------------------------------------------
    const myInvoices = useSelector(selectAllInvoices);
    const invoicesStatus = useSelector(getInvoicesStatus);
    const invoicesError = useSelector(getInvoicesError);
    useEffect(() => {
        if (invoicesStatus === 'idle') {
            dispatch(fetchInvoices())            
        }
        else if (invoicesStatus === 'succeeded') {
            console.log("======================")
            console.log("myInvoices:",myInvoices)
            console.log("======================")

            let total = 0;
            Array.isArray(myInvoices) && myInvoices.map((invoice, index) =>{
                total += parseInt(invoice.total_amount)
            })

            setTotalAmount(total);
        }
    }, [invoicesStatus, dispatch])
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


    let renderedInvoices;
    if (invoicesStatus === 'loading') {
        renderedInvoices = <tr><td>...</td></tr>;
    } else if (invoicesStatus === 'succeeded' && Array.isArray(myInvoices)) {
        renderedInvoices = myInvoices.slice(0).reverse().map((invoice, index) => (
        <tr key={index} onClick={()=>handleModalOpen(invoice.id)} className="table_row_w cursor-pointer">
            <td className="text-gray-900  cursor-pointer font-light px-6 py-4 whitespace-nowrap">
                {invoice.createdAt.split("T")[0]}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.number}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.person.name}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.items_list}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.total_amount ?? 0}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {invoice.balance_due ?? 0}
            </td>
            <td className="flex text-gray-900 gap-5 font-bold px-6 py-4 whitespace-nowrap">
                <a href={`/dashboard/invoices/${invoice.id}`}>
                    <AiOutlineEdit size={18} color={"#41436a"}/>
                    {/* {receipt.number} */}
                </a>
                {/* <div className="hover:cursor-pointer" onClick={()=>handleDeleteModalOpen(account.id)}>
                    <RiDeleteBinLine size={18} color={"#41436a"}/>
                </div> */}
            </td>  
        </tr>
    ))
    } else if (invoicesStatus === 'failed') {
        renderedInvoices = {invoicesError};
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
                    <h1 className='text-[30px] myprimarytextcolor'>Invoices</h1>
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
                            <Link to={"/dashboard/new-invoice"} className="flex gap-2 outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                                <FiPlus size={20} color={"white"}/>
                                New Invoice
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
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            ID
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Customer
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Description
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Amount
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Balance due
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            
                        </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {renderedInvoices}
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
                <OneInvoiceModal 
                handleModalOpen={handleModalOpen}
                modalOpen={modalOpen}
                invoiceId ={idToOpen}
                />
                
            </>
            :
            <></>
        }
        </>
    );
}

export default InvoicesList;