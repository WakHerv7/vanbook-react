import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaChevronDown } from 'react-icons/fa'
import React, { useRef, useState, useEffect } from 'react';
import listenForOutsideClicks from '../InputAndTitle/listen-for-outside-clicks';
import styles from './style.css';

const intiOptionsList = [
    {   
        icon: <FaInstagram color='#E1306C'/>,    
        label: 'Instagram',
        value: 1,
    },
    {   
        icon: <FaLinkedin color='#0E76A8'/>,    
        label: 'Linkedin',
        value: 2,
    },
    {   
        icon: <FaFacebook color='#4267B2'/>,    
        label: 'Facebook',
        value: 3,
    },
    {   
        icon: <FaTwitter color='#1DA1F2'/>,    
        label: 'Twitter',
        value: 4,
    },
];

const CustomDropdownSelect = (props) => {
    const {
        ref, name, options, value, placeholder, onChange
    } = props;

    const [isActive, setIsActive] = useState(false);
    const [optionsList, setOptionsList] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});
    // Hide Dropdown on Outside Click
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)
    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsActive), []);
    
    useEffect(() => {
        // console.log(`${name} value : `, value);
      if (value !== null && value !== undefined && value !== '') {
        const mountOption = options.filter(opt => opt.value === value)[0];
        setSelectedOption(mountOption);
      }
      if (options) {
        setOptionsList(options);
      }
    }, [])
    

    const handleSelectButtonClick = () => {
        setIsActive(!isActive);
        // console.log("isActive : ",isActive);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsActive(false);
        // console.log("isActive : ",isActive);
        onChange({
            target: {
                name: name, 
                value: option.value,
            }
        })
    };

    return (
        <div ref={menuRef} className='w-full'>
            <div ref={ref} name={name} className={`relative w-full flex flex-col selectMenu ${isActive ? 'active' : ''}`}>
                <div className={`relative w-full h-[2.5rem] flex items-center border outline-none pl-2 rounded-lg mt-1 text-[.9rem] border border-vanbook-100 selectBtn `} onClick={handleSelectButtonClick}>
                    <span className="text-[.9rem] w-[90%] resumedOneLineText">{selectedOption.label ?
                        selectedOption.label :
                        placeholder ? 
                            placeholder:
                            'Select ...'
                    }</span>
                    <span className='absolute top-0 right-0 h-full px-[3px] flex items-center justify-center text-gray-500'>
                    <FaChevronDown size={8} className={'selectBtnIcon'}/>
                    </span>
                </div>

                <ul className={'options top-[2.6rem]'}>
                    {optionsList.map((option, index) => (
                    <li className={`option h-[20px] px-[3px] gap-[15px] ${selectedOption.value == option.value ? 'bg-[#f2f2f2] text-vanbook-primary':''}`} key={index} onClick={() => handleOptionClick(option)}>
                        {option?.icon && option?.icon}
                        <span className={'optionText text-[.9rem]'}>{option?.label}</span>
                        {option.description ? <i className='italic text-[12px]'>{`     (${option.description}) `}</i>:<></>}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default CustomDropdownSelect