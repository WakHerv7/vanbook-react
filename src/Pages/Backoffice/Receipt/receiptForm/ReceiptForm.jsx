import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCalendar } from "react-icons/ai";
import { FiChevronLeft, FiPrinter } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { calculateAmount } from "../../../../Helpers";
import "./style.css";

import SelectSearch from "../../../../Components/InputAndTitle/SelectSearch/SelectSearch";
import ReceiptTable from "./receiptTable";

import { addNewReceipt, fetchReceiptById, getReceiptsError, getReceiptsStatus, selectReceiptById, updateReceipt } from '../../../../Reducers/receiptsSlice';
import { fetchItems, getItemsError, getItemsStatus, selectAllItems } from '../../../../Reducers/itemsSlice';
import { fetchPaymentMethods, getPaymentMethodsError, getPaymentMethodsStatus, selectAllPaymentMethods } from '../../../../Reducers/paymentMethodsSlice';
import { selectAllAccounts, selectAllTypedAccounts, getAccountsStatus, getAccountsError, fetchAccounts, fetchAccountsByType }from '../../../../Reducers/accountsSlice';
import { fetchPersons, getPersonsError, getPersonsStatus, selectAllPersons } from '../../../../Reducers/personsSlice';


function ReceiptForm(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirectRef = useRef();
        
    const randomNum = Math.floor(Math.random() * (9999999 - 1000000 + 1 )) + 1000000;    
    const [person, setPerson] = useState();
    const [addressClassValue, setAddressClassValue] = useState("");
    const [addressClassLabel, setAddressClassLabel] = useState("");    
    const [selectedAccordionItem, setSelectedAccordionItem] = useState([true, true]);    
    /** Data to submit ============================ */
    const [receiptNum, setReceiptNum] = useState(randomNum);     // Math.floor(Math.random() * (maximum – minimum + 1)) + minimum    
    const [selectedAccount, setSelectedAccount] = useState();
    const [receiptDate, setReceiptDate] = useState(new Date().toISOString().substring(0, 10));
    const [receiptDueDate, setReceiptDueDate] = useState(new Date().toISOString().substring(0, 10));
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    const [balanceDue, setBalanceDue] = useState(0);
    const [receiptLines, setReceiptLines] = useState([{receiptLine:null}]);
    const [memo, setMemo] = useState('');
    const [description, setDescription] = useState('');
    const [refNb, setRefNb] = useState('');
    // const [paymentReceived, setPaymentReceived] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState('dflt');
    const [depositAccountId, setDepositAccountId] = useState('dflt');
    /** ============================================ */
    //---------------------------------------------------------
    const myItems = useSelector(selectAllItems);
    const itemsStatus = useSelector(getItemsStatus);
    const itemsError = useSelector(getItemsError);
    useEffect(() => {
        if (itemsStatus === 'idle') {
            dispatch(fetchItems())            
        }
    }, [itemsStatus, dispatch])
    //---------------------------------------------------------
    const myReceipt = useSelector((state) => selectReceiptById(state, Number(id)));
    const receiptsStatus = useSelector(getReceiptsStatus);
    const receiptsError = useSelector(getReceiptsError);
    useEffect(() => {
        if (receiptsStatus === 'idle' && id) {
            dispatch(fetchReceiptById({ id: Number(id) })).unwrap()          
        }
        else if (receiptsStatus === 'succeeded' && myReceipt) {
            console.log("myReceipt : ", myReceipt);                        
            setReceiptNum(myReceipt?.number);
            setMemo(myReceipt?.message || "");
            setDescription(myReceipt?.description || "");
            handleSelectedPerson(myReceipt?.person);            
            initializeTableData(myReceipt?.receipt_lines);
            setReceiptDate(myReceipt?.date);
            setPaymentMethodId(myReceipt?.payment_method_id);
            setDepositAccountId(myReceipt?.deposit_account_id);
            setRefNb(myReceipt?.ref_nb);
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
            Array.isArray(myPaymentMethods) && console.log(myPaymentMethods);            
        }
    }, [paymentMethodsStatus, dispatch])
    //---------------------------------------------------------    
    const myAccounts = useSelector(selectAllTypedAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccountsByType(103))            
        }
    }, [accountsStatus, dispatch])
    // --------------------------------------------------------
    const myPersons = useSelector(selectAllPersons);
    const personsStatus = useSelector(getPersonsStatus);
    const personsError = useSelector(getPersonsError);
    useEffect(() => {
        if (personsStatus === 'idle') {
            dispatch(fetchPersons());         
        }
        else if (personsStatus === 'succeeded') {
            // console.log("myPersons: ", myPersons)
        }
    }, [personsStatus, dispatch])
    //---------------------------------------------------------
    const handleSelectedPerson = (elt) => {
        setPerson(elt)
        console.log(elt)
        if(elt.is_student){
            setAddressClassLabel('Class');
            setAddressClassValue(elt.student_class.name)
        } else {
            setAddressClassLabel('Address');
            setAddressClassValue(elt.address)
        }
    };
    //---------------------------------------------------------
    useEffect(() => {
        setBalanceDue(totalAmount-totalAmountPaid)
    }, [totalAmount, totalAmountPaid])
    
    const handleTotalAmountPaidChange = (e) => {
        const newTotal = parseFloat(e.target.value);

        if (newTotal >= 0) {
            const percentageChange = newTotal / totalAmount;      
            setReceiptLines(prevData => {
                const newData = prevData.map(elt => {
                const updatedAmount = elt.receiptLine.amount * percentageChange;
                return {
                    receiptLine: {
                        ...elt.receiptLine,
                        amountPaid: Math.min(updatedAmount, elt.receiptLine.amount),
                    },
                }
                });
                return newData;
            });      
            setTotalAmountPaid(Math.min(newTotal, totalAmount));
        }
    };
    //---------------------------------------------------------
    //---------------------------------------------------------
    const initializeTableData = (ils) => {
        const new_ils = ils.map((il) => {
            console.log("il.amount_paid: ");
            console.log(il.amount_paid);
            return {
                receiptLine: {
                    id: il.id,
                    item: il.item,
                    itemId: il.item_id,
                    itemName: il.item.name,
                    itemDescription: il.description,
                    qty: il.qty,
                    rate: il.rate,
                    amount: il.amount,
                    amountPaid: il.amount_paid,
                },
            }
        });
        setReceiptLines(new_ils);
        setTotalAmount(calculateAmount(new_ils, 'receiptLine'));
    };
    //---------------------------------------------------------
    const submitNewReceipt = () => {
        let ils= [...receiptLines];
        let receipt_lines = [];
        ils.map(elt => {
            if (!isNaN(Number(elt.receiptLine.itemId))) {
                const { itemId, qty, rate, amount, amountPaid, itemDescription } = elt.receiptLine;
                const receipt_line_input = {
                    item_id: Number(itemId) || 0,
                    qty: Number(qty) || 0,
                    rate: Number(rate) || 0,
                    amount: Number(amount) || 0,
                    amount_paid: Number(amountPaid) || 0,
                    description: itemDescription,
                    date: receiptDate,
                    // ...(myReceipt?.id ? { id: elt.receiptLine.id } : {}),
                };
                receipt_lines.push(receipt_line_input);                
            }
        });

        const { id, deposit_account_id, deposit_id, invoice_id } = myReceipt || {};
        const toSubmit = {
            number: String(receiptNum),
            person_id: person.id,
            person_role_id: person.person_role_id,
            date: receiptDate,
            message: memo,
            items_list: ils.map(({ receiptLine: { itemName } }) => itemName).join(", "),
            total_amount: totalAmount,
            total_amount_paid: totalAmountPaid,
            balance_due: balanceDue,
            ref_nb: refNb,
            payment_method_id: paymentMethodId,
            description: description,
            
            receipt_lines,
            ...(id ? { id, deposit_account_id, deposit_id, invoice_id } : {}),
        };

        console.log("toSubmit: ", toSubmit)
        person?.id && receiptDate && dispatch_and_resetform(toSubmit);
    }
    //---------------------------------------------------------
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(myReceipt?.id ? updateReceipt(toSubmit) : addNewReceipt(toSubmit)).unwrap();
        // redirectRef.current.href = "/dashboard/receipts";
        // redirectRef.current.click();
    };      
    //---------------------------------------------------------
    const cancelReceipt = () => navigate('/dashboard/receipts');
    //---------------------------------------------------------



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
                        <h1 className='text-[30px] myprimarytextcolor'>Receipt - {receiptNum}</h1>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Customer</label>
                                {myPersons?                                
                                <SelectSearch
                                itemPlaceholder = {'Select a name'}
                                selectedItem = {myReceipt?.id && person}
                                itemsList={myPersons}
                                itemHasRole={false}
                                handleSelected={handleSelectedPerson}
                                />
                                :
                                <></>
                                }
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className={`myprimarytextcolor select-none ${addressClassLabel? 'opacity-100' : 'opacity-0'}`}>{addressClassLabel ? addressClassLabel : 'Title'}</label>
                                <div className="flex p-[8px] text-md rounded-lg bg-white min-h-[30px] min-w-[150px]">{addressClassValue}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col items-end">
                            <label className='myprimarytextcolor'>Amount</label>
                            <h1 className='text-[25px] myprimarytextcolor'>#{totalAmount.toLocaleString('en-US')}</h1>
                        </div> 

                        <div className="flex gap-5">
                            <div className="flex flex-col gap-5 mb-5">
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor w-fit'>Receipt Date</label>                                
                                    <input type="date" value={receiptDate} onChange={(e)=>setReceiptDate(e.target.value)}
                                    name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md h-[40px] w-[200px]"/>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor w-fit'>Reference N°</label>                                
                                    <input type="text" onChange={(e)=>setRefNb(e.target.value)}
                                    defaultValue={refNb} name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md h-[40px] w-[200px]" placeholder='0000'/>
                                </div>
                                
                            </div>
                            <div className="flex flex-col gap-5">
                                
                                <div className="flex flex-col gap-1">
                                    <label className='myprimarytextcolor'>Payment Method</label>
                                    <select value={paymentMethodId} onChange={(e)=>(setPaymentMethodId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-w-[150px] px-2 rounded-md`} name={""} >
                                        <option disabled value="dflt">{`Select ...`}</option>        
                                        {
                                            myPaymentMethods.map((val, ind) => {
                                                return <option key={ind} value={Number(val.id)}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <label className='myprimarytextcolor'>Deposit To</label>
                                    <select value={depositAccountId} onChange={(e)=>(setDepositAccountId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] w-[200px] px-2 rounded-md`} name={""}>
                                        <option disabled value="dflt">{`Select ...`}</option>        
                                        {
                                            Array.isArray(myAccounts) && myAccounts.map((val, ind) => {
                                                return <option key={ind} value={val.id}>{val.name}</option>
                                            })                                
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>



                {/* Accordion start */}
                <section className="">
                    <div className="w-full my-8">
                    {myPaymentMethods && myItems && myPersons && receiptLines ?
                        <>
                    {[ReceiptTable({myPaymentMethods, myItems, myPersons, receiptLines, setReceiptLines, totalAmount, setTotalAmount, setTotalAmountPaid })
                    ].map((item, i) => (
                        <div key={i} className="border-b">                            
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
                            <label className='myprimarytextcolor'>Message displayed on sales receipt</label>
                            <textarea name="" id="" rows="5" value={memo} onChange={(e)=>setMemo(e.target.value)} className={`border p-2 w-[250px] resize-none border-[#41436a] rounded-md`} placeholder="Message displayed on sales receipt ...">
                            </textarea>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Message displayed on statement</label>
                            <textarea name="" id="" rows="5" value={description} onChange={(e)=>setDescription(e.target.value)} className={`border p-2 w-[250px] resize-none border-[#41436a] rounded-md`} placeholder="Message displayed on statement ...">
                            </textarea>
                        </div>
                        
                        
                    </div>

                    <div className="flex flex-col gap-3 w-[250px]">
                        
                        <div className="flex justify-between gap-20 w-[250px]">
                            <span className="myprimarytextcolor">Total amount</span>
                            <span className="myprimarytextcolor">{totalAmount.toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex justify-between gap-20 w-[100%]">
                            <span className="myprimarytextcolor">Total amount paid</span>
                            <input 
                            type="number"
                            value={totalAmountPaid}
                            onChange={handleTotalAmountPaidChange} 
                            name="dateInput" id="receiptNumInputId" 
                            className="outline-none py-2 rounded-md h-[35px] w-[80px] text-right" placeholder='0000'/>
                            {/* <span className="myprimarytextcolor">{totalAmountPaid.toLocaleString('en-US')}</span> */}
                        </div>
                        <div className="flex justify-between gap-20 w-[100%]">
                            <span className="myprimarytextcolor">Balance due</span>
                            <span className="myprimarytextcolor">{balanceDue.toLocaleString('en-US')}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-5 px-1 gap-5 mb-10">
                    <button className="outline-none bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Save & Close
                    </button>
                    <button onClick={()=>submitNewReceipt()} className="outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        Save & New
                    </button>
                    <button onClick={()=>cancelReceipt()} className="outline-none  bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Cancel
                    </button>
                </div>
            </div>
            <a ref={redirectRef} className={'displayNone'} href="#"></a>

        </div>
        </>
    );
}

export default ReceiptForm;

