import {React, useState, useRef, useEffect }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronLeft } from "react-icons/fi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useSelector, useDispatch }from 'react-redux';
// import OneCreditorModal from './OneCreditorModal.jsx';
import { selectAllCreditors,  getCreditorsStatus, getCreditorsError, fetchCreditors }from '../../../Reducers/creditorsSlice';

const listItems = [
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"},
    {value:"Item",text:"Element"}
];

function Creditors(props) {
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [idToOpen, setIdToOpen] = useState(null);
    // --------------------------------------------------------
    const myCreditors = useSelector(selectAllCreditors);
    const creditorsStatus = useSelector(getCreditorsStatus);
    const creditorsError = useSelector(getCreditorsError);
    useEffect(() => {
        if (creditorsStatus === 'idle') {
            dispatch(fetchCreditors())            
        }
        else if (creditorsStatus === 'succeeded') {
            console.log("======================")
            console.log("myCreditors:",myCreditors)
            console.log("======================")
        }
    }, [creditorsStatus, dispatch])
    // --------------------------------------------------------
    // --------------------------------------------------------
    const handleModalOpen = (id) => {  
        if (modalOpen) {
            setIdToOpen(null)
            setModalOpen(false)
        }
        else {
            setIdToOpen(id)
            setModalOpen(true)
        }
    }
    // --------------------------------------------------------



    let renderedCreditors;
    if (creditorsStatus === 'loading') {
        renderedCreditors = <tr><td>...</td></tr>;
    } else if (creditorsStatus === 'succeeded') {
        renderedCreditors = Array.isArray(myCreditors) && myCreditors.map((creditor, index) => (
        <tr key={index}>
            <td onClick={()=>handleModalOpen(creditor.id)} className="text-gray-900 underline cursor-pointer font-light px-6 py-4 whitespace-nowrap">
                {creditor.name}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {creditor.role}
            </td>
            <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {creditor.address}
            </td>
            {/* <td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {creditor.total_amount}
            </td> */}
            <td className=" text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                {creditor.balance_due}
            </td>                            
        </tr>
    ))
    } else if (creditorsStatus === 'failed') {
        renderedCreditors = {creditorsError};
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

                    {/* <div className="flex myprimarytextcolor">
                        Date: 2023/02/03
                    </div> */}
                    
                </div>
                
                <div className="flex justify-between mt-5 mb-7">
                    <div className="flex flex-col gap-5">
                        <h1 className='text-[30px] myprimarytextcolor'>Creditors</h1>                                
                    </div>
                    <div className="flex gap-5">
                        {/* <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Class</label>
                                <select className={`commonSelectInput outline-none h-[40px] px-2 rounded-md`} name={""} defaultValue={'dflt'}>
                                    <option disabled value="dflt">{`Select from the list`}</option>        
                                    {
                                        listItems.map((val, ind) => {
                                            return <option value={val.value}>{val.text}</option>
                                        })                                
                                    }
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Date</label>
                                <input type="date" name="dateInput" id="dateInputId" className="outline-none py-2 px-2 rounded-md"/>
                            </div>                                    
                        </div> */}
                        <div className="flex flex-col gap-4">
                            {/* <div className="flex flex-col gap-1">
                                <label className='myprimarytextcolor'>Extract</label>
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
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Name
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Status
                        </th>
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Address
                        </th>
                        {/* <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Original amount
                        </th> */}
                        <th scope="col" className="text-sm font-medium myprimarytextcolor px-6 py-4 text-left">
                            Balance due
                        </th>                            
                        </tr>
                    </thead>
                    <tbody>
                        
                        {renderedCreditors}

                        {/* <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                        </tr>
                        <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ~
                            </td>
                        </tr> */}
                    </tbody>
                    </table>
                </div>

                <div className="flex justify-between mt-5 px-1 items-center">
                    <div className="">
                        <button className="outline-none flex gap-1 bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                            <HiArrowLeft size={20} color={"#41436a"}/>
                            <span>Previous</span>
                        </button>
                    </div>
                    {/* HiArrowRight */}

                    <div className="flex gap-3">
                        <a href="#" className='myprimarytextcolor'>1</a>
                        <a href="#" className='myprimarytextcolor'>2</a>
                        <a href="#" className='myprimarytextcolor'>3</a>
                        <a href="#" className='myprimarytextcolor'>...</a>
                        <a href="#" className='myprimarytextcolor'>8</a>
                        <a href="#" className='myprimarytextcolor'>9</a>
                        <a href="#" className='myprimarytextcolor'>10</a>
                    </div>

                    <div className="">
                        <button className="outline-none flex gap-1 bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                            <span>Next</span>
                            <HiArrowRight size={20} color={"#41436a"}/>                                    
                        </button>
                    </div>

                    {/* <div className="flex gap-20">
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
                        
                    </div> */}
                </div>
                {/* <div className="flex justify-end mt-5 px-1 gap-5">
                    <button className="outline-none bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Save & Close
                    </button>
                    <button className="outline-none  bg-[#41436a] border-1 border-[#41436a] rounded-md text-white text-sm px-3 py-2">
                        Save & New
                    </button>
                    <button className="outline-none  bg-white border-1 border-[#41436a] rounded-md text-[#41436a] text-sm px-3 py-2">
                        Clear
                    </button>
                </div> */}
            </div>

        </div>

        {/* {
            modalOpen ?
            <>
                <OneCreditorModal 
                handleModalOpen={handleModalOpen}
                modalOpen={modalOpen}
                creditorId ={idToOpen}
                />
                
            </>
            :
            <></>
        } */}

        </>
    );
}

export default Creditors;