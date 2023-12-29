import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomInput from '../../../../Components/CustomInput/CustomInput.js';
import '../../style_onboarding.css';
import { feesList } from './feesList.js';
import {style} from "../../style.js";
import { FiPlus, FiX } from "react-icons/fi";

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
      label: 'All Majors'
  },
  { 
      id: 1, 
      label: 'Business Management'
  },
  { 
      id: 2, 
      label: 'Engineering'
  },
];

const levelOptions = [
  { 
      id: 0, 
      label: 'All Levels'
  },
  { 
      id: 1, 
      label: 'Grade 1'
  },
  { 
      id: 2, 
      label: 'Grade 2'
  },
  { 
      id: 3, 
      label: 'Grade 3'
  },
  { 
      id: 4, 
      label: 'Grade 4'
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

export default function SchoolFee() {
    const [formData, setFormData] = useState(initFormData);
    const [formErrors, setFormErrors] = useState({});
    const [fees, setFees] = useState({});
    
    const [activeFees, setActiveFees] = useState({});
    const [inputCounter, setInputCounter] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [selectedMajorOption, setSelectedMajorOption] = useState(majorOptions[0]);
    const [selectedLevelOption, setSelectedLevelOption] = useState(levelOptions[0]);

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

    function getFeesByMajorIdAndLevelId(majorId, levelId) {
      return Object.keys(fees)
        .filter(key => fees[key].major_id === majorId && fees[key].level_id === levelId)
        .map(key => fees[key]);
    }     

    useEffect(() => {
      setActiveFees(getFeesByMajorIdAndLevelId(selectedMajorOption.id, selectedLevelOption.id))
    }, [fees, selectedMajorOption, selectedLevelOption])

    
    const addNewLine = () => {
        let list = fees;
        const name = `fee_${inputCounter}`;
        list = {...list, [name]: {
          id:inputCounter, 
          major_id: selectedMajorOption.id, 
          level_id: selectedLevelOption.id,
          major_label: selectedMajorOption.label, 
          level_label: selectedLevelOption.label,
          title:{value:'', required:true},
          amount:{value:'', required:true},
          category:{value:'', required:true},
          period:{value:'', required:true},
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
    

    const handleFeeTitleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let required = e.target.required;
        setFees({
          ...fees, 
          [e.key]: {
            ...fees[e.key], 
            title: {value: value, required: required}
          } 
        });
        setFormData({
          ...formData,
          [name]: {value: value, required: required }
        });
    };
    const handleFeePeriodInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let required = e.target.required;
      setFees({
        ...fees, 
        [e.key]: {
          ...fees[e.key], 
          period: {value: value, required: required}
        } 
      });
      setFormData({
        ...formData,
        [name]: {value: value, required: required }
      });
    };
    const handleFeeCategoryInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let required = e.target.required;
      setFees({
        ...fees, 
        [e.key]: {
          ...fees[e.key], 
          category: {value: value, required: required}
        } 
      });
      setFormData({
        ...formData,
        [name]: {value: value, required: required }
      });
    };
    const handleFeeAmountInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let required = e.target.required;
      setFees({
        ...fees, 
        [e.key]: {
          ...fees[e.key], 
          amount: {value: value, required: required}
        } 
      });
      setFormData({
        ...formData,
        [name]: {value: value, required: required }
      });
    };
    
    // useEffect(() => {
    //   console.log("fees : ", fees);
    //   // console.log("formData : ", formData);
    // }, [formData])
    
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
      <div className={style.container}>
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
          <div className={`w-fit sm:w-[90%] md:w-[85%] lg:w-[80%]  mt-5 rounded-lg overflow-hidden mb-12 shadow-2xl shadow-slate-300`}>
            <div className="grid md:grid-cols-12 overflow-hidden">
                <div className="col-span-2 grid md:grid-cols-1 gap-7 z-10 shadow-[10px_0px_10px_-10px] shadow-slate-400 min-h-[500px] py-7 px-4 pr-7 " style={{borderRight: '1px solid vanboook-primary'}}>
                  <ul className="space-y-1 text-sm text-vanbook-primary" aria-labelledby="dropdownHelperRadioButton">
                        {majorOptions.map((option, indx) => (
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
                                    {/* <div>{getPlanAmount(option.amount)}</div> */}
                                    </label>
                                </div>

                                
                            </div>                
                            </div> 
                        </li>
                        
                        ))}
                  </ul>
                </div>
                <div className="col-span-2 grid md:grid-cols-1 gap-7 bg-vanbook-gray min-h-[500px] py-7 px-4 pr-7 border-solid shadow-[10px_0px_10px_-10px] shadow-slate-300" style={{borderRight: '1px solid vanboook-primary'}}>
                    <ul className="space-y-1 text-sm text-vanbook-primary" aria-labelledby="dropdownHelperRadioButton">
                        {levelOptions.map((option, indx) => (
                        <li key={indx}>
                            <div 
                            className={`flex  hover:bg-100 cursor-pointer border-b border-vanbook-100 border-solid`}
                            onClick={() => handleLevelOptionChange(option)}
                            >
                            <div className="flex gap-2 min-w-[230px] items-center w-full py-3">
                                <div>
                                    <div
                                    className={`
                                    w-3 h-3 rounded-[50%] ${selectedLevelOption.id === option.id ? 'opacity-[100%] bg-vanbook-500':'opacity-[50%] bg-vanbook-300'}
                                    `}>
                                    </div>
                                </div>
                                <div className="ms-2 text-sm">
                                    <label htmlFor={option.id} className="font-medium text-vanbook-primary cursor-pointer">
                                        <div className={`${selectedLevelOption.id === option.id ? 'opacity-[100%]':'opacity-[50%]'}`}>{option.label}</div>
                                    {/* <div>{getPlanAmount(option.amount)}</div> */}
                                    </label>
                                </div>

                                
                            </div>                
                            </div> 
                        </li>
                        
                        ))}
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
                            return (
                              <div className={`relative p-4 pt-8 flex flex-col gap-4 border border-slate-400 rounded-lg`}>
                                <div className='absolute top-0 left-0 w-full h-fit py-1 px-2 flex justify-between'>
                                  <div className='opacity-[40%] pl-2 text-md'>{`${elt.major_label} - ${elt.level_label} - Fee #${elt.id+1}`}</div>
                                  <div onClick={()=>removeLine(`fee_title_${elt.id}`)} className={`${ ind > 0 ? '':'hidden'} pr-2 cursor-pointer opacity-[40%]`}>
                                      <FiX size={20} color={"#41436a"}/>
                                  </div>
                                </div>
                                <div className='flex gap-3 items-center w-full'>
                                  <CustomInput
                                  onekey={key}
                                  id={`fee_title_${elt.id}`}
                                  type="text" 
                                  placeholder={"Fee title"}
                                  name={`fee_title_${elt.id}`}
                                  value={elt.title.value} 
                                  onChange={handleFeeTitleInputChange}
                                  err={formErrors}
                                  required={elt.title.required}
                                  className={'w-full'}
                                  />
                                  
                                </div>
                                
                                <div className={`grid md:grid-cols-3 gap-4`}>
                                  <CustomInput 
                                  onekey={key}
                                  id={`fee_title_${elt.id}`}
                                  type="text" 
                                  placeholder={"Period"}
                                  name={`fee_period_${ind}`}
                                  value={elt.period.value} 
                                  onChange={handleFeePeriodInputChange}
                                  err={formErrors}
                                  required={elt.period.required}
                                  className={'w-full'}
                                  />
                                  <CustomInput 
                                  onekey={key}
                                  id={`fee_title_${elt.id}`}
                                  type="select" 
                                  placeholder={"Select fee category"}
                                  name={`fee_category_${ind}`}
                                  value={elt.category.value} 
                                  onChange={handleFeeCategoryInputChange}
                                  err={formErrors}
                                  required={elt.category.required}
                                  className={'w-full'}
                                  options={feeCategories}
                                  />
                                  <CustomInput 
                                  onekey={key}
                                  id={`fee_title_${elt.id}`}
                                  type="number" 
                                  placeholder={"Amount"}
                                  name={`fee_amount_${ind}`}
                                  value={elt.amount.value} 
                                  onChange={handleFeeAmountInputChange}
                                  err={formErrors}
                                  required={elt.amount.required}
                                  className={'w-full'}
                                  />
                                </div>
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
   
  