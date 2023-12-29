import {React, useState, useRef, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch }from 'react-redux';
// import { selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts }from '../../../Reducers/receiptsSlice';
import { selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceiptsPaymentNotReceived, updateSomeReceipts } from '../../../Reducers/receiptsSlice';
import { selectAllPaymentMethods,  getPaymentMethodsStatus, getPaymentMethodsError, fetchPaymentMethods }from '../../../Reducers/paymentMethodsSlice';
import { selectAllAccounts, selectAllTypedAccounts, getAccountsStatus, getAccountsError, fetchAccounts, fetchAccountsByType }from '../../../Reducers/accountsSlice';
import { selectAllBillPayments,  getBillPaymentsStatus, getBillPaymentsError, fetchBillPayments }from '../../../Reducers/billPaymentsSlice';

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function BillPaymentsList(props) {   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef([]);
    const [depositAccountId, setDepositAccountId] = useState('dflt');
    const [checkList, setCheckList] = useState([]);
    const [checkedAmount, setCheckedAmount] = useState(0);
    const [allReceipts, setAllReceipts] = useState([]);
    const [paidReceipts, setPaidReceipts] = useState([]);

    // --------------------------------------------------------
    const receipts = useSelector(selectAllReceipts);
    const receiptsStatus = useSelector(getReceiptsStatus);
    const receiptsError = useSelector(getReceiptsError);
    useEffect(() => {
        // if (receiptsStatus === 'idle') {
        //     dispatch(fetchReceiptsPaymentNotReceived())            
        // }
        // else if (receiptsStatus === 'succeeded' && Array.isArray(receipts) && receipts) {
        //     let newArray = []
        //     receipts.forEach( (rcpt, index) => {
        //         newArray[index] = {...rcpt}
        //     })
        //     setAllReceipts(newArray)

        //     let lines = []
        //     receipts.map(receipt => {
        //         let one_line = {
        //             id: receipt.id, 
        //             checked: false, 
        //             amount: receipt.total_amount, 
        //             amount_paid: receipt.total_amount_paid,
        //         }
        //         lines = [...lines, one_line]
        //     })
        //     setCheckList(lines);
        //     console.log("lines : ", lines);
        // }
    }, [receiptsStatus, dispatch])

    // --------------------------------------------------------
    const billPayments = useSelector(selectAllBillPayments);
    const billPaymentsStatus = useSelector(getBillPaymentsStatus);
    const billPaymentsError = useSelector(getBillPaymentsError);
    useEffect(() => {
        if (billPaymentsStatus === 'idle') {
            dispatch(fetchBillPayments())            
        }        
    }, [billPaymentsStatus, dispatch])
    
    // --------------------------------------------------------
    const myPaymentMethods = useSelector(selectAllPaymentMethods);
    const paymentMethodsStatus = useSelector(getPaymentMethodsStatus);
    const paymentMethodsError = useSelector(getPaymentMethodsError);
    useEffect(() => {
        if (paymentMethodsStatus === 'idle') {
            dispatch(fetchPaymentMethods())            
        }
    }, [paymentMethodsStatus, dispatch])

    //---------------------------------------------------------
    const myAccounts = useSelector(selectAllTypedAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())            
        }
    }, [accountsStatus, dispatch])

    //---------------------------------------------------------
    const handleReceiptCheckbox = (index, id, checkValue) => {
        // inputRef.current[index].checked
        let cl = checkList;
        let myReceipt = checkList.filter(item => item.id == id)[0];
        let myReceiptIndex = checkList.findIndex(item => item.id == id);
        cl[myReceiptIndex] ={
            id: myReceipt.id,
            checked: checkValue,
            amount: myReceipt.amount,
            amount_paid: myReceipt.amount_paid,
        };
        setCheckList(cl);

        let oneReceipt = allReceipts.filter(item => item.id == id)[0];
        oneReceipt.payment_received = checkValue
        if (checkValue) {
            setPaidReceipts([...paidReceipts, oneReceipt])
            setCheckedAmount(checkedAmount + myReceipt.amount) 
        } else {
            let myPaidReceipts = paidReceipts.filter(elt => elt.id !== myReceipt.id);
            setPaidReceipts(myPaidReceipts)
            setCheckedAmount(checkedAmount - myReceipt.amount)
        } 
    }

    const handleDepositAccountId = (depositAccId) => {
        setDepositAccountId(depositAccId)
        
        let myPaidReceipts = paidReceipts
        if (depositAccId == 'dflt') {
            myPaidReceipts.forEach((oneReceipt, index) => {
                oneReceipt.deposit_account_id = null
            })            
        } else {
            myPaidReceipts.forEach((oneReceipt, index) => {
                oneReceipt.deposit_account_id = depositAccId
            })
        }
        console.log("depositAccId : ", depositAccId);
        console.log("myPaidReceipts : ", myPaidReceipts);
        setPaidReceipts(myPaidReceipts)
    }

    const submitReceipts = () => {
        if ( paidReceipts && !isNaN(depositAccountId) ) {
            dispatch(
                updateSomeReceipts(paidReceipts)
            ).unwrap()
            navigate(0);
        }
    }

    let renderedReceipts;
    if (billPaymentsStatus === 'loading') {
        renderedReceipts = <tr><td>...</td></tr>;
    } else if (billPaymentsStatus === 'succeeded') {
        renderedReceipts = Array.isArray(billPayments) && billPayments.map((billPayment, index) => (
            <tr key={index} className="bg-gray-100 border-b">
                
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {billPayment.payment_date}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {billPayment.number}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {billPayment.issuer_account.name}
                </td>                            
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {billPayment.receiver_accounts_text}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {billPayment.payment_method.name}
                </td>                
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {billPayment.total_amount.toLocaleString('en-US')}
                </td>
            </tr>
    ))
    } else if (billPaymentsStatus === 'failed') {
        renderedReceipts = {billPaymentsError};
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

                    <div className="flex myprimarytextcolor gap-3 items-center">
                        <AiOutlineCalendar size={20}/>
                        {new Date().toISOString().substring(0, 10)}
                    </div>
                </div>
                
                <div className="flex w-full mt-5 mb-7">
                    <div className="flex flex-col w-full gap-5">
                        <h1 className='text-[30px] myprimarytextcolor'>Bill Payments</h1>
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
                            <Link to={"/dashboard/new-bill-payment"} className="flex gap-2 outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                                <FiPlus size={20} color={"white"}/>
                                New Bill Payment
                            </Link>
                        </div>
                                                              
                        </div>
                    </div>
                    {/* <div className="flex gap-5">
                        <div className="flex flex-col gap-5 justify-between">                            
                            <div>
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Amount</label>
                                    <input type="text" value={checkedAmount} name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md" placeholder='0000'/>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Deposit To</label>
                                    <select defaultValue={depositAccountId} onChange={(e)=>(handleDepositAccountId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] w-[200px] px-2 rounded-md`} name={""}>
                                        <option disabled value="dflt">{`Select ...`}</option>        
                                        {
                                            myAccounts?.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                </div>
                            </div>           
                        </div>
                    </div> */}
                </div>

                <div className="table_container rounded-xl border-solid border-2 border-gray-300">
                    <div className="table_subcontainer">
                        <table className="w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                    Date
                                </th>
                                <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                    Payment N°
                                </th>
                                <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                    Paid from
                                </th>
                                <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                    Received by
                                </th>
                                <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                    Payment method
                                </th>
                                <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                    Amount
                                </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {renderedReceipts}                        
                            </tbody>
                        </table>
                    </div>
                    
                </div>

                <div className="flex justify-end mt-5 px-1 mb-10">

                    <div className="flex gap-20">
                        <span className="myprimarytextcolor">Total</span>
                        <span className="myprimarytextcolor">{checkedAmount}</span>
                    </div>
                </div>
                {/* <div className="flex justify-end mt-5 px-1 gap-5">                    
                    <button onClick={()=>submitReceipts()} className="outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        Save
                    </button>
                    <button className="outline-none  bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Cancel
                    </button>
                </div> */}
            </div>
            
        </div>
        </>
    );
}

export default BillPaymentsList;
