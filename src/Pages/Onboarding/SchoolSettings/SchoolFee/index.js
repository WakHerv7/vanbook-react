import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomInput from '../../../../Components/CustomInput/CustomInput.js';
import CustomDropdown from '../../../../Components/CustomDropdown/CustomDropdown.js';
import '../../style_onboarding.css';
import { feesList } from './feesList.js';
import {style} from "../../style.js";
import { FiPlus, FiX, FiCopy } from "react-icons/fi";
import './style.css';
import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../../../Api/Auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSubmitCompanyDataMutation } from '../../../../Api/Auth/authApiSlice.js';
import notify from '../../../../Components/Notify/Notify.js';

const initFormData = {
    // 'academic_period_name': {value:'', required:true},
    // 'academic_period_start': {value:'', required:true},
    // 'academic_period_end': {value:'', required:true},
}

const feeList = {
  'fee_0':{
    id:0,
    major_id:1, 
    level_id:1,
    title:{value:'', required:true},
    amount:{value:'', required:true},
    category:{value:'', required:true},
    period:{value:'', required:true},
  },
};

const majorOptions = [
  { 
      id: 0, 
      label: 'All Majors',
      type: 'all',
      content: null,
  },
  { 
      id: 1, 
      label: 'Business Management',
      type: 'single',
      content: null,
  },
  { 
      id: 2, 
      label: 'Engineering',
      type: 'single',
      content: null,
  },
];

const levelOptions = [
  { 
      id: 0, 
      label: 'All Levels',
      type: 'all',
      content: null,
  },
  { 
      id: 1, 
      label: 'Grade 1',
      type: 'single',
      content: null,
  },
  { 
      id: 2, 
      label: 'Grade 2',
      type: 'single',
      content: null,
  },
  { 
      id: 3, 
      label: 'Grade 3',
      type: 'single',
      content: null,
  },
  { 
      id: 4, 
      label: 'Grade 4',
      type: 'single',
      content: null,
  },
];

const feeCategories = [
  {
    "label": "Standard",
    "value": 1,
  },
  {
    "label": "Enrollment",
    "value": 2,
  },
  {
    "label": "Tuition",
    "value": 3,
  },
  {
    "label": "Exam",
    "value": 4,
  },
  {
    "label": "Course",
    "value": 5,
  },
  {
    "label": "Resource",
    "value": 6,
  },
  {
    "label": "Activity",
    "value": 7,
  },
]

const studentCategories = [
  {
      "label": "All",
      "description": "new, old, local, foreign",
      "value": 1,      
  },
  {
      "label": "New",
      "description": "local and foreign",
      "value": 2,      
  },
  {
      "label": "Old",
      "description": "local and foreign",
      "value": 3,      
  },
  {
      "label": "Local",
      "description": "new and old",
      "value": 4,      
  },
  {
      "label": "Foreign",
      "description": "new and old",
      "value": 5,      
  },
  {
      "label": "New Local",
      "description": "",
      "value": 6,      
  },
  {
      "label": "New Foreign",
      "description": "",
      "value": 7,      
  },
  {
      "label": "Old Local",
      "description": "",
      "value": 8,      
  },
  {
      "label": "Old Foreign",
      "description": "",
      "value": 9,      
  },
]

function getRandomChar() {
  // var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // return chars.charAt(Math.floor(Math.random() * 62));
  var chars = '0123456789';
  return chars.charAt(Math.floor(Math.random() * 10));
  
}
export function generateCode(length) {
  var code = '';
  for (var i = 0; i < length; i++) {
    code += getRandomChar();
  }
  return code;
}

function getFeesByMajorIdAndLevelId(fees, majorId, levelId) {
  const result = Object.keys(fees)
    .filter(key => fees[key].major_id === majorId && fees[key].level_id === levelId)
    .reduce((accumulator, key) => {
      accumulator[key] = fees[key];
      return accumulator;
    }, {});
  // console.log("result : ", result);
  return result;
}
function removeFeesByMajorIdAndLevelId(fees, majorId, levelId) {
  const result = Object.keys(fees)
    .filter(key => fees[key].major_id !== majorId || fees[key].level_id !== levelId)
    .reduce((accumulator, key) => {
      accumulator[key] = fees[key];
      return accumulator;
    }, {});
  return result;
 }
 
