import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaChevronDown } from 'react-icons/fa'
import React, { useRef, useState, useEffect } from 'react';
import listenForOutsideClicks from '../InputAndTitle/listen-for-outside-clicks';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import CustomButton from '../CustomButton/CustomButton';
import { FiPlus } from 'react-icons/fi';
import { generateCode } from '../../Pages/Onboarding/SchoolSettings/SchoolFee';

const initOptions = [
    { 
        id: 1, 
        label: 'Grade 1',
        value: false,
        type: 'single',
    },
    { 
        id: 2, 
        label: 'Grade 2',
        value: false,
        type: 'single',
    },
    { 
        id: 3, 
        label: 'Grade 3',
        value: false,
        type: 'single',
    },
    { 
        id: 4, 
        label: 'Grade 4',
        value: false,
        type: 'single',
    },
];


const CustomDropdown = (props) => {
    const {
        ref, name, options, button, content, value, placeholder, 
        onChange, className, params
    } = props;

    const [isActive, setIsActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [optionsList, setOptionsList] = useState({});
    const [selectedOptionList, setSelectedOptionList] = useState([]);
    // Hide Dropdown on Outside Click
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)
    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsActive), []);
    
    useEffect(() => {
    //   if (value !== null && value !== undefined && value !== '') {
    //     const mountOption = options.filter(opt => opt.value === value)[0];
    //     setSelectedOption(mountOption);
    //   }
      if (options) {
        if(params){
            const result = Object.keys(options)
            .filter(key => options[key][params[0]] === params[1])
            .map(key => options[key]);
            setOptionsList(result);
        } else {
            setOptionsList(options);
        }
      }
    //   setOptionsList(initOptions);
    }, [])
    
    const removeOption = (Id) => {
        const result = selectedOptionList.filter(option => option.id !== Id);     
        return result;
     };
     

    const handleChange = (e) => {
        const result = {...optionsList, [e.key]:{...optionsList[e.key], value: e.target.value}};
        let myOptions = [];
        if (e.target.value) {
            myOptions = [...selectedOptionList, result[e.key]];
        } else {
            myOptions = removeOption(result[e.key]['id']);
        }
        setSelectedOptionList(myOptions);
        setOptionsList(result);

        let ids = myOptions.map(item => item.id);        
        const isPresent = options.some(item => JSON.stringify(item.content) === JSON.stringify(ids))       
        if (myOptions.length>1  && !isPresent){
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    const handleSelectButtonClick = () => {
        setIsActive(!isActive);
        // console.log("isActive : ",isActive);
    };

    // const handleOptionClick = (option) => {
    //     setSelectedOptions(option);
    //     // setIsActive(false);
    //     // console.log("isActive : ",isActive);
    //     if (onChange) {
    //         onChange({
    //             target: {
    //                 name: name, 
    //                 value: option.value,
    //             }
    //         })
    //     }
    // };

    // const handleSubmit = () => {
    //     const list = optionsList; 
    //     Object.entries(list).map(([key, option], index) => {
    //         {...list, [key]:{...list[key], value: false}}
    //     })
    //     setIsActive(false);
    //     console.log(list);
    // };
    const handleSubmit = () => {
        let list = optionsList;
        list = Object.entries(list).reduce((acc, [key, option]) => {
            acc[key] = {...option, value: false};
            return acc;
        }, {});
        setOptionsList(list);
        setIsActive(false);
        let ids = selectedOptionList.map(item => item.id);
        let labels = selectedOptionList.map(item => item.label).join(", ")
        
        if (onChange) {
            onChange({
                target: {
                    name: name, 
                    value: {
                        id:generateCode(4),
                        label: labels,
                        type: 'multi',
                        content: ids,
                    },
                }
            })
        }

        setSelectedOptionList([]);
        
     };
     

    //  useEffect(() => {
    //     console.log(optionsList);
    //  }, [optionsList])
     

    return (
        <div ref={menuRef} className={`w-full ${className}`}>
            <div name={name} className={`relative w-full flex flex-col selectMenu ${isActive ? 'active' : ''}`}>
                <div className={`relative w-fit h-[2.5rem] flex items-center justify-between cursor-pointer`} onClick={handleSelectButtonClick}>
                    {button}
                </div>

                <ul className={'options top-[2.6rem]'}>
                    {Object.entries(optionsList).map(([key, option], index) => (
                    <li key={index}>
                        <div 
                        className={`flex  hover:bg-vanbook-gray cursor-pointer`}>
                            <div className="flex gap-2 min-w-[230px] items-center w-full py-2"
                            // onClick={() => handleOptionClick(option)}
                            >
                                <CustomCheckbox
                                index={index}
                                className='w-full'
                                name={`${name}_custom_checkbox_${index}`}
                                value={option.value}
                                label={option.label}
                                onChange={handleChange}
                                />
                            </div> 
                        </div>
                    </li>
                    ))}
                    <li>
                        <div 
                        className={`flex justify-end pr-2`}
                        >
                            <div className="flex w-fit items-center py-2">
                                <CustomButton
                                onClick={handleSubmit}
                                disabled={isDisabled}
                                label={<>
                                <FiPlus size={16} color={"white"}/>
                                <span className='text-[.9rem]'>Add</span>
                                </>}
                                />
                            </div> 
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default CustomDropdown


// <li className={`option h-[20px] px-[3px] gap-[15px] ${selectedOption.value == option.value ? 'bg-[#f2f2f2]':''}`} key={index} onClick={() => handleOptionClick(option)}>
//     <CustomCheckbox
//     className='w-full h-[2.5rem] border border-vanbook-100  outline-none pl-4 rounded-lg mt-1 text-[.9rem]'
//     name={"name"}
//     value={false}
//     label={option.label}
//     onChange={handleChange}
//     />
// </li>