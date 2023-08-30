import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCalendar } from "react-icons/ai";
import { FiChevronLeft, FiPrinter } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { calculateAmount } from "../../../../Helpers";
import "./style.css";

import SelectSearch from "../../../../Components/InputAndTitle/SelectSearch/SelectSearch";
import InvoiceTable from "./invoiceTable";

import { addNewInvoice, fetchInvoiceById, getInvoicesError, getInvoicesStatus, selectInvoiceById, updateInvoice } from '../../../../Reducers/invoicesSlice';
import { fetchItems, getItemsError, getItemsStatus, selectAllItems } from '../../../../Reducers/itemsSlice';
import { fetchPaymentMethods, getPaymentMethodsError, getPaymentMethodsStatus, selectAllPaymentMethods } from '../../../../Reducers/paymentMethodsSlice';
import { fetchPersons, getPersonsError, getPersonsStatus, selectAllPersons } from '../../../../Reducers/personsSlice';


function CreateInvoice(props) {
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
    const [invoiceNum, setInvoiceNum] = useState(randomNum);     // Math.floor(Math.random() * (maximum – minimum + 1)) + minimum    
    const [selectedAccount, setSelectedAccount] = useState();
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().substring(0, 10));
    const [invoiceDueDate, setInvoiceDueDate] = useState(new Date().toISOString().substring(0, 10));
    const [totalAmount, setTotalAmount] = useState(0);
    const [balanceDue, setBalanceDue] = useState(0);
    const [invoiceLines, setInvoiceLines] = useState([{invoiceLine:null}]);
    const [memo, setMemo] = useState('');
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
    const myInvoice = useSelector((state) => selectInvoiceById(state, Number(id)));
    const invoicesStatus = useSelector(getInvoicesStatus);
    const invoicesError = useSelector(getInvoicesError);
    useEffect(() => {
        if (invoicesStatus === 'idle' && id) {
            dispatch(fetchInvoiceById({ id: Number(id) })).unwrap()          
        }
        else if (invoicesStatus === 'succeeded' && myInvoice) {
            console.log("myInvoice : ", myInvoice);                        
            setInvoiceNum(myInvoice?.number);
            setMemo(myInvoice?.message);
            handleSelectedPerson(myInvoice?.person);            
            initializeTableData(myInvoice?.invoice_lines, myItems);
            setInvoiceDate(myInvoice.date);
            setInvoiceDueDate(myInvoice.due_date);
        }
    }, [invoicesStatus, dispatch])
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
        if(elt.is_student){
            setAddressClassLabel('Class');
            setAddressClassValue(elt.student_class.name)
        } else {
            setAddressClassLabel('Address');
            setAddressClassValue(elt.address)
        }
    };
    //---------------------------------------------------------
    const initializeTableData = (ils) => {
        const new_ils = ils.map((il) => ({
          invoiceLine: {
            id: il.id,
            item: il.item,
            itemId: il.item_id,
            itemName: il.item.name,
            itemDescription: il.description,
            qty: il.qty,
            rate: il.rate,
            amount: il.amount,
          },
        }));
        setInvoiceLines(new_ils);
        setTotalAmount(calculateAmount(new_ils, 'invoiceLine'));
    };
    //---------------------------------------------------------
    const submitNewInvoice = () => {
        let ils= [...invoiceLines];
        let invoice_lines = [];
        ils.map(elt => {
            if (!isNaN(Number(elt.invoiceLine.itemId))) {
                const { itemId, qty, rate, amount, itemDescription } = elt.invoiceLine;
                const invoice_line_input = {
                    item_id: Number(itemId) || 0,
                    qty: Number(qty) || 0,
                    rate: Number(rate) || 0,
                    amount: Number(amount) || 0,
                    description: itemDescription,
                    date: invoiceDate,
                    ...(myInvoice?.id ? { id: elt.invoiceLine.id } : {}),
                };
                invoice_lines.push(invoice_line_input);                
            }
        });

        const { id, deposit_account_id, deposit_id } = myInvoice || {};
        const toSubmit = {
            number: invoiceNum,
            person_id: person.id,
            person_role_id: person.person_role_id,
            date: invoiceDate,
            due_date: invoiceDueDate,
            items_list: ils.map(({ invoiceLine: { itemName } }) => itemName).join(", "),
            total_amount: totalAmount,
            balance_due: balanceDue ?? totalAmount,
            message: memo,
            invoice_lines,
            ...(id ? { id, deposit_account_id, deposit_id } : {}),
        };

        console.log("toSubmit: ", toSubmit)
        person?.id && invoiceDate && dispatch_and_resetform(toSubmit);
    }
    //---------------------------------------------------------
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(myInvoice?.id ? updateInvoice(toSubmit) : addNewInvoice(toSubmit)).unwrap();
        // redirectRef.current.href = "/dashboard/invoices";
        // redirectRef.current.click();
    };      
    const cancelInvoice = () => navigate('/dashboard/invoices');



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
                        <h1 className='text-[30px] myprimarytextcolor'>Invoice - {invoiceNum}</h1>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Customer</label>
                                {myPersons?                                
                                <SelectSearch
                                itemPlaceholder = {'Select a name'}
                                selectedItem = {myInvoice?.id && person}
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
                        <div className="flex gap-5 mb-5">                                                       
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor w-fit'>Invoice Date</label>                                
                                <input type="date" value={invoiceDate} onChange={(e)=>setInvoiceDate(e.target.value)}
                                 name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md h-[40px] w-[200px]"/>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor w-fit'>Due Date</label>                                
                                <input type="date" value={invoiceDueDate} onChange={(e)=>setInvoiceDueDate(e.target.value)}
                                 name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md h-[40px] w-[200px]"/>
                            </div>                            
                        </div>
                        {/* <div className="flex gap-5 w-full">
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
                        </div> */}
                        

                    </div>
                </div>



                {/* Accordion start */}
                <section className="">
                    <div className="w-full my-8">
                    {myPaymentMethods && myItems && myPersons && invoiceLines ?
                        <>
                    {[InvoiceTable({myPaymentMethods, myItems, myPersons, invoiceLines, setInvoiceLines, totalAmount, setTotalAmount })
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
                            <label className='myprimarytextcolor'>Memo</label>
                            <textarea name="" id="" rows="5" value={memo} onChange={(e)=>setMemo(e.target.value)} className={`border p-2 w-[250px] border-[#41436a] rounded-md`} placeholder="Memo ...">
                            </textarea>
                        </div>
                        
                        
                    </div>

                    <div className="flex flex-col gap-3 w-[200px]">
                        
                        <div className="flex justify-between gap-20 w-[200px]">
                            <span className="myprimarytextcolor">Total amount</span>
                            <span className="myprimarytextcolor">{totalAmount.toLocaleString('en-US')}</span>
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
                    <button onClick={()=>submitNewInvoice()} className="outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        Save & New
                    </button>
                    <button onClick={()=>cancelInvoice()} className="outline-none  bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Cancel
                    </button>
                </div>
            </div>
            <a ref={redirectRef} className={'displayNone'} href="#"></a>

        </div>
        </>
    );
}

export default CreateInvoice;

