import React, {useRef, useState, useEffect} from 'react';
import {FiChevronDown } from "react-icons/fi";
import listenForOutsideClick from '../listen-for-outside-clicks'
import './SelectSearch_style.css';

const list=[
    {'name': 'Cat', 'filter':true},
    {'name': 'Dog', 'filter':true},
    {'name': 'Cow', 'filter':true},
    {'name': 'Mouse', 'filter':true},
    {'name': 'Birds', 'filter':true},
    {'name': 'Buffalo', 'filter':true},
];

function SelectSearchModal({itemPlaceholder, selectedItem, itemsList, handleSelected, index=null, itemHasRole=false}) {
    const selected = useRef();
    const selectedName = useRef();    
    const searchBox = useRef();
    const optionsContainer = useRef();
    const [active, setActive] = useState(false);
    const [listItems, setListItems] = useState(itemsList);

    // Hide Dropdown on Outside Click
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)
    useEffect(listenForOutsideClick(listening, setListening, menuRef, setActive), [])

    useEffect(() => {
        if (active) {
            searchBox.current.value = "";
            filterList("");
            searchBox.current.focus();
        }
    }, [active]);

    useEffect(() => {
        if (selectedItem) {
            selected.current.innerHTML = selectedItem?.name;
            // setActive(!active)
            handleSelected(selectedItem)
        }
    }, [selectedItem]);

    

    const updateSelected = (item) => {
        selected.current.innerHTML = item.name;
        setActive(!active)
        handleSelected(item)
    };

    const filterList = (searchTerm) => {        
        searchTerm = searchTerm.toLowerCase();
        let newList = itemsList?.filter((a,idx) => a.name.toLowerCase().indexOf(searchTerm) != -1)
        setListItems(newList);
    };

    return (
        <>
            <div ref={menuRef} className="select-box">
                <div  className={`select_search_modal_container_w ${active ? 'active':''}`}>
                    <div onClick={()=>setActive(!active)} className="select_search_modal_screen_w"></div>
                    <div className={`select_search_modal_dropdown_container_w ${active ? 'active':''}`}>
                        <div  ref={optionsContainer} className={`options-container-modal ${active ? 'active':''}`}>
                            
                            {
                                listItems.map((val, ind) => (
                                    <div key={ind} onClick={(e)=>updateSelected(val)} className={`option`} id="option1">
                                        <input type="radio" className="radio"  />
                                        <label className={`text-sm`} htmlFor="film">{val.name}</label>
                                    </div>                         
                                ))
                            }    
                        </div>

                        <div ref={searchBox}  className="search-box">
                            <input onChange={(e)=>filterList(e.target.value)} className="text-sm" type="text" placeholder="Search.." />
                        </div>
                    </div>
                </div>
                
                
                <div ref={selected} onClick={()=>setActive(!active)} className="text-sm selected relative" >
                    <span className='bg-white z-50' ref={selectedName}>{itemPlaceholder}</span>
                    {/* <span className='select_chevron'>
                        <FiChevronDown size={16} color={"#41436a"}/>
                    </span> */}
                </div>                
                
                

            </div>
        </>
    );
}

export default SelectSearchModal;