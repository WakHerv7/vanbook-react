import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaChevronDown } from 'react-icons/fa'
import React, { useRef, useState, useEffect } from 'react';
import listenForOutsideClicks from '../InputAndTitle/listen-for-outside-clicks';
// import styles from './style.css';

const initOptionsList = [
    {   
        id: 1,
        value: null,
        icon: <FaInstagram color='#E1306C'/>,    
        label: 'Non-recurring',
        description: '(One-time)',
        type: 'onetime',
        
    },
    {   
        id: 2,
        value: null,
        icon: <FaLinkedin color='#0E76A8'/>,    
        label: 'Academic period',
        type: 'academic',
        
    },
    {   
        id: 3,
        value: null,
        icon: <FaFacebook color='#4267B2'/>,    
        label: 'Day(s)',
        type: 'day',
        
    },
    {   
        id: 4,
        value: null,
        icon: <FaTwitter color='#1DA1F2'/>,    
        label: 'Week(s)',
        type: 'week',
        
    },
    {   
        id: 5,
        value: null,
        icon: <FaFacebook color='#4267B2'/>,    
        label: 'Month(s)',
        type: 'month',
        
    },
    {   
        id: 6,
        value: null,
        icon: <FaTwitter color='#1DA1F2'/>,    
        label: 'Year(s)',
        type: 'year',
        
    },
    {   
        
        id: 7,
        value: null,
        icon: <FaTwitter color='#1DA1F2'/>,    
        label: 'Start date',
        label2: 'End date',
        type: 'date',
        
    },
];

const getFormattedDate = (mydate) => {
    let date = new Date(mydate);
let dd = date.getDate();
let mm = date.getMonth() + 1; // January is 0!
const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
let yyyy = date.getFullYear();
let yy = date.getFullYear().toString().substr(-2);

if (dd < 10) {
 dd = '0' + dd;
} 

if (mm < 10) {
 mm = '0' + mm;
} 

// return (yy + '/' + mm + '/' + dd);
return ( month + ' ' + dd+', '+yy);
}

const getFormattedDate2=(mydate)=>{
    const date = new Date(mydate);    //"2023-12-28"
    // const options = { day: 'numeric', month: 'short', year: '2-digit' };
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return(formattedDate);
}

