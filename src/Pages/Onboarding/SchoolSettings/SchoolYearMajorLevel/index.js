import React, { useEffect } from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from '../../../../Components/CustomInput/CustomInput.js';
import '../../style_onboarding.css';
import {style} from "../../style.js";
import { FiPlus, FiX } from "react-icons/fi";

import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from '../../../../Api/Auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSubmitCompanyDataMutation } from '../../../../Api/Auth/authApiSlice.js';
import notify from '../../../../Components/Notify/Notify.js';

const initFormData = {
    'academic_period_name': {value:'', required:true},
    'academic_period_start': {value:'', required:true},
    'academic_period_end': {value:'', required:true},
}

export default function SchoolYearMajorLevel() {
    const [formData, setFormData] = useState(initFormData);
    const [formErrors, setFormErrors] = useState({});
    const [majors, setMajors] = useState({
        'major_name_0':{id:0, value:'', required:true},
    });
    const [levels, setLevels] = useState({
      'level_name_0':{id:0, value:'', required:true},
  });
    const [majorCounter, setMajorCounter] = useState(0);
    const [levelCounter, setLevelCounter] = useState(0);
    const [isActive, setIsActive] = useState(true);
  
    // const token = useSelector(selectCurrentToken);
    // const decodedToken = jwtDecode(token);
    // const { rc } = decodedToken;
    
    // const navigate = useNavigate()
    // const [submitCompanyData, { isLoading }] = useSubmitCompanyDataMutation()
    // const dispatch = useDispatch()
    
    const addNewMajor = () => {
        let list = majors;
        const name = `major_name_${majorCounter+1}`;
        list = {...list, [name]: {id:majorCounter+1, value:'', required:true}};
        console.log(list);
        setMajors(list);
        setMajorCounter(majorCounter+1);
    };
    const removeMajor = (id) => {
        console.log("id : ", id);
        const result = Object.keys(majors)
          .filter(key => majors[key].id !== id )
          .reduce((accumulator, key) => {
            accumulator[key] = majors[key];
            return accumulator;
        }, {});
        console.log("result : ", result);
        setMajors(result);
        
    };
    const handleMajorInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let required = e.target.required;
      setMajors({ ...majors, [name]: {...majors[name], value:value, required:required} });
      setFormData({ ...formData, [name]: {value:value, required:required} });
    };
    

    const addNewLevel = () => {
      let list = levels;
      const name = `level_name_${levelCounter+1}`;
      list = {...list, [name]: {id:levelCounter+1, value:'', required:true}};
      console.log(list);
      setLevels(list);
      setLevelCounter(levelCounter+1);
    };
    const removeLevel = (id) => {
      console.log("id : ", id);
      const result = Object.keys(levels)
          .filter(key => levels[key].id !== id)
          .map(key => levels[key]);
      setLevels(result);
    };
    const handleLevelInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let required = e.target.required;
      setLevels({ ...levels, [name]: {...levels[name], value:value, required:required} });
      setFormData({ ...formData, [name]: {value:value, required:required} });
    };

    useEffect(() => {
      console.log("levels: ", levels);
      console.log("formData: ", formData);
    }, [levels])

    const handleInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let required = e.target.required;
      setFormData({ ...formData, [name]: {value:value, required:required} });
    };
    
  
    const validateForm = () => {
      let errors = {};
      for (let key in formData) {
        if (formData[key].required && !formData[key].value) {
          errors[key] = `${key} is required`;        
        }
      }
      for (let ind in majors) {
        if (majors[ind].required && !majors[ind].value) {
          errors[ind] = `This field is required`;
        }
      }
      for (let ind in levels) {
        if (levels[ind].required && !levels[ind].value) {
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
        
        <h1 className={style.h1}>Define your academic period</h1>  
        <div className={`w-full mb-20 flex flex-col items-center justify-center gap-5`}>
          <div className={`w-fit sm:w-[90%] md:w-[720] lg:w-[800px] max-w-[1000px]`}>
            <div className="grid grid-cols-1 gap-7 mt-5"> 
              <CustomInput 
              type="text" 
              label="Title" 
              placeholder={"Academic year 2023/2024"}
              name="academic_period_name" 
              value={formData['academic_period_name'].value} 
              onChange={handleInputChange}
              err={formErrors}
              required={formData['academic_period_name'].required}
              />
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12"> 
              <CustomInput 
                type="date" 
                label="Start Date" 
                name="academic_period_start" 
                value={formData['academic_period_start'].value} 
                onChange={handleInputChange}
                err={formErrors}
                required={formData['academic_period_start'].required}
              />
              <CustomInput 
                type="date" 
                label="End Date" 
                name="academic_period_end" 
                value={formData['academic_period_end'].value} 
                onChange={handleInputChange}
                err={formErrors}
                required={formData['academic_period_end'].required}
              />
              </div>

            </div>
          </div> 
        </div>


        <h1 className={style.h1}>Define your school majors</h1>
        <p className={style.extraInfo}>
        Examples: Business management, Engineering, Health science, Computer science ...
        </p> 
        <div className={`w-full flex flex-col items-center justify-center gap-5`}>
          <div className={`w-fit sm:w-[90%] md:w-[720] lg:w-[800px] max-w-[1000px]`}>
            <div className="grid md:grid-cols-1 gap-7 mt-7">
                {
                    Object.entries(majors).map(([key, elt], ind) => (
                        <div className='flex gap-3 items-center w-full'>
                            <CustomInput 
                            key={ind}
                            type="text" 
                            placeholder={"Major title"}
                            name={`major_name_${elt.id}`}
                            value={elt.value} 
                            onChange={handleMajorInputChange}
                            err={formErrors}
                            required={elt.required}
                            className={'w-full'}
                            />
                            <div onClick={()=>removeMajor(elt.id)} className={`${ind>0? '':'hidden'} cursor-pointer opacity-[60%]`}>
                                <FiX size={25} color={"#41436a"}/>
                            </div>
                        </div>                        
                    ))
                }
                <button 
                onClick={()=>addNewMajor()} 
                className="text-right outline-none z-50 cursor-pointer flex gap-3 border border-gray-500 rounded-md p-2 mt-2 w-fit mb-5">
                    <FiPlus size={20} color={"#41436a"}/>
                    <span className="myprimarytextcolor">Add major</span>                            
                </button>
            </div>
          </div> 
        </div>

        <h1 className={style.h1}>Define your school levels</h1>
        <p className={style.extraInfo}>
        Examples: Grade 1, Class 2, Form 3, Year 4 ...
        </p>  
        <div className={`w-full flex flex-col items-center justify-center gap-5`}>
          <div className={`w-fit sm:w-[90%] md:w-[720] lg:w-[800px] max-w-[1000px]`}>
            <div className="grid md:grid-cols-1 gap-7 mt-7">
                {
                    Object.entries(levels).map(([key, elt], ind) => (
                        <div className='flex gap-3 items-center w-full'>
                            <CustomInput 
                            key={ind}
                            type="text" 
                            placeholder={"Level title"}
                            name={`level_name_${elt.id}`}
                            value={elt.value} 
                            onChange={handleLevelInputChange}
                            err={formErrors}
                            required={elt.required}
                            className={'w-full'}
                            />
                            <div onClick={()=>removeLevel(elt.id)} className={`${ind>0? '':'hidden'} cursor-pointer opacity-[60%]`}>
                                <FiX size={25} color={"#41436a"}/>
                            </div>
                        </div>                        
                    ))
                }
                <button 
                onClick={()=>addNewLevel()} 
                className="text-right outline-none z-50 cursor-pointer flex gap-3 border border-gray-500 rounded-md p-2 mt-2 w-fit mb-5">
                    <FiPlus size={20} color={"#41436a"}/>
                    <span className="myprimarytextcolor">Add level</span>                            
                </button>
            </div>
          </div> 
        </div>

        <div className={`w-full flex flex-col items-center justify-center gap-5`}>
          <div className={`w-fit sm:w-[90%] md:w-[720] lg:w-[800px] max-w-[1000px]`}>  
            <div className={`mt-10 mb-10 ${style.btnContainer}`}>
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
   
  