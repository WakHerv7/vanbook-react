import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch }from 'react-redux';
import { Link, useNavigate, useParams, redirect } from 'react-router-dom';
import {FiChevronLeft, FiChevronDown, FiChevronUp, FiPrinter, FiPlus } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import "./index.css";

import SelectSearch from "../../../../Components/InputAndTitle/SelectSearch/SelectSearch";
import OutstandingTransactionsTable from "./outstandingTransactions/OutstandingTransactionsTable";
import PaymentDepositLine from "./outstandingTransactions/OutstandingTransactionsLine";

// import { updateDeposit, addNewDeposit, fetchDepositById, selectDepositById, selectAllDeposits,  getDepositsStatus, getDepositsError, fetchDeposits }from '../../../../Reducers/depositsSlice';

import { updatePaidBill, addNewPaidBill, fetchPaidBillById, selectPaidBillById,selectAllPaidBills,  getPaidBillsStatus, getPaidBillsError, fetchPaidBills }from '../../../../Reducers/paidBillsSlice';

import { selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts, fetchReceiptsUndeposited } from '../../../../Reducers/receiptsSlice';
import { selectAllAccounts, selectAllTypedAccounts, getAccountsStatus, getAccountsError, fetchAccounts, fetchAccountsByType }from '../../../../Reducers/accountsSlice';
import { selectAllPersons,  getPersonsStatus, getPersonsError, fetchPersons }from '../../../../Reducers/personsSlice';
import { selectAllPaymentMethods,  getPaymentMethodsStatus, getPaymentMethodsError, fetchPaymentMethods }from '../../../../Reducers/paymentMethodsSlice';
import { selectAllBills,  getBillsStatus, getBillsError, fetchBills, fetchBillsWithOpenBalance }from '../../../../Reducers/billsSlice.js';

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];
const PayMethods = [
    {value: 'bank', text:'Bank'},
    {value: 'cash', text:'Cash'},
]