const CustomDropdownPeriod = (props) => {
    const {
        ref, name, options, value, placeholder, onChange
    } = props;

    const [isActive, setIsActive] = useState(false);
    const [displayedValue, setDisplayedValue] = useState();
    const [numberValue, setNumberValue] = useState();
    const [inputValue, setInputValue] = useState({
        'day':1,
        'week':1,
        'month':1,
        'year':1,
        'start_date':new Date().toISOString().substring(0, 10),
        'end_date':new Date().toISOString().substring(0, 10),
    });    
    const [optionsList, setOptionsList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    // Hide Dropdown on Outside Click
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)
    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsActive), []);
    
    useEffect(() => {
      if (value.type) {
        let dict;
        const mountOption = initOptionsList.filter(opt => opt.type === value.type)[0];
        setSelectedOption(mountOption);
        if(value.type == "date"){
            dict = {...inputValue, ['start_date']:value.start_date, ['end_date']:value.end_date};
            setDisplayedValue(`${getFormattedDate(value.start_date)} - ${getFormattedDate(value.end_date)}`)
        } else if (value.type == "day" || value.type == "week" || value.type == "month" || value.type == "year") {
            dict = {...inputValue, [value.type]:value.number};
            setDisplayedValue(`${value.number} ${mountOption.label}`)
        } else {
            setDisplayedValue(`${mountOption.label}`)
        }
        setInputValue(dict);
      }
    }, [])
    
    const handleInputValue = (e, option, date_type) => {
        let toSubmit = {
            'type': option.type,
            'number': null,
            'start_date': null,
            'end_date': null,
        }
        let value = {};
        if(option.type == "date"){
            toSubmit['start_date'] = inputValue['start_date'];
            toSubmit['end_date'] = inputValue['end_date'];
            value = {...inputValue, [date_type]: e.target.value};
            setDisplayedValue(`${getFormattedDate(inputValue['start_date'])} - ${getFormattedDate(inputValue['end_date'])}`)

            // console.log("Date : ", e.target.value)
        } else if (option.type == "day" || option.type == "week" || option.type == "month" || option.type == "year") {
            toSubmit['number'] = e.target.value;
            setDisplayedValue(`${e.target.value} ${option.label}`)
            value = {...inputValue, [option.type]: e.target.value};
        }
        // else {
        //     setDisplayedValue(`${option.label}`)
        //     // value = {...inputValue, [option.type]: e.target.value};
        // }
        
        // value[option.type] = e.target.value;
        setInputValue(value);
        setNumberValue(e.target.value);

        onChange({
            target: {
                name: name, 
                value: toSubmit,
            }
        })
    };

    const handleSelectButtonClick = () => {
        setIsActive(!isActive);
        // console.log("isActive : ",isActive);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setNumberValue(inputValue[option.type]);
        setDisplayedValue()

        let toSubmit = {
            'type': option.type,
            'number': null,
            'start_date': null,
            'end_date': null,
        }
        
        if (option.type == "day" || option.type == "week" || option.type == "month" || option.type == "year") {
            toSubmit['number'] = inputValue[option.type];
            setDisplayedValue(`${inputValue[option.type]} ${option.label}`)
        }
        else if (option.type == "date") {
            toSubmit['start_date'] = inputValue['start_date'];
            toSubmit['end_date'] = inputValue['end_date'];
            setDisplayedValue(`${getFormattedDate(inputValue['start_date'])} - ${getFormattedDate(inputValue['end_date'])}`)
        }
        else if (option.type === "onetime" || option.type === "academic" ) {
            setDisplayedValue(option.label);
            setIsActive(false);
        }
        // console.log("isActive : ",isActive);
        onChange({
            target: {
                name: name, 
                value: toSubmit,
            }
        })
    };

    return (
        <div ref={menuRef} className='w-full'>
            <div ref={ref} name={name} className={`relative w-full flex flex-col selectMenu ${isActive ? 'active' : ''}`}>
                <div className={`relative w-full h-[2.5rem] flex items-center border outline-none px-2 rounded-lg mt-1 text-[.9rem] border border-vanbook-100 selectBtn `} onClick={handleSelectButtonClick}>
                    <span className="text-[.9rem] w-[90%] resumedOneLineText">
                        {selectedOption ?
                            displayedValue 
                            :
                            placeholder ? 
                                placeholder:
                                'Select ...'
                        }
                    </span>
                    <span className='absolute top-0 right-0 h-full px-[3px] flex items-center justify-center text-gray-500'>
                    <FaChevronDown size={8} className={'selectBtnIcon'}/>
                    </span>
                </div>

                <ul className={'options top-[2.6rem]'}>
                {initOptionsList.map((option, indx) => {
                    const attrs = selectedOption.id !== option.id ? { onClick: ()=>handleOptionClick(option)} : {};
                    return (
                    <li key={indx} className={`pl-2 ${selectedOption.id === option.id ?'bg-[#f2f2f2]': ''}`}>
                        <div 
                        className={`flex  hover:bg-vanbook-gray cursor-pointer 
                            ${indx==0 ? '':'border-o border-vanbook-100 border-solid'}
                            
                            `}
                        >
                        {
                        option.type == "day" || option.type == "week" || option.type == "month" || option.type == "year" ?
                            <div className="flex gap-2 min-w-[200px] items-center w-full pb-1">
                                <div onClick={() => handleOptionClick(option)}>
                                    <div
                                    className={`
                                    w-3 h-3 rounded-[50%] ${selectedOption.id === option.id ? 'opacity-[100%] bg-vanbook-500':'opacity-[50%] bg-vanbook-300'}
                                    `}>
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full items-center ms-2 text-sm"
                                {...attrs}>
                                    {selectedOption.id == option.id ?
                                        <input 
                                        type={'number'}
                                        min={"0"}
                                        name={`${option.type}_${indx}`}
                                        defaultValue={inputValue[option.type]}
                                        onChange={(e)=>handleInputValue(e, option)}
                                        className={`w-[5rem] h-[2rem] border ${'border-vanbook-500'}  outline-none pl-4 rounded-lg mt-1 text-[.9rem]`}
                                        />
                                    :
                                        <div className=''>
                                            <input 
                                            type={'text'}
                                            disabled
                                            className={`w-[5rem] h-[2rem] cursor-pointer border ${'border-vanbook-100'}  outline-none pl-4 rounded-lg mt-1 text-[.9rem]`}
                                            />
                                        </div>
                                    }
                                    <label 
                                    htmlFor={option.id} 
                                    onClick={() => handleOptionClick(option)}
                                    className="font-medium text-vanbook-primary cursor-pointer h-full w-full">
                                        <div className={`text-[.9rem] ${selectedOption.id === option.id ? 'opacity-[100%]':'opacity-[50%]'}`}>{option.label}</div>
                                    {/* <div>{getPlanAmount(option.amount)}</div> */}
                                    </label>
                                </div>
                            </div> 
                        
                        : option.type == "date" ?
                            <div className="flex gap-2 max-w-[220px] items-center w-full pb-1">
                                <div onClick={() => handleOptionClick(option)}>
                                    <div
                                    className={`
                                    w-3 h-3 rounded-[50%] ${selectedOption.id === option.id ? 'opacity-[100%] bg-vanbook-500':'opacity-[50%] bg-vanbook-300'}
                                    `}>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex gap-3 w-full items-center ms-2 text-sm">
                                        <label 
                                        htmlFor={option.id} 
                                        onClick={() => handleOptionClick(option)}
                                        className="font-medium text-vanbook-primary cursor-pointer h-full w-full">
                                            <div className={`text-[.9rem] ${selectedOption.id === option.id ? 'opacity-[100%]':'opacity-[50%]'}`}>{option.label}</div>
                                        {/* <div>{getPlanAmount(option.amount)}</div> */}
                                        </label>
                                        {selectedOption.id == option.id ?
                                            <input 
                                            type={'date'}
                                            min={"0"}
                                            name={`${option.type}_${indx}`}
                                            defaultValue={inputValue['start_date']}
                                            onChange={(e)=>handleInputValue(e, option, 'start_date')}
                                            className={`w-full h-[2rem] border ${'border-vanbook-500'}  outline-none pl-2 min-w-[105px] rounded-lg mt-1 text-[.9rem]`}
                                            />
                                        :
                                            <div className=''>
                                                <input  
                                                type={'text'}
                                                disabled
                                                className={`w-full h-[2rem] cursor-pointer border ${'border-vanbook-100'}  outline-none pl-4 rounded-lg mt-1 text-[.9rem]`}
                                                />
                                            </div>
                                        }
                                        
                                    </div>

                                    {/* ----------------------------------- */}
                                    
                                    <div className="flex gap-3 w-full items-center ms-2 text-sm">
                                        <label 
                                        htmlFor={option.id} 
                                        onClick={() => handleOptionClick(option)}
                                        className="font-medium text-vanbook-primary cursor-pointer h-full w-full">
                                            <div className={`text-[.9rem] ${selectedOption.id === option.id ? 'opacity-[100%]':'opacity-[50%]'}`}>{option.label2}</div>
                                        {/* <div>{getPlanAmount(option.amount)}</div> */}
                                        </label>
                                        {selectedOption.id == option.id ?
                                            <input 
                                            type={'date'}
                                            min={"0"}
                                            name={`${option.type}_${indx}`}
                                            defaultValue={inputValue['end_date']}
                                            onChange={(e)=>handleInputValue(e, option, 'end_date')}
                                            className={`w-full h-[2rem] border ${'border-vanbook-500'}  outline-none pl-2 min-w-[105px] rounded-lg mt-1 text-[.9rem]`}
                                            />
                                        :
                                            <div className=''>
                                                <input 
                                                type={'text'}
                                                disabled
                                                className={`w-full h-[2rem] cursor-pointer border ${'border-vanbook-100'}  outline-none pl-4 rounded-lg mt-1 text-[.9rem]`}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        :
                            <div className="flex gap-2 min-w-[230px] items-center w-full py-2"
                            onClick={() => handleOptionClick(option)}>
                                <div>
                                    <div
                                    className={`
                                    w-3 h-3 rounded-[50%] ${selectedOption.id === option.id ? 'opacity-[100%] bg-vanbook-500':'opacity-[50%] bg-vanbook-300'}
                                    `}>
                                    </div>
                                </div>
                                <div className="ms-2 text-sm">
                                    <label htmlFor={option.id} className="font-medium  text-vanbook-primary cursor-pointer">
                                        <div className={`text-[.9rem] ${selectedOption.id === option.id ? 'opacity-[100%]':'opacity-[50%]'}`}>{option.label} {option.description}</div>
                                    {/* <div>{getPlanAmount(option.amount)}</div> */}
                                    </label>
                                </div>
                            </div> 
                        }
                                       
                        </div> 
                    </li>
                    
                    )})}
                    {/* {optionsList.map((option, index) => (
                    <li className={'option h-[20px] px-[3px] gap-[15px]'} key={index} onClick={() => handleOptionClick(option)}>
                        {option?.icon && option?.icon}
                        <span className={'optionText text-[.9rem]'}>{option?.label}</span>
                        {option.description ? <i className='italic text-[12px]'>{`     (${option.description}) `}</i>:<></>}
                    </li>
                    ))} */}
                </ul>
            </div>
        </div>
        
    )
}

export default CustomDropdownPeriod