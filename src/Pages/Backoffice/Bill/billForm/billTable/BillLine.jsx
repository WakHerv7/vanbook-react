import React, { useState, useEffect, useRef } from 'react';
import { IoRemoveCircleOutline } from "react-icons/io5";
import SelectSearchModal from "../../../../../Components/InputAndTitle/SelectSearchModal/SelectSearchModal";

function BillLine({ind, currentLine, removeBillLine, 
    myItems, myPersons, updateTableData}) {
    
    const isFirstLoad = useRef(true);
    /** Data to submit ============================ */
    const [selectedItem, setSelectedItem] = useState(currentLine?.billLine ? currentLine?.billLine?.item : null);
    const [itemId, setItemId] = useState('dflt');
    const [itemDescription, setItemDescription] = useState('');    
    const [qty, setQty] = useState(0);
    const [rate, setRate] = useState(0);
    const [cost, setCost] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [amount, setAmount] = useState(0);
    /** ============================================ */
    const { 
        item, 
        itemId: curItemId, 
        itemDescription: curItemDescription, 
        qty: curQty, 
        rate: curRate, 
        discount: curDiscount, 
        amount: curAmount
    } = currentLine?.billLine || {};

    useEffect(() => {
        console.log(currentLine?.billLine);
        setSelectedItem(item || null);
        setItemId(curItemId ?? 'dflt');
        setItemDescription(curItemDescription ?? '');
        setQty(Number(curQty) || 0);
        setRate(Number(curRate) || 0);
        setDiscount(Number(curDiscount) || 0);
        setAmount(Number(curAmount) || 0);
        isFirstLoad.current = item ? true : false;
    }, [currentLine]);

    useEffect(() => {
        updateTableData({ ind, item: selectedItem, itemDescription, qty, rate, discount, amount });
        if (!isNaN(qty) && !isNaN(rate)) {
            setCost(rate * qty);
            if (!isNaN(discount)) {
                setAmount((rate * qty)-(rate * qty * discount));
            } else {
                setAmount(rate * qty);
            }
        }
    }, [selectedItem, itemDescription, qty, rate, discount, amount]);
    //---------------------------------------------------------
    const handleSelectedItem = (item) => {
        setSelectedItem(item);        
        setItemDescription(item?.description);
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        } else {
            setRate(item?.rate);
        }
    }
    //---------------------------------------------------------

    return (
        <tr className="bg-gray-100 border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {ind+1}
            </td>            
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {/* <select value={itemId} onChange={(e)=>(setItemId(Number(e.target.value)))} className={`commonSelectInput outline-none h-[40px] min-w-[150px] px-2 rounded-md`} name={""} >
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
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <input value={itemDescription} onChange={(e)=>setItemDescription(e.target.value)} type="text" name="itemDescription" id="billDescriptionId" className="outline-none py-2 px-2 rounded-md"/>
            </td>
            <td className={`text-sm  font-medium px-6 py-4 whitespace-nowrap`}>
                <input value={qty != 0 ? qty : ''} onChange={(e)=>setQty(e.target.value)} type="number" name="amount" id="billAmountId" className="outline-none py-2 px-2 rounded-md w-[150px]"/>
            </td>
            <td className={`text-sm  font-medium px-6 py-4 whitespace-nowrap`}>
                <input value={rate ?? 0} onChange={(e)=>setRate(e.target.value)} type="number" name="amount" id="billAmountId" className="outline-none py-2 px-2 rounded-md w-[150px]"/>
            </td>
            <td className={`text-sm  font-medium px-6 py-4 whitespace-nowrap`}>
                <input value={cost ?? 0} onChange={(e)=>setCost(e.target.value)} type="number" name="amount" id="billAmountId" className="outline-none py-2 px-2 rounded-md w-[150px]"/>
            </td>
            <td className={`text-sm  font-medium px-6 py-4 whitespace-nowrap`}>
                <input value={discount ?? 0} onChange={(e)=>setDiscount(e.target.value)} type="number" name="amount" id="billAmountId" className="outline-none py-2 px-2 rounded-md w-[150px]"/>
            </td>
            <td className={`text-sm  font-medium px-6 py-4 whitespace-nowrap`}>
                <input value={amount ?? 0} onChange={(e)=>setAmount(e.target.value)} type="number" name="amount" id="billAmountId" className="outline-none py-2 px-2 rounded-md w-[150px]"/>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {ind > 0 ? 
            <span className='cursor-pointer' onClick={()=>removeBillLine(ind)}>
                <IoRemoveCircleOutline size={24} color={"#41436a"}/>
            </span>
            :
            ''}
            </td>
        </tr> 
    );
}

export default BillLine;