function PayBillForm(props) {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirectRef = useRef();
        
    const randomNum = Math.floor(Math.random() * (9999999 - 1000000 + 1 )) + 1000000;
    const [depositNum, setDepositNum] = useState(randomNum);     // Math.floor(Math.random() * (maximum – minimum + 1)) + minimum

    const [depositAccountId, setDepositAccountId] = useState('dflt');
      
    
    const [selectedAccordionItem, setSelectedAccordionItem] = useState([true, true]);   
    /** Data to submit ============================ */
    const [selectedAccount, setSelectedAccount] = useState();
    const [person, setPerson] = useState();
    const [refNb, setRefNb] = useState('');
    const [paymentMethodId, setPaymentMethodId] = useState('dflt');
    const [depositDate, setDepositDate] = useState(new Date().toISOString().substring(0, 10));
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentDepositLines, setPaymentDepositLines] = useState([]);
    const [paymentDepositTotalAmount, setPaymentDepositTotalAmount] = useState(0);
    const [allPaymentDepositLines, setAllPaymentDepositLines] = useState([]);
    const [memo, setMemo] = useState('');
    const [selectedCashBackAccount, setSelectedCashBackAccount] = useState("dflt");
    const [memoCashBack, setMemoCashBack] = useState('');
    const [amountCashBack, setAmountCashBack] = useState(0);
    /** ============================================ */
    
    
    const toggleAccordionItem = (i) => {
        const items = [...selectedAccordionItem];
        items[i] = !items[i];
        setSelectedAccordionItem(items);
    };
    
    useEffect(() => {
        setTotalAmount(paymentDepositTotalAmount)
    }, [paymentDepositTotalAmount])

    //---------------------------------------------------------
    const myAccounts = useSelector(selectAllAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())            
        }
    }, [accountsStatus, dispatch])
    //---------------------------------------------------------
    const myReceipts = useSelector(selectAllReceipts);
    const receiptsStatus = useSelector(getReceiptsStatus);
    const receiptsError = useSelector(getReceiptsError);
    useEffect(() => {
        if (receiptsStatus === 'idle') {
            dispatch(fetchReceiptsUndeposited())            
        } else if (receiptsStatus === 'succeeded') {
            // setAllPaymentDepositLines(myReceipts);
            // let rls = []
            // myReceipts.forEach((elt, index) => {            
            //     rls = [...rls,{
            //         accountId: elt.deposit_account_id,
            //         paymentId: elt.id, 
            //         person: {id:elt.person_id, name:elt.person_name, roleId: elt.person_role_id}, 
            //         paymentDate: elt.date, 
            //         paymentType: "Receipt", 
            //         paymentSelected: false, 
            //         paymentMethodId: elt.payment_method_id, 
            //         paymentDescription: elt.items_list, 
            //         paymentRefNb: elt.ref_nb, 
            //         paymentAmount: elt.total_amount
            //     }];
            // });

            // setAllPaymentDepositLines(rls);
        }
    }, [receiptsStatus, dispatch])
    //---------------------------------------------------------
    const myBills = useSelector(selectAllBills);
    const billsStatus = useSelector(getBillsStatus);
    const billsError = useSelector(getBillsError);
    useEffect(() => {
        if (billsStatus === 'idle') {
            dispatch(fetchBillsWithOpenBalance())            
        } else if (billsStatus === 'succeeded') {
            // setAllPaymentDepositLines(myBills);
            // let rls = []
            // myBills.forEach((elt, index) => {            
            //     rls = [...rls,{
            //         accountId: elt.deposit_account_id,
            //         paymentId: elt.id, 
            //         person: {id:elt.person_id, name:elt.person_name, roleId: elt.person_role_id}, 
            //         paymentDate: elt.date, 
            //         paymentType: "Bill", 
            //         paymentSelected: false, 
            //         paymentMethodId: elt.payment_method_id, 
            //         paymentDescription: elt.items_list, 
            //         paymentRefNb: elt.ref_nb, 
            //         paymentAmount: elt.total_amount
            //     }];
            // });

            // setAllPaymentDepositLines(rls);
        }
    }, [billsStatus, dispatch])
    //---------------------------------------------------------
    const myPaymentMethods = useSelector(selectAllPaymentMethods);
    const paymentMethodsStatus = useSelector(getPaymentMethodsStatus);
    const paymentMethodsError = useSelector(getPaymentMethodsError);
    useEffect(() => {
        if (paymentMethodsStatus === 'idle') {
            dispatch(fetchPaymentMethods())            
        } else if (paymentMethodsStatus === 'succeeded') {
            // setPaymentMethodId(currentDepositLine.payment_method_id ?? 'dflt')
        }
    }, [paymentMethodsStatus, dispatch])

    // --------------------------------------------------------
    const myPersons = useSelector(selectAllPersons);
    const personsStatus = useSelector(getPersonsStatus);
    const personsError = useSelector(getPersonsError);
    useEffect(() => {
        if (personsStatus === 'idle') {
            console.log("personsStatus: ", personsStatus)
            dispatch(fetchPersons());         
        }
        else if (personsStatus === 'succeeded') {
            console.log("myPersons: ", myPersons)
        }
    }, [personsStatus, dispatch])

    //---------------------------------------------------------
    const myPayBill = useSelector((state) => selectPaidBillById(state, Number(id)));
    const paidBillStatus = useSelector(getPaidBillsStatus);
    const paidBillError = useSelector(getPaidBillsError);
    useEffect(() => {
        if (paidBillStatus === 'idle' && id) {
            dispatch(fetchPaidBillById({ id: Number(id) })).unwrap()          
        }
        else if (paidBillStatus === 'succeeded' && Array.isArray(myPayBill) && myPayBill) {
            // console.log("myReceipt : ", myReceipt);                        
            // setReceiptNum(myReceipt?.number);
            // setMemo(myReceipt?.message) || "";
            // setDescription(myReceipt?.description || "");
            // handleSelectedPerson(myReceipt?.person);            
            // initializeTableData(myReceipt?.receipt_lines);
            // setReceiptDate(myReceipt?.date);
            // setPaymentMethodId(myReceipt?.payment_method_id);
            // setDepositAccountId(myReceipt?.deposit_account_id);
            // setRefNb(myReceipt?.ref_nb);
        }
    }, [receiptsStatus, dispatch])
    //---------------------------------------------------------

    // const handleSelectedItem = (item, index=null) => {
    //     let rl = fundDepositLines;
    //     rl[index] = item
    //     // setFundDepositLines(rl);
    // };


    const submitNewDeposit = () => {
        let pdls= [...paymentDepositLines];
        let receive_payment_lines = [];
        pdls.map(elt => {
            let receive_payment_line_input = {
                "date": depositDate,
                "number": String(elt.paymentLine.currentLine.number),
                "person_id": Number(elt.paymentLine.person.id),
                "person_role_id": Number(elt.paymentLine.person.roleId),
                "due_date": depositDate,
                "original_amount": Number(elt.paymentLine.currentLine.total_amount),
                "open_balance": Number(elt.paymentLine.currentLine.balance_due),
                "amount_paid": Number(elt.paymentLine.paymentAmount),
                "transaction_type": elt.paymentLine.paymentType.toLowerCase(),
                "transaction_id": Number(elt.paymentLine.paymentId),
            };
            receive_payment_lines.push(receive_payment_line_input);
        });
        
        let toSubmit = {
            "number": String(randomNum),            
            "person_id": Number(person.id),
            "person_role_id": Number(person.person_role_id),
            "payment_date": depositDate,
            "deposit_account_id": selectedAccount.id,
            "payment_method_id": isNaN(Number(paymentMethodId)) ? null : Number(paymentMethodId),
            "ref_nb": refNb, 
            "transaction_type": 'payment',
            "total_amount": parseInt(totalAmount),
            "description": memo,
            "receive_payment_lines": receive_payment_lines,            
        }
        console.log("toSubmit: ", toSubmit)
        
        if ( person && selectedAccount && depositDate) {
            dispatch_and_resetform(toSubmit)
        }
    }
    
    const dispatch_and_resetform = (toSubmit) => {
        if(myPayBill?.id){
            toSubmit['id'] = myPayBill?.id;
            dispatch(
                updatePaidBill(toSubmit)
            ).unwrap()
        } else {
            dispatch(
                addNewPaidBill(toSubmit)
            ).unwrap()
        }

        // dispatch(
        //     addNewDeposit(toSubmit)
        // ).unwrap()
        // redirectRef.current.href = "/dashboard/deposits";
        // redirectRef.current.click();
    }

    const cancelDeposit = () => {
        navigate('/dashboard/deposits');
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

                    <div className="select_container flex gap-20 items-center">
                        <div className="flex myprimarytextcolor gap-3 items-center">
                            <AiOutlineCalendar size={20}/>
                            {new Date().toISOString().substring(0, 10)}
                        </div>

                        <div className="flex gap-3 border border-gray-500 rounded-md p-2">
                            <FiPrinter size={20}/>
                            <span className="myprimarytextcolor">Print</span>                            
                        </div>
                        
                    </div>

                </div>
                
                <div className="flex justify-between my-5">
                    <div className="flex flex-col gap-5">
                        <h1 className='text-[30px] myprimarytextcolor'>Pay Bill</h1>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Paid by</label>
                                {myPersons?                                
                                <SelectSearch
                                itemPlaceholder = {'Select a name'}
                                selectedItem = {null}
                                itemsList={myPersons}
                                itemHasRole={false}
                                handleSelected={setPerson}
                                />
                                :
                                <></>
                                }
                            </div>
                            {/* <div className="flex flex-col gap-1">
                                <label className={`myprimarytextcolor select-none`}>Balance</label>
                                <div className="flex p-[8px] text-md rounded-lg bg-white min-h-[30px] min-w-[150px]">{selectedAccount?.balance ?? 0}</div>
                            </div> */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        
                        <div className="flex flex-col items-end">
                            <label className='myprimarytextcolor'>Amount Paid</label>
                            <h1 className='text-[25px] myprimarytextcolor'>#{totalAmount}</h1>
                        </div> 
                        
                        <div className="flex gap-5 mb-5">                                                       
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor w-fit'>Date</label>                                
                                <input type="date" value={depositDate} onChange={(e)=>setDepositDate(e.target.value)}
                                 name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md h-[40px] w-[200px]"/>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Deposit To</label>
                                {myAccounts?                                
                                <SelectSearch
                                itemPlaceholder = {'Select an account'}
                                selectedItem = {null}
                                itemsList={myAccounts}
                                itemHasRole={false}
                                handleSelected={setSelectedAccount}
                                />
                                :
                                <></>
                                }
                            </div>

                            {/* <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Amount Received</label>
                                <div className="flex p-[10px] rounded-lg bg-white min-w-[150px]">{totalAmount}</div>
                            </div>  */}
                            
                        </div>
                        <div className="flex gap-5 w-full">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor w-fit'>Payment method</label> 
                                <select value={paymentMethodId} onChange={(e)=>(setPaymentMethodId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-w-[200px] w-full px-2 rounded-md`} name={""} >
                                    <option disabled value="dflt">{`Select ...`}</option>        
                                    {
                                        myPaymentMethods.map((val, ind) => {
                                            return <option key={ind} value={Number(val.id)}>{val.name}</option>
                                        })                                
                                    }
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className='myprimarytextcolor w-fit'>Reference N°</label> 
                                <input type="text" value={refNb} onChange={(e)=>setRefNb(e.target.value)}
                                 name="refNbInput" id="refNbInputId" className="outline-none py-2 px-2 rounded-md h-[40px]"/>
                            </div>
                        </div>
                        

                    </div>
                </div>



                {/* Accordion start */}
                <section className="">
                    <div className="w-full my-8">
                    {myPaymentMethods && myAccounts && myPersons && myBills ?
                        <>
                    {[OutstandingTransactionsTable({myPaymentMethods, receiptsAndPayments:myBills,
                    paymentDepositLines, setPaymentDepositLines, totalAmount:paymentDepositTotalAmount, setTotalAmount:setPaymentDepositTotalAmount, allPaymentDepositLines, setAllPaymentDepositLines})
                    ].map((item, i) => (
                        <div key={i} className="border-b">
                            <div
                                className="w-full text-[#101828] text-[.9rem] font-medium flex justify-between items-center gap-10"
                                
                            >                                
                                <React.Fragment>{item.title}</React.Fragment>                                
                            </div>
                            <div className={`${selectedAccordionItem[i] ? "content show  border-b-[1px] border-gray-400 " : "content"}`}>
                                <React.Fragment>{item.content}</React.Fragment>
                            </div>
                        </div>
                    ))}
                    </>
                    :
                    <></>}

                    </div>
                </section>
                {/* Accordion End */}



                <div className="flex justify-between mt-5 pl-1 pr-1 gap-10">
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Memo</label>
                            <textarea name="" id="" rows="5" value={memo} onChange={(e)=>setMemo(e.target.value)} className={`border p-2 w-[250px] border-[#41436a] rounded-md`} placeholder="Memo ...">
                            </textarea>
                        </div>
                        
                        {/* <div className="flex gap-10">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-3">
                                    <label className='myprimarytextcolor'>Cash back goes to</label>
                                    {myAccounts?                                
                                    // <SelectSearch
                                    // itemPlaceholder = {'Select an account'}
                                    // selectedItem = {null}
                                    // itemsList={myAccounts}
                                    // itemHasRole={false}
                                    // handleSelected={setSelectedCashBackAccount}
                                    // />
                                    <select value={selectedCashBackAccount} onChange={(e)=>(setSelectedCashBackAccount(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-w-[150px] px-2 rounded-md`} name={""} >
                                        <option disabled value="dflt">{`Select ...`}</option>        
                                        {
                                            myAccounts.map((val, ind) => {
                                                return <option key={ind} value={Number(val.id)}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                    :
                                    <></>
                                    }
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <label className={`myprimarytextcolor select-none`}>Cash back amount</label>
                                    <input type="number" value={amountCashBack>0?? ''} onChange={(e)=>setAmountCashBack(e.target.value)}
                                    name="cashBackAmountInput" id="cashBackAmountInputId" className="outline-none py-2 px-2 rounded-md h-[40px]"/>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <label className={`myprimarytextcolor select-none`}>Cash back memo</label>
                                <textarea name="" id="" rows="5" value={memoCashBack} onChange={(e)=>setMemoCashBack(e.target.value)} className={`border p-2 w-[250px] border-[#41436a] rounded-md`} placeholder="Cash back memo ...">
                                </textarea>
                            </div>
                            
                        </div> */}
                    </div>

                    <div className="flex flex-col gap-3 w-[300px]">
                        
                        <div className="flex justify-between gap-20 w-[300px]">
                            <span className="myprimarytextcolor">Total amount received</span>
                            <span className="myprimarytextcolor">{totalAmount}</span>
                        </div>
                        {/* <div className="flex justify-between gap-20 w-[100%]">
                            <span className="myprimarytextcolor">Total paid</span>
                            <span className="myprimarytextcolor">{totalAmountPaid}</span>
                        </div> */}
                        {/* <div className="flex justify-between gap-20 w-[100%]">
                            <span className="myprimarytextcolor">Balance</span>
                            <span className="myprimarytextcolor">{totalAmount - totalAmountPaid}</span>
                        </div> */}
                    </div>
                </div>
                <div className="flex justify-end mt-5 px-1 gap-5 mb-10">
                    <button className="outline-none bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Save & Close
                    </button>
                    <button onClick={()=>submitNewDeposit()} className="outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        Save & New
                    </button>
                    <button onClick={()=>cancelDeposit()} className="outline-none  bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Cancel
                    </button>
                </div>
            </div>
            <a ref={redirectRef} className={'displayNone'} href="#"></a>

        </div>
        </>
    );
}

export default PayBillForm;

