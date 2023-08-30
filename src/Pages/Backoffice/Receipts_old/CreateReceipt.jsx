import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch }from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FiChevronLeft, FiPrinter, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineCalendar } from "react-icons/ai";

import { fetchStudentRegistrationById, selectStudentRegistrationById2, selectAllStudentRegistrations,  getStudentRegistrationsStatus, getStudentRegistrationsError, fetchStudentRegistrations }from '../../../Reducers/studentRegistrationsSlice';
import { addNewReceipt, fetchReceiptById, selectReceiptById, selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts }from '../../../Reducers/receiptsSlice';
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



function CreateReceipt(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
        
    const randomNum = Math.floor(Math.random() * (9999999 - 1000000 + 1 )) + 1000000;
    const [receiptNum, setReceiptNum] = useState(randomNum);     // Math.floor(Math.random() * (maximum – minimum + 1)) + minimum
    const [receiptDate, setReceiptDate] = useState(new Date().toISOString().substring(0, 10));
    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState();
    const [receiptLines, setReceiptLines] = useState([
        {id:1},
    ]);
    const [amountList, setAmountList] = useState([0]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [amountPaidList, setAmountPaidList] = useState([0]);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    
    
    const addNewLine = () => {
        let rls = receiptLines;
        rls = [...rls, {id: rls.length+1}];
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
        setSelectedPerson(item)
        setStudentClass(item.class)
    };

    const calculateAmount = (al) => {
        let ta = 0;
        al.map(i => {
            ta += Number(i);
        })
        return ta
    };
    
    const updateTotalAmount = (ind, amount) => {
        let al = amountList;
        al[ind] = amount;
        setAmountList(al);
        
        let ta = calculateAmount(al);
        setTotalAmount(ta)        
    };

    const updateTotalPaidAmount = (ind, amount) => {
        let al = amountPaidList;
        al[ind] = amount;
        setAmountPaidList(al);
        
        let ta = calculateAmount(al);
        setTotalAmountPaid(ta)        
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
        setTotalAmountPaid(tap);
    };
    


    const studentRegistrations = useSelector(selectAllStudentRegistrations);
    // const myReg = useSelector((state) => selectStudentRegistrationById2(state, Number(id)));
    const studentRegistrationsStatus = useSelector(getStudentRegistrationsStatus);
    const studentRegistrationsError = useSelector(getStudentRegistrationsError);
    useEffect(() => {
        // if (studentRegistrationsStatus === 'idle' && id) {
        if (studentRegistrationsStatus === 'idle') {
            console.log("studentRegistrationsStatus: ", studentRegistrationsStatus)
            dispatch(fetchStudentRegistrations());
            // dispatch(fetchStudentRegistrationById({ id: Number(id) })).unwrap()          
        }
        else if (studentRegistrationsStatus === 'succeeded') {
            console.log("studentRegistrations: ", studentRegistrations)
            // setItemName(myReg?.item.name)
            // setItemDescription(myReg?.item.description)
            // setItemPrice(myReg?.item.rate? myReg.item.rate : 0)
            // setStudentClass(myReg?.student_class.name)
            // setStudentName(myReg?.student.firstname+' '+myReg?.student.lastname)
        }
    }, [studentRegistrationsStatus, dispatch])

    const submitNewReceipt = () => {
        const toSubmit = {
            "number": receiptNum,
            "person_id": myReg?.student.id,
            "person_role_id": myReg?.student.person_role_id,
            "date": receiptDate,
            "person_name": myReg?.student.firstname+' '+myReg?.student.lastname,
            "items_list": myReg?.item.name,
            "total_amount": itemPrice,
            "total_amount_paid": 0,
            "receipt_lines": [
                {
                    "item_id": myReg.item.id,
                    "qty": 1,
                    "price": itemPrice,
                    "amount": itemPrice,
                    "amount_paid": 0
                },
            ]
        }
        console.log("toSubmit: ", toSubmit)
        if ( receiptNum ) {
            dispatch_and_resetform(toSubmit)
        }
    }
    const dispatch_and_resetform = (toSubmit) => {
        dispatch(
            addNewReceipt(toSubmit)
        )
        // setPersonRoleName('')
        // setActiveApplyBtn(false)
        // closeModal()
        // navigate(0);
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
                        <h1 className='text-[30px] myprimarytextcolor'>{studentName?'Edit':'Create'} Receipt</h1>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Name</label>
                                {studentRegistrations?                                
                                <SelectSearch
                                selectName = {'name'}
                                itemsList={studentRegistrations}
                                handleSelected={handleSelectedPerson}
                                />
                                :
                                <></>
                                }
                                {/* <input value={studentName} onChange={()=>setStudentName(e.target.value)} type="text" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/> */}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor opacity-0 select-none'>Class</label>
                                <div className="flex p-[10px] rounded-lg bg-white min-h-[45px] min-w-[150px]">{studentClass}</div>
                                {/* <input readOnly value={studentClass} onChange={()=>setStudentClass(e.target.value)} type="text" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-5">
                            {/* <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Date</label>
                                <input type="date" defaultValue={receiptDate} name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/>
                            </div> */}
                            {/* <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Class</label>
                                <input value={studentClass} onChange={()=>setStudentClass(e.target.value)} type="text" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/>
                            </div> */}
                            
                        </div>
                        {/* <div className="flex flex-col gap-5"> */}
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Amount</label>
                                <div className="flex p-[10px] rounded-lg bg-white min-w-[150px]">{totalAmount}</div>
                                {/* <input type="text" defaultValue={totalAmount} readOnly name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md" placeholder='0000'/> */}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Payment Method</label>
                                <select className={`commonSelectInput outline-none h-[40px] min-w-[150px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select ...`}</option>        
                                    {
                                        myPaymentMethods.map((val, ind) => {
                                            return <option key={ind} value={val.id}>{val.name}</option>
                                        })                                
                                    }
                                </select>
                            </div>
                            
                            
                        {/* </div> */}

                    </div>
                </div>

                <div className="table_container rounded-xl border-solid border-2 border-gray-300 ">
                    <table className="w-full">
                    <thead className="bg-white border-b">
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
                                    <ReceiptLine
                                    key={rl.id}
                                    ind={ind}
                                    itemsList={myItems}
                                    updateTotalAmount={updateTotalAmount}
                                    updateTotalPaidAmount={updateTotalPaidAmount}
                                    removeReceiptLine={removeReceiptLine}
                                    />                           
                                ))
                            }
                       
                        
                    </tbody>
                    </table>
                </div>

                <button onClick={()=>addNewLine()} className="outline-none cursor-pointer flex gap-3 border border-gray-500 rounded-md p-2 mt-2 mb-5">
                    <FiPlus size={20} color={"#41436a"}/>
                    <span className="myprimarytextcolor">Add new line</span>                            
                </button>

                <div className="flex justify-between mt-5 px-1 gap-10">
                    <div className="flex">
                        <div className="flex flex-col gap-1">
                            <label className='myprimarytextcolor'>Customer message</label>
                            <textarea name="" id="" rows="5" className={`border p-2 w-[250px] h-[80px] border-[#41436a] rounded-md`} placeholder="Thank you ...">
                            </textarea>
                            {/* <input type="text" name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md" placeholder='Customer message'/> */}
                        </div>
                        <div className="flex flex-col gap-5 ml-10">
                            <label className='myprimarytextcolor'>Payment received ?</label>
                            <div className="flex ml-1 gap-10">
                                <label  htmlFor={`account_category_${1}`} className="myprimarytextcolor container_checkbo_select_w">
                                    Yes
                                    <input type="radio" onChange={(e)=>setPaymentReceived(true)} name="account_type" id={`account_category_${1}`} />
                                    <span className="checkmark_checkbo_select_w bg_white"></span>
                                </label>
                                <label  htmlFor={`account_category_${0}`} className="myprimarytextcolor container_checkbo_select_w">
                                    No
                                    <input type="radio" onChange={(e)=>setPaymentReceived(false)} name="account_type" id={`account_category_${0}`} />
                                    <span className="checkmark_checkbo_select_w bg_white"></span>
                                </label>
                            </div>
                        </div>
                        
                        {paymentReceived?                        
                        <div className="flex flex-col gap-1 ml-10">
                            <label className='myprimarytextcolor'>Deposit To</label>
                            <select className={`commonSelectInput outline-none h-[40px] w-[200px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
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
                        }

                    </div>

                    <div className="flex gap-20">
                        <span className="myprimarytextcolor">Total</span>
                        <span className="myprimarytextcolor">{totalAmountPaid}</span>
                    </div>
                </div>
                <div className="flex justify-end mt-5 px-1 gap-5">
                    <button className="outline-none bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Save & Close
                    </button>
                    <button onClick={()=>submitNewReceipt()} className="outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
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

export default CreateReceipt;
