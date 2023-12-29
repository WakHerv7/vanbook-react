import {React, useState, useRef, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch }from 'react-redux';
import {FiChevronLeft } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts } from '../../../Reducers/receiptsSlice';
import { selectAllAccounts, selectAllTypedAccounts, getAccountsStatus, getAccountsError, fetchAccounts, fetchAccountsByType }from '../../../Reducers/accountsSlice';

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function Cashbook(props) {    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const receipts = useSelector(selectAllReceipts);
    const receiptsStatus = useSelector(getReceiptsStatus);
    const receiptsError = useSelector(getReceiptsError);
    useEffect(() => {
        if (receiptsStatus === 'idle') {
            dispatch(fetchReceipts())            
        }
    }, [receiptsStatus, dispatch])

    const myAccounts = useSelector(selectAllTypedAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccountsByType(103))            
        }
    }, [accountsStatus, dispatch])

    let renderedReceipts;
    if (receiptsStatus === 'loading') {
        renderedReceipts = <tr><td>...</td></tr>;
    } else if (receiptsStatus === 'succeeded') {
        renderedReceipts = receipts && receipts.map((receipt, index) => (
            <tr key={index} className="bg-gray-100 border-b">
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receipt.date}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receipt.items_list}
                </td>
                {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receipt.person_name}
                </td>                             */}
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <>{receipt.total_amount_paid}</>
                {/* {myAccounts?.filter(ma => ma.id == receipt.payment_method_id)[0]?.name == 'Bank' ?
                    <>{receipt.total_amount_paid}</>
                    :
                    <></>
                    } */}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">                    
                    {myAccounts?.filter(ma => ma.id == receipt.payment_method_id)[0]?.name == 'Cash' ?
                    <>{receipt.total_amount_paid}</>
                    :
                    <></>
                    }
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {/* {receipt.total_amount} */}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {/* {receipt.total_amount_paid} */}
                </td>
                {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <RiDeleteBinLine size={18} color={"#41436a"}/>
                </td> */}
            </tr>
    ))
    } else if (receiptsStatus === 'failed') {
        renderedReceipts = {receiptsError};
    }


    return (
        <>
        <div className="main_page_container px-10 bg-[#F0F0F0] flex flex-col justify-between">

            <div>
                <div className="flex py-3 justify-between items-center gap-10  border border-b-slate-300">
                    <a href="#" className="flex gap-1 items-center">
                        <FiChevronLeft size={20} color={"#white"}/>
                        <span className="myprimarytextcolor">Back</span>
                    </a>

                    {/* <div className="select_container flex gap-5 items-center">
                        <span className="myprimarytextcolor">Type</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-md`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div> */}

                    <div className="flex myprimarytextcolor gap-3 items-center">
                        <AiOutlineCalendar size={20}/>
                        {new Date().toISOString().substring(0, 10)}
                    </div>
                    
                </div>
                
                <div className="flex justify-between mt-5 mb-7">
                    <div className="flex flex-col gap-5">
                        <h1 className='text-[30px] myprimarytextcolor'>Cashbook</h1>
                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Available balance:</label>
                            <span className='myprimarytextcolor text-xl'>N 1,235,486.45</span>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Balance b/f</label>
                                <input type="text" name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md" placeholder='0000'/>
                            </div>
                            {/* <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Branch</label>
                                <select className={`commonSelectInput outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select from the list`}</option>        
                                    {
                                        listItems.map((val, ind) => {
                                            return <option value={val.value}>{val.text}</option>
                                        })                                
                                    }
                                </select>
                            </div> */}
                        </div>
                        <div className="flex flex-col gap-4">
                            {/* <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Class</label>
                                <select className={`commonSelectInput outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select from the list`}</option>        
                                    {
                                        listItems.map((val, ind) => {
                                            return <option value={val.value}>{val.text}</option>
                                        })                                
                                    }
                                </select>
                            </div> */}
                            
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
                </div>

                <div className="table_container rounded-xl border-solid border-2 border-gray-300 overflow-hidden">
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
                            <th rowSpan="2" scope="col" className="text-sm border-l font-medium myprimarytextcolor px-6 py-4 text-left">                            
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
                        {renderedReceipts}
                        {/* <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                SN20230103
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                EBUKA JOHNSON
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Form 1
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                1st term School fees
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Bank
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                70000
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Insolvent
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                SN20230103
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                EBUKA JOHNSON
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Form 1
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                1st term School fees
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Bank
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                70000
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Insolvent
                            </td>
                        </tr>
                        <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                SN20230103
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                EBUKA JOHNSON
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Form 1
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                1st term School fees
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Bank
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                70000
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Insolvent
                            </td>
                        </tr> */}
                    </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-5 px-1">
                    {/* <div className="flex flex-col gap-1">
                        <label className='myprimarytextcolor'>Customer message</label>
                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-md`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>
                    </div> */}

                    <div className="flex gap-20">
                        <div className="flex flex-col text-right">
                            <span className="myprimarytextcolor">Total Cash:</span>
                            <span className="myprimarytextcolor">Total Expenses:</span>
                            <span className="myprimarytextcolor">Balance c/f:</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="myprimarytextcolor">0.00</span>
                            <span className="myprimarytextcolor">0.00</span>
                            <span className="myprimarytextcolor">0.00</span>
                        </div>
                        
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
                </div>
            </div>

        </div>
        </>
    );
}

export default Cashbook;