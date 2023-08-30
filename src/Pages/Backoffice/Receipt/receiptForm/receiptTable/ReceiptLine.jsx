import React, { useState, useEffect, useRef } from 'react';
import { IoRemoveCircleOutline } from "react-icons/io5";
import { FiCopy } from "react-icons/fi";
import SelectSearchModal from "../../../../../Components/InputAndTitle/SelectSearchModal/SelectSearchModal";
import "../style.css";

function ReceiptLine({ind, currentLine, removeReceiptLine, 
    myItems, myPersons, updateTableData}) {
    
    const isFirstLoad = useRef(true);
    const paymentRef = useRef();
    /** Data to submit ============================ */
    const [selectedItem, setSelectedItem] = useState(currentLine?.receiptLine ? currentLine?.receiptLine?.item : null);
    const [itemId, setItemId] = useState('dflt');
    const [itemDescription, setItemDescription] = useState(currentLine?.receiptLine ? currentLine?.receiptLine?.itemDescription : '');    
    const [qty, setQty] = useState(0);
    const [rate, setRate] = useState(0);
    const [amount, setAmount] = useState(0);
    const [amountPaid, setAmountPaid] = useState(0);
    /** ============================================ */
    const { 
        item, 
        itemId: curItemId, 
        itemDescription: curItemDescription, 
        qty: curQty, 
        rate: curRate, 
        amount: curAmount, 
        amountPaid: curAmountPaid,
    } = currentLine?.receiptLine || {};

    useEffect(() => {
        // console.log(currentLine?.receiptLine);
        setSelectedItem(item || null);
        setItemId(curItemId ?? 'dflt');
        setItemDescription(curItemDescription ?? '');
        setQty(Number(curQty) || 0);
        setRate(Number(curRate) || 0);
        setAmount(Math.round(Number(curAmount)) || 0);
        setAmountPaid(Math.round(Number(curAmountPaid)) || 0);
        isFirstLoad.current = item && curItemDescription ? true : false;
        console.log("isFirstLoad.current: ", isFirstLoad.current);
        console.log("amountPaid: ",amountPaid);
        console.log("curAmountPaid: ",curAmountPaid);
    }, [currentLine]);

    useEffect(() => {
        updateTableData({ ind, selectedItem, itemDescription, qty, rate, amount, amountPaid });        
        if (!isNaN(qty) && !isNaN(rate)) {
            setAmount(Math.round(rate * qty));
        }
    }, [selectedItem, itemDescription, qty, rate, amount, amountPaid]);
    //---------------------------------------------------------
    const handleSelectedItem = (item) => {
        console.log('item : ');
        console.log(item);
        setSelectedItem(item);
        setItemId(item.id);
        
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        } else {
            setRate(item?.rate);
            setItemDescription(item?.description);
        }
    }
    //---------------------------------------------------------
    function handleAdvancePayment(amount) {
        paymentRef.current.value = amount;
        setAmountPaid(Math.round(amount));
    }
    //---------------------------------------------------------
    const textareaRef = useRef();
    const handleItemDescriptionChange = (e) => {
        setItemDescription(e.target.value)
        // textareaRef.current.style.height = 'auto';
        // const maxRows = 3;
        // const rows = Math.min(textareaRef.current.scrollHeight / 20, maxRows);
        // textareaRef.current.style.height = rows * 20 + 'px';
    };
    useEffect(() => {
        textareaRef.current.style.height = 'auto';
        const maxRows = 3;
        const rows = Math.min(textareaRef.current.scrollHeight / 20, maxRows);
        textareaRef.current.style.height = rows * 20 + 'px';
    }, [itemDescription]);
    //---------------------------------------------------------

    return (
        <tr className="bg-gray-100 border-b">
            <td className="py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                {ind+1}
            </td>            
            <td className=" item-column-wh text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                {/* <select value={itemId} onChange={(e)=>(setItemId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-minW-[150px] px-2 rounded-md`} name={""} >
                    <option disabled value="dflt">{`Select ...`}</option>        
                    {
                        myItems.map((val, ind) => {
                            return <option key={ind} value={Number(val.id)}>{val.name}</option>
                        })                                
                    }
                </select> */}
                <SelectSearchModal 
                itemsList={myItems}
                handleSelected={handleSelectedItem}
                index={ind}
                itemPlaceholder = {'Select an item'}
                selectedItem = {selectedItem}
                />
            </td>
            <td className="description-column-wh text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                {/* <input value={itemDescription} onChange={(e)=>setItemDescription(e.target.value)} type="text" name="itemDescription" id="receiptDescriptionId" className="outline-none py-2 px-2 rounded-md"/> */}
                <textarea ref={textareaRef} value={itemDescription} onChange={(e)=>setItemDescription(e.target.value)} rows="1" className="resize-none py-2 px-2 rounded-md"></textarea>
            </td>
            <td className={`qty-column-wh text-sm  font-medium px-2 py-4 whitespace-nowrap`}>
                <input value={qty != 0 ? qty : ''} onChange={(e)=>setQty(e.target.value)} type="number" name="amount" id="receiptAmountId" className="outline-none py-2 px-2 rounded-md"/>
            </td>
            <td className={`rate-column-wh text-sm  font-medium px-2 py-4 whitespace-nowrap`}>
                <input value={rate ?? 0} onChange={(e)=>setRate(e.target.value)} type="number" name="amount" id="receiptAmountId" className="outline-none py-2 px-2 rounded-md minW-[100px]"/>
            </td>
            <td className={`amount-column-wh relative text-sm  font-medium px-2 pr-7 py-4 whitespace-nowrap`}>
                <input value={amount ?? 0} onChange={(e)=>setAmount(Math.round(e.target.value))} type="number" name="amount" id="receiptAmountId" className="outline-none py-2 px-2 rounded-md minW-[100px]"/>

                <span onClick={()=>handleAdvancePayment(Number(amount))} className="absolute right-0 top-2 opacity-50 hover:opacity-100 hover:cursor-pointer">
                    <FiCopy size={14} color={"#41436a"}/>
                </span>
            </td>
            <td className={`amount-paid-column-wh text-sm  font-medium px-2 py-4 whitespace-nowrap`}>
                <input ref={paymentRef} value={amountPaid ?? 0} onChange={(e)=>setAmountPaid(Math.round(Math.min(amount,e.target.value)))} type="number" name="amountPaid" id="receiptAmountPaidId" className="outline-none py-2 px-2 rounded-md minW-[100px]"/>
            </td>
            <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
            {ind > 0 ? 
            <span className='cursor-pointer' onClick={()=>removeReceiptLine(ind)}>
                <IoRemoveCircleOutline size={24} color={"#41436a"}/>
            </span>
            :
            ''}
            </td>
        </tr> 
    );
}

export default ReceiptLine;