function getFilteredFees(fees, Id) {
  const result = Object.keys(fees)
    .filter(key => fees[key].id !== Id)
    // .map(key => fees[key]);
    .map(key => ({value:fees[key].id, label:fees[key].label}));
    
  // console.log("result : ", result);
  return result;
} 

export default function SchoolFee() {
    // const [welcome, setWelcome] = useState(true);
    const [formData, setFormData] = useState(initFormData);
    const [formErrors, setFormErrors] = useState({});
    const [majorList, setMajorList] = useState(majorOptions);
    const [levelList, setLevelList] = useState(levelOptions);
    const [fees, setFees] = useState({});
    
    const [activeFees, setActiveFees] = useState({});
    const [inputCounter, setInputCounter] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [selectedMajorOption, setSelectedMajorOption] = useState(majorOptions[0]);
    const [selectedLevelOption, setSelectedLevelOption] = useState(levelList[0]);

    // const token = useSelector(selectCurrentToken);
    // const decodedToken = jwtDecode(token);
    // const { rc } = decodedToken;
    
    // const navigate = useNavigate()
    // const [submitCompanyData, { isLoading }] = useSubmitCompanyDataMutation()
    // const dispatch = useDispatch()
    
    const handleMajorOptionChange = (option) => {
        setSelectedMajorOption(option);
    };

    const handleLevelOptionChange = (option) => {
        setSelectedLevelOption(option);
    };
    // ------------------------------------------------
    const addToMajorList = (e) => {
      setMajorList([...majorList, e.target.value]);
    };
    const removeFromMajorList = (id) => {
      const result = Object.keys(majorList)
            .filter(key => majorList[key].id !== id)
            .map(key => majorList[key]);
      setMajorList(result);
      setFees(removeFeesByMajorIdAndLevelId(fees, null, id))
    };
    useEffect(() => {
      if (fees.length == 0) {
        setSelectedMajorOption(majorList[majorList.length-1]);
      } else {
        setSelectedMajorOption(majorList[0]);
      }
    }, [majorList])
    // -------------------------------------------------
    const addToLevelList = (e) => {
      setLevelList([...levelList, e.target.value]);
    };
    const removeFromLevelList = (id) => {
      const result = Object.keys(levelList)
            .filter(key => levelList[key].id !== id)
            .map(key => levelList[key]);
      setLevelList(result);
      setFees(removeFeesByMajorIdAndLevelId(fees, null, id))
    };
    useEffect(() => {
      if (fees.length == 0) {
        setSelectedLevelOption(levelList[levelList.length-1]);
      } else {
        setSelectedLevelOption(levelList[0]);
      }
      
    }, [levelList])
    // -------------------------------------------------
    

    useEffect(() => {
      setActiveFees(getFeesByMajorIdAndLevelId(fees, selectedMajorOption.id, selectedLevelOption.id))
    }, [fees, selectedMajorOption, selectedLevelOption])

    
    const addNewLine = () => {
        let list = fees;
        const name = `fee_${inputCounter}`;
        list = {...list, [name]: {
          id:inputCounter,
          label: `${selectedMajorOption.label} - ${selectedLevelOption.label} - Fee #${inputCounter+1}`,
          major_id: selectedMajorOption.id, 
          level_id: selectedLevelOption.id,
          major_label: selectedMajorOption.label, 
          level_label: selectedLevelOption.label,
          title:{value:'', required:true},
          amount:{value:'', required:true},
          category:{value:'', required:true},
          stdcategory:{value:'', required:true},
          period:{value:{
            'type': null,
            'number': null,
            'start_date': null,
            'end_date': null,
          }, required:true},
          is_subfee:{value:false, required:false},
          parent_fee:{value:'', required:false},
        }};
        setFees(list);
        setInputCounter(inputCounter+1);
    }

    const removeLine = (key) => {
        let myDict = fees;
        let keysToRemove = [key];
        let filteredKeys = Object.keys(myDict).filter(key => !keysToRemove.includes(key));
        let newDict = filteredKeys.reduce((result, key) => {
            result[key] = myDict[key];
            return result;
        }, {});
        setFees(newDict);
    }
    
    const duplicateFee = (elt, major, level) => {
      let list = fees;
      const name = `fee_${inputCounter}`;
      const item = {
        id:inputCounter,
        label: `${elt.major_label} - ${elt.level_label} - Fee #${elt.id+1} (Copy - ${generateCode(3)})`,
        major_id: major.id, 
        level_id: level.id,
        major_label: major.label, 
        level_label: level.label,
        title:{value:elt.title.value, required:elt.title.required},
        amount:{value:elt.amount.value, required:elt.amount.required},
        category:{value:elt.category.value, required:elt.category.required},
        stdcategory:{value:elt.stdcategory.value, required:elt.stdcategory.required},
        period:{value:elt.period.value, required:elt.period.required},
        is_subfee:{value:elt.is_subfee.value, required:elt.is_subfee.required},
        parent_fee:{value:elt.parent_fee.value, required:elt.parent_fee.required},
      };
      // console.log("item : ", item);
      list = {...list, [name]: item};
      setFees(list);
      setInputCounter(inputCounter+1);
    }

    const handleFeeInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let required = e.target.required;
      // console.log("e.key : ", e.key);
      // console.log("e.attr : ", e.attr);
      setFees({
        ...fees, 
        [e.key]: {
          ...fees[e.key], 
          [e.attr]: {value: value, required: required}
        } 
      });
      setFormData({
        ...formData,
        [name]: {value: value, required: required }
      });

   };
  //  useEffect(() => {
  //     console.log("fees : ", fees);
  //     // console.log("formData : ", formData);
  //   }, [formData])
    
    
    
    const validateForm = () => {
      let errors = {};
      for (let key in formData) {
        if (formData[key].required && !formData[key].value) {
          errors[key] = `${key} is required`;        
        }
      }
      for (let ind in fees) {
        if (fees[ind].required && !fees[ind].value) {
          errors[ind] = `This field is required`;
        }
      }
  
      if (Object.keys(errors).length > 0) {
        console.log(errors);
        setFormErrors(errors);
        notify("error", "Invalid entries");
        return false;
      }
      return true;
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if(!validateForm()) {
        return;
      }
  
    //   let toSubmit = {
    //     'id': rc.id,
    //     'ein': formData['ein'].value,
    //     'company_type': formData['company_type'].value,
    //     'financial_year_start': formData['financial_year_start'].value,
    //     'address': formData['address'].value,
    //     'phone': formData['phone_number'].value,
    //     'email': formData['email'].value,
    //     'website': formData['website'].value,
    //     'country': formData['country'].value,
    //     'region': formData['region'].value,
    //     'city': formData['city'].value,
    //     'currently_use': formData['currently_use'].value,
    //     'years_in_business': formData['years_in_business'].value,
    //   }
  
    //   console.log("toSubmit :", toSubmit)
      // return;
  
      try {
        //   const userData = await submitCompanyData(toSubmit).unwrap()
        //   navigate('/onboarding/role');
      } catch (err) {
        notify("error", "Something went wrong")
      }
  }
  
    return (
      <div className={`${style.container}`}>
        <div className={style.header}>
          <div className="relative flex justify-center align-center w-full ">
              <span className={style.logo}>VB</span>
              <p className={style.headerText}>Get Started</p>
          </div>
          <div className={style.hr}>
            <div className={style.progress} />
          </div>
        </div>
        <h3 className={style.h3}>Customize your school settings to make the most of our software.</h3>

        <h1 className={style.h1}>Define your school fees</h1>  
        <div className={`w-full flex flex-col items-center justify-center gap-5`}>
          <div className={`w-fit sm:w-[90%] md:w-[85%] lg:w-[85%]  mt-5 rounded-lg mb-[70px] shadow-2xl shadow-slate-300`}>
            <div className="grid md:grid-cols-12">
                <div className="col-span-2 grid md:grid-cols-1 gap-7 z-[100] shadow-[10px_0px_10px_-10px] shadow-slate-400 min-h-[500px] py-7 px-4 pr-7 " style={{borderRight: '1px solid vanboook-primary'}}>
                  <ul className="space-y-1 text-sm text-vanbook-primary" aria-labelledby="dropdownHelperRadioButton">
                        {/* {majorOptions.map((option, indx) => (
                        <li key={indx} className=''>
                            <div 
                            className={`flex  hover:bg-100 cursor-pointer border-b border-vanbook-100 border-solid`}
                            onClick={() => handleMajorOptionChange(option)}
                            >
                            <div className="flex gap-2 items-center py-3">
                                <div>
                                    <div
                                    className={`
                                    w-6 h-6 border  rounded-[50%] ${selectedMajorOption.id === option.id ? 'opacity-[100%] border-vanbook-500 border-[7px]':'opacity-[50%] border-vanbook-300'}
                                    `}>
                                    </div>
                                </div>
                                <div className="ms-1 text-sm">
                                    <label htmlFor={option.id} className="font-medium text-vanbook-primary cursor-pointer">
                                        <div className={`${selectedMajorOption.id === option.id ? 'opacity-[100%]':'opacity-[50%]'}`}>{option.label}</div>
                                    </label>
                                </div>

                                
                            </div>                
                            </div> 
                        </li>
                        
                        ))} */}

                        {majorList.map((option, indx) => (
                        <li key={indx} className='w-full relative ml-list-item'>
                            <div 
                            className={`flex relative hover:bg-100 cursor-pointer border-b border-vanbook-100 border-solid`}
                            onClick={() => handleMajorOptionChange(option)}
                            >
                              <div className="flex relative gap-2 items-center w-full py-3">
                                  <div>
                                    <div
                                    className={`
                                    w-6 h-6 border  rounded-[50%] ${selectedMajorOption.id === option.id ? 'opacity-[100%] border-vanbook-500 border-[7px]':'ml-item-opacity border-vanbook-300'}
                                    `}>
                                    </div>
                                  </div>
                                  <div className="w-full ms-2 text-sm">
                                      <label htmlFor={option.id} className="w-full font-medium text-vanbook-primary cursor-pointer">
                                          <span className={`w-full ${selectedMajorOption.id === option.id ? 'opacity-[100%]':'opacity-[50%] ml-item-opacity'}`}>{option.label}</span>
                                      {/* <div>{getPlanAmount(option.amount)}</div> */}
                                      </label>
                                  </div>
                              </div>                
                            </div>
                            {option.type == 'multi'?
                                <div className={`absolute top-[5px] right-[5px] z-100 ml-close-btn cursor-pointer opacity-[60%]`} onClick={()=>removeFromMajorList(option.id)}>
                                  <FiX size={16} color={"#41436a"}/>
                                </div>
                            :
                            <></>} 
                        </li>                        
                        ))}
                        <li>
                          <CustomDropdown
                          className={'mt-10'}
                          name={"addMajor"}
                          options = {majorList}
                          params = {['type', 'single']}
                          button={<button
                            className="opacity-50 hover:opacity-100 text-left outline-none z-50 cursor-pointer flex items-center justify-between gap-3 border border-slate-400 rounded-md p-2 mt-2 w-fit h-fit mb-5">
                                <FiPlus size={20} color={"#41436a"}/>
                                <span className="myprimarytextcolor">Add combined majors</span>                            
                            </button>}
                          onChange={addToMajorList}
                          />
                        </li>

                  </ul>
                </div>
                <div className="col-span-2 grid md:grid-cols-1 gap-7 bg-vanbook-gray min-h-[500px] py-7 px-4 pr-7 border-solid shadow-[10px_0px_10px_-10px] shadow-slate-300" style={{borderRight: '1px solid vanboook-primary'}}>
                    <ul className="relative w-full space-y-1 text-sm text-vanbook-primary" aria-labelledby="dropdownHelperRadioButton">
                        {levelList.map((option, indx) => (
                        <li key={indx} className='w-full relative ml-list-item'>
                            <div 
                            className={`flex relative hover:bg-100 cursor-pointer border-b border-vanbook-100 border-solid`}
                            onClick={() => handleLevelOptionChange(option)}
                            >
                              <div className="flex relative gap-2 items-center w-full py-3">
                                  <div>
                                      <div
                                      className={`
                                      w-3 h-3 rounded-[50%] ${selectedLevelOption.id === option.id ? 'opacity-[100%] bg-vanbook-500':'ml-item-opacity bg-vanbook-300'}
                                      `}>
                                      </div>
                                  </div>
                                  <div className="w-full ms-2 text-sm">
                                      <label htmlFor={option.id} className="w-full font-medium text-vanbook-primary cursor-pointer">
                                          <span className={`w-full ${selectedLevelOption.id === option.id ? 'opacity-[100%]':'ml-item-opacity'}`}>{option.label}</span>
                                      {/* <div>{getPlanAmount(option.amount)}</div> */}
                                      </label>
                                  </div>
                              </div>                
                            </div>
                            {option.type == 'multi'?
                                <div className={`absolute top-[5px] right-[5px] z-100 ml-close-btn cursor-pointer opacity-[60%]`} onClick={()=>removeFromLevelList(option.id)}>
                                  <FiX size={16} color={"#41436a"}/>
                                </div>
                            :
                            <></>} 
                        </li>                        
                        ))}
                        <li>
                          <CustomDropdown
                          className={'mt-10'}
                          name={"addLevel"}
                          options = {levelList}
                          params = {['type', 'single']}
                          button={<button
                            className="opacity-50 hover:opacity-100 text-left outline-none z-50 cursor-pointer flex items-center justify-between gap-3 border border-slate-400 rounded-md p-2 mt-2 w-fit h-fit mb-5">
                                <FiPlus size={20} color={"#41436a"}/>
                                <span className="myprimarytextcolor">Add combined levels</span>                            
                            </button>}
                          onChange={addToLevelList}
                          />
                        </li>
                    </ul>
                </div>
                <div className='col-span-8 flex flex-col w-full'>
                  <div className='m-7 mt-8 text-lg tracking-wide'>
                      {'Here define all fees of '}
                      <strong className='tracking-wide'>{selectedMajorOption.label}</strong>{' for '}
                      <strong className='tracking-wide'>{selectedLevelOption.label}</strong>.
                  </div>
                  <div className="grid md:grid-cols-1 gap-7 px-7 pb-4 h-fit w-full">
                      {
                          Object.entries(activeFees).map(([key, elt], ind) => {
                            const onekey = key;
                            const filteredFees = getFilteredFees(fees, elt.id);
                            return (
                              <div key={onekey} className={`relative p-4 pt-8 flex flex-col gap-4 border border-slate-400 rounded-lg`}>
                                <div className='absolute top-0 left-0 w-full h-fit py-1 px-2 flex justify-between'>
                                  <div className='opacity-[70%] pl-2 text-md'>{elt.label}</div>
                                  
                                  <div className={`flex items-center gap-10 pr-2 `}>
                                    <div className={`${ ind > 0 ? '':'hidden'}`}>
                                        <CustomInput
                                        onekey={onekey}
                                        id={`is_subfee_${elt.id}`}
                                        type="checkbox" 
                                        label={"Is sub-fee"}
                                        name={`is_subfee_${elt.id}`}
                                        value={elt.is_subfee.value}
                                        attr={'is_subfee'} 
                                        onChange={handleFeeInputChange}
                                        err={formErrors}
                                        required={elt.is_subfee.required}
                                        className={'w-full'}
                                        />
                                    </div>
                                    <div title={"Duplicate fee"} onClick={()=>duplicateFee(elt, {id:elt.major_id, label:elt.major_label}, {id:elt.level_id, label:elt.level_label})} className={`cursor-pointer opacity-[60%]`}>
                                        <FiCopy size={16} color={"#41436a"}/>
                                    </div>
                                    <div onClick={()=>removeLine(`fee_${elt.id}`)} className={`${ ind > -1 ? '':'hidden'} cursor-pointer opacity-[60%]`}>
                                        <FiX size={20} color={"#41436a"}/>
                                    </div>
                                  </div>

                                </div>
                                <div className='flex gap-3 items-center w-full'>
                                  <CustomInput
                                  onekey={onekey}
                                  id={`fee_title_${elt.id}`}
                                  type="text" 
                                  placeholder={"Fee title"}
                                  name={`fee_title_${elt.id}`}
                                  value={elt.title.value}
                                  attr={'title'} 
                                  onChange={handleFeeInputChange}
                                  err={formErrors}
                                  required={elt.title.required}
                                  className={'w-full'}
                                  />
                                  
                                </div>
                                
                                <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4`}>
                                  <CustomInput 
                                  onekey={onekey}
                                  id={`fee_amount_${elt.id}`}
                                  type="number" 
                                  placeholder={"Amount"}
                                  name={`fee_amount_${ind}`}
                                  value={elt.amount.value} 
                                  attr={'amount'} 
                                  onChange={handleFeeInputChange}
                                  err={formErrors}
                                  required={elt.amount.required}
                                  className={'w-full'}
                                  />
                                  <CustomInput 
                                  onekey={onekey}
                                  id={`fee_period_${elt.id}`}
                                  type="cperiod" 
                                  placeholder={"Period"}
                                  name={`fee_period_${ind}`}
                                  value={elt.period.value} 
                                  attr={'period'} 
                                  onChange={handleFeeInputChange}
                                  err={formErrors}
                                  required={elt.period.required}
                                  className={'w-full'}
                                  />
                                  <CustomInput 
                                  onekey={onekey}
                                  id={`fee_category_${elt.id}`}
                                  type="cselect" 
                                  placeholder={"Fee category"}
                                  name={`fee_category_${ind}`}
                                  value={elt.category.value} 
                                  attr={'category'} 
                                  onChange={handleFeeInputChange}
                                  err={formErrors}
                                  required={elt.category.required}
                                  className={'w-full'}
                                  options={feeCategories}
                                  />
                                  <CustomInput 
                                  onekey={onekey}
                                  id={`student_category_${elt.id}`}
                                  type="cselect" 
                                  placeholder={"Student category"}
                                  name={`student_category_${ind}`}
                                  value={elt.stdcategory.value} 
                                  attr={'stdcategory'} 
                                  onChange={handleFeeInputChange}
                                  err={formErrors}
                                  required={elt.stdcategory.required}
                                  className={'w-full'}
                                  options={studentCategories}
                                  />
                                </div>
                                {elt.is_subfee.value ?
                                <div className={`grid md:grid-cols-2 items-center border-solid border-vanbook-100 border-t`}>
                                  <CustomInput 
                                    onekey={onekey}
                                    id={`parent_fee_${elt.id}`}
                                    type="cselect"
                                    label="Is a sub-fee of"
                                    placeholder={"Select parent fee"}
                                    name={`parent_fee_${ind}`}
                                    value={elt.parent_fee.value} 
                                    attr={'parent_fee'} 
                                    onChange={handleFeeInputChange}
                                    err={formErrors}
                                    required={elt.parent_fee.required}
                                    className={'w-full mt-1'}
                                    options={filteredFees}
                                    labelPosition={'side'}
                                    />
                                </div>
                                :
                                <></>
                                }
                                
                              </div>                        
                          )})
                      }
                      <button 
                      onClick={()=>addNewLine()} 
                      className="text-right outline-none z-50 cursor-pointer flex gap-3 border border-slate-400 rounded-md p-2 mt-2 w-fit h-fit mb-5">
                          <FiPlus size={20} color={"#41436a"}/>
                          <span className="myprimarytextcolor">Add fee</span>                            
                      </button>
                  </div>
                </div>
            </div>
  
            <div className={`pt-10 mb-10 px-4 border-solid border-vanbook-100 border-t ${style.btnContainer}`}>
                  <div className="flex gap-3 justify-end">
                  
                  {/* <Link to="#" onClick={(e)=>e.preventDefault()}>
                      <button className={style.backBtn}>
                          <span>Back</span>
                      </button>
                  </Link> */}
                  <Link to="#" onClick={handleSubmit}>
                      <button
                      className={isActive ? style.nextBtn : style.nextBtnDisable}
                      disabled={!isActive}
                      >
                      <span>Next</span>
                      </button>
                  </Link>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
            </div>
          </div> 
        </div>

        
      </div>
    );
  }



//   let myDict = {
//     key1: 'value1',
//     key2: 'value2',
//     key3: 'value3'
//    };
   
//    let keysToRemove = ['key2', 'key3'];
   
//    let filteredKeys = Object.keys(myDict).filter(key => !keysToRemove.includes(key));
   
//    let newDict = filteredKeys.reduce((result, key) => {
//     result[key] = myDict[key];
//     return result;
//    }, {});
   
//    console.log(newDict); // { key1: 'value1' }
   
  