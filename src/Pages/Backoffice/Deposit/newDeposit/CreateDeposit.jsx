import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch }from 'react-redux';
import { Link, useNavigate, useParams, redirect } from 'react-router-dom';
import {FiChevronLeft, FiChevronDown, FiChevronUp, FiPrinter, FiPlus } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import "./index.css";

import SelectSearch from "../../../../Components/InputAndTitle/SelectSearch/SelectSearch";
import FundDepositTable from "./fundDeposit/FundDepositTable";
import PaymentDepositTable from "./paymentDeposit/PaymentDepositTable";
import PaymentDepositLine from "./paymentDeposit/PaymentDepositLine";

import { updateDeposit, addNewDeposit, fetchDepositById, selectDepositById, selectAllDeposits,  getDepositsStatus, getDepositsError, fetchDeposits }from '../../../../Reducers/depositsSlice';

import { selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts, fetchReceiptsUndeposited } from '../../../../Reducers/receiptsSlice';
import { selectAllAccounts, selectAllTypedAccounts, getAccountsStatus, getAccountsError, fetchAccounts, fetchAccountsByType }from '../../../../Reducers/accountsSlice';
import { selectAllPersons,  getPersonsStatus, getPersonsError, fetchPersons }from '../../../../Reducers/personsSlice';
import { selectAllPaymentMethods,  getPaymentMethodsStatus, getPaymentMethodsError, fetchPaymentMethods }from '../../../../Reducers/paymentMethodsSlice';

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



function CreateDeposit(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirectRef = useRef();
        
    const randomNum = Math.floor(Math.random() * (9999999 - 1000000 + 1 )) + 1000000;
    const [depositNum, setDepositNum] = useState(randomNum);     // Math.floor(Math.random() * (maximum – minimum + 1)) + minimum
    
    const [person, setPerson] = useState();
    const [studentClass, setStudentClass] = useState("");
    const [refNb, setRefNb] = useState('');
    
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState('dflt');
    const [depositAccountId, setDepositAccountId] = useState('dflt');
      
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    
    const [selectedAccordionItem, setSelectedAccordionItem] = useState([true, true]);
    const [loadedData, setLoadedData] = useState([]);

    
    /** Data to submit ============================ */
    const [selectedAccount, setSelectedAccount] = useState();
    const [depositDate, setDepositDate] = useState(new Date().toISOString().substring(0, 10));
    const [totalAmount, setTotalAmount] = useState(0);
    const [fundDepositLines, setFundDepositLines] = useState([{depositLine:null}]);
    const [fundDepositTotalAmount, setFundDepositTotalAmount] = useState(0);
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
        setTotalAmount(fundDepositTotalAmount + paymentDepositTotalAmount)
    }, [fundDepositTotalAmount, paymentDepositTotalAmount])

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
            let rls = []
            myReceipts.forEach((elt, index) => {            
                rls = [...rls,{
                    accountId: elt.deposit_account_id,
                    paymentId: elt.id, 
                    person: {id:elt.person_id, name:elt.person_name, roleId: elt.person_role_id}, 
                    paymentDate: elt.date, 
                    paymentType: "Receipt", 
                    paymentSelected: false, 
                    paymentMethodId: elt.payment_method_id, 
                    paymentDescription: elt.items_list, 
                    paymentRefNb: elt.ref_nb, 
                    paymentAmount: elt.total_amount
                }];
            });

            setAllPaymentDepositLines(rls);
        }
    }, [receiptsStatus, dispatch])
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
    const handleUpdatedFundTable = ({fundDepositLines, totalAmount}) => {

    }
    //---------------------------------------------------------


    const handleSelectedItem = (item, index=null) => {
        let rl = fundDepositLines;
        rl[index] = item
        setFundDepositLines(rl);
    };


    const submitNewDeposit = () => {
        let fdls= [...fundDepositLines];
        let fund_deposit_lines = [];
        fdls.map(elt => {
            if (!isNaN(Number(elt.depositLine.personId))) {            
                let deposit_line_input = {
                    "person_id": Number(elt.depositLine.personId),
                    "person_role_id": elt.depositLine.personRoleId ,
                    "transaction_type": 'deposit',
                    "from_account_id": isNaN(Number(elt.depositLine.accountId)) ? null : Number(elt.depositLine.accountId),
                    "payment_method_id": isNaN(Number(elt.depositLine.paymentMethodId)) ? null : Number(elt.depositLine.paymentMethodId),
                    "description": elt.depositLine.depositDescription, 
                    "ref_nb": elt.depositLine.depositRefNb, 
                    "amount": isNaN(Number(elt.depositLine.depositAmount)) ? 0 : Number(elt.depositLine.depositAmount), 
                    "date": depositDate,
                };
                fund_deposit_lines.push(deposit_line_input);
            }
        });

        let pdls= [...paymentDepositLines];
        let payment_deposit_lines = [];
        pdls.map(elt => {
            let deposit_line_input = {
                "person_id": Number(elt.paymentLine.person.id),
                "person_role_id": Number(elt.paymentLine.person.roleId),
                "transaction_type": elt.paymentLine.paymentType.toLowerCase(),
                "transaction_id": Number(elt.paymentLine.paymentId),
                "from_account_id": Number(elt.paymentLine.accountId),
                "payment_method_id": isNaN(Number(elt.paymentLine.paymentMethodId)) ? null : Number(elt.paymentLine.paymentMethodId),
                "description": elt.paymentLine.paymentDescription, 
                "ref_nb": elt.paymentLine.paymentRefNb, 
                "amount": Number(elt.paymentLine.paymentAmount), 
                "date": depositDate,
            };

            payment_deposit_lines.push(deposit_line_input);
        });

        
        let toSubmit = {
            "to_account_id": selectedAccount.id,
            "transaction_type": 'deposit',            
            "description": memo,
            "total_amount": parseInt(totalAmount),
            "date": depositDate,
            "fund_deposit_lines": fund_deposit_lines,
            "payment_deposit_lines": payment_deposit_lines,            
        }
        console.log("toSubmit: ", toSubmit)
        // console.log("items_list: ", toSubmit.items_list)
        // console.log("fundDepositLines: ", fundDepositLines)
        
        if ( selectedAccount && depositDate ) {
            dispatch_and_resetform(toSubmit)
        }
    }
    
    const dispatch_and_resetform = (toSubmit) => {
        // if(myDeposit?.id){
        //     toSubmit['id'] = myDeposit?.id;
        //     dispatch(
        //         updateDeposit(toSubmit)
        //     ).unwrap()
        // } else {
        //     dispatch(
        //         addNewDeposit(toSubmit)
        //     ).unwrap()
        // }

        dispatch(
            addNewDeposit(toSubmit)
        ).unwrap()
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
                        <h1 className='text-[30px] myprimarytextcolor'>{person?'':'New'} Deposit</h1>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Account</label>
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
                            <div className="flex flex-col gap-1">
                                <label className={`myprimarytextcolor select-none`}>Balance</label>
                                <div className="flex p-[8px] text-md rounded-lg bg-white min-h-[30px] min-w-[150px]">{selectedAccount?.balance ?? 0}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col items-end">
                            <label className='myprimarytextcolor'>Amount</label>
                            <h1 className='text-[25px] myprimarytextcolor'>#{totalAmount}</h1>
                        </div> 
                        <div className="flex gap-5 justify-end">
                                                       
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor w-fit'>Date</label>                                
                                <input type="date" value={depositDate} onChange={(e)=>setDepositDate(e.target.value)}
                                 name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md h-[40px] w-[200px]"/>
                            </div>

                            {/* <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Amount</label>
                                <div className="flex p-[10px] rounded-lg bg-white min-w-[150px]">{totalAmount}</div>
                            </div>  */}
                            
                        </div>
                        

                    </div>
                </div>



                {/* Accordion start */}
                <section className="">
                    <div className="w-full my-8">
                    {myPaymentMethods && myAccounts && myPersons && myReceipts ?
                        <>
                    {[FundDepositTable({myPaymentMethods, myAccounts, myPersons, fundDepositLines, setFundDepositLines, totalAmount:fundDepositTotalAmount, setTotalAmount:setFundDepositTotalAmount }), 
                    PaymentDepositTable({myPaymentMethods, receiptsAndPayments:myReceipts,
                    paymentDepositLines, setPaymentDepositLines, totalAmount:paymentDepositTotalAmount, setTotalAmount:setPaymentDepositTotalAmount, allPaymentDepositLines, setAllPaymentDepositLines})
                    ].map((item, i) => (
                        <div key={i} className="border-b">
                            <div
                                className="w-full text-[#101828] text-[.9rem] font-medium flex justify-between items-center gap-10 cursor-pointer border-b-[1px] border-gray-400 py-4 pt-7"
                                onClick={() => toggleAccordionItem(i) }
                            >                                
                                <React.Fragment>{item.title}</React.Fragment>
                                {selectedAccordionItem[i] ? (
                                <FiChevronUp size={24}/>
                                ) : (
                                <FiChevronDown size={24}/>
                                )}
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
                        
                        <div className="flex gap-10">
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
                            
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-[200px]">
                        
                        <div className="flex justify-between gap-20 w-[200px]">
                            <span className="myprimarytextcolor">Total amount</span>
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

export default CreateDeposit;

