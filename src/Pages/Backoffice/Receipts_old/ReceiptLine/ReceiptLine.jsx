import React, {useState, useEffect, useRef} from 'react';
import { FiCopy } from "react-icons/fi";
import {IoRemoveCircleOutline} from "react-icons/io5";
import SelectSearchModal from "../../../../Components/InputAndTitle/SelectSearchModal/SelectSearchModal";
// import SelectSearch from 'react-select-search';

/**
     * The options array should contain objects.
     * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
     */
const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'},
    {
        type: 'group',
        name: 'Group name',
        items: [
            {name: 'Spanish', value: 'es'},
        ]
    },
];

function ReceiptLine({ind, currentReceiptLine, itemsList, updateTotalAmount, updateTotalPaidAmount, removeReceiptLine}) {
    const paymentRef = useRef();
    const [selectOptions, setSelectOptions] = useState();
    const [selectedItem, setSelectedItem] = useState(currentReceiptLine?.item);
    const [qty, setQty] = useState(currentReceiptLine?.rl?.qty);
    const [amount, setAmount] = useState(0);
    const [advancePayment, setAdvancePayment] = useState(currentReceiptLine?.rl?.amount_paid);
    const [advancePaymentColor, setAdvancePaymentColor] = useState('text-gray-900');
    const [init, setInit] = useState(true);
    
    useEffect(() => {
        if (Number(amount) > Number(advancePayment)) {
            setAdvancePaymentColor('text-gray-900')
        } 
        else if (Number(amount)  == Number(advancePayment)) {
            setAdvancePaymentColor('text-green-600')
        }
        else if (Number(amount) < Number(advancePayment)) {
            setAdvancePaymentColor('text-red-600')
        }
        console.log("========================");
        console.log("advancePaymentColor: ",advancePaymentColor);
        console.log("========================");
    }, [amount, advancePayment])

    useEffect(() => {
        if (currentReceiptLine?.item && currentReceiptLine?.rl) {
            console.log("========================");
            console.log("ind: ",ind);
            console.log("selectedItem: ",selectedItem);
            console.log("currentReceiptLine: ",currentReceiptLine);
            console.log("Quantity: ",currentReceiptLine?.rl?.qty);
            console.log("Price: ", currentReceiptLine?.rl?.price);
            console.log("Amount: ",currentReceiptLine?.rl?.qty*currentReceiptLine?.rl?.price);
            console.log("AdvancePayment: ",currentReceiptLine?.rl?.amount_paid);
            console.log("========================");
            setSelectedItem(currentReceiptLine?.item)
            setQty(currentReceiptLine?.rl?.qty)
            setAmount(currentReceiptLine?.rl?.qty*currentReceiptLine?.rl?.price)
            setAdvancePayment(currentReceiptLine?.rl?.amount_paid)
        }        
    }, [currentReceiptLine])

    useEffect(() => {
        if (itemsList) {
            let mylist = itemsList;
            let mylist2 = mylist.map((item, ind) => {
                // item['value'] = item.id
                Object.assign({}, item, {value:item.id})
            });
            setSelectOptions(mylist2)
        }        
    }, [itemsList])

    useEffect(() => {
        console.log(ind+" : XXX0 Quantity changed"); 
        if (selectedItem) {

            console.log(ind+" : XXX1+");
            if (currentReceiptLine?.item && currentReceiptLine?.rl !== null && currentReceiptLine?.rl !== undefined) {
                console.log(ind+" : XXX2+", qty);
                // console.log(ind+" : XXX2+", currentReceiptLine.rl.qty);
                // console.log(ind+" : XXX2+");                
                if (!qty || qty == 0) {
                    console.log(ind+" : XXX3+");
                    if (init) { 
                        console.log(ind+" : XXX3+ init");                     
                        setInit(false);
                        setQty(currentReceiptLine.rl.qty );
                        setAmount(currentReceiptLine.rl.price*currentReceiptLine.rl.qty);
                    } else {
                        console.log(ind+" : XXX3+ NO-init"); 
                        setInit(false);
                        setAmount(currentReceiptLine.rl.price*qty);
                    }
                    // console.log(ind+" : XXX3+");
                    // setQty(currentReceiptLine.rl.qty );
                    // setAmount(currentReceiptLine.rl.price*currentReceiptLine.rl.qty);
                }
                else {
                    console.log(ind+" : XXX3-");
                    setInit(false);
                    setAmount(currentReceiptLine.rl.price*qty);
                }

            } else {
                console.log(ind+" : XXX2-");                
                if (!qty || qty == 0) {
                    console.log(ind+" : XXX4+");
                    if (init) {
                        setInit(false);
                        setQty(1);
                        setAmount(selectedItem.rate*1);
                    } else {
                        setInit(false);
                        setQty(0);
                        setAmount(selectedItem.rate*0);
                    }
                    
                }
                else {
                    setInit(false);
                    console.log(ind+" : XXX4-");
                    setAmount(selectedItem.rate*qty);
                }
            }

                        
        } 
        else {
            setQty(0); 
            setAmount(0);   
        }
    }, [selectedItem, qty, init])
    
    useEffect(() => {
        let my_rl = {
            "item_id": selectedItem?.id,
            "qty": qty,
            "price": selectedItem?.rate,
            "amount": amount,
            "amount_paid": advancePayment
        }
        // let item_name = selectedItem?.name;
            updateTotalAmount(ind, my_rl, selectedItem);        
    }, [amount,selectedItem, qty])

    useEffect(() => {
        let my_rl = {
            "item_id": selectedItem?.id,
            "qty": qty,
            "price": selectedItem?.rate,
            "amount": amount,
            "amount_paid": advancePayment
        }
        // let item_name = selectedItem?.name;
        updateTotalPaidAmount(ind, my_rl, selectedItem);        
    }, [advancePayment])

    function handleAdvancePayment(amount) {
        paymentRef.current.value = amount;
        setAdvancePayment(amount)
    }

    return (
        <tr className="bg-gray-100 border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ind+1}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <SelectSearchModal 
                itemsList={itemsList}
                handleSelected={setSelectedItem}
                index={ind}
                itemPlaceholder = {'Select an item'}
                selectedItem = {selectedItem}
                />
                {/* <SelectSearch 
                options={options} 
                value="" 
                name="itemSelect" 
                placeholder="Choose your item" /> */}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {selectedItem?.description}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <input onChange={(e)=>setQty(e.target.value? Number(e.target.value):0)} 
                defaultValue={qty} 
                type="number" className="w-[80px] outline-none py-2 px-2 rounded-md" placeholder="..." />
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {selectedItem?.rate ? selectedItem?.rate:0}
            </td>
            <td className={`relative text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap`}>                
                {amount}                
                <span onClick={()=>handleAdvancePayment(Number(amount))} className="absolute right-0 top-5 opacity-50 hover:opacity-100 hover:cursor-pointer">
                    <FiCopy size={14} color={"#41436a"}/>
                </span>
            </td>
            <td className={`text-sm ${advancePaymentColor} font-medium px-6 py-4 whitespace-nowrap`}>
                <input ref={paymentRef} defaultValue={advancePayment} onChange={(e)=>setAdvancePayment(e.target.value? Number(e.target.value):0)} type="number" className=" outline-none py-2 px-2 rounded-md" placeholder="0" />
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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