import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch }from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FiChevronLeft, FiPrinter } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineCalendar } from "react-icons/ai";
// import { fetchStudentRegistrationById, selectStudentRegistrationById2, selectAllStudentRegistrations,  getStudentRegistrationsStatus, getStudentRegistrationsError, fetchStudentRegistrations }from '../../../Reducers/studentRegistrationsSlice';
import { addNewReceipt, fetchReceiptById, selectReceiptById, selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts }from '../../../Reducers/receiptsSlice';


const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];
const payMethods = [
    {value: 'bank', text:'Bank'},
    {value: 'cash', text:'Cash'},
];


function ReceiptForm(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // const randomNum = Math.floor(Math.random() * (9999999 - 1000000 + 1 )) + 1000000;
    const [receiptNum, setReceiptNum] = useState(0);     // Math.floor(Math.random() * (maximum – minimum + 1)) + minimum
    const [receiptDate, setReceiptDate] = useState(new Date().toISOString().substring(0, 10));
    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [itemName, setItemName] = useState();
    const [receiptLines, setReceiptLines] = useState();
    const [itemDescription, setItemDescription] = useState();
    const [itemPrice, setItemPrice] = useState();
    const [paymentReceived, setPaymentReceived] = useState(false);

    // const studentRegistrations = useSelector(selectAllStudentRegistrations);
    const myReceipt = useSelector((state) => selectReceiptById(state, Number(id)));
    const receiptsStatus = useSelector(getReceiptsStatus);
    const receiptsError = useSelector(getReceiptsError);
    useEffect(() => {
        if (receiptsStatus === 'idle' && id) {
            dispatch(fetchReceiptById({ id: Number(id) })).unwrap()          
        }
        else if (receiptsStatus === 'succeeded') {
            console.log("myReceipt: ", myReceipt)
            // setItemName(myReceipt.item.name)
            // setItemDescription(myReceipt.item.description)
            setReceiptNum(myReceipt?.number)
            setStudentClass(myReceipt?.student_class.name)
            setStudentName(myReceipt?.student.firstname+' '+myReceipt.student.lastname)
            setReceiptLines(myReceipt?.receipt_lines)
        }
    }, [receiptsStatus, dispatch])

    const submitNewReceipt = () => {
        const toSubmit = {
            "number": receiptNum,
            // "person_id": myReceipt.student.id,
            // "person_role_id": myReceipt.student.person_role_id,
            // "date": receiptDate,
            // "person_name": myReceipt.student.firstname+' '+myReceipt.student.lastname,
            // "items_list": myReceipt.item.name,
            // "total_amount": itemPrice,
            // "total_amount_paid": 0,
            // "receipt_lines": [
            //     {
            //         "item_id": myReceipt.item.id,
            //         "qty": 1,
            //         "price": itemPrice,
            //         "amount": itemPrice,
            //         "amount_paid": 0
            //     },
            // ]
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


    let renderedReceiptLines;
    if (receiptsStatus === 'loading') {
        renderedReceiptLines = <tr><td>...</td></tr>;
    } else if (receiptsStatus === 'succeeded') {
        renderedReceiptLines = receiptLines?.map((receiptLine, index) => (
            <tr key={index} className="bg-gray-100 border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receiptLine?.item?.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receiptLine?.item?.description}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receiptLine?.qty}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receiptLine?.price}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receiptLine?.amount}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {receiptLine?.amount_paid}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <RiDeleteBinLine size={18} color={"#41436a"}/>
                </td>
            </tr>
    ))
    } else if (receiptsStatus === 'failed') {
        renderedReceiptLines = <tr><td>{receiptLinesError}</td></tr>;
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

                    {/* <div className="select_container flex gap-5 items-center">
                        <span className="myprimarytextcolor">Template</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-md`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div> */}

                    {/* <div className="select_container flex gap-5 items-center">
                        <span className="myprimarytextcolor">Branch</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-md`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listItems.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div> */}
                </div>
                
                <div className="flex justify-between my-5">
                    <div className="flex flex-col gap-5">
                        <h1 className='text-[30px] myprimarytextcolor'>{studentName?'Edit':'Create'} Receipt</h1>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Name</label>
                                <input value={studentName} onChange={()=>setStudentName(e.target.value)} type="text" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Class</label>
                                <input readOnly value={studentClass} onChange={()=>setStudentClass(e.target.value)} type="text" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/>
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
                                <input type="text" readOnly name="dateInput" id="receiptNumInputId" className="outline-none py-2 px-2 rounded-md" placeholder='0000'/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Payment Methods</label>
                                <select className={`commonSelectInput outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select from the list`}</option>        
                                    {
                                        payMethods.map((val, ind) => {
                                            return <option key={ind} value={val.value}>{val.text}</option>
                                        })                                
                                    }
                                </select>
                            </div>
                            
                            
                        {/* </div> */}
                    </div>
                </div>

                <div className="table_container rounded-xl border-solid border-2 border-gray-300 overflow-hidden">
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
                        {renderedReceiptLines}
                        
                        {/* <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                School registration
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                School registration of EBUKA JOHNSON
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Form 1
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                35000
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                35000
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                0
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <RiDeleteBinLine size={18} color={"#41436a"}/>
                            </td>
                        </tr>
                        <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                School registration
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                School registration of EBUKA JOHNSON
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                Form 1
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                35000
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                35000
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                0
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <RiDeleteBinLine size={18} color={"#41436a"}/>
                            </td>
                        </tr> */}
                    </tbody>
                    </table>
                </div>

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
                                    payMethods.map((val, ind) => {
                                        return <option key={ind} value={val.value}>{val.text}</option>
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
                        <span className="myprimarytextcolor">0.00</span>
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

export default ReceiptForm;
