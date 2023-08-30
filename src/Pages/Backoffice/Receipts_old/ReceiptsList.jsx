import {React, useState, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft, FiPlus } from "react-icons/fi";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { BsReceipt, BsListCheck } from "react-icons/bs";
import { MdChecklistRtl } from "react-icons/md";


import { useSelector, useDispatch }from 'react-redux';
// import { selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts }from '../../../Reducers/receiptsSlice';
import { selectAllReceipts,  getReceiptsStatus, getReceiptsError, fetchReceipts } from '../../../Reducers/receiptsSlice';


const listReceipts = [
    {value:"Receipt",text:"Element"},
    {value:"Receipt",text:"Element"},
    {value:"Receipt",text:"Element"},
    {value:"Receipt",text:"Element"}
];

function ReceiptsList(props) {        
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    
    const receipts = useSelector(selectAllReceipts);
    const receiptsStatus = useSelector(getReceiptsStatus);
    const receiptsError = useSelector(getReceiptsError);
    useEffect(() => {
        if (receiptsStatus === 'idle') {
            dispatch(fetchReceipts())            
        }
    }, [receiptsStatus, dispatch])

    const handleModalOpen = () => {   
        modalOpen ? setModalOpen(false) : setModalOpen(true)   
    }
    const handleEditModalOpen = (id) => {  
        if (editModalOpen) {
            setIdToEdit(null)
            setEditModalOpen(false)
        }
        else {
            
            setIdToEdit(id)
            setEditModalOpen(true)
        }
    }

    const handleDeleteModalOpen = (id) => {  
        if (deleteModalOpen) {
            setIdToDelete(null)
            setDeleteModalOpen(false)
        }
        else {            
            setIdToDelete(id)
            setDeleteModalOpen(true)
        }
    }



    let renderedReceipts;
    if (receiptsStatus === 'loading') {
        renderedReceipts = <span>...</span>;
    } else if (receiptsStatus === 'succeeded') {
        renderedReceipts = receipts.slice(0).reverse().map((receipt, index) => (
            <div key={index} className="flex justify-between bg-white rounded-xl drop-shadow-md p-5">
                <div className="flex max-w-[500px] min-w-[200px] gap-2 flex-col justify-between">
                    <div className="flex items-center gap-2 text-md myprimarytextcolor">
                        <AiOutlineUser size={18}/>
                        {receipt.person_name}
                    </div>
                    <a href={`/dashboard/receipts/${receipt.id}`} className="flex items-center gap-2 text-lg font-bold myprimarytextcolor">
                        <BsReceipt size={18}/>
                        {receipt.number}
                    </a>
                    <div className="flex items-center gap-2 text-sm myprimarytextcolor ">
                        <span className="min-w-[18px]">
                            <MdChecklistRtl size={18}/>
                        </span>
                        <span className="mini_description_w text-sm myprimarytextcolor">
                            {receipt.items_list}
                        </span>
                    </div>
                </div>
                <div className="flex min-w-[150px] gap-2 flex-col justify-between items-end text-right">
                    <span className="flex items-center gap-2 text-sm myprimarytextcolor">
                        <AiOutlineCalendar/> {receipt.date}
                    </span>
                    <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold myprimarytextcolor">#{receipt.total_amount_paid}</span>
                    <small className="text-sm">/{receipt.total_amount}</small>
                    </div>
                    
                </div>
            </div>
    ))
    } else if (receiptsStatus === 'failed') {
        renderedReceipts = {receiptsError};
    }

    


    return (
        <>
        <div className="main_page_container bg-[#F0F0F0] flex flex-col justify-between">
            <div>
                <div className="flex px-10 pt-3 justify-between gap-10">
                    <div className="myprimarytextcolor text-xl font-bold">Receipts</div>
                </div>
                <div className="flex items-center px-10 py-3 justify-between gap-10  border border-b-slate-300">
                    <Link to={""} onClick={() => navigate(-1)} className="flex gap-1 items-center">
                        <FiChevronLeft size={20} color={"#white"}/>
                        <span className="myprimarytextcolor">Back</span>
                    </Link>

                    {/* <div className="select_container flex gap-5 receipts-center">
                        <span className="myprimarytextcolor">Look for</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listReceipts.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div>

                    <div className="select_container flex gap-5 receipts-center">
                        <span className="myprimarytextcolor">In</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""}  defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listReceipts.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>

                    </div>

                    <div className="select_container flex gap-5 receipts-center">
                        <span className="myprimarytextcolor">Currency</span>

                        <select className={`commonSelectInput outline-none h-[40px] px-2  rounded-xl`} name={""} defaultValue={'dflt'}>
                            <option disabled value="dflt">{`Select from the list`}</option>        
                            {
                                listReceipts.map((val, ind) => {
                                    return <option key={ind} value={val.value}>{val.text}</option>
                                })                                
                            }
                        </select>
                    </div> */}

                    <Link to={"/dashboard/new-receipt"} onClick={handleModalOpen} className="outline-none flex gap-1 items-center bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        <FiPlus size={20} color={"#white"}/>
                        New Receipt
                    </Link>
                </div>

                <div className="flex flex-col gap-5 w-full p-10">
                    {/* <div className="flex justify-between bg-white rounded-xl drop-shadow-md p-5">
                        <div className="flex max-w-[500px] min-w-[200px] gap-2 flex-col justify-between">
                            <div className="flex items-center gap-2 text-md myprimarytextcolor">
                                <AiOutlineUser size={18}/>
                                Jack ATLAS
                            </div>
                            <div className="flex items-center gap-2 text-lg font-bold myprimarytextcolor">
                                <BsReceipt size={18}/>
                                4567891
                            </div>
                            <div className="flex items-center gap-2 text-sm myprimarytextcolor ">
                                <span className="min-w-[18px]">
                                    <MdChecklistRtl size={18}/>
                                </span>
                                <span className="mini_description_w text-sm myprimarytextcolor">
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                </span>
                            </div>
                        </div>
                        <div className="flex min-w-[150px] gap-2 flex-col justify-between items-end text-right">
                            <span className="flex items-center gap-2 text-sm myprimarytextcolor">
                                <AiOutlineCalendar/> 2023-02-26
                            </span>
                            <span className="text-xl font-bold myprimarytextcolor">N45000</span>
                            
                        </div>
                    </div> */}

                    

                    {/* <div className="flex justify-between bg-white rounded-xl drop-shadow-md p-5">
                        <div className="flex max-w-[500px] min-w-[200px] gap-2 flex-col justify-between">
                            <div className="flex items-center gap-2 text-md myprimarytextcolor">
                                <AiOutlineUser size={18}/>
                                Jack ATLAS
                            </div>
                            <div className="flex items-center gap-2 text-lg font-bold myprimarytextcolor">
                                <BsReceipt size={18}/>
                                4567891
                            </div>
                            <div className="flex items-center gap-2 text-sm myprimarytextcolor ">
                                <span className="min-w-[18px]">
                                    <MdChecklistRtl size={18}/>
                                </span>
                                <span className="mini_description_w text-sm myprimarytextcolor">
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                Old student registration for class 3,
                                </span>
                            </div>
                        </div>
                        <div className="flex min-w-[150px] gap-2 flex-col justify-between items-end text-right">
                            <span className="flex items-center gap-2 text-sm myprimarytextcolor">
                                <AiOutlineCalendar/> 2023-02-26
                            </span>
                            <span className="text-xl font-bold myprimarytextcolor">N45000</span>                            
                        </div>
                    </div> */}
                    {renderedReceipts}
                </div>
            </div>

            <div className="flex px-5 py-3 gap-10 ">

                {/* <div className="select_container flex gap-5 receipts-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Receipts`}</option>        
                        {
                            listReceipts.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 receipts-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Activites`}</option>        
                        {
                            listReceipts.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 receipts-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Report`}</option>        
                        {
                            listReceipts.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div>
                <div className="select_container flex gap-5 receipts-center">
                    <select className={`commonSelectInput outline-none h-[40px] px-2 min-w-[150px] rounded-xl`} name={""}  defaultValue={'dflt'}>
                        <option disabled value="dflt">{`Export`}</option>        
                        {
                            listReceipts.map((val, ind) => {
                                return <option key={ind} value={val.value}>{val.text}</option>
                            })                                
                        }
                    </select>
                </div> */}

            </div>

        </div>

        </>
    );
}

export default ReceiptsList;