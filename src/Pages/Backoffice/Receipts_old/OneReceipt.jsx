import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch }from 'react-redux';
import { Link, useNavigate, useParams, redirect } from 'react-router-dom';
import {FiChevronLeft, FiPrinter, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineCalendar } from "react-icons/ai";

// import { fetchStudentRegistrationById, selectStudentRegistrationById2, selectAllStudentRegistrations,  getStudentRegistrationsStatus, getStudentRegistrationsError, fetchStudentRegistrations }from '../../../Reducers/studentRegistrationsSlice';
import { selectAllPersons,  getPersonsStatus, getPersonsError, fetchPersons }from '../../../Reducers/personsSlice';
import { updateReceipt, addNewReceipt, fetchReceiptById, selectReceiptById, selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts }from '../../../Reducers/receiptsSlice';
import { selectAllSchoolStudents,  getSchoolStudentsStatus, getSchoolStudentsError, fetchSchoolStudents }from '../../../Reducers/schoolStudentsSlice';
import { selectAllItems,  getItemsStatus, getItemsError, fetchItems }from '../../../Reducers/itemsSlice';
import { selectAllPaymentMethods,  getPaymentMethodsStatus, getPaymentMethodsError, fetchPaymentMethods }from '../../../Reducers/paymentMethodsSlice';
import { selectAllAccounts, selectAllTypedAccounts, getAccountsStatus, getAccountsError, fetchAccounts, fetchAccountsByType }from '../../../Reducers/accountsSlice';
// selectAllTypedAccounts
import SelectSearch from "../../../Components/InputAndTitle/SelectSearch/SelectSearch";
import ReceiptLine from "./ReceiptLine/ReceiptLine";


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



function OneReceipt(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirectRef = useRef();
        
    const randomNum = Math.floor(Math.random() * (9999999 - 1000000 + 1 )) + 1000000;
    const [receiptNum, setReceiptNum] = useState(randomNum);     // Math.floor(Math.random() * (maximum – minimum + 1)) + minimum
    const [receiptDate, setReceiptDate] = useState(new Date().toISOString().substring(0, 10));
    const [person, setPerson] = useState();
    const [personAddress, setPersonAddress] = useState();
    const [studentClass, setStudentClass] = useState("");
    const [addressClassLabel, setAddressClassLabel] = useState("");
    const [itemName, setItemName] = useState('');
    const [refNb, setRefNb] = useState('');
    const [customerMessage, setCustomerMessage] = useState('');
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState('dflt');
    const [depositAccountId, setDepositAccountId] = useState('dflt');
    
    const [selectedPerson, setSelectedPerson] = useState();
    const [receiptLines, setReceiptLines] = useState([
        {id:1, item:null, rl:null},
    ]);
    const [amountList, setAmountList] = useState([0]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [amountPaidList, setAmountPaidList] = useState([0]);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    
    useEffect(() => {
        if (customerMessage) {
            console.log("customerMessage: ", customerMessage);          
        }
    }, [customerMessage])

    const myReceipt = useSelector((state) => selectReceiptById(state, Number(id)));
    const receiptsStatus = useSelector(getReceiptsStatus);
    const receiptsError = useSelector(getReceiptsError);
    useEffect(() => {
        if (receiptsStatus === 'idle' && id) {
            dispatch(fetchReceiptById({ id: Number(id) })).unwrap()          
        }
        else if (receiptsStatus === 'succeeded' && myReceipt) {
            console.log("myReceipt: ", myReceipt);
            // setItemName(myReceipt.item.name)
            // setItemDescription(myReceipt.item.description)
            setReceiptNum(myReceipt?.number);
            setCustomerMessage(myReceipt?.message)
            console.log("myReceipt?.payment_received: ", myReceipt?.payment_received);
            console.log("myReceipt?.payment_method_id: ", myReceipt?.payment_method_id);
            console.log("myReceipt?.deposit_account_id: ", myReceipt?.deposit_account_id);
            
            let pr;
            if (myReceipt?.payment_received === true) {
                pr ='yes'
            } else if (myReceipt?.payment_received === false) {
                pr = 'no'
            } else {
                pr = null
            }
            setPaymentReceived(pr);
            setPaymentMethodId(myReceipt?.payment_method_id ? myReceipt?.payment_method_id : 'dflt');
            setDepositAccountId(myReceipt?.deposit_account_id ? myReceipt?.deposit_account_id : 'dflt');

            
            if (myReceipt?.student) {
                setAddressClassLabel('Class');
                setPerson(myReceipt?.student);
                setStudentClass(myReceipt?.student_class.name);
            } else if (myReceipt?.person) {
                setAddressClassLabel('Address');
                setPerson(myReceipt?.person)
                setStudentClass(myReceipt?.person.address);
            }
            // setPerson(myReceipt?.student ? myReceipt?.student: null);

            let rls = myReceipt?.receipt_lines;
            let new_rls =[];
            rls.map((rl, ind) => {
                let new_rl = {
                    id: ind+1,
                    item: rl.item,
                    rl: {
                        "item_id": rl.item_id,
                        "qty": rl.qty,
                        "price": rl.price,
                        "amount": rl.amount,
                        "amount_paid": rl.amount_paid
                    }
                }
                new_rls = [...new_rls, new_rl];
            })
            console.log("new_rls: ", new_rls)
            setReceiptLines(new_rls)
        }
    }, [receiptsStatus, dispatch])


    const addNewLine = () => {
        let rls = receiptLines;
        rls = [...rls, {id: rls.length+1, item:null, rl:null}];
        setReceiptLines(rls);
        setAmountList([...amountList, 0])
        setAmountPaidList([...amountPaidList, 0])
    }
    

    const myPaymentMethods = useSelector(selectAllPaymentMethods);
    const paymentMethodsStatus = useSelector(getPaymentMethodsStatus);
    const paymentMethodsError = useSelector(getPaymentMethodsError);
    useEffect(() => {
        if (paymentMethodsStatus === 'idle') {
            dispatch(fetchPaymentMethods())            
        }
    }, [paymentMethodsStatus, dispatch])
    

    const myAccounts = useSelector(selectAllTypedAccounts);
    const accountsStatus = useSelector(getAccountsStatus);
    const accountsError = useSelector(getAccountsError);
    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccountsByType(103))            
        }
    }, [accountsStatus, dispatch])


    const myItems = useSelector(selectAllItems);
    const itemsStatus = useSelector(getItemsStatus);
    const itemsError = useSelector(getItemsError);
    useEffect(() => {
        if (itemsStatus === 'idle') {
            dispatch(fetchItems())            
        }
    }, [itemsStatus, dispatch])
    

    const handleSelectedItem = (item, index=null) => {
        let rl = receiptLines;
        rl[index] = item
        setReceiptLines(rl);
    };


    const handleSelectedPerson = (item) => {
        setPerson(item)
        // console.log("handleSelectedPerson item: ", item);
        if(item.class){
            setAddressClassLabel('Class');
            setStudentClass(item.class)
        } else {
            setAddressClassLabel('Address');
            setStudentClass(item.address)
        }
    };


    const calculateAmount = (al) => {
        let ta = 0;
        al.map(i => {
            ta += Number(i);
        })
        return ta
    };
    

    const updateTotalAmount = (ind, myRl, item) => {
        let rls = receiptLines;
        rls[ind]['rl'] = myRl;
        rls[ind].item = item;
        setReceiptLines(receiptLines);
        
        let al = amountList;
        al[ind] = myRl.amount;
        setAmountList(al);
        
        let ta = calculateAmount(al);
        setTotalAmount(ta)        
    };


    const updateTotalPaidAmount = (ind, myRl, item) => {
        let rls = receiptLines;
        rls[ind].rl = myRl;
        rls[ind].item = item;
        setReceiptLines(receiptLines);

        let al = amountPaidList;
        al[ind] = myRl.amount_paid;
        setAmountPaidList(al);
        
        let ta = calculateAmount(al);
        isNaN(ta) ? setTotalAmountPaid(0): setTotalAmountPaid(ta)
        // setTotalAmountPaid(ta)        
    };
    

    const removeReceiptLine = (ind) => {
        let rls = receiptLines;
        rls.splice(ind, 1);
        setReceiptLines(rls);

        let al = amountList;
        al.splice(ind, 1);
        setAmountList(al);
        let ta = calculateAmount(al);
        setTotalAmount(ta)  

        let apl = amountPaidList;
        apl.splice(ind, 1);
        setAmountPaidList(apl);
        let tap = calculateAmount(apl);
        isNaN(tap) ? setTotalAmountPaid(0): setTotalAmountPaid(tap)
        // setTotalAmountPaid(tap);
    };
    


    const persons = useSelector(selectAllPersons);
    const personsStatus = useSelector(getPersonsStatus);
    const personsError = useSelector(getPersonsError);
    useEffect(() => {
        if (personsStatus === 'idle') {
            console.log("personsStatus: ", personsStatus)
            dispatch(fetchPersons());         
        }
        else if (personsStatus === 'succeeded') {
            console.log("persons: ", persons)
        }
    }, [personsStatus, dispatch])

    const submitNewReceipt = () => {
        let my_items_list ="empty_list";
        let my_rls = [];
        receiptLines.map((rl, ind) =>{
            if (rl.item) {
                if (ind > 0) {                    
                    my_items_list += ", " + rl.item?.name                    
                } else {
                    my_items_list = rl.item?.name
                }
            }
            my_rls = [...my_rls, rl.rl]
        })

        let pr = paymentReceived
        if (paymentReceived == 'yes') {
            pr =true
        } else if (paymentReceived == 'no') {
            pr = false
        } else {
            pr = null
        }
        let toSubmit = {
            "number": String(receiptNum),
            "person_id": person?.id ? person?.id: person?.student_id,
            "person_role_id": person?.person_role_id ? person?.person_role_id : 1,
            "date": receiptDate,
            "message": customerMessage,
            "person_name": person?.name,
            "items_list": my_items_list,
            "total_amount": totalAmount,
            "total_amount_paid": totalAmountPaid,
            "payment_received": true,
            "payment_method_id": paymentMethodId == 'dflt'? null: paymentMethodId,    
            "deposit_account_id": depositAccountId == 'dflt'? null: depositAccountId,
            "receipt_lines": my_rls,
            "ref_nb": refNb
        }
        // console.log("toSubmit: ", toSubmit)
        // console.log("items_list: ", toSubmit.items_list)
        // console.log("receiptLines: ", receiptLines)
        
        if ( receiptNum && person ) {
            dispatch_and_resetform(toSubmit)
        }
    }
    
    const dispatch_and_resetform = (toSubmit) => {
        if(myReceipt?.id){
            toSubmit['id'] = myReceipt?.id;
            dispatch(
                updateReceipt(toSubmit)
            ).unwrap()
        } else {
            dispatch(
                addNewReceipt(toSubmit)
            ).unwrap()
        }
        
        // setPersonRoleName('')
        // setActiveApplyBtn(false)
        // closeModal()
        // console.log('window.location.href : ', window.location.href.replace(window.location.pathname, "")) 
        redirectRef.current.href = "/dashboard/receipts";
        redirectRef.current.click();
        // navigate('/dashboard/receipts');
    }

    const cancelReceipt = () => {
        navigate('/dashboard/receipts');
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

                        <div className="flex gap-5">
                            <span className="myprimarytextcolor">Receipt No.</span>
                            <span className="text-gray-400">{receiptNum}</span>
                        </div>
                        <div className="flex gap-3 border border-gray-500 rounded-md p-2">
                            <FiPrinter size={20}/>
                            <span className="myprimarytextcolor">Print</span>                            
                        </div>
                        {/* <input value={receiptNum} onChange={()=>setReceiptNum(e.target.value)} type="text" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/> */}
                        
                    </div>

                </div>
                
                <div className="flex justify-between my-5">
                    <div className="flex flex-col gap-5">
                        <h1 className='text-[30px] myprimarytextcolor'>{person?'':'Create'} Receipt</h1>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Name</label>
                                {persons?                                
                                <SelectSearch
                                itemPlaceholder = {'Select a name'}
                                selectedItem = {person}
                                itemsList={persons}
                                itemHasRole={true}
                                handleSelected={handleSelectedPerson}
                                />
                                :
                                <></>
                                }
                                {/* <input value={person} onChange={()=>setPerson(e.target.value)} type="text" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/> */}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className={`myprimarytextcolor select-none ${addressClassLabel? 'opacity-100': 'opacity-0'}`}>{addressClassLabel? addressClassLabel: 'Title'}</label>
                                <div className="flex p-[8px] text-md rounded-lg bg-white min-h-[30px] min-w-[150px]">{studentClass}</div>
                                {/* <input readOnly value={studentClass} onChange={()=>setStudentClass(e.target.value)} type="text" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Amount</label>
                                <div className="flex p-[10px] rounded-lg bg-white min-w-[150px]">{totalAmount}</div>
                                {/* <input type="text" defaultValue={totalAmount} readOnly name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md" placeholder='0000'/> */}
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

                <div className="table_container relative rounded-xl border-solid border-2 border-gray-300 ">
                    <div className="table_subcontainer relative">
                        <table className="w-full rounded-xl">
                        <thead className="bg-white border-b rounded-xl">
                            <tr>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                #
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Item
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Description
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Qty
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Price
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Amount
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                                Advance payment
                            </th>
                            <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    receiptLines.map((rl, ind) => (
                                        // rl.item && rl.rl ? 
                                        <ReceiptLine
                                        key={rl.id}
                                        ind={ind}
                                        currentReceiptLine={rl}
                                        itemsList={myItems}
                                        updateTotalAmount={updateTotalAmount}
                                        updateTotalPaidAmount={updateTotalPaidAmount}
                                        removeReceiptLine={removeReceiptLine}
                                        />
                                        // :
                                        // <></>
                                    ))
                                }
                        
                            
                        </tbody>
                        </table>
                    </div>
                </div>

                <button onClick={()=>addNewLine()} className="outline-none z-50 cursor-pointer flex gap-3 border border-gray-500 rounded-md p-2 mt-2 mb-5">
                    <FiPlus size={20} color={"#41436a"}/>
                    <span className="myprimarytextcolor">Add new line</span>                            
                </button>

                <div className="flex justify-between mt-5 pl-1 pr-1 gap-10">
                    <div className="flex">
                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Customer message</label>
                            <textarea name="" id="" rows="5" value={customerMessage} onChange={(e)=>setCustomerMessage(e.target.value)} className={`border p-2 w-[250px] h-[80px] border-[#41436a] rounded-md`} placeholder="Thank you ...">
                            </textarea>
                            {/* <input type="text" name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md" placeholder='Customer message'/> */}
                        </div>
                        {/* <div className="flex flex-col gap-5 ml-10">
                            <label className='myprimarytextcolor'>Payment received ?</label>
                            <div className="flex ml-1 gap-10">
                                <label  htmlFor={`account_category_${1}`} className="myprimarytextcolor container_checkbo_select_w">
                                    Yes
                                    <input checked={paymentReceived == 'yes'} type="radio" onChange={(e)=>setPaymentReceived('yes')} name="account_type" id={`account_category_${1}`} />
                                    <span className="checkmark_checkbo_select_w bg_white"></span>
                                </label>
                                <label  htmlFor={`account_category_${0}`} className="myprimarytextcolor container_checkbo_select_w">
                                    No
                                    <input checked={paymentReceived == 'no'} type="radio" onChange={(e)=>setPaymentReceived('no')} name="account_type" id={`account_category_${0}`} />
                                    <span className="checkmark_checkbo_select_w bg_white"></span>
                                </label>
                            </div>
                        </div> */}
                        
                        {/* {paymentReceived == 'yes' ?                        
                        <div className="flex flex-col gap-1 ml-10">
                            <label className='myprimarytextcolor'>Deposit To</label>
                            <select value={depositAccountId} onChange={(e)=>(setDepositAccountId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] w-[200px] px-2 rounded-md`} name={""}>
                                <option disabled value="dflt">{`Select ...`}</option>        
                                {
                                    myAccounts?.map((val, ind) => {
                                        return <option key={ind} value={val.id}>{val.name}</option>
                                    })                                
                                }
                            </select>
                        </div>
                         :
                        <></>
                        }  */}

                    </div>

                    <div className="flex flex-col gap-3 w-[200px]">
                        <div className="flex justify-between gap-20 w-[100%]">
                            <span className="myprimarytextcolor">Total amount</span>
                            <span className="myprimarytextcolor">{totalAmount}</span>
                        </div>
                        <div className="flex justify-between gap-20 w-[100%]">
                            <span className="myprimarytextcolor">Total paid</span>
                            <span className="myprimarytextcolor">{totalAmountPaid}</span>
                        </div>
                        <div className="flex justify-between gap-20 w-[100%]">
                            <span className="myprimarytextcolor">Balance</span>
                            <span className="myprimarytextcolor">{totalAmount - totalAmountPaid}</span>
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

export default OneReceipt